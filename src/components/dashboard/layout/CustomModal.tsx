// src/components/dashboard/layout/CustomModal.tsx
import { ReactNode } from 'react';
import { X } from 'lucide-react';

interface CustomModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  content: ReactNode;
}

export default function CustomModal({ isOpen, onClose, title, content }: CustomModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white w-full max-w-2xl rounded-lg shadow-xl flex flex-col">
        <div className="flex justify-between items-center p-4 sm:p-5 border-b">
          <h2 className="text-lg font-semibold text-gray-700">{title}</h2>
          <button onClick={onClose} className="p-1.5 rounded-full hover:bg-gray-100 text-gray-500">
            <X size={20} />
          </button>
        </div>
        <div className="p-4 sm:p-6 min-h-[150px] max-h-[70vh] overflow-y-auto custom-scrollbar">
          {content || <p>Modal content goes here.</p>}
        </div>
        <div className="p-4 sm:p-5 border-t flex justify-end gap-3">
          <button onClick={onClose} className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-md">Close</button>
        </div>
      </div>
    </div>
  );
}