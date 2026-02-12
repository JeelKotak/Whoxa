import React, { useState } from 'react';
import Modal from '../Components/Modal';
import { InputButtonForm } from '../Components/InputButtonForm';
import { RadioButtonsForm } from '../Components/RadioButtonForms';
import { SubmitAndCancel } from '../Components/SubmitAndCancel';
import { AvatarForm } from '../Components/AvatarForm';

export type AvatarData = {
    id: number;
    image: string;
    name: string;
    gender: "Male" | "Female";
    status: "Active" | "Inactive";
    createdDate: string;
};

interface EditProps {
    Avatar: AvatarData; 
    onClose: () => void;
    onUpdate: (data: AvatarData) => void;
}

const EditAvatar: React.FC<EditProps> = ({ Avatar, onClose, onUpdate }) => {
    const [formData, setFormData] = useState<AvatarData>(Avatar);
    const [, setAvatarFile] = useState<File | null>(null);
    const [previewUrl, setPreviewUrl] = useState<string>(Avatar.image);

    const handleImageChange = (file: File | null) => {
        setAvatarFile(file);
        if (file) {
            const newPreview = URL.createObjectURL(file);
            setPreviewUrl(newPreview);
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onUpdate({
            ...formData,
            image: previewUrl 
        });
        onClose();
    };

    return (
        <Modal isOpen={true} onClose={onClose} title="Edit Avatar">
            <form onSubmit={handleSubmit} className="space-y-8">
                <AvatarForm
                    label="Avatar"
                    required
                    initialImage={previewUrl} 
                    onImageChange={handleImageChange}
                />

                <InputButtonForm
                    label="Avatar Name"
                    value={formData.name}
                    onChange={(val: any) => setFormData({ ...formData, name: val })}
                    placeholder="Avatar name"
                />

                <RadioButtonsForm
                    label="Gender"
                    options={['Male', 'Female'] as const}
                    selectedValue={formData.gender}
                    onChange={(val: any) => setFormData({ ...formData, gender: val })}
                />

                <SubmitAndCancel onCancel={onClose} />
            </form>
        </Modal>
    );
};

export default EditAvatar;