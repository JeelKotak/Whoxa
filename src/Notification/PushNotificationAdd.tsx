import React, { useState } from 'react';
import Modal from '../Components/Modal';

import { InputButtonForm } from '../Components/InputButtonForm';
import { SubmitAndCancel } from '../Components/SubmitAndCancel';
import { TextAreaForm } from '../Components/TextAreaForm'; 

interface AddReportTypeProps {
  onClose: () => void;
}

const PushNotificationAdd: React.FC<AddReportTypeProps> = ({ onClose }) => {
  const [reportTitle, setReportTitle] = useState('');
  const [reportDescription, setReportDescription] = useState(''); 

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
      <form onSubmit={handleSubmit} className="space-y-6">
        <InputButtonForm 
          label="Title" 
          value={reportTitle} 
          onChange={setReportTitle} 
          placeholder='Enter Notification Title'
          required 
        />

        <TextAreaForm 
          label="Message"
          value={reportDescription}
          onChange={setReportDescription}
          placeholder="Enter Notification Message"
          rows={5}
          required
        />

        <SubmitAndCancel onCancel={onClose} />
      </form>
    </Modal>
  );
};

export default PushNotificationAdd;