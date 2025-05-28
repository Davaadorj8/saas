// src/components/dashboard/layout/UserMenuDropdown.tsx
import type { Tenant } from '@prisma/client';

export interface UserMenuItem {
  title: string;
  action: () => void;
}

interface UserMenuDropdownProps {
  tenant: Tenant;
  userMenuItems: UserMenuItem[];
  onItemClick: (action: () => void) => void; // Handles action and closes dropdown
}

export default function UserMenuDropdown({ tenant, userMenuItems, onItemClick }: UserMenuDropdownProps) {
  return (
    <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-xl z-20 border" role="menu">
      <div className="p-3 border-b">
        <p className="text-sm font-medium text-gray-700">{tenant.name}</p>
        <p className="text-xs text-gray-500">User Role</p> {/* Replace with actual role if available */}
      </div>
      <div className="py-1">
        {userMenuItems.map((item) => (
          <button
            key={item.title}
            onClick={() => onItemClick(item.action)}
            className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-indigo-50 hover:text-indigo-600"
            role="menuitem"
          >
            {item.title}
          </button>
        ))}
      </div>
    </div>
  );
}