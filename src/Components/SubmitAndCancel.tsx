import React from 'react';
import '../Components/_theme.scss';

interface SubmitAndCancelProps {
  onCancel: () => void;
  submitLabel?: string;
  cancelLabel?: string;
}

export const SubmitAndCancel: React.FC<SubmitAndCancelProps> = ({ 
  onCancel, 
  submitLabel = "Submit", 
  cancelLabel = "Cancel" 
}) => (
  <div className="flex gap-3 pt-4 pb-2 theme-container">
    <button
      type="button"
      onClick={onCancel}
      className="w-full py-2 text-sm font-medium text-slate-400 border border-[#e3e3e3] rounded-xl cursor-pointer"
    >
      {cancelLabel}
    </button>
    <button
      type="submit"
      className="w-full rounded-xl bg-brand-secondary py-4 text-sm font-bold tracking-widest text-white cursor-pointer"
    >
      {submitLabel}
    </button>
  </div>
);