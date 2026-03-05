"use client";

import React, { useState, useEffect } from "react";
import Modal from "../Components/Modal";
import { InputButtonForm } from "../Components/InputButtonForm";
import { RadioButtonsForm } from "../Components/RadioButtonForms";
import { SubmitAndCancel } from "../Components/SubmitAndCancel";
import { AvatarForm } from "../Components/AvatarForm";
import useApi from "../hooks/useApiPost";

export type AvatarData = {
  avatar_id: number;
  avatar_media: string;
  name: string;
  avatar_gender: "male" | "female";
  status: boolean;
  createdAt: string;
};

interface EditProps {
  Avatar: AvatarData;
  onClose: () => void;
  onUpdateSuccess: () => void;
}

const EditAvatar: React.FC<EditProps> = ({
  Avatar,
  onClose,
  onUpdateSuccess,
}) => {
  const { post } = useApi();

  const [formData, setFormData] = useState({
    name: Avatar.name,
    avatar_gender: Avatar.avatar_gender,
  });

  const [avatarFile, setAvatarFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string>(
    Avatar.avatar_media
  );


  console.log("EditAvatar initialized with:", avatarFile);

  const [loading, setLoading] = useState(false);

  // Cleanup object URL to prevent memory leak
  useEffect(() => {
    return () => {
      if (previewUrl && avatarFile) {
        URL.revokeObjectURL(previewUrl);
      }
    };
  }, [previewUrl, avatarFile]);

  const handleImageChange = (file: File | null) => {
    setAvatarFile(file);

    if (file) {
      const newPreview = URL.createObjectURL(file);
      setPreviewUrl(newPreview);
    }
  };


  const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  try {
    setLoading(true);
    const formDataToSend = new FormData();
    formDataToSend.append("avatar_id", String(Avatar.avatar_id));
    formDataToSend.append("name", formData.name);
    formDataToSend.append("avatar_gender", formData.avatar_gender);
    formDataToSend.append("pictureType", "avatar");

    if (avatarFile) {
      formDataToSend.append("files", avatarFile, avatarFile.name); // ✅ pass filename explicitly
    }

    const res = await post("/avatar/update-avatar", formDataToSend, {
      headers: {
        "Content-Type": "multipart/form-data", // ✅ ensure correct content type
      },
    });

    if (res?.status) {
      onUpdateSuccess();
      onClose();
    }
  } catch (error) {
    console.error("Update failed", error);
  } finally {
    setLoading(false);
  }
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
          onChange={(val: string) =>
            setFormData({ ...formData, name: val })
          }
          placeholder="Avatar name"
        />

        <RadioButtonsForm
          label="Gender"
          options={["male", "female"] as const}
          selectedValue={formData.avatar_gender}
          onChange={(val: "male" | "female") =>
            setFormData({ ...formData, avatar_gender: val })
          }
        />

        <SubmitAndCancel
          onCancel={onClose}
          isLoading={loading}
        />
      </form>
    </Modal>
  );
};

export default EditAvatar;
