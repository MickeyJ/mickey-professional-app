
# Enable required APIs
resource "google_project_service" "services" {
  project = var.project_id
  for_each = toset([
    "run.googleapis.com",
    "artifactregistry.googleapis.com",
    "iam.googleapis.com",
    "domains.googleapis.com",
    "certificatemanager.googleapis.com"
  ])
  service            = each.value
  disable_on_destroy = false
}

# Artifact Registry Repository
resource "google_artifact_registry_repository" "repository" {
  provider      = google
  location      = var.region
  repository_id = var.repository_name
  format        = "DOCKER"
  description   = "Docker repository for ${var.app_name}"
  depends_on = [
    google_project_service.services["artifactregistry.googleapis.com"]
  ]
}

# IAM Service Account 
resource "google_service_account" "cloud_run_service_account" {
  account_id   = "${var.app_name}-sa"
  display_name = "${var.app_name} Service Account"
  project      = var.project_id
  depends_on = [
    google_project_service.services["iam.googleapis.com"]
  ]
}

# IAM Policy Binding for Artifact Registry
resource "google_artifact_registry_repository_iam_member" "artifact_registry_reader" {
  project    = var.project_id
  location   = var.region
  repository = google_artifact_registry_repository.repository.name
  role       = "roles/artifactregistry.reader"
  member     = "serviceAccount:${google_service_account.cloud_run_service_account.email}"
  depends_on = [
    google_artifact_registry_repository.repository,
    google_service_account.cloud_run_service_account,
    google_project_service.services["artifactregistry.googleapis.com"],
    google_project_service.services["iam.googleapis.com"]
  ]
}


# Cloud Run Service
resource "google_cloud_run_v2_service" "service" {
  provider = google-beta
  name     = var.app_name
  location = var.region

  template {
    containers {
      image = var.container_image != "" ? var.container_image : "us-docker.pkg.dev/cloudrun/container/hello"

      # Port configuration for Next.js
      ports {
        container_port = 3000
      }

      env {
        name  = "NODE_ENV"
        value = "production"
      }

      env {
        name  = "HOSTNAME"
        value = "0.0.0.0"
      }

      resources {
        limits = {
          cpu    = "1"
          memory = "512Mi"
        }
        startup_cpu_boost = true
      }

      dynamic "env" {
        for_each = var.environment_variables
        content {
          name  = env.key
          value = env.value
        }
      }

    }

    scaling {
      min_instance_count = 0
      max_instance_count = 2
    }

    service_account = google_service_account.cloud_run_service_account.email
  }

  # Traffic configuration - 100% to latest revision
  traffic {
    type    = "TRAFFIC_TARGET_ALLOCATION_TYPE_LATEST"
    percent = 100
  }

  lifecycle {
    # This ensures a new resource is created before the old one is destroyed
    create_before_destroy = true
  }

  depends_on = [
    google_project_service.services["run.googleapis.com"],
    google_service_account.cloud_run_service_account,
    google_artifact_registry_repository.repository,
    google_artifact_registry_repository_iam_member.artifact_registry_reader,
    google_project_iam_member.cloud_run_services
  ]
}

resource "google_cloud_run_service_iam_member" "public_access" {
  location = google_cloud_run_v2_service.service.location
  service  = google_cloud_run_v2_service.service.name
  role     = "roles/run.invoker"
  member   = "allUsers"

  depends_on = [
    google_cloud_run_v2_service.service,
    google_project_service.services["run.googleapis.com"]
  ]
}

# Optional: More granular IAM permissions for the service account
resource "google_project_iam_member" "cloud_run_services" {
  for_each = toset([
    "roles/logging.logWriter",       # Write logs
    "roles/cloudtrace.agent",        # Write traces
    "roles/monitoring.metricWriter", # Write metrics
    "roles/run.admin",               # 💥 Required for Cloud Run changes
    "roles/iam.serviceAccountUser",  # (Optional but useful)
  ])

  project = var.project_id
  role    = each.key
  member  = "serviceAccount:${google_service_account.cloud_run_service_account.email}"

  depends_on = [
    google_service_account.cloud_run_service_account,
    google_project_service.services["iam.googleapis.com"]
  ]
}

# Can be deleted after next deploy. Set to 0 to skip
resource "google_cloud_run_domain_mapping" "domain_mapping" {
  count    = 0
  location = var.region
  name     = var.domain_name

  metadata {
    namespace = var.project_id
  }

  spec {
    route_name = google_cloud_run_v2_service.service.name
  }

  depends_on = [
    google_cloud_run_v2_service.service,
    google_project_service.services["run.googleapis.com"],
    google_project_service.services["domains.googleapis.com"]
  ]
}