import React from "react";

interface GlobalLoadingProps {
  loading?: boolean;
}

const GlobalLoading: React.FC<GlobalLoadingProps> = () => {

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm">
      <div className="flex flex-col items-center">
        <div className="w-12 h-12 border-4 border-t-brand-secondary border-gray-200 rounded-full animate-spin" />
        <p className="mt-4 text-white font-medium text-sm">Loading...</p>
      </div>
    </div>
  );
};

export default GlobalLoading;
