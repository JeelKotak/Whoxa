import React, { useState } from "react";
import Modal from "../Components/Modal";
import { InputButtonForm } from "../Components/InputButtonForm";
import { RadioButtonsForm } from "../Components/RadioButtonForms";
import { SubmitAndCancel } from "../Components/SubmitAndCancel";
import useApi from "../hooks/useApiPost";
import CountryList from "../Components/CountryList";

interface AddLanguageProps {
  onClose: () => void;
  onSuccess: () => void;
}

const AddLanguage: React.FC<AddLanguageProps> = ({ onClose, onSuccess }) => {
  const { post, loading } = useApi();

  const [language, setLanguage] = useState("");
  const [alignment, setAlignment] = useState<"LTR" | "RTL">("LTR");
  const [country, setCountry] = useState<string>("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const payload = {
      language,
      language_alignment: alignment,
      country,
    };

    try {
      await post("/admin/add-language", payload);
      onClose();
            onSuccess();   // 🔥 Refresh language list

    } catch (error) {
      console.error("Add Language Error:", error);
    }
  };

  return (
    <Modal isOpen={true} onClose={onClose} title="Add Language">
      <form onSubmit={handleSubmit} className="space-y-6">

        {/* Language */}
        <InputButtonForm
          label="Language"
          value={language}
          onChange={setLanguage}
          placeholder="e.g. Hindi"
          required
        />

        {/* Alignment */}
        <RadioButtonsForm
          label="Language Alignment"
          options={["LTR", "RTL"] as const}
          selectedValue={alignment}
          onChange={(val) => setAlignment(val as "LTR" | "RTL")}
          required
        />

        {/* Country */}
        <CountryList
          label="Country"
          value={country}
          onChange={setCountry}
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

export default AddLanguage;