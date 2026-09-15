import React from 'react';
import { Trash2, AlertTriangle, X } from 'lucide-react';

// DeleteConfirmModal component for clean, in-app deletion confirmations
function DeleteConfirmModal({ isOpen, student, onConfirm, onCancel, deleting }) {
  if (!isOpen || !student) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-xs transition-opacity">
      <div className="bg-white rounded-2xl border border-slate-200 shadow-xl w-full max-w-md overflow-hidden animate-in fade-in zoom-in-95 duration-150">
        <div className="p-6">
          <div className="flex items-start justify-between">
            <div className="w-11 h-11 rounded-xl bg-rose-50 text-rose-600 flex items-center justify-center shrink-0">
              <AlertTriangle className="w-5 h-5" />
            </div>
            <button
              onClick={onCancel}
              className="text-slate-400 hover:text-slate-600 p-1.5 rounded-lg hover:bg-slate-100 transition-colors cursor-pointer"
              aria-label="Close"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <div className="mt-4">
            <h3 className="text-base sm:text-lg font-bold text-slate-800">
              Delete Student Record?
            </h3>
            <p className="text-xs sm:text-sm text-slate-500 mt-1.5 leading-relaxed">
              Are you sure you want to remove <span className="font-semibold text-slate-700">{student.name}</span> from the system? This action will permanently delete the student from the database.
            </p>
          </div>

          <div className="mt-6 flex items-center justify-end space-x-3">
            <button
              type="button"
              onClick={onCancel}
              disabled={deleting}
              className="px-4 py-2 text-xs sm:text-sm font-medium text-slate-600 hover:text-slate-800 hover:bg-slate-100 rounded-lg transition-colors cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={onConfirm}
              disabled={deleting}
              className="inline-flex items-center space-x-1.5 px-4 py-2 bg-rose-600 hover:bg-rose-700 disabled:bg-rose-400 text-white text-xs sm:text-sm font-medium rounded-lg shadow-sm transition-colors cursor-pointer"
            >
              <Trash2 className="w-4 h-4" />
              <span>{deleting ? 'Deleting...' : 'Delete Record'}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DeleteConfirmModal;
