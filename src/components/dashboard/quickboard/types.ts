// src/components/dashboard/quickboard/types.ts
import React from 'react';
import { ShowCustomModalType } from '../types'; // Import the general modal type

// Base props that all QuickBoard plugin components will receive.
// This interface ensures that any plugin component can potentially use showCustomModal.
export interface BasePluginComponentProps {
  showCustomModal?: ShowCustomModalType; // The function to open a custom modal
  // You can add other common props here if all plugins need them, e.g., tenantId, userId, etc.
}

// Generic QuickBoardPlugin definition.
// It uses a generic type 'P' that extends BasePluginComponentProps.
// This allows each plugin to define its own specific additional props,
// while ensuring it also supports the base props.
export interface QuickBoardPlugin<P extends BasePluginComponentProps = BasePluginComponentProps> {
  /**
   * A unique identifier for the plugin.
   */
  id: string;

  /**
   * The title of the plugin, displayed in the UI.
   */
  title: string;

  /**
   * The React component that renders the plugin's UI.
   * It should accept props of type P.
   */
  component: React.ComponentType<P>;

  /**
   * An array of user roles that are authorized to see and use this plugin.
   * Example: ['admin', 'editor', 'client_manager']
   */
  roles: string[];

  /**
   * Optional custom props that will be passed to the plugin's component.
   * These are props specific to this plugin instance, beyond the BasePluginComponentProps.
   * The Omit utility type is used to ensure that `props` doesn't redefine
   * anything already in `BasePluginComponentProps` (like showCustomModal),
   * as those are typically handled by the rendering system or passed directly.
   */
  props?: Omit<P, keyof BasePluginComponentProps>;

  /**
   * Optional: A hint for how the plugin should be laid out on the dashboard.
   * This could be used by the QuickBoard rendering logic to arrange plugins.
   * Examples: 'default', 'full-width', 'half-width', 'widget-small', 'widget-large'
   */
  layoutHint?: string; // e.g., 'grid-item', 'full-span'

  /**
   * Optional: Default configuration or settings for the plugin instance.
   * This could be an object with various settings the plugin might use.
   */
  defaultConfig?: Record<string, any>;

  /**
   * Optional: Icon to be displayed alongside the plugin title or in a plugin list.
   * Can be a Lucide icon component, an SVG, or a string URL.
   */
  icon?: React.ReactNode;
}

// Example of how you might define props for a specific plugin:
//
// interface MySpecificPluginProps extends BasePluginComponentProps {
//   customDataUrl: string;
//   refreshInterval?: number;
// }
//
// const myPlugin: QuickBoardPlugin<MySpecificPluginProps> = {
//   id: 'my-data-widget',
//   title: 'My Data Widget',
//   component: MyDataWidgetComponent, // MyDataWidgetComponent would be React.ComponentType<MySpecificPluginProps>
//   roles: ['admin'],
//   props: {
//     customDataUrl: '/api/my-data',
//     refreshInterval: 30000,
//   },
//   icon: <BarChart2 size={18} />,
// };