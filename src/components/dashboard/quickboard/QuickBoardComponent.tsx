// src/components/dashboard/quickboard/QuickBoardComponent.tsx
import React from 'react';
import { Minimize2 } from 'lucide-react';
// Import the specific types from your types.ts
import { QuickBoardPlugin, ShowCustomModalType, BasePluginComponentProps } from './types';

interface QuickBoardComponentProps {
  showCustomModal: ShowCustomModalType;
  // Use the generic QuickBoardPlugin type. Using `any` for the props type P
  // for simplicity here, but you could make it more strictly typed if needed.
  plugins: QuickBoardPlugin<any>[];
  userRoles: string[];
}

const QuickBoardComponent: React.FC<QuickBoardComponentProps> = ({ showCustomModal, plugins, userRoles }) => {
  const authorizedPlugins = plugins.filter(plugin =>
    plugin.roles.some(role => userRoles.includes(role))
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
        {authorizedPlugins.map((plugin: QuickBoardPlugin<any>) => { // Explicitly type plugin here
          // Prepare props for the component
          const componentProps: BasePluginComponentProps & typeof plugin.props = {
            showCustomModal, // Always pass showCustomModal
            ...plugin.props,  // Spread any custom props defined in the plugin registration
          };

          return (
            <div key={plugin.id} className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="p-4 border-b flex justify-between items-center bg-gray-50">
                <h2 className="font-semibold text-gray-700">{plugin.title}</h2>
                <div className="flex gap-1">
                  <button
                    onClick={() => showCustomModal(
                      <div>
                        <p>Content for {plugin.title} could be displayed here in a modal.</p>
                        <p>This could be a different view or settings for the plugin.</p>
                      </div>,
                      `Options for ${plugin.title}`
                    )}
                    className="p-1 rounded hover:bg-gray-200 text-gray-600"
                    title={`More options for ${plugin.title}`}
                  >
                    <Minimize2 size={16} />
                  </button>
                </div>
              </div>
              <div className="p-4">
                {/* Render the plugin component, passing the combined props */}
                <plugin.component {...componentProps} />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default QuickBoardComponent;