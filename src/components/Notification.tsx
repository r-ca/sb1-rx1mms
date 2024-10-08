import React from 'react';

interface NotificationProps {
  message: string;
}

const Notification: React.FC<NotificationProps> = ({ message }) => {
  return (
    <div className="bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 p-4 mb-4 rounded animate-slideIn">
      <p className="font-bold">通知</p>
      <p>{message}</p>
    </div>
  );
};

export default Notification;