import React, { useState } from 'react';
import Modal from '../Components/Modal';

import { InputButtonForm } from '../Components/InputButtonForm';
import { RadioButtonsForm } from '../Components/RadioButtonForms';
import { SubmitAndCancel } from '../Components/SubmitAndCancel';

interface AddReportTypeProps {
  onClose: () => void;
}

const AddReportType: React.FC<AddReportTypeProps> = ({ onClose }) => {
  const [reportText, setReportText] = useState('');
  const [reportFor, setReportFor] = useState<'User' | 'Group'>('User');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onClose(); 
  };

  return (
    <Modal 
      isOpen={true} 
      onClose={onClose} 
      title="Add Report Type"
    >
      <form onSubmit={handleSubmit} className="space-y-8">
        <InputButtonForm 
          label="Report Text" 
          value={reportText} 
          onChange={setReportText} 
          placeholder="e.g. Inappropriate Behavior" 
          required 
        />

        <RadioButtonsForm 
          label="Report For" 
          options={['User', 'Group'] as const} 
          selectedValue={reportFor} 
          onChange={setReportFor} 
          required 
        />

        <SubmitAndCancel onCancel={onClose} />
      </form>
    </Modal>
  );
};

export default AddReportType;