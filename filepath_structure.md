# Project Structure Overview

- **src/app/**  
  Route-based UI per tenant (`supplier/`, `customer/`, `client/`) with shared layouts and auth pages.

- **src/components/**  
  Reusable UI elements (layout, forms, widgets).

- **src/modules/**  
  Business logic layer. Tenant-specific services and shared utilities.

- **src/plugins/**  
  Optional feature modules (notifications, billing, analytics), lazy-loaded per tenant.

- **src/features/**  
  Redux slices managing state (auth, tenant, user).

- **src/hooks/**  
  Custom React hooks (e.g., useAuth, useTenant).

- **src/lib/**  
  Core libraries: Prisma client, auth helpers, RBAC, API fetchers.

- **src/store/**  
  Redux store configuration and root reducer.

- **middleware.ts**  
  Tenant-aware routing and access control.

---

# Coding Guidelines

- Isolate tenant UI inside `src/app/[tenant]`.
- Implement business logic in `src/modules` with tenant-specific service factories.
- Use `src/plugins` for modular optional features, load dynamically.
- Manage app state via Redux slices in `src/features`.
- Use `middleware.ts` to enforce tenant routing and security.
- Keep shared UI and utils modular for reusability and scalability.
