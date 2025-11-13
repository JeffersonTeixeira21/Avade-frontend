'use client';
import React, { useEffect } from 'react';

type Props = {
  message: string;
  onClose?: () => void;
  duration?: number; // ms
};

const Toast: React.FC<Props> = ({ message, onClose, duration = 3000 }) => {
  useEffect(() => {
    const t = setTimeout(() => {
      onClose?.();
    }, duration);
    return () => clearTimeout(t);
  }, [duration, onClose]);

  if (!message) return null;

  return (
    <div className="fixed bottom-4 right-4 bg-green-600 text-white p-3 rounded-lg shadow-xl z-50">
      <div className="flex items-center space-x-3">
        <span className="font-medium">{message}</span>
        <button
          onClick={() => onClose?.()}
          className="ml-2 text-sm opacity-80 hover:opacity-100"
          aria-label="Fechar"
        >
          ✕
        </button>
      </div>
    </div>
  );
};

export default Toast;