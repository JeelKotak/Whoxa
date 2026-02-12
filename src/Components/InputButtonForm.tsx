import React from 'react';

interface InputButtonFormProps {
  label: string;
  value: string;
  onChange: (val: string) => void;
  placeholder?: string;
  required?: boolean;
  disabled?: boolean; 
}

export const InputButtonForm: React.FC<InputButtonFormProps> = ({ 
  label, 
  value, 
  onChange, 
  placeholder, 
  required,
  disabled 
}) => (
  <div className={`group ${disabled ? 'opacity-60 cursor-not-allowed' : ''}`}>
    <label className="mb-2 block text-xs font-bold uppercase tracking-wider text-slate-500">
      {label} {required && !disabled && <span className="text-rose-500">*</span>}
    </label>
    <input
      type="text"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      disabled={disabled} 
      className={`w-full rounded-xl border border-slate-200 px-4 py-2.5 text-slate-700 outline-none transition-all 
        ${disabled 
          ? 'bg-slate-50 border-slate-100 cursor-not-allowed select-none' 
          : 'focus:ring-2 focus:ring-[var(--brand-secondary)]'
        }`}
      required={required}
    />
  </div>
);