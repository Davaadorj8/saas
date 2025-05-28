// src/components/dashboard/layout/RightCommunicationSidebar.tsx
import { Users, Briefcase } from 'lucide-react';
import { CommunicationUser } from '../types';
import { MOCK_COMMUNICATION_USERS, getActiveUsersByTenantType } from './communication/utils';
// Also ensure you import CommunicationUserGroup correctly if it's used:
import CommunicationUserGroup from './communication/CommunicationUserGroup';

interface RightCommunicationSidebarProps {
  onStartWebRTCCall: (user: CommunicationUser) => void;
  onOpenTextMessenger: (user: CommunicationUser) => void;
  onInitiateBusinessCall: (user: CommunicationUser) => void;
}

export default function RightCommunicationSidebar({
  onStartWebRTCCall,
  onOpenTextMessenger,
  onInitiateBusinessCall,
}: RightCommunicationSidebarProps) {
  // In a real app, MOCK_COMMUNICATION_USERS might be passed as a prop or fetched here
  const colleagues = getActiveUsersByTenantType(MOCK_COMMUNICATION_USERS, 'client');
  const suppliers = getActiveUsersByTenantType(MOCK_COMMUNICATION_USERS, 'supplier');
  const customers = getActiveUsersByTenantType(MOCK_COMMUNICATION_USERS, 'customer');

  return (
    <div className="flex flex-col h-full bg-white">
      <div className="p-4 border-b border-gray-200 flex items-center justify-between h-16">
        <h3 className="text-lg font-semibold text-gray-800">Messenger</h3>
      </div>
      <div className="flex-1 p-3 overflow-y-auto custom-scrollbar">
        <CommunicationUserGroup
          title="Colleagues"
          icon={<Users size={18} className="text-blue-600" />}
          users={colleagues}
          onStartWebRTCCall={onStartWebRTCCall}
          onOpenTextMessenger={onOpenTextMessenger}
          onInitiateBusinessCall={onInitiateBusinessCall}
        />
        <CommunicationUserGroup
          title="Suppliers"
          icon={<Briefcase size={18} className="text-green-600" />}
          users={suppliers}
          onStartWebRTCCall={onStartWebRTCCall}
          onOpenTextMessenger={onOpenTextMessenger}
          onInitiateBusinessCall={onInitiateBusinessCall}
        />
        <CommunicationUserGroup
          title="Customers"
          icon={<Users size={18} className="text-purple-600" />}
          users={customers}
          onStartWebRTCCall={onStartWebRTCCall}
          onOpenTextMessenger={onOpenTextMessenger}
          onInitiateBusinessCall={onInitiateBusinessCall}
        />
      </div>
      <div className="p-3 border-t border-gray-200 text-center">
        <p className="text-xs text-gray-500">© Communications Panel</p>
      </div>
    </div>
  );
}