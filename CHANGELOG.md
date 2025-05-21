# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [0.1.1] - 2025-05-21

### Fixed

*   Implement core tenant identification and routing
    *   Middleware now correctly identifies tenant subdomains and sets the x-tenant-id header.
    *   Implemented redirection logic for the tenant selection flow:
        *   Accessing the root domain redirects to /select-tenant.
        *   Accessing an unknown subdomain redirects to /select-tenant with an error parameter.
    *   The /select-tenant page is functional, allowing users to input a subdomain for redirection.
    *   Basic page rendering is now working for known tenants:
        *   Accessing a known tenant subdomain correctly renders src/app/page.tsx with tenant-specific information (assuming DB fetching is in place).
        *   Placeholder login (/login) and registration (/register) pages now render correctly under known tenant subdomains, displaying the relevant organization name.
    *   Resolved TypeScript errors that were preventing successful builds.

## [0.1.0] - 2025-05-21

### Added

*   **Project Initialization & Core Structure:**
    *   Initialized Next.js project (v15.x with React 19, Tailwind CSS v4, TypeScript).
    *   Established comprehensive `src/` directory structure including `app`, `components`, `features`, `hooks`, `lib`, `modules`, `plugins`, `store`, `types`, and `utils`.
    *   Configured ESLint, Prettier (implicitly via Next.js defaults or user setup), and TypeScript.
    *   Set up import alias `@/*` for `src/` directory.
*   **Prisma Integration & Database Setup:**
    *   Integrated Prisma ORM for database interaction.
    *   Defined initial database schema (`prisma/schema.prisma`) with `Tenant` and `User` models.
        *   `Tenant` model includes `id`, `subdomain` (unique), `name`, `tenant_type`, `primaryColor`, `logoUrl`, `createdAt`, `updatedAt`.
        *   `User` model includes `id`, `email`, `password`, `name`, `role`, `tenantId` (with relation to `Tenant`), `createdAt`, `updatedAt`. Includes unique constraint on `[tenantId, email]`.
    *   Created initial database migration (`initial-tenant-user-models`).
    *   Implemented a shared Prisma client instance in `src/lib/prisma.ts`.
*   **Tenant Identification Middleware:**
    *   Created `middleware.ts` at the project root.
    *   Implemented logic to extract a tenant's subdomain from the `request.headers.host`.
    *   Configured `ROOT_DOMAIN` for local development (`localhost:3000`) and production (placeholder `saas.com`).
    *   Defined `RESERVED_SUBDOMAINS_OR_PATHS` to prevent common subdomains/paths from being treated as tenants.
    *   The identified tenant subdomain is added to request headers as `x-tenant-subdomain`.
    *   Middleware includes logging for identified subdomains or root domain access.
    *   Configured `matcher` in `middleware.ts` to exclude Next.js internals and common static asset paths.
*   **Basic Tenant Context Display:**
    *   Updated the main application page (`src/app/page.tsx`) to read the `x-tenant-subdomain` header (using `next/headers`).
    *   The page dynamically displays a welcome message indicating the current tenant space if a subdomain is identified, or a generic welcome otherwise.
*   **Local Development Setup for Subdomains:**
    *   Provided instructions for modifying the system's `hosts` file to enable local testing of tenant subdomains (e.g., `tenant-a.localhost`).
*   **Placeholder Application Structure:**
    *   Created placeholder files for authentication pages (`src/app/(auth)/login/page.tsx`, `src/app/(auth)/register/page.tsx`).
    *   Created placeholder files for role-based dashboards (`src/app/client/dashboard/page.tsx`, `src/app/customer/dashboard/page.tsx`, `src/app/supplier/dashboard/page.tsx`) and a shared dashboard layout (`src/app/(dashboard)/layout.tsx`).
    *   Created placeholder files for Redux state management (`src/features/...Slice.ts`, `src/store/...`).
    *   Created placeholder files in `modules` for `auth`, `tenant`, `user`, and `shared` business logic.
*   **Development Tooling:**
    *   Included `.idx/dev.nix` for Nix-based development environments.
    *   Included `.vscode/settings.json` for VS Code editor configurations.

### Changed

*   N/A (Initial release for these features)

### Deprecated

*   N/A

### Removed

*   N/A

### Fixed

*   N/A

### Security

*   N/A (Focus of this phase was setup and identification, not deep security hardening yet)