terraform {
  required_version = ">= 1.1.9"

  required_providers {
    google = {
      source  = "hashicorp/google"
      version = "~> 6.0"
    }
  }
  # This uses local state since the remote bucket doesn't exist yet
}

provider "google" {
  project = var.project_id
  region  = var.region
}