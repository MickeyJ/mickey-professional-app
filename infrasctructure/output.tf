output "cloud_run_url" {
  description = "The URL of the deployed Cloud Run service"
  value       = google_cloud_run_v2_service.service.uri
}

output "repository_url" {
  description = "The URL of the Artifact Registry repository"
  value       = "${var.region}-docker.pkg.dev/${var.project_id}/${var.repository_name}"
}

output "service_account_email" {
  description = "The email of the service account"
  value       = google_service_account.cloud_run_service_account.email
}

output "custom_domain_url" {
  description = "Custom domain URL configured for the service"
  value       = "https://${var.domain_name}"
}

output "dns_records_created" {
  description = "DNS records created in your app.mickeymalotte.com zone"
  value       = "A records created for ${var.domain_name} pointing to Google's load balancer IPs"
}