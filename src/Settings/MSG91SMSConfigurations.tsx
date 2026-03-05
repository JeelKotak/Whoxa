"use client";

import { useCallback, useEffect, useState } from "react";
import "../Components/_theme.scss";
import { Input } from "../Components/InputBox";
import useApi from "../hooks/useApiPost";
import toast, { Toaster } from 'react-hot-toast';


interface TwilioForm {
  accountSID: string;
  authToken: string;
  phoneNumber: string;
  isEnabled: boolean;
}

export default function TwilioSMSConfigurations() {
  const { get, put, loading } = useApi();

  const [formData, setFormData] = useState<TwilioForm>({
    accountSID: "",
    authToken: "",
    phoneNumber: "",
    isEnabled: false,
  });

  /* ============================= */
  /* 🔹 Fetch Config */
  /* ============================= */

  const fetchConfig = useCallback(async () => {
    try {
      const res = await get("/config/");
      if (res?.status) {
        const data = res.data;

        setFormData({
          accountSID: data.msg91_sender_id || "",
          authToken: data.msg91_api_key || "",
          phoneNumber: data.msg91_template_id || "",
          isEnabled: data.is_msg91_enabled === "true",
        });
      }
    } catch (error) {
      console.error("Failed to fetch config", error);
    }
  }, []);

  useEffect(() => {
    fetchConfig();
  }, [fetchConfig]);

  /* ============================= */
  /* 🔹 Handle Change */
  /* ============================= */

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };


   /* ============================= */
  /* 🔹 Handle Toggle */
  /* ============================= */

  const handleToggle = useCallback(() => {
    setFormData((prev) => ({
      ...prev,
      isEnabled: !prev.isEnabled,
    }));
  }, []);

  /* ============================= */
  /* 🔹 Update Config (PUT) */
  /* ============================= */

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const payload = {
        msg91_sender_id: formData.accountSID,
        msg91_api_key: formData.authToken,
        msg91_template_id: formData.phoneNumber,
        is_msg91_enabled: formData.isEnabled,
      };

      const res = await put("/config", payload);

      if (res?.status) {
        toast.success("MSG91 configuration updated ✅");
        fetchConfig(); // refresh
      }
    } catch (error) {
      console.error("Update failed", error);
      toast.error("Failed to update MSG91 configuration ❌");
    }
  };

  /* ============================= */
  /* 🔹 UI */
  /* ============================= */

  return (
    <div className="space-y-8 animate-in fade-in duration-500 theme-container">
                          <Toaster position="top-center" reverseOrder={false} />

      <form onSubmit={handleSubmit} className="space-y-6">

          <div className="flex items-center justify-between p-4  border-gray-200  border rounded-xl">
          <span className="font-semibold text-black">
            Enable MSG 91  SMS
          </span>

          <button
            type="button"
            role="switch"
            aria-checked={formData.isEnabled}
            onClick={handleToggle}
            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-200 ${
              formData.isEnabled
                ? "bg-brand-secondary"
                : "bg-gray-300"
            }`}
          >
            <span
              className={`inline-block h-5 w-5 transform rounded-full bg-white shadow transition duration-200 ${
                formData.isEnabled
                  ? "translate-x-5"
                  : "translate-x-1"
              }`}
            />
          </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <Input
            label="MSG 91 Sender ID"
            name="accountSID"
            value={formData.accountSID}
            onChange={handleChange}
          />

          <Input
            label="MSG 91 API Key"
            name="authToken"
            value={formData.authToken}
            onChange={handleChange}
          />
        </div>

        <Input
          label="MSG 91 Template ID"
          name="phoneNumber"
          value={formData.phoneNumber}
          onChange={handleChange}
        />

      

        <button
          type="submit"
          disabled={loading}
          className="px-10 py-3 bg-brand-secondary text-white font-semibold rounded-xl disabled:opacity-50"
        >
          {loading ? "Saving..." : "Save Changes"}
        </button>
      </form>
    </div>
  );
}