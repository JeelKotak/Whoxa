import React, { useState } from "react";
import Modal from "../Components/Modal";
import { InputButtonForm } from "../Components/InputButtonForm";
import { RadioButtonsForm } from "../Components/RadioButtonForms";
import { SubmitAndCancel } from "../Components/SubmitAndCancel";
import { AvatarForm } from "../Components/AvatarForm";
import useApi from "../hooks/useApiPost";
import toast, { Toaster } from 'react-hot-toast';

interface AddAvatarProps {
  onClose: () => void;
     fetchAvatars(): () => void;

}

const AddAvatar: React.FC<AddAvatarProps> = ({ onClose, fetchAvatars }) => {
  const { post, loading } = useApi();

  const [avatarName, setAvatarName] = useState("");
  const [gender, setGender] = useState<"Male" | "Female">("Male");
  const [avatarFile, setAvatarFile] = useState<File | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();



    if (!avatarName || !avatarFile) {
      toast.error("Please fill all required fields");
      return;
    }

    try {
      const formData = new FormData();
      formData.append("name", avatarName);
      formData.append("avatar_gender", gender.toLowerCase());
      formData.append("pictureType", "avatar");
      formData.append("files", avatarFile);

      const response = await post(
        "/avatar/add-avatar",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response?.status) {
        console.log("Avatar Created:", response.data);

        // ✅ Close modal only if success
        onClose();
         fetchAvatars(); // Refresh avatar list after adding new avatar
        toast.success("Avatar created successfully!");
      }
    } catch (error) {
      console.error("Error creating avatar:", error);
    }
  };

  return (
    <Modal isOpen={true} onClose={onClose} title="Add Avatar">
                  <Toaster position="top-center" reverseOrder={false} />

      <form onSubmit={handleSubmit} className="space-y-6">
        
        {/* Avatar Upload */}
        <AvatarForm
          label="Avatar"
          required
          onImageChange={setAvatarFile}
          downlabel="Add Avatar"
        />

        {/* Avatar Name */}
        <InputButtonForm
          label="Avatar Name"
          value={avatarName}
          onChange={setAvatarName}
          placeholder="Enter Avatar Name"
          required
        />

        {/* Gender Selection */}
        <RadioButtonsForm
          label="Gender"
          options={["Male", "Female"] as const}
          selectedValue={gender}
          onChange={setGender}
          required
        />

        {/* Buttons */}
        <SubmitAndCancel
          onCancel={onClose}
  loading={loading}
        />
      </form>
    </Modal>
  );
};

export default AddAvatar;
