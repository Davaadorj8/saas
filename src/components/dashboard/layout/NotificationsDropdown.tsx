// src/components/dashboard/layout/NotificationsDropdown.tsx
import { Notification } from '../types';

interface NotificationsDropdownProps {
  notifications: Notification[];
  onMarkAllRead: () => void;
  onViewAll: () => void; // Callback to navigate to full notifications page
}

export default function NotificationsDropdown({ notifications, onMarkAllRead, onViewAll }: NotificationsDropdownProps) {
  return (
    <div className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-xl z-20 border">
      <div className="p-3 border-b flex justify-between items-center">
        <h3 className="font-medium text-sm">Notifications</h3>
        {notifications.some(n => !n.read) && (
          <button onClick={onMarkAllRead} className="text-xs text-indigo-600 hover:underline">
            Mark all as read
          </button>
        )}
      </div>
      <div className="max-h-80 overflow-y-auto custom-scrollbar">
        {notifications.length === 0 ? (
          <div className="p-4 text-center text-sm text-gray-500">No new notifications</div>
        ) : (
          notifications.map((notification) => (
            <div
              key={notification.id}
              className={`p-3 border-b border-gray-100 text-sm ${notification.read ? 'text-gray-600' : 'bg-indigo-50 font-medium text-gray-800'}`}
            >
              <p>{notification.text}</p>
              {/* Optional: display timestamp or link */}
            </div>
          ))
        )}
      </div>
      {notifications.length > 0 && (
        <div className="p-2 text-center border-t">
          <button onClick={onViewAll} className="text-xs text-indigo-600 hover:underline">View all notifications</button>
        </div>
      )}
    </div>
  );
}