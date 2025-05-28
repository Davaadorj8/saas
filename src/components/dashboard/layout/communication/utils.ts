// src/components/dashboard/communication/utils.ts
import { CommunicationUser } from '../../types';

export const MOCK_COMMUNICATION_USERS: CommunicationUser[] = [
  { id: 'colleague1', name: 'Eleanor Vance', isActive: true, tenantType: 'client', avatarUrl: '/avatars/eleanor.png' },
  { id: 'colleague2', name: 'Marcus Bell', isActive: true, tenantType: 'client', avatarUrl: '/avatars/marcus.png' },
  { id: 'colleague3', name: 'Nina Petrova', isActive: false, tenantType: 'client', avatarUrl: '/avatars/nina.png' },
  { id: 'supplier1', name: 'Supplier Alpha Inc.', isActive: true, tenantType: 'supplier' },
  { id: 'supplier2', name: 'Supplier Beta Co.', isActive: true, tenantType: 'supplier' },
  { id: 'customer1', name: 'Customer X Corp', isActive: true, tenantType: 'customer' },
  { id: 'customer2', name: 'Customer Y Ltd', isActive: false, tenantType: 'customer' },
  { id: 'customer3', name: 'Customer Z Global', isActive: true, tenantType: 'customer' },
];

export const getActiveUsersByTenantType = (
  users: CommunicationUser[],
  type: 'client' | 'supplier' | 'customer'
): CommunicationUser[] => {
  return users.filter(user => user.tenantType === type && user.isActive);
};