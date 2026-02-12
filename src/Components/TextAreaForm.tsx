import React from 'react';

interface TextAreaFormProps {
  label: string;
  value: string;
  onChange: (val: string) => void;
  placeholder?: string;
  required?: boolean;
  disabled?: boolean;
  rows?: number;
}

export const TextAreaForm: React.FC<TextAreaFormProps> = ({ 
  label, 
  value, 
  onChange, 
  placeholder, 
  required,
  disabled,
  rows = 4 
}) => (
  <div className={`group ${disabled ? 'opacity-60 cursor-not-allowed' : ''}`}>
    <label className="mb-2 block text-xs font-bold uppercase tracking-wider text-slate-500">
      {label} {required && !disabled && <span className="text-rose-500">*</span>}
    </label>
    <textarea
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      disabled={disabled} 
      rows={rows}
      className={`w-full rounded-xl border border-slate-200 px-4 py-2.5 text-slate-700 outline-none transition-all resize-y
        ${disabled 
          ? 'bg-slate-50 border-slate-100 cursor-not-allowed select-none' 
          : 'focus:ring-2 focus:ring-[var(--brand-secondary)]'
        }`}
      required={required}
    />
  </div>
);