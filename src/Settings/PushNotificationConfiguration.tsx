"use client";

import { useEffect, useState, useCallback } from "react";
import "../Components/_theme.scss";
import useApi from "../hooks/useApiPost";
import toast, { Toaster } from "react-hot-toast";

interface OneSignalForm {
  oneSignalAppID: string;
  oneSignalAPIKey: string;
  androidChannelID: string;
}

export default function PushNotificationConfiguration() {
  const { get, put, loading } = useApi();

  const [formData, setFormData] = useState<OneSignalForm>({
    oneSignalAppID: "",
    oneSignalAPIKey: "",
    androidChannelID: "",
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
          oneSignalAppID: data.one_signal_app_id ?? "",
          oneSignalAPIKey: data.one_signal_api_key ?? "",
          androidChannelID: data.android_channel_id ?? "",
        });
      }
    } catch (error) {
      console.error("Fetch failed:", error);
      toast.error("Failed to load OneSignal configuration");
    }
  }, []);

  useEffect(() => {
    fetchConfig();
  }, [fetchConfig]);

  /* ============================= */
  /* 🔹 Handle Change */
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
  /* 🔹 Update Config */
  /* ============================= */

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const payload = {
        one_signal_app_id: formData.oneSignalAppID.trim(),
        one_signal_api_key: formData.oneSignalAPIKey.trim(),
        android_channel_id: formData.androidChannelID.trim(),
      };

      const res = await put("/config", payload);

      if (res?.status) {
        toast.success("OneSignal configuration updated successfully ");
      } else {
        toast.error("Update failed");
      }
    } catch (error) {
      console.error("Update failed:", error);
      toast.error("Failed to update configuration ❌");
    }
  };

  /* ============================= */
  /* 🔹 UI */
  /* ============================= */

  return (
    <div className="space-y-8 animate-in fade-in duration-500 theme-container">
      <Toaster position="top-center" reverseOrder={false} />

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          
          {/* OneSignal App ID */}
          <div>
            <label className="block text-[15px] font-semibold text-black mb-2">
              OneSignal App ID
            </label>
            <input
              type="text"
              name="oneSignalAppID"
              value={formData.oneSignalAppID}
              onChange={handleChange}
              className="w-full p-3 border border-gray-200 rounded-xl text-gray-700 focus:ring-2 focus:ring-[var(--brand-primary)] outline-none transition-all"
            />
          </div>

          {/* OneSignal API Key */}
          <div>
            <label className="block text-[15px] font-semibold text-black mb-2">
              OneSignal REST API Key
            </label>
            <input
              type="password"
              name="oneSignalAPIKey"
              value={formData.oneSignalAPIKey}
              onChange={handleChange}
              className="w-full p-3 border border-gray-200 rounded-xl text-gray-700 focus:ring-2 focus:ring-[var(--brand-primary)] outline-none transition-all"
            />
          </div>

          {/* Android Channel ID */}
          <div>
            <label className="block text-[15px] font-semibold text-black mb-2">
              Android Channel ID
            </label>
            <input
              type="text"
              name="androidChannelID"
              value={formData.androidChannelID}
              onChange={handleChange}
              className="w-full p-3 border border-gray-200 rounded-xl text-gray-700 focus:ring-2 focus:ring-[var(--brand-primary)] outline-none transition-all"
            />
          </div>
        </div>

        {/* Submit Button */}
        <div className="pt-2">
          <button
            type="submit"
            disabled={loading}
            className="px-10 py-3 bg-brand-secondary text-white font-semibold rounded-xl transition hover:opacity-90 disabled:opacity-50"
          >
            {loading ? "Saving..." : "Save Changes"}
          </button>
        </div>
      </form>
    </div>
  );
}