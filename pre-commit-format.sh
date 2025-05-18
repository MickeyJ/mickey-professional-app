#!/bin/bash
terraform fmt -recursive
if [ $? -ne 0 ]; then
  echo "Terraform formatting failed. Please fix the issues and try again."
  exit 1
else
  echo "Terraform formatting succeeded."
fi