#!/bin/bash
terraform fmt -recursive
if [ $? -ne 0 ]; then
  echo "Terraform formatting failed. Please fix the issues and try again."
  exit 1
elif ! git diff --quiet; then
  echo "Terraform formatting changes detected. Please review and commit the changes."
  echo ""
  git status
  git add -u
  echo "Staged changes."
  echo ""
  git status
  echo "git commit -m 'pre-commit terraform formatting'"
  exit 1
else
  echo "Terraform formatting passed. Proceeding with commit."
fi