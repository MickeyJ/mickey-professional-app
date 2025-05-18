terraform {
  required_version = ">= 1.1.9"

  required_providers {
    google = {
      source  = "hashicorp/google"
      version = "~> 6.0"
    }

    google-beta = {
      source  = "hashicorp/google-beta"
      version = "~> 6.0"
    }
  }

  # Uncomment this block if you want to use a remote backend for state storage
  backend "gcs" {}
}

#GCP Provider
provider "google" {
  project = var.project_id
  region  = var.region
}

#GCP Beta Provider
provider "google-beta" {
  project = var.project_id
  region  = var.region
}