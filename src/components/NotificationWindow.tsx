import React from 'react';
import { X } from 'lucide-react';
import { Notification } from '../types';

interface NotificationWindowProps {
  notifications: Notification[];
  onClose: () => void;
}

const NotificationWindow: React.FC<NotificationWindowProps> = ({ notifications, onClose }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="fixed inset-0 bg-black bg-opacity-50" onClick={onClose}></div>
      <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-md max-h-[80vh] overflow-y-auto relative z-10">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">通知</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X size={24} />
          </button>
        </div>
        {notifications.length > 0 ? (
          <ul className="space-y-2">
            {notifications.map((notification, index) => (
              <li
                key={index}
                className={`p-2 rounded ${
                  notification.isExpired ? 'bg-red-100 text-red-800' : 'bg-yellow-100 text-yellow-800'
                }`}
              >
                {notification.message}
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-500">通知はありません。</p>
        )}
      </div>
    </div>
  );
};

export default NotificationWindow;