

variable "project_id" {
  description = "The project ID to deploy to"
  type        = string
}

variable "region" {
  description = "The region to deploy to"
  type        = string
  default     = "us-west1"
}

variable "app_name" {
  description = "The name of the application"
  type        = string
  default     = "mickey-app"
}

variable "repository_name" {
  description = "Artifact Registry repository name"
  type        = string
  default     = "mickey-app-repo"
}

variable "container_image" {
  description = "Container image to deploy (leave empty for initial setup)"
  type        = string
  default     = ""
}

variable "domain_name" {
  description = "The domain name for the application"
  type        = string
  default     = "app.mickeymalotte.com"
}

variable "dns_zone_name" {
  description = "The name of your existing Cloud DNS zone"
  type        = string
  default     = "mickey-web-app"
}

variable "environment_variables" {
  description = "Environment variables for the Cloud Run service"
  type        = map(string)
  default = {
    VERSION = "2.0.0"
  }
}