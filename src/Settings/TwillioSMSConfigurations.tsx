"use client";

import { useEffect, useState, useCallback } from "react";
import "../Components/_theme.scss";
import { Input } from "../Components/InputBox";
import useApi from "../hooks/useApiPost";
import toast, { Toaster } from "react-hot-toast";

interface TwilioForm {
  accountSID: string;
  authToken: string;
  phoneNumber: string;
  isTwilioEnabled: boolean;
}

export default function TwilioSMSConfigurations() {
  const { get, put, loading } = useApi();

  const [formData, setFormData] = useState<TwilioForm>({
    accountSID: "",
    authToken: "",
    phoneNumber: "",
    isTwilioEnabled: true,
  });

  /* ============================= */
  /* 🔹 Fetch Existing Config */
  /* ============================= */

  const fetchConfig = useCallback(async () => {
    try {
      const res = await get("/config/");

      if (res?.status && res?.data) {
        const data = res.data;

        setFormData({
          accountSID: data.twilio_account_sid ?? "",
          authToken: data.twilio_auth_token ?? "",
          phoneNumber: data.twilio_phone_number ?? "",
          isTwilioEnabled: data.is_twilio_enabled === "true",
        });
      }
    } catch (error) {
      console.error("Fetch failed:", error);
      toast.error("Failed to load Twilio configuration");
    }
  }, []);

  useEffect(() => {
    fetchConfig();
  }, [fetchConfig]);

  /* ============================= */
  /* 🔹 Handle Input Change */
  /* ============================= */

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const { name, value } = e.target;

      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    },
    []
  );

  /* ============================= */
  /* 🔹 Handle Toggle */
  /* ============================= */

  const handleToggle = useCallback(() => {
    setFormData((prev) => ({
      ...prev,
      isTwilioEnabled: !prev.isTwilioEnabled,
    }));
  }, []);

  /* ============================= */
  /* 🔹 Update Config (PUT) */
  /* ============================= */

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const payload = {
        twilio_account_sid: formData.accountSID.trim(),
        twilio_auth_token: formData.authToken.trim(),
        twilio_phone_number: formData.phoneNumber.trim(),
        is_twilio_enabled: String(formData.isTwilioEnabled),
      };

      const res = await put("/config", payload);

      if (res?.status) {
        toast.success("Twilio configuration updated successfully ✅");
      } else {
        toast.error("Update failed");
      }
    } catch (error) {
      console.error("Update failed:", error);
      toast.error("Failed to update Twilio configuration ❌");
    }
  };

  /* ============================= */
  /* 🔹 UI */
  /* ============================= */

  return (
    <div className="space-y-8 animate-in fade-in duration-500 theme-container">
      <Toaster position="top-center" reverseOrder={false} />

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Toggle Switch */}
          <div className="flex items-center justify-between p-4  border-gray-200  border rounded-xl">
          <span className="font-semibold text-black">
            Enable Twilio SMS
          </span>

          <button
            type="button"
            role="switch"
            aria-checked={formData.isTwilioEnabled}
            onClick={handleToggle}
            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-200 ${
              formData.isTwilioEnabled
                ? "bg-brand-secondary"
                : "bg-gray-300"
            }`}
          >
            <span
              className={`inline-block h-5 w-5 transform rounded-full bg-white shadow transition duration-200 ${
                formData.isTwilioEnabled
                  ? "translate-x-5"
                  : "translate-x-1"
              }`}
            />
          </button>
        </div>

        {/* Fields */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <Input
            label="Twilio Account SID"
            name="accountSID"
            value={formData.accountSID}
            onChange={handleChange}
          />

          <Input
            label="Twilio Auth Token"
            name="authToken"
            value={formData.authToken}
            onChange={handleChange}
          />
        </div>

        <Input
          label="Twilio Phone Number"
          name="phoneNumber"
          value={formData.phoneNumber}
          onChange={handleChange}
        />

        <button
          type="submit"
          disabled={loading}
          className="px-10 py-3 bg-brand-secondary text-white font-semibold rounded-xl transition hover:opacity-90 disabled:opacity-50"
        >
          {loading ? "Saving..." : "Save Changes"}
        </button>
      </form>
    </div>
  );
}