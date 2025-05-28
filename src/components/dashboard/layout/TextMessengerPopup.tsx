// src/components/dashboard/layout/TextMessengerPopup.tsx
import { X } from 'lucide-react';
import { CommunicationUser } from '../types';

interface TextMessengerPopupProps {
  isOpen: boolean;
  user: CommunicationUser | null;
  onClose: () => void;
  isRightSidebarExpanded: boolean; // To adjust position
}

export default function TextMessengerPopup({ isOpen, user, onClose, isRightSidebarExpanded }: TextMessengerPopupProps) {
  if (!isOpen || !user) return null;

  return (
    <div
      className={`fixed bottom-0 bg-white w-80 h-[400px] rounded-t-lg shadow-2xl z-50 flex flex-col border border-gray-300
                  transition-all duration-300 ease-in-out
                  ${isRightSidebarExpanded ? 'right-[298px]' : 'right-5'}`} // 288px (w-72) + 10px margin
    >
      <div className="flex justify-between items-center p-3 bg-indigo-600 text-white rounded-t-lg h-14">
        <h3 className="font-semibold text-sm truncate" title={`Chat with ${user.name}`}>Chat with {user.name}</h3>
        <button onClick={onClose} className="p-1 rounded-full hover:bg-indigo-700 text-white">
          <X size={18} />
        </button>
      </div>
      <div className="flex-1 p-4 overflow-y-auto custom-scrollbar">
        <p className="text-sm text-gray-700">This is a placeholder chat window for <span className="font-medium">{user.name}</span>.</p>
        <p className="text-xs text-gray-500 mt-4">Future messages will appear here.</p>
        <div className="mt-4 space-y-2 text-xs">
            <div className="p-2 bg-gray-100 rounded-md w-fit max-w-[80%]">Hello there!</div>
            <div className="p-2 bg-indigo-100 text-indigo-800 rounded-md w-fit max-w-[80%] ml-auto">Hi! How can I help?</div>
        </div>
      </div>
      <div className="p-3 border-t border-gray-200 h-16">
        <input type="text" placeholder="Type a message..." className="w-full p-2.5 border border-gray-300 rounded-md text-sm focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500"/>
      </div>
    </div>
  );
}