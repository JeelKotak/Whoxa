import React, { useState } from 'react';
import Modal from '../Components/Modal';
import { InputButtonForm } from '../Components/InputButtonForm';
import { RadioButtonsForm } from '../Components/RadioButtonForms';
import { SubmitAndCancel } from '../Components/SubmitAndCancel';
import ResizableSelect from '../Components/CustomSelectDropdown';

interface AddLanguageProps {
  onClose: () => void;
}

const AddLanguage: React.FC<AddLanguageProps> = ({ onClose }) => {
  const [languageName, setLanguageName] = useState('');
  const [alignment, setAlignment] = useState<'LTR' | 'RTL'>('LTR');
  const [selectedCountry, setSelectedCounrty] = useState('United State of America');
  const countryOptions = ['United State of America', 'India', 'China', 'Russia','South Korea'];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log({ languageName, alignment, country: selectedCountry });
    onClose();
  };

  return (
    <Modal isOpen={true} onClose={onClose} title="Add Language">
      <form onSubmit={handleSubmit} className="space-y-8">

        {/* Language Name Input */}
        <InputButtonForm
          label="Language"
          value={languageName}
          onChange={setLanguageName}
          placeholder="e.g. Hindi"
          required
        />

        {/* Alignment Radio Selection */}
        <RadioButtonsForm
          label="Language Alignment"
          options={['LTR', 'RTL'] as const}
          selectedValue={alignment}
          onChange={(val) => setAlignment(val as 'LTR' | 'RTL')}
          required
        />

        <div className='flex items-center gap-2'>
          <ResizableSelect
            label='Country'
            options={countryOptions}
            value={selectedCountry}
            onChange={(val) => setSelectedCounrty(val)}
          />
        </div>

        {/* Action Buttons */}
        <SubmitAndCancel onCancel={onClose} />
      </form>
    </Modal>
  );
};

export default AddLanguage;