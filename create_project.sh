#!/bin/bash
set -e # Exit immediately if a command exits with a non-zero status.

# --- Configuration ---
# The script will create the structure in the current directory.
PROJECT_NAME=$(basename "$(pwd)") # Get the name of the current directory for placeholders

echo "Creating project structure in the current directory: $(pwd)"
echo "Project name (for placeholders like README.md, package.json): $PROJECT_NAME"
echo "--------------------------------------------------------------------"

# --- Helper function to create a file only if it doesn't exist ---
create_file_if_not_exists() {
    local filepath="$1"
    if [ ! -f "$filepath" ]; then
        touch "$filepath"
        echo "Created file: $filepath"
    else
        echo "File already exists, skipping: $filepath"
    fi
}

# --- Helper function to create a file with content only if it doesn't exist ---
create_file_with_content_if_not_exists() {
    local filepath="$1"
    local content="$2"
    if [ ! -f "$filepath" ]; then
        echo "$content" > "$filepath"
        echo "Created file with content: $filepath"
    else
        echo "File already exists, skipping content for: $filepath"
    fi
}

# --- Helper function to create a directory (mkdir -p handles existing ones) ---
create_directory() {
    local dirpath="$1"
    if [ ! -d "$dirpath" ]; then
        mkdir -p "$dirpath"
        echo "Created directory: $dirpath"
    else
        echo "Directory already exists, skipping: $dirpath"
    fi
}


# --- Create Directories ---
echo "Creating directories (if they don't exist)..."
create_directory "public"
create_directory "src/app"
create_directory "src/app/(auth)/login"
create_directory "src/app/(auth)/register"
create_directory "src/app/(dashboard)"
create_directory "src/app/supplier/dashboard"
create_directory "src/app/customer/dashboard"
create_directory "src/app/client/dashboard"

create_directory "src/modules/auth"
create_directory "src/modules/tenant"
create_directory "src/modules/user"
create_directory "src/modules/shared"

create_directory "src/plugins/notifications"
create_directory "src/plugins/billing"
create_directory "src/plugins/analytics"

create_directory "src/components/ui"
create_directory "src/components/layout"
create_directory "src/components/forms"

create_directory "src/features/auth"
create_directory "src/features/tenant"
create_directory "src/features/user"

create_directory "src/hooks"
create_directory "src/lib"
create_directory "src/prisma/migrations"
create_directory "src/store"
create_directory "src/types"
create_directory "src/utils"

create_directory ".vscode"
create_directory ".idx"

# --- Create Files (only if they don't exist) ---
echo ""
echo "Creating files (if they don't exist)..."

# public
create_file_if_not_exists "public/icon.svg"
create_file_if_not_exists "public/logo.svg"
create_file_if_not_exists "public/another-asset.svg" # ...svg files placeholder

# src/app
create_file_if_not_exists "src/app/favicon.ico"
create_file_if_not_exists "src/app/globals.css"
create_file_if_not_exists "src/app/layout.tsx"
create_file_if_not_exists "src/app/page.tsx"
create_file_if_not_exists "src/app/(auth)/login/page.tsx"
create_file_if_not_exists "src/app/(auth)/register/page.tsx"
create_file_if_not_exists "src/app/(dashboard)/layout.tsx"
create_file_if_not_exists "src/app/supplier/dashboard/page.tsx"
create_file_if_not_exists "src/app/customer/dashboard/page.tsx"
create_file_if_not_exists "src/app/client/dashboard/page.tsx"

# src/modules
create_file_with_content_if_not_exists "src/modules/auth/services.ts" "// Auth workflows"
create_file_with_content_if_not_exists "src/modules/auth/schema.ts" "// Auth schema & validators"
create_file_if_not_exists "src/modules/tenant/services.ts"
create_file_if_not_exists "src/modules/tenant/utils.ts"
create_file_if_not_exists "src/modules/user/profile.ts"
create_file_with_content_if_not_exists "src/modules/shared/dateFormatter.ts" "// Shared business logic"

# src/plugins
create_file_if_not_exists "src/plugins/notifications/toast.tsx"
create_file_if_not_exists "src/plugins/notifications/socket.ts"
create_file_if_not_exists "src/plugins/billing/stripe.ts"
create_file_if_not_exists "src/plugins/analytics/tracker.ts"

# src/components (folders created, example files if needed)
# create_file_if_not_exists "src/components/ui/Button.tsx"

# src/features (Redux/State management layer)
create_file_if_not_exists "src/features/auth/authSlice.ts"
create_file_if_not_exists "src/features/tenant/tenantSlice.ts"
create_file_if_not_exists "src/features/user/userSlice.ts"

# src/hooks
create_file_if_not_exists "src/hooks/useAuth.ts"
create_file_if_not_exists "src/hooks/useTenant.ts"

# src/lib
create_file_if_not_exists "src/lib/prisma.ts"
create_file_if_not_exists "src/lib/auth.ts"
create_file_if_not_exists "src/lib/rbac.ts"
create_file_if_not_exists "src/lib/fetcher.ts"

# src/prisma
create_file_if_not_exists "src/prisma/schema.prisma"
# migrations folder is for Prisma CLI, usually no manual files here initially

# src/store
create_file_if_not_exists "src/store/index.ts"
create_file_if_not_exists "src/store/rootReducer.ts"

# src/types
create_file_if_not_exists "src/types/auth.ts"
create_file_if_not_exists "src/types/tenant.ts"
create_file_if_not_exists "src/types/user.ts"

# src/utils
create_file_if_not_exists "src/utils/debounce.ts"
create_file_if_not_exists "src/utils/logger.ts"

# Root level files
create_file_if_not_exists "middleware.ts"
create_file_if_not_exists "next.config.ts"
create_file_if_not_exists "postcss.config.mjs"
create_file_if_not_exists "tailwind.config.ts"
create_file_if_not_exists "eslint.config.mjs"
create_file_if_not_exists "tsconfig.json"
create_file_if_not_exists "package-lock.json" # Will be generated by npm/yarn/pnpm

# Files with initial content (only if they don't exist)
readme_content="# Project Title - $PROJECT_NAME"
create_file_with_content_if_not_exists "README.md" "$readme_content"

package_json_content="{
  \"name\": \"${PROJECT_NAME,,}\",
  \"version\": \"0.1.0\",
  \"private\": true,
  \"scripts\": {
    \"dev\": \"next dev\",
    \"build\": \"next build\",
    \"start\": \"next start\",
    \"lint\": \"next lint\"
  },
  \"dependencies\": {
    \"next\": \"latest\",
    \"react\": \"latest\",
    \"react-dom\": \"latest\"
  },
  \"devDependencies\": {
    \"typescript\": \"latest\",
    \"@types/node\": \"latest\",
    \"@types/react\": \"latest\",
    \"@types/react-dom\": \"latest\",
    \"eslint\": \"latest\",
    \"eslint-config-next\": \"latest\",
    \"postcss\": \"latest\",
    \"tailwindcss\": \"latest\"
  }
}"
create_file_with_content_if_not_exists "package.json" "$package_json_content"

vscode_settings_content="{
  \"editor.codeActionsOnSave\": {
    \"source.fixAll.eslint\": \"explicit\"
  },
  \"editor.formatOnSave\": true,
  \"files.eol\": \"\n\"
}"
create_file_with_content_if_not_exists ".vscode/settings.json" "$vscode_settings_content"

idx_dev_nix_content="{ pkgs, ... }: {
  # To learn more about how to use Nix, see the Nix manual:
  # https://nixos.org/manual/nix/stable/
  #
  # This file describes the Nix development environment for this project.
  # It's used by devbox and other Nix-based tools.

  channel = \"stable-23.11\"; # Specify Nixpkgs channel
  packages = [
    pkgs.nodejs_20 # Example: Node.js
    # Add other development tools here, e.g., pkgs.yarn, pkgs.pnpm
  ];

  # Sets environment variables in the development environment.
  env = {
    # EXAMPLE_VARIABLE = \"example_value\";
  };

  # A list of commands that will be run when the development environment is
  # activated.
  init_hook = [
    \"echo 'Welcome to the project development environment!'\"
    # \"npm install\" # Example: auto-install npm packages
  ];

  # Scripts that can be run with 'devbox run <script-name>'
  scripts = {
    # dev = \"npm run dev\";
  };
}"
create_file_with_content_if_not_exists ".idx/dev.nix" "$idx_dev_nix_content"

echo ""
echo "--------------------------------------------------------------------"
echo "Project structure setup complete in the current directory."
echo "Existing files and directories were skipped."
echo "If package.json was newly created, consider running 'npm install', 'yarn install', or 'pnpm install' to generate package-lock.json and install dependencies."