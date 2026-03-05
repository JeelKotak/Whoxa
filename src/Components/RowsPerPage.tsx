import React from "react";

interface RowsPerPageProps {
  pageSize: number;
  total: number;
  page: number;
  onChange: (newSize: number) => void;
}

const RowsPerPage: React.FC<RowsPerPageProps> = ({ pageSize, total, page, onChange }) => {
  return (
    <div className="flex items-center gap-2">
      <select
        value={pageSize}
        onChange={(e) => onChange(Number(e.target.value))}
        className="border border-gray-300 rounded-md px-2 py-1 text-sm focus:outline-none focus:ring-1 focus:ring-indigo-500"
      >
        {[5, 10, 20, 30].map((val) => (
          <option key={val} value={val}>{val}</option>
        ))}
      </select>
      <span className="text-gray-700 text-sm">
        Showing {(page - 1) * pageSize + 1} - {Math.min(page * pageSize, total)} of {total} results
      </span>
    </div>
  );
};

export default RowsPerPage;
