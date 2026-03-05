export interface InputProps {
  label: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export function Input({ label, name, value, onChange }: InputProps) {
  return (
    <div>
      <label className="block text-[15px] font-semibold text-black mb-2">
        {label}
      </label>

      <input
        type="password"
        name={name}
        value={value}
        onChange={onChange}
        placeholder="********"
        className="w-full p-3 border border-gray-200 rounded-xl text-gray-700 focus:ring-2 focus:ring-[var(--brand-primary)] outline-none transition-all"
      />
    </div>
  );
}