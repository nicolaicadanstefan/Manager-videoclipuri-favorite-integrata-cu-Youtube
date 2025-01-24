import React from 'react';

function Notification({ type, message }) {
  if (!message) return null;

  const notificationClass = `notification ${type === 'error' ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'} p-4 rounded-md mb-4`;

  return (
    <div className={notificationClass}>
      {message}
    </div>
  );
}

export default Notification;