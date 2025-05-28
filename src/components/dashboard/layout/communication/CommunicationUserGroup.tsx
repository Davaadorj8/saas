// src/components/dashboard/layout/CommunicationUserGroup.tsx
import { ReactNode, useState } from 'react';
import { ChevronDown, ChevronRight, Video, MessageSquare, Phone } from 'lucide-react';
import { CommunicationUser } from '../../types';

interface CommunicationUserGroupProps {
  title: string;
  icon: ReactNode;
  users: CommunicationUser[];
  onStartWebRTCCall: (user: CommunicationUser) => void;
  onOpenTextMessenger: (user: CommunicationUser) => void;
  onInitiateBusinessCall: (user: CommunicationUser) => void;
}

export default function CommunicationUserGroup({
  title, icon, users, onStartWebRTCCall, onOpenTextMessenger, onInitiateBusinessCall
}: CommunicationUserGroupProps) {
  const [isOpen, setIsOpen] = useState(true);
  const groupId = `comm-group-${title.toLowerCase().replace(/\s+/g, '-')}`;

  return (
    <div className="mb-2">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between p-2.5 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-md transition-colors"
        aria-expanded={isOpen}
        aria-controls={groupId}
      >
        <div className="flex items-center">
          {icon}
          <span className="ml-2.5">{title} ({users.length})</span>
        </div>
        {isOpen ? <ChevronDown size={18} /> : <ChevronRight size={18} />}
      </button>
      {isOpen && (
        <ul id={groupId} className="mt-1.5 space-y-1 pl-4 pr-1 max-h-52 overflow-y-auto custom-scrollbar">
          {users.length === 0 ? (
            <li className="px-2 py-1.5 text-xs text-gray-500 italic">No active users in this group.</li>
          ) : (
            users.map(user => (
              <li key={user.id} className="group flex items-center justify-between p-1.5 hover:bg-gray-50 rounded text-sm">
                <div className="flex items-center truncate">
                  <div className={`w-2 h-2 rounded-full mr-2 flex-shrink-0 ${user.isActive ? 'bg-green-500' : 'bg-gray-400'}`}></div>
                  <span className="text-gray-800 truncate" title={user.name}>{user.name}</span>
                </div>
                <div className="flex items-center space-x-1 opacity-0 group-hover:opacity-100 transition-opacity duration-150 flex-shrink-0">
                  <button title="WebRTC Call" onClick={() => onStartWebRTCCall(user)} className="p-1 text-gray-500 hover:text-indigo-600 rounded-full">
                    <Video size={16} />
                  </button>
                  <button title="Text Message" onClick={() => onOpenTextMessenger(user)} className="p-1 text-gray-500 hover:text-indigo-600 rounded-full">
                    <MessageSquare size={16} />
                  </button>
                  <button title="Business Call" onClick={() => onInitiateBusinessCall(user)} className="p-1 text-gray-500 hover:text-indigo-600 rounded-full">
                    <Phone size={16} />
                  </button>
                </div>
              </li>
            ))
          )}
        </ul>
      )}
    </div>
  );
}