variable "project_id" {
  description = "The GCP project ID"
  type        = string
}

variable "region" {
  description = "The GCP region"
  type        = string
  default     = "us-west2"
}

variable "tf_service_account_email" {
  description = "The email of the service account used in CI/CD"
  type        = string
  # This would be the same service account whose key is in GCP_SA_KEY secret
}