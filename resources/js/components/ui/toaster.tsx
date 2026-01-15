import React, { useState, useEffect } from 'react';
import { CheckCircle2, X } from 'lucide-react';

interface Toast {
  id: number;
  message: string;
  type: 'success' | 'error' | 'info';
}

export function Toaster() {
  const [toasts, setToasts] = useState<Toast[]>([]);

  useEffect(() => {
    const handleToast = (e: any) => {
      const { message, type } = e.detail;
      const id = Date.now();
      setToasts((prev) => [...prev, { id, message, type }]);

      setTimeout(() => {
        setToasts((prev) => prev.filter((t) => t.id !== id));
      }, 3000);
    };

    window.addEventListener('toast', handleToast);
    return () => window.removeEventListener('toast', handleToast);
  }, []);

  return (
    <div className="fixed bottom-8 right-8 z-[100] flex flex-col gap-3 pointer-events-none">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className="pointer-events-auto glass dark:glass-dark rounded-2xl shadow-2xl p-4 pr-12 flex items-center gap-4 animate-in slide-in-from-right-full fade-in duration-300 min-w-[300px] border border-white/20 dark:border-white/10"
        >
          <div className="bg-emerald-50 dark:bg-emerald-900/20 p-2 rounded-full text-emerald-600 dark:text-emerald-400">
            <CheckCircle2 className="w-5 h-5" />
          </div>
          <p className="text-sm font-bold text-gray-900 dark:text-white">{toast.message}</p>
          <button
            onClick={() => setToasts((prev) => prev.filter((t) => t.id !== toast.id))}
            className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      ))}
    </div>
  );
}
