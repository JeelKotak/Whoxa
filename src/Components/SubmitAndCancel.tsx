import React from "react";
import "../Components/_theme.scss";

interface SubmitAndCancelProps {
  onCancel: () => void;
  submitLabel?: string;
  cancelLabel?: string;
  loading?: boolean; // ✅ add this
}

export const SubmitAndCancel: React.FC<SubmitAndCancelProps> = ({
  onCancel,
  submitLabel = "Submit",
  cancelLabel = "Cancel",
  loading = false,
}) => (
  <div className="flex gap-3 pt-4 pb-2 theme-container">
    
    {/* Cancel Button */}
    <button
      type="button"
      onClick={onCancel}
      disabled={loading}
      className={`w-full py-2 text-sm font-medium border rounded-xl 
        ${loading 
          ? "text-slate-300 border-gray-200 cursor-not-allowed" 
          : "text-slate-400 border-[#e3e3e3] cursor-pointer"
        }`}
    >
      {cancelLabel}
    </button>

    {/* Submit Button */}
    <button
      type="submit"
      disabled={loading}
      className={`w-full rounded-xl py-4 text-sm font-bold tracking-widest text-white
        ${loading 
          ? "bg-brand-secondary opacity-70 cursor-not-allowed" 
          : "bg-brand-secondary cursor-pointer"
        }`}
    >
      {loading ? (
        <span className="flex items-center justify-center gap-2">
          <svg
            className="animate-spin h-4 w-4"
            viewBox="0 0 24 24"
            fill="none"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="white"
              strokeWidth="4"
            />
            <path
              className="opacity-75"
              fill="white"
              d="M4 12a8 8 0 018-8v4l3-3-3-3v4a12 12 0 00-12 12h4z"
            />
          </svg>
          Sending...
        </span>
      ) : (
        submitLabel
      )}
    </button>
  </div>
);