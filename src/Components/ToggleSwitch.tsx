import React from "react";

interface ToggleSwitchProps {
  checked: boolean;
  onChange: (value: boolean) => void;
  disabled?: boolean;
  loading?: boolean;
  size?: "sm" | "md" | "lg";
  variant?: "primary" | "success" | "danger";
  className?: string;
}

const sizeStyles = {
  sm: {
    container: "h-5 w-9",
    circle: "h-4 w-4",
    translate: "translate-x-4",
  },
  md: {
    container: "h-6 w-11",
    circle: "h-5 w-5",
    translate: "translate-x-5",
  },
  lg: {
    container: "h-7 w-14",
    circle: "h-6 w-6",
    translate: "translate-x-7",
  },
};

const variantStyles = {
  primary: "bg-indigo-500",
  success: "bg-green-500",
  danger: "bg-red-500",
};

const ToggleSwitch: React.FC<ToggleSwitchProps> = ({
  checked,
  onChange,
  disabled = false,
  loading = false,
  size = "md",
  variant = "primary",
  className = "",
}) => {
  const styles = sizeStyles[size];

  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      disabled={disabled || loading}
      onClick={() => {
        if (!disabled && !loading) {
          onChange(!checked);
        }
      }}
      className={`
        relative inline-flex items-center rounded-full
        transition-all duration-300 ease-in-out
        focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500
        ${styles.container}
        ${checked ? variantStyles[variant] : "bg-gray-300"}
        ${disabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}
        ${className}
      `}
    >
      {/* Circle */}
      <span
        className={`
          inline-block transform rounded-full bg-white shadow-md
          transition-all duration-300 ease-in-out
          ${styles.circle}
          ${checked ? styles.translate : "translate-x-1"}
        `}
      />

      {/* Loading Spinner */}
      {loading && (
        <span className="absolute inset-0 flex items-center justify-center">
          <span className="h-3 w-3 animate-spin rounded-full border-2 border-white border-t-transparent"></span>
        </span>
      )}
    </button>
  );
};

export default ToggleSwitch;
