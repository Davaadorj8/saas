// src/components/dashboard/quickboard/plugins/LaunchManyChatControlPlugin.tsx
import React from 'react';
import ManyChatControlQuickBoardPlugin from './ManyChatControlQuickBoardPlugin'; // The full UI plugin
import { Layers } from 'lucide-react'; // Or any icon you prefer

// Assuming ShowCustomModalType is globally available or defined similarly
// If not, define it here:
type ShowCustomModalType = (content: React.ReactNode, title?: string) => void;

interface LaunchManyChatControlPluginProps {
  showCustomModal: ShowCustomModalType; // Must be passed
  buttonLabel?: string;
  modalTitle?: string;
}

const LaunchManyChatControlPlugin: React.FC<LaunchManyChatControlPluginProps> = ({
  showCustomModal,
  buttonLabel = "Open ManyChat Controls", // Default button label
  modalTitle = "ManyChat Control Panel" // Default modal title
}) => {

  const handleOpenModal = () => {
    showCustomModal(
      // Pass showCustomModal again, in case the inner component needs it
      <ManyChatControlQuickBoardPlugin showCustomModal={showCustomModal} />,
      modalTitle
    );
  };

  return (
    <div style={{ textAlign: 'center', padding: '10px 0' }}>
      <button
        onClick={handleOpenModal}
        // Example Tailwind styling, adjust as needed
        className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 px-4 rounded-md shadow-sm flex items-center justify-center gap-2 transition-colors duration-150 ease-in-out"
      >
        <Layers size={18} />
        {buttonLabel}
      </button>
    </div>
  );
};

export default LaunchManyChatControlPlugin;