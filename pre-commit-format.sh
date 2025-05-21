
# Step 1: Run Terraform formatting
echo "Running Terraform formatting..."
npm run terraformat

if [ $? -ne 0 ]; then
  echo "❌ Terraform formatting failed. Please fix the issues and try again."
  exit 1
fi

# Step 2: Check if Terraform formatting made changes
if ! git diff --quiet -- terraform/; then
  echo "⚠️ Terraform formatting changes detected. Please review and commit the changes."
  echo ""
  git status
  git add -u
  echo "Staged formatting changes."
  echo ""
  git status
  git commit -m 'pre-commit terraform formatting'
  exit 1
fi

# Step 3: Build Test
if ! git diff --quiet -- src/ || ! git diff --cached --quiet -- src/; then
  echo "Testing 'npm run build' due to src code changes"
  npm run build
fi

if [ $? -ne 0 ]; then
  echo "❌ Build failed. Please fix any issues and try again."
  exit 1
fi

echo "✅ All checks passed. Proceeding with commit."