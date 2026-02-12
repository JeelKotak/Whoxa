  import React, {type ReactNode } from 'react';
  import { X } from 'lucide-react';

  interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    title: string;
    children: ReactNode;
  }

  const Modal: React.FC<ModalProps> = ({ isOpen, onClose, title, children }) => {
    if (!isOpen) return null;
    
    return (
      <div className="fixed inset-0 z-[999] flex items-center justify-center bg-slate-900/30 p-4">
        <div className="w-full max-w-[700px] overflow-hidden rounded-xl bg-white shadow-2xl">
          <div className="flex items-center justify-between px-6 pt-4 pb-4 border-b border-gray-100">
            <h2 className="text-2xl font-semibold tracking-tight text-slate-800">{title}</h2>
            <button onClick={onClose} className="rounded-md p-2 text-slate-400 hover:bg-slate-100 transition-all">
              <X size={20} />
            </button>
          </div>
          <div className="px-8 py-4">{children}</div>
        </div>
      </div>
    );
  };

  export default Modal;