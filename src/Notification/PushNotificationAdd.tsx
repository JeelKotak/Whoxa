import React, { useState } from "react";
import Modal from "../Components/Modal";
import { InputButtonForm } from "../Components/InputButtonForm";
import { SubmitAndCancel } from "../Components/SubmitAndCancel";
import { TextAreaForm } from "../Components/TextAreaForm";
import useApi from "../hooks/useApiPost";
import toast, { Toaster } from 'react-hot-toast';

interface AddReportTypeProps {
  onClose: () => void;
  fetchNotifications: () => void;
}

const PushNotificationAdd: React.FC<AddReportTypeProps> = ({ onClose, fetchNotifications }) => {
  const [reportTitle, setReportTitle] = useState("");
  const [reportDescription, setReportDescription] = useState("");

  const { post, loading } = useApi();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

      if (!reportTitle || !reportDescription) {
      toast.error("Please fill all required fields");
      return;
    }

    try {
      const res = await post("/admin/notification", {
        title: reportTitle,
        message: reportDescription,
      });

      if (res?.status) {
               toast.success("Avatar created successfully!");

        onClose();
        fetchNotifications(); // Refresh notification list after adding new notification
      }
    } catch (error) {
      console.error("Notification failed", error);
    }
  };

  return (
    <Modal isOpen={true} onClose={onClose} title="Add Push Notification">
                        <Toaster position="top-center" reverseOrder={false} />
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <InputButtonForm
          label="Title"
          value={reportTitle}
          onChange={setReportTitle}
          placeholder="Enter Notification Title"
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

     <SubmitAndCancel
  onCancel={onClose}
  loading={loading}
/>
      </form>
    </Modal>
  );
};

export default PushNotificationAdd;
