import React, { useEffect } from "react";
import Modal from "../Components/Modal";
import useApi from "../hooks/useApiPost";

interface TranslateAllModalProps {
  onClose: () => void;
  onSuccess: () => void;
}

const TranslateAllModal: React.FC<TranslateAllModalProps> = ({
  onClose,
  onSuccess,
}) => {
  const { post, loading } = useApi();

  useEffect(() => {
    const translateAll = async () => {
      try {
        await post("/admin/translate-all-keywords" , { language_id: localStorage.getItem("selectedLanguageId") || "2" });
        onSuccess();
        onClose();
      } catch (error) {
        console.error("Translate all error:", error);
      }
    };

    translateAll();
  }, []);

  return (
    <Modal isOpen={true} onClose={onClose} title="Translating Words">
      <div className="flex flex-col items-center justify-center py-10 text-center space-y-5">

        {/* Translating Text */}
        <h2 className="text-xl font-semibold text-blue-600 animate-pulse">
          Translating.
        </h2>

        {/* Spinner */}
        <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>

        {/* Message */}
        <p className="text-blue-500 text-sm max-w-md">
          Translating all words might take <strong>10–15 minutes</strong>.
          Please keep this tab open until it finishes.
        </p>

      </div>
    </Modal>
  );
};

export default TranslateAllModal;