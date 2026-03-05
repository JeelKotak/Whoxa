"use client";

import {
  useState,
  useEffect,
  useRef,
  type ChangeEvent,
  useCallback,
} from "react";
import { X } from "lucide-react";
import { useBranding } from "../Components/BrandingContext";
import useApi from "../hooks/useApiPost";
import "../Components/_theme.scss";
import toast, { Toaster } from 'react-hot-toast';


/* ============================= */
/* 🔹 Types */
/* ============================= */

interface ConfigType {
  app_name: string;
  app_email: string;
  app_primary_color: string;
  app_logo_light: string;
  web_logo_light: string;
  app_logo_dark: string;
  copyright_text: string;
}

interface ImageState {
  file: File | null;
  preview: string | null;
}

interface ImageUploadProps {
  label: string;
  preview: string | null;
  inputRef: React.RefObject<HTMLInputElement>;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  onRemove: () => void;
  fullWidth?: boolean;
}

interface InputFieldProps {
  label: string;
  value: string;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
  readOnly?: boolean;
}

/* ============================= */
/* 🔹 Component */
/* ============================= */

export default function GeneralSettings() {
  const { updateLogo, updateSiteName } = useBranding();
  const { get, put, loading } = useApi();

  const [config, setConfig] = useState<ConfigType | null>(null);
  const [platformName, setPlatformName] = useState("");
 const [copyright_text, setCopyrightText] = useState("");
    const [app_email, setAppEmail] = useState("");

  const [themeColor, setThemeColor] = useState("#EAB308");

  const [logo, setLogo] = useState<ImageState>({ file: null, preview: null });
  const [footerLogo, setFooterLogo] = useState<ImageState>({
    file: null,
    preview: null,
  });
  const [favicon, setFavicon] = useState<ImageState>({
    file: null,
    preview: null,
  });

  const logoInput = useRef<HTMLInputElement>(null);
  const footerInput = useRef<HTMLInputElement>(null);
  const faviconInput = useRef<HTMLInputElement>(null);

  /* ============================= */
  /* 🔹 Fetch Config */
  /* ============================= */

  const fetchConfig = useCallback(async () => {
    try {
      const res = await get("/config/");
      if (res?.status) {
        setConfig(res.data);
      }
    } catch (error) {
      console.error("Failed to fetch config", error);
    }
  }, []);

  useEffect(() => {
    fetchConfig();
  }, [fetchConfig]);

  /* ============================= */
  /* 🔹 Sync API Data */
  /* ============================= */

  useEffect(() => {
    if (!config) return;

    setPlatformName(config.app_name || "");
    setThemeColor(config.app_primary_color || "#EAB308");
    setAppEmail(config.app_email || "");
    setCopyrightText(config.copyright_text || "");


    setLogo({ file: null, preview: config.app_logo_light || null });
    setFooterLogo({ file: null, preview: config.web_logo_light || null });
    setFavicon({ file: null, preview: config.app_logo_dark || null });
  }, [config]);

  /* ============================= */
  /* 🔹 Branding Sync */
  /* ============================= */

  useEffect(() => {
    const root = document.documentElement;

    root.style.setProperty("--brand-primary", themeColor);
    root.style.setProperty("--brand-secondary", themeColor);
    root.style.setProperty("--sidebar-active-bg", `${themeColor}1a`);

    updateLogo(logo.preview || "");
    updateSiteName(platformName);
  }, [themeColor, logo.preview, platformName, updateLogo, updateSiteName]);

  /* ============================= */
  /* 🔹 File Handlers */
  /* ============================= */

  const handleFileChange = (
    e: ChangeEvent<HTMLInputElement>,
    setter: React.Dispatch<React.SetStateAction<ImageState>>
  ) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const previewUrl = URL.createObjectURL(file);
    setter({ file, preview: previewUrl });
  };

  const removeImage = (
    state: ImageState,
    setter: React.Dispatch<React.SetStateAction<ImageState>>,
    ref: React.RefObject<HTMLInputElement>
  ) => {
    if (state.preview?.startsWith("blob:")) {
      URL.revokeObjectURL(state.preview);
    }

    setter({ file: null, preview: null });

    if (ref.current) ref.current.value = "";
  };

  /* ============================= */
  /* 🔹 Save Handler */
  /* ============================= */

const handleSave = async () => {
  try {
    const formData = new FormData();

    formData.append("app_name", platformName);
    formData.append("app_primary_color", themeColor);
    formData.append("copyright_text", copyright_text || "");
    formData.append("app_email", app_email || "");

    if (logo.file) {
      formData.append("app_logo_light", logo.file);
    }

    if (footerLogo.file) {
      formData.append("web_logo_light", footerLogo.file);
    }

    if (favicon.file) {
      formData.append("app_logo_dark", favicon.file);
    }


    // ✅ Do NOT manually set Content-Type for FormData
  const res = await put("/config", formData, {
  headers: {
    "Content-Type": "multipart/form-data",
  },
});

    if (res?.status) {
      await fetchConfig();
      toast.success("Settings updated successfully ✅");
    }
  } catch (error) {
    console.error("Update failed", error);
    toast.error("Failed to update settings ❌");
  }
};

  /* ============================= */
  /* 🔹 Loading */
  /* ============================= */

  if (loading && !config) {
    return (
      <div className="p-10 text-center text-gray-400">
        Loading settings...
      </div>
    );
  }

  /* ============================= */
  /* 🔹 UI */
  /* ============================= */

  return (
    <div className="space-y-8 animate-in fade-in duration-500 theme-container">
                        <Toaster position="top-center" reverseOrder={false} />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-8">
        <ImageUpload
          label="Logo"
          preview={logo.preview}
          inputRef={logoInput}
          onChange={(e) => handleFileChange(e, setLogo)}
          onRemove={() => removeImage(logo, setLogo, logoInput)}
        />

        <ImageUpload
          label="Footer Logo"
          preview={footerLogo.preview}
          inputRef={footerInput}
          onChange={(e) => handleFileChange(e, setFooterLogo)}
          onRemove={() => removeImage(footerLogo, setFooterLogo, footerInput)}
        />

        <ImageUpload
          label="Fav Icon"
          preview={favicon.preview}
          inputRef={faviconInput}
          onChange={(e) => handleFileChange(e, setFavicon)}
          onRemove={() => removeImage(favicon, setFavicon, faviconInput)}
          fullWidth
        />

        <InputField
          label="Platform Name"
          value={platformName}
          onChange={(e) => setPlatformName(e.target.value)}
        />

        <InputField
          label="Copyright Text"
          value={copyright_text}
          onChange={(e)=>setCopyrightText(e.target.value)}
        />

        <InputField
          label="Contact Email"
          value={app_email}
          onChange={(e)=>setAppEmail(e.target.value)}
        />
      </div>

      <div className="mt-10 space-y-3">
        <label className="text-sm font-semibold text-gray-700">
          Color Settings
        </label>

        <div className="relative w-20 p-1 bg-white border border-gray-200 rounded-xl shadow-sm">
          <div
            className="w-full h-8 rounded-lg"
            style={{ backgroundColor: themeColor }}
          />
          <input
            type="color"
            value={themeColor}
            onChange={(e) => setThemeColor(e.target.value)}
            className="absolute inset-0 opacity-0 cursor-pointer"
          />
        </div>
      </div>

      <div className="mt-8">
        <button
          onClick={handleSave}
          disabled={loading}
          className="bg-brand-secondary text-white px-10 py-3 rounded-xl font-semibold hover:brightness-110 active:scale-95 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? "Saving..." : "Save Changes"}
        </button>
      </div>
    </div>
  );
}

/* ============================= */
/* 🔹 Reusable Components */
/* ============================= */

function ImageUpload({
  label,
  preview,
  inputRef,
  onChange,
  onRemove,
  fullWidth = false,
}: ImageUploadProps) {
  return (
    <div className={`space-y-2 ${fullWidth ? "col-span-1 md:col-span-2" : ""}`}>
      <label className="text-sm font-semibold text-gray-700">{label}</label>

      <input
        ref={inputRef}
        type="file"
        onChange={onChange}
        className="w-full text-sm text-gray-500 border border-gray-200 rounded-md p-2"
      />

      {preview && (
        <div className="mt-2 relative inline-block p-2">
          <img src={preview} alt={label} className="h-10 object-contain" />
          <button
            onClick={onRemove}
            className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-0.5"
          >
            <X size={14} />
          </button>
        </div>
      )}
    </div>
  );
}

function InputField({
  label,
  value,
  onChange,
  readOnly = false,
}: InputFieldProps) {
  return (
    <div className="space-y-2">
      <label className="text-sm font-semibold text-gray-700">{label}</label>

      <input
        type="text"
        value={value}
        onChange={onChange}
        readOnly={readOnly}
        className={`w-full p-2.5 border border-gray-200 rounded-lg outline-none ${
          readOnly ? "bg-gray-50 text-gray-600 cursor-not-allowed" : ""
        }`}
      />
    </div>
  );
}