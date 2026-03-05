import { useMemo } from "react";
import Select from "react-select";
import countryList from "react-select-country-list";

interface OptionType {
  label: string;
  value: string;
}

interface CountrySelectProps {
  label?: string;
  value: string;
  onChange: (value: string) => void;
  required?: boolean;
}

export default function CountryList({
  label,
  value,
  onChange,
  required,
}: CountrySelectProps) {

  const options = useMemo<OptionType[]>(() => countryList().getData(), []);

  const selectedOption = options.find((c) => c.value === value) || null;

  return (
    <div className="w-full">
      {label && (
        <label className="mb-2 block text-xs font-bold uppercase tracking-wider text-slate-500">
          {label} {required && <span className="text-rose-500">*</span>}
        </label>
      )}

      <Select
        options={options}
        value={selectedOption}
        onChange={(option) => onChange((option as OptionType)?.value)}
        placeholder="Select country..."
        isSearchable
        className="text-sm"
      />
    </div>
  );
}