import '../Components/_theme.scss'

interface RadioButtonsFormProps<T extends string> {
  label: string;
  options: readonly T[];
  selectedValue: T;
  onChange: (value: T) => void;
  required?: boolean;
}

export const RadioButtonsForm = <T extends string>({ label, options, selectedValue, onChange, required }: RadioButtonsFormProps<T>) => (
  <div className='theme-container'>
    <label className="mb-4 block text-xs font-bold uppercase tracking-wider text-slate-500">
      {label} {required && <span className="text-rose-500">*</span>}
    </label>
    <div className="inline-grid grid-cols-2 gap-3 w-full">
      {options.map((option) => (
        <label
          key={option}
          className={`relative flex cursor-pointer items-center justify-center rounded-xl border py-3 transition-all ${
            selectedValue === option ? 'border-[var(--brand-secondary)] text-brand-primary' : 'border-gray-200 bg-white text-gray-500'
          }`}
        >
          <input
            type="radio"
            className="sr-only"
            checked={selectedValue === option}
            onChange={() => onChange(option)}
          />
          <span className="text-sm font-semibold">{option}</span>
          {selectedValue === option && (
            <div className="absolute top-2 right-2 h-2 w-2 rounded-full bg-brand-secondary" />
          )}
        </label>
      ))}
    </div>
  </div>
);