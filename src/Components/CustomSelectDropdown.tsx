import { useState, useRef, useEffect } from 'react';
import { ChevronDown, Check } from 'lucide-react';

interface ResizableSelectProps {
  label?: string;
  options?: string[];
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  width?: string;
  maxHeight?: string;
  required?: boolean;
}

export default function ResizableSelect({ 
  label,
  options = [], 
  value, 
  onChange, 
  placeholder = "Select...",
  width = "w-full", 
  maxHeight = "max-h-60" ,
  required
}: ResizableSelectProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [dropUp, setDropUp] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const checkDirection = () => {
    if (containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      const spaceBelow = window.innerHeight - rect.bottom;
      const menuHeight = 250; 

      if (spaceBelow < menuHeight && rect.top > spaceBelow) {
        setDropUp(true);
      } else {
        setDropUp(false);
      }
    }
  };

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      checkDirection();
      window.addEventListener('scroll', checkDirection, true);
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      window.removeEventListener('scroll', checkDirection, true);
    };
  }, [isOpen]);

  return (
    <div className={`relative ${width} theme-container`} ref={containerRef}>
      <label className="mb-3 block text-xs font-bold uppercase tracking-wider text-slate-500">
      {label} {required && <span className="text-rose-500">*</span>}
    </label>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-between w-full px-4 py-2.5 bg-white border rounded-xl transition-all"
        style={{ borderColor: isOpen ? 'var(--brand-primary)' : '#e5e7eb' }}
      >
        <span className={`truncate ${!value ? 'text-gray-400' : 'text-gray-500 font-medium'}`}>
          {value || placeholder}
        </span>
        <ChevronDown 
          className="w-4 h-4 text-gray-400 transition-transform" 
          style={{ transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)' }}
        />
      </button>

      {isOpen && (
        <div 
          className={`absolute z-50 w-full bg-white border border-gray-100 rounded-xl shadow-2xl overflow-hidden transition-all
            ${dropUp ? 'bottom-full mb-2' : 'top-full mt-2'}`}
        >
          <ul className={`overflow-y-auto py-1 ${maxHeight} custom-scrollbar`}>
            {options.map((option) => {
              const isActive = value === option;
              return (
                <li
                  key={option}
                  onClick={() => {
                    onChange(option);
                    setIsOpen(false);
                  }}
                  className={`dropdown-item-custom flex items-center justify-between px-4 py-2.5 cursor-pointer hover:bg-gray-50 ${isActive ? 'active' : ''}`}
                >
                  <span className="truncate">{option}</span>
                  {isActive && (
                    <Check 
                      className="w-4 h-4" 
                      style={{ color: 'var(--brand-primary)' }} 
                    />
                  )}
                </li>
              );
            })}
            {options.length === 0 && (
              <li className="px-4 py-2 text-sm text-gray-400 text-center">No options found</li>
            )}
          </ul>
        </div>
      )}
    </div>
  );
}