import React, { useState } from "react";
import Modal from "../Components/Modal";
import { InputButtonForm } from "../Components/InputButtonForm";
import { RadioButtonsForm } from "../Components/RadioButtonForms";
import { SubmitAndCancel } from "../Components/SubmitAndCancel";
import CountryList from "../Components/CountryList";
import useApi from "../hooks/useApiPost";

export interface LanguageData {
  id: string;
  name: string;
  direction: "LTR" | "RTL";
  country: string;
  status: "Active" | "Inactive";
  isDefault: boolean;
}

interface EditProps {
  language: LanguageData;
  onClose: () => void;
  onUpdate: (data: LanguageData) => void;
}

const EditLanguage: React.FC<EditProps> = ({
  language,
  onClose,
  onUpdate,
}) => {
  const { post, loading } = useApi();

  const [country, setCountry] = useState(language.country);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const res = await post("/admin/update-language", {
        language_id: Number(language.id),
        country: country,
      });

      if (res.status) {
        const updatedData = {
          ...language,
          country,
        };

        onUpdate(updatedData);
        onClose();
      }
    } catch (error) {
      console.error("Failed to update language");
    }
  };

  return (
    <Modal isOpen={true} onClose={onClose} title="Edit Language">
      <form onSubmit={handleSubmit} className="space-y-8">
        
        {/* Language Name */}
        <InputButtonForm
          label="Language"
          value={language.name}
          onChange={() => {}}
          disabled
          placeholder="Language name"
        />

        {/* Alignment */}
        <RadioButtonsForm
          label="Language Alignment"
          options={["LTR", "RTL"]}
          selectedValue={language.direction}
          onChange={() => {}}
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

export default EditLanguage;