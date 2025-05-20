
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
  echo "Run: git commit -m 'pre-commit terraform formatting'"
  exit 1
fi

# Step 3: Run TypeScript checking
echo "Running TypeScript checking..."
npm run typecheck

if [ $? -ne 0 ]; then
  echo "❌ TypeScript check failed. Please fix the type errors and try again."
  exit 1
fi

# Step 4: Run ESLint (optional but recommended)
echo "Running ESLint..."
npm run lint:fix

if [ $? -ne 0 ]; then
  echo "❌ ESLint check failed. Please fix the linting errors and try again."
  exit 1
fi

# Step 5: Check if linting fixed anything
if ! git diff --quiet -- src/; then
  echo "⚠️ Linting fixes applied. Please review and commit the changes."
  echo ""
  git status
  git add -u
  echo "Staged linting fixes."
  echo ""
  git status
  echo "Run: git commit -m 'pre-commit linting fixes'"
  exit 1
fi

echo "✅ All checks passed. Proceeding with commit."