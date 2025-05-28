// src/components/dashboard/quickboard/QuickBoardComponent.tsx
import React from 'react';
import { Minimize2 } from 'lucide-react';

// Import QuickBoard specific types from ITS OWN local types.ts
import { QuickBoardPlugin, BasePluginComponentProps } from './types';

// Import general dashboard types (like ShowCustomModalType) from the PARENT types.ts
import { ShowCustomModalType } from '../types';

interface QuickBoardComponentProps {
  showCustomModal: ShowCustomModalType;
  plugins: QuickBoardPlugin<any>[]; // Using <any> for the specific plugin props 'P' for simplicity
  userRoles: string[];
}

const QuickBoardComponent: React.FC<QuickBoardComponentProps> = ({
  showCustomModal,
  plugins,
  userRoles,
}) => {
  // Filter plugins based on user roles.
  // Ensure plugin.roles exists before trying to access .some.
  const authorizedPlugins = plugins.filter(plugin =>
    plugin.roles && plugin.roles.some((role: string) => userRoles.includes(role)) // Explicitly type 'role'
  );

  if (authorizedPlugins.length === 0) {
    return (
      <div className="p-6 text-center text-gray-500">
        <p>No Quick Board items available for your role.</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6 p-4 md:p-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {authorizedPlugins.map((plugin: QuickBoardPlugin<any>) => { // Explicitly type plugin
          // Prepare props for the plugin's component.
          // The plugin.component expects props of type P, which extends BasePluginComponentProps.
          // BasePluginComponentProps includes showCustomModal.
          // plugin.props contains the additional props specific to this plugin (Omit<P, keyof BasePluginComponentProps>).
          const componentProps: BasePluginComponentProps & typeof plugin.props = {
            // Base props that all plugins can expect
            showCustomModal,
            // Spread the specific props defined for this plugin instance
            ...(plugin.props || {}), // Ensure plugin.props exists, default to empty object if not
          };

          return (
            <div key={plugin.id} className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="p-4 border-b flex justify-between items-center bg-gray-50">
                <h2 className="font-semibold text-gray-700">{plugin.title}</h2>
                {/* Optional: Display plugin icon if provided */}
                {plugin.icon && <span className="ml-2">{plugin.icon}</span>}
                <div className="flex gap-1">
                  {/* Example action button - could be settings, maximize, etc. */}
                  <button
                    onClick={() => showCustomModal(
                      <div>
                        <p>Detailed view or settings for {plugin.title} would appear here.</p>
                        {/* You could even render a specific configuration component for the plugin */}
                      </div>,
                      `Configure ${plugin.title}`
                    )}
                    className="p-1 rounded hover:bg-gray-200 text-gray-600"
                    title={`Configure ${plugin.title}`}
                  >
                    <Minimize2 size={16} /> {/* Icon is a placeholder for "options" or "configure" */}
                  </button>
                </div>
              </div>
              <div className="p-4">
                {/* Render the plugin component, ensuring it exists */}
                {plugin.component && <plugin.component {...componentProps} />}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default QuickBoardComponent;