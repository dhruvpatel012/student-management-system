import React, { useEffect } from 'react';
import { CheckCircle2, AlertCircle, X, Info } from 'lucide-react';

// Toast component for non-intrusive SaaS-style feedback notifications
function Toast({ toast, onClose }) {
  // Automatically dismiss the toast after 3.5 seconds
  useEffect(() => {
    if (toast.show) {
      const timer = setTimeout(() => {
        onClose();
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [toast.show, onClose]);

  if (!toast.show) return null;

  // Visual styling variants based on toast type
  const isError = toast.type === 'error';
  const isInfo = toast.type === 'info';

  const iconColor = isError
    ? 'text-rose-600'
    : isInfo
    ? 'text-blue-600'
    : 'text-emerald-600';

  const borderColor = isError
    ? 'border-rose-200'
    : isInfo
    ? 'border-blue-200'
    : 'border-emerald-200';

  const bgColor = 'bg-white';

  const Icon = isError ? AlertCircle : isInfo ? Info : CheckCircle2;

  return (
    <div className="fixed bottom-4 left-4 right-4 sm:left-auto sm:right-6 sm:bottom-6 z-50 animate-in fade-in slide-in-from-bottom-5 duration-200 pointer-events-auto max-w-sm sm:max-w-md w-full">
      <div
        className={`flex items-center justify-between p-3.5 sm:p-4 rounded-xl shadow-lg border ${bgColor} ${borderColor}`}
      >
        <div className="flex items-center space-x-3">
          <div className={`p-1 rounded-lg shrink-0 ${iconColor}`}>
            <Icon className="w-5 h-5" />
          </div>
          <p className="text-xs sm:text-sm font-medium text-slate-800">
            {toast.message}
          </p>
        </div>
        <button
          onClick={onClose}
          className="text-slate-400 hover:text-slate-600 p-1 rounded-md hover:bg-slate-100 transition-colors ml-3 cursor-pointer shrink-0"
          aria-label="Close notification"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}

export default Toast;
