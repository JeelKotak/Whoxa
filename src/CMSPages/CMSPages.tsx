"use client";

import { useState, useEffect, useCallback } from "react";
import PagesReusable from "../Components/PagesReusable";
import useApi from "../hooks/useApiPost";
import toast, { Toaster } from "react-hot-toast";

export default function Pages() {
  const { get, put } = useApi();

  const tabs = ["Privacy Policy", "Terms & Conditions"];
  const [activeTab, setActiveTab] = useState("Privacy Policy");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);

  /* ============================= */
  /* 🔹 Fetch Config */
  /* ============================= */

  const fetchConfig = useCallback(async () => {
    try {
      setLoading(true);
      const res = await get("/config/");

      if (res?.status && res?.data) {
        const data = res.data;

        setContent(
          activeTab === "Privacy Policy"
            ? data.privacy_policy ?? ""
            : data.terms_and_conditions ?? ""
        );
      }
    } catch (error) {
      toast.error("Failed to load page content");
    } finally {
      setLoading(false);
    }
  }, [activeTab]);

  useEffect(() => {
    fetchConfig();
  }, [fetchConfig]);

  /* ============================= */
  /* 🔹 Update Config */
  /* ============================= */

  const handleUpdate = async (updatedData: {
    title: string;
    content: string;
  }) => {
    try {
      setSaving(true);

      const payload =
        activeTab === "Privacy Policy"
          ? { privacy_policy: updatedData.content }
          : { terms_and_conditions: updatedData.content };

      const res = await put("/config", payload);

      if (res?.status) {
        toast.success(`${activeTab} updated successfully ✅`);
        setContent(updatedData.content);
      } else {
        toast.error("Update failed");
      }
    } catch (error) {
      toast.error("Failed to update content ❌");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="w-full bg-white text-[#111827]">
                          <Toaster position="top-center" reverseOrder={false} />

      <div className="px-2 pt-4 pb-12">

        <div className="border border-[#e3e3e3] rounded-md bg-white overflow-hidden">

          {/* Tabs */}
          <div className="px-6 border-b border-[#e3e3e3]">
            <div className="flex gap-8 overflow-x-auto">
              {tabs.map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`py-4 text-sm font-medium relative ${
                    activeTab === tab ? "text-black" : "text-gray-500"
                  }`}
                >
                  {tab}
                  {activeTab === tab && (
                    <div className="absolute bottom-0 left-0 w-full h-0.5 bg-black" />
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Content */}
          <div className="p-2 sm:p-10 relative">
            {loading ? (
              <div className="flex justify-center items-center py-20">
                <div className="h-8 w-8 border-4 border-gray-300 border-t-black rounded-full animate-spin" />
              </div>
            ) : (
              <PagesReusable
                key={activeTab}
                initialTitle={activeTab}
                initialContent={content}
                onUpdate={handleUpdate}
                saving={saving}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}