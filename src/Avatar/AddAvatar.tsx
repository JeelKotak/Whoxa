import React, { useState } from 'react';
import Modal from '../Components/Modal';
import { InputButtonForm } from '../Components/InputButtonForm';
import { RadioButtonsForm } from '../Components/RadioButtonForms';
import { SubmitAndCancel } from '../Components/SubmitAndCancel';
import { AvatarForm } from '../Components/AvatarForm';

interface AddAvatarProps {
  onClose: () => void;
}

const AddAvatar: React.FC<AddAvatarProps> = ({ onClose }) => {
  const [avatarName, setAvatarName] = useState('');
  const [gender, setGender] = useState<'Male' | 'Female'>('Male');
  const [avatarFile, setAvatarFile] = useState<File | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log({ avatarName, gender, avatarFile });
    onClose();
  };

  return (
    <Modal isOpen={true} onClose={onClose} title="Add Avatar">
      <form onSubmit={handleSubmit} className="space-y-6">
        
        {/* Avatar Upload Part */}
        <AvatarForm 
          label="Avatar" 
          required 
          onImageChange={setAvatarFile} 
          downlabel='Add Avatar'
        />

        {/* Avatar Name Input */}
        <InputButtonForm
          label="Avatar Name"
          value={avatarName}
          onChange={setAvatarName}
          placeholder="Enter Avatar Name"
          required
        />

        {/* Gender Radio Selection */}
        <RadioButtonsForm
          label="Gender"
          options={['Male', 'Female'] as const}
          selectedValue={gender}
          onChange={setGender}
          required
        />

        {/* Action Buttons */}
        <SubmitAndCancel onCancel={onClose} />
      </form>
    </Modal>
  );
};

export default AddAvatar;