import React, { useState } from 'react';
import Modal from '../Components/Modal';
import { InputButtonForm } from '../Components/InputButtonForm';
import { RadioButtonsForm } from '../Components/RadioButtonForms';
import { SubmitAndCancel } from '../Components/SubmitAndCancel';
import ResizableSelect from '../Components/CustomSelectDropdown';

export interface LanguageData {
  id: string;       
  name: string;
  direction: 'LTR' | 'RTL';
  country: string;
  status: 'Active' | 'Inactive';
  isDefault: boolean; 
  [key: string]: any; 
}

interface EditProps {
  language: LanguageData;
  onClose: () => void;
  onUpdate: (data: LanguageData) => void;
}

const EditLanguage: React.FC<EditProps> = ({ language, onClose, onUpdate }) => {
  const [selectedCountry, setSelectedCountry] = useState(language.country);

  const countryOptions = [
    'United States', 'India', 'China', 'Russia', 
    'South Korea', 'United Kingdom', 'United Arab Emirates', 'France', 'Spain'
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    onUpdate({
      ...language,
      country: selectedCountry,
    });
    onClose();
  };

  return (
    <Modal isOpen={true} onClose={onClose} title="Edit Language">
      <form onSubmit={handleSubmit} className="space-y-8">
        
        {/* Language Name - Fixed */}
        <InputButtonForm
          label="Language"
          value={language.name}
          onChange={() => {}} 
          disabled={true}    
          placeholder="Language name"
        />

        {/* Alignment - Fixed */}
        <RadioButtonsForm
          label="Language Alignment"
          options={['LTR', 'RTL'] as const}
          selectedValue={language.direction}
          onChange={() => {}} 
        />

        {/* Country Selection - Editable */}
        <div className='flex items-center gap-2'>
          <ResizableSelect
            label='Country'
            options={countryOptions}
            value={selectedCountry}
            onChange={(val) => setSelectedCountry(val)}
          />
        </div>

        {/* Action Buttons */}
        <SubmitAndCancel onCancel={onClose} />
      </form>
    </Modal>
  );
};

export default EditLanguage;