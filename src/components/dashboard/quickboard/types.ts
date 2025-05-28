// src/components/dashboard/quickboard/types.ts
import React from 'react';

// Define the type for showCustomModal explicitly here or ensure it's correctly imported/available
export type ShowCustomModalType = (content: React.ReactNode, title?: string) => void;

// Base props that all plugin components might receive
export interface BasePluginComponentProps {
  showCustomModal?: ShowCustomModalType;
}

// Generic QuickBoardPlugin definition that allows for custom props
export interface QuickBoardPlugin<P extends BasePluginComponentProps = BasePluginComponentProps> {
  id: string;
  title: string;
  component: React.ComponentType<P>; // The React component to render
  roles: string[]; // Array of user roles authorized to see this plugin
  // Custom props specific to this plugin instance, excluding BasePluginComponentProps
  // as those are handled separately or are part of the component's own props.
  props?: Omit<P, keyof BasePluginComponentProps>;
  // Optional: Add a layout hint if you want to differentiate display
  // layoutType?: 'grid' | 'full-width';
}