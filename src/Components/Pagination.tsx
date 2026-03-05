import React from "react";

interface PaginationProps {
  page: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({ page, totalPages, onPageChange }) => {
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1)
    .filter(p => p === 1 || p === totalPages || (p >= page - 2 && p <= page + 2));

  return (
    <div className="flex items-center gap-1">
      <button
        onClick={() => onPageChange(page - 1)}
        disabled={page === 1}
        className={`px-3 py-1 rounded-md border text-sm ${page === 1 ? "text-gray-400 border-gray-200 cursor-not-allowed" : "text-gray-700 border-gray-300 hover:bg-gray-100"}`}
      >
        Previous
      </button>

      {pages.map((p, idx, arr) => (
        <span key={p}>
          {idx > 0 && p - arr[idx - 1] > 1 && <span className="px-2">...</span>}
          <button
            onClick={() => onPageChange(p)}
            className={`px-3 py-1 rounded-md border text-sm ${page === p ? " bg-brand-secondary text-white border-yellow-400" : "text-gray-700 border-gray-300 hover:bg-gray-100"}`}
          >
            {p}
          </button>
        </span>
      ))}

      <button
        onClick={() => onPageChange(page + 1)}
        disabled={page === totalPages}
        className={`px-3 py-1 rounded-md border text-sm ${page === totalPages ? "text-gray-400 border-gray-200 cursor-not-allowed" : "text-gray-700 border-gray-300 hover:bg-gray-100"}`}
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;
