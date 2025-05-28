# QuickBoard Plugin System - File Overview

This document outlines the key files and their roles within the QuickBoard plugin system.

## Core QuickBoard Components

*   **`src/components/dashboard/quickboard/QuickBoardComponent.tsx`**: Renders the UI for the QuickBoard itself, filters plugins based on user roles, and displays the content of the authorized plugins. It manages the layout of individual plugins and passes necessary props like `showCustomModal` to them.
*   **`src/components/dashboard/quickboard/types.ts`**: Defines the TypeScript interface `QuickBoardPlugin`, which specifies the structure for QuickBoard plugin objects (e.g., `id`, `title`, `component`, `roles`, and any other common plugin properties).
*   **`src/components/dashboard/quickboard/QuickBoardComponent.d.ts`**: Provides TypeScript type declarations for `QuickBoardComponent.tsx`, helping the compiler understand its props (like `plugins` and `userRoles`) and structure.

## QuickBoard Plugin Examples & Implementations

*   **`src/components/dashboard/quickboard/plugins/SupplierOverviewPlugin.tsx`**: A placeholder QuickBoard plugin component for a supplier overview. This file contains the UI and logic specific to the supplier overview functionality within the QuickBoard.
*   **`src/components/dashboard/quickboard/plugins/ManyChatControlQuickBoardPlugin.tsx`**: The QuickBoard plugin component for controlling ManyChat. This file contains the UI (input fields for subscriber ID, message, tag, and action buttons) that triggers the ManyChat control logic. It interacts with the core ManyChat logic found in the marketing module.
*   **`src/components/dashboard/quickboard/plugins/UserCountQuickBoardPlugin.tsx`**: The QuickBoard plugin component for displaying the user count. This file contains the UI (a button to trigger fetching and text to display the count) and logic to fetch and display the user count by calling a user service.

## Module-Specific Logic & Services

### Marketing Module (`src/modules/marketing`)

This folder represents the marketing module of your application. It serves as a container for all code related to marketing functionalities.

*   **`src/modules/marketing/plugins`**: This subfolder within the marketing module is designated for plugins or specific integrations related to marketing.
*   **`src/modules/marketing/plugins/ManyChatControlPlugin.ts`**: Contains the core logic for interacting with the ManyChat API or service. This file typically includes a class or functions (e.g., `ManyChatControlPlugin` class with methods like `sendMessage`, `tagSubscriber`) that handle the backend communication and control functions for ManyChat. This service is called by the `ManyChatControlQuickBoardPlugin.tsx` component.

### User Module (`src/modules/user`)

This folder represents the user module of your application, containing code related to user management, profiles, and services.

*   **`src/modules/user/profile.ts`**: Likely contains code related to user profiles, such as fetching, updating, or displaying user profile information. (Its direct interaction with the QuickBoard plugins described here is not specified, but it's part of the user module).
*   **`src/modules/user/services/services.ts`**: Contains backend service functions related to users, such as fetching user data or performing user-related operations. In the context of the QuickBoard, it includes the `fetchUserCount` function used by the `UserCountQuickBoardPlugin.tsx`.
*   **`src/modules/user/services/services.d.ts`**: Provides TypeScript type declarations for the `services.ts` file within the user module, ensuring type safety and aiding code completion when using user service functions like `fetchUserCount`.

## Dashboard Integration

*   **`src/components/dashboard/DashboardLayoutClient.tsx`**: Renders the overall dashboard layout, including the `QuickBoardComponent`. It is responsible for:
    *   Defining and providing the list of all available `QuickBoardPlugin` objects to the `QuickBoardComponent`.
    *   Determining and providing the current user's roles to the `QuickBoardComponent` for filtering.
    *   Passing down any necessary context or functions (like `showCustomModal`) that the `QuickBoardComponent` or its plugins might need.