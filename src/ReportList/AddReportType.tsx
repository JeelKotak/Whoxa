import React, { useState } from "react";
import Modal from "../Components/Modal";
import { InputButtonForm } from "../Components/InputButtonForm";
import { RadioButtonsForm } from "../Components/RadioButtonForms";
import { SubmitAndCancel } from "../Components/SubmitAndCancel";
import useApi from "../hooks/useApiPost";

import toast, { Toaster } from 'react-hot-toast';


interface AddReportTypeProps {
  onClose: () => void;
}

const AddReportType: React.FC<AddReportTypeProps> = ({ onClose }) => {
  const { post, loading } = useApi();

  const [reportText, setReportText] = useState("");
  const [reportFor, setReportFor] = useState<"User" | "Group">("User");


  const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();

  try {
    const payload = {
      report_text: reportText,
      report_for: reportFor.toLowerCase(), // "user" or "group"
    };

    const res = await post("/report/add-reports", payload);

    if (res.success) {
      toast.success("Report type added successfully!");
      onClose();
    } else {
      // Show the error message returned by the API
      toast.error(res.message || "Failed to add report type");
    }
  } catch (err: any) {
    console.error("Error adding report type:", err);
    // err.response?.data?.message can be used if your post hook returns axios error
    toast.error(
      err?.response?.data?.message || "Something went wrong. Please try again."
    );
  }
};


  return (
    <Modal isOpen={true} onClose={onClose} title="Add Report Type">
                  <Toaster position="top-center" reverseOrder={false} />

      <form onSubmit={handleSubmit} className="space-y-6">
        <InputButtonForm
          label="Report Text"
          value={reportText}
          onChange={setReportText}
          placeholder="e.g. Inappropriate Behavior"
          required
        />

        <RadioButtonsForm
          label="Report For"
          options={["User", "Group"] as const}
          selectedValue={reportFor}
          onChange={setReportFor}
          required
        />

      

        <SubmitAndCancel
          onCancel={onClose}
          submitText={loading ? "Saving..." : "Add Report Type"}
          disabled={loading}
        />
      </form>
    </Modal>
  );
};

export default AddReportType;
