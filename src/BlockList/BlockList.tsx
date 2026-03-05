"use client";

import { useState, useEffect, useCallback } from "react";
import { ChevronDown } from "lucide-react";
import Search from "../Components/Search";
import useApi from "../hooks/useApiPost";
import RowsPerPage from "../Components/RowsPerPage";
import Pagination from "../Components/Pagination";

interface BlockRecord {
  block_id: number;
  approved: boolean;
  createdAt: string;
  updatedAt: string;
  user_id: number;
  blocked_id: number;
  blocked_chat_id: number | null;
  blocker: {
    user_name: string;
    profile_pic: string;
    first_name: string;
    last_name: string;
    user_id: number;
  };
  blocked: {
    user_name: string;
    profile_pic: string;
    first_name: string;
    last_name: string;
    user_id: number;
  };
}

interface Pagination {
  page: number;
  pageSize: number;
  total: number;
  total_pages: number;
}

export default function BlockList() {
  const { post, loading } = useApi();

  const [records, setRecords] = useState<BlockRecord[]>([]);
  const [pagination, setPagination] = useState<Pagination>({
    page: 1,
    pageSize: 10,
    total: 0,
    total_pages: 1,
  });
  const [searchTerm, setSearchTerm] = useState("");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  // ==================== DEBOUNCE SEARCH ====================
  const [debouncedSearch, setDebouncedSearch] = useState(searchTerm);
  useEffect(() => {
    const handler = setTimeout(() => setDebouncedSearch(searchTerm), 500);
    return () => clearTimeout(handler);
  }, [searchTerm]);

  // ==================== FETCH BLOCK LIST ====================
  const fetchBlockList = useCallback(async () => {
    try {
      const body = {
        filter: debouncedSearch || "user",
        page: pagination.page,
        pageSize: pagination.pageSize,
      };

      const res = await post("/admin/get-block-list", body);

      if (res?.status) {
        setRecords(res.data.Records);
        setPagination((prev) => ({
          ...prev,
          total: res.data.Pagination.total_records,
          total_pages: res.data.Pagination.total_pages,
        }));
      }
    } catch (error) {
      console.error("Error fetching block list:", error);
    }
  }, [ pagination.page, pagination.pageSize, debouncedSearch]);

  useEffect(() => {
    fetchBlockList();
  }, [fetchBlockList]);

  // ==================== HANDLERS ====================
  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= pagination.total_pages) {
      setPagination((prev) => ({ ...prev, page }));
    }
  };

  const handlePageSizeChange = (size: number) => {
    setPagination({ ...pagination, pageSize: size, page: 1 });
  };

  const generatePages = Array.from(
    { length: pagination.total_pages },
    (_, i) => i + 1
  ).filter(
    (page) =>
      page === 1 ||
      page === pagination.total_pages ||
      (page >= pagination.page - 2 && page <= pagination.page + 2)
  );

  return (
    <div className="w-full bg-white text-[#111827] p-4 rounded-md shadow-sm">
      {/* ===== HEADER ===== */}
      <div className="flex flex-col sm:flex-row justify-between items-start gap-4 mb-6">
        <div>
          <h1 className="text-3xl font-bold">Block List</h1>
        </div>
        <Search
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          placeholder="Search blocked users..."
        />
      </div>
{/* ===== TABLE ===== */}
<div className="border border-gray-200 rounded-md overflow-hidden relative">
  <div className="overflow-x-auto">
    <table className="w-full text-left border-collapse">
      <thead className="bg-gray-50 border-b border-gray-200">
        <tr className="text-xs font-bold text-gray-500 uppercase tracking-wider">
          <th className="px-6 py-4 whitespace-nowrap">Block ID</th>
          <th className="px-6 py-4 whitespace-nowrap">Date</th>
          <th className="px-6 py-4">Blocked By</th>
          <th className="px-6 py-4 text-center">Blocked To</th>
        </tr>
      </thead>
      <tbody className="divide-y divide-gray-100">
        {!loading && records.length > 0
          ? records.map((item) => (
              <tr
                key={item.block_id}
                className="hover:bg-gray-50 transition-colors whitespace-nowrap"
              >
                <td className="px-6 py-4 font-medium">{item.block_id}</td>
                <td className="px-6 py-4 text-gray-600">
                  {new Date(item.createdAt).toLocaleDateString()}
                </td>
                <td className="px-6 py-4">
                  <div className="flex gap-3 items-center">
                    <img
                      src={item.blocker.profile_pic}
                      className="w-8 h-8 rounded-full"
                      alt={item.blocker.user_name}
                    />
                    <span className="font-semibold text-gray-900">
                      {item.blocker.user_name}
                    </span>
                  </div>
                </td>
                <td className="px-6 py-4 text-gray-600 text-center">
                  <div className="flex items-center justify-center gap-2">
                    <img
                      src={item.blocked.profile_pic}
                      className="w-8 h-8 rounded-full"
                      alt={item.blocked.user_name || "Unknown"}
                    />
                    <span>{item.blocked.user_name || "Unknown User"}</span>
                  </div>
                </td>
              </tr>
            ))
          : null}

        {/* Empty state */}
        {!loading && records.length === 0 && (
          <tr>
            <td colSpan={4} className="px-6 py-4 h-[12rem] text-center text-gray-500">
              No records found
            </td>
          </tr>
        )}
      </tbody>
    </table>
  </div>

  {/* ===== LOADING SPINNER ===== */}
  {loading && (
    <div className=" flex flex-col  h-[12rem] items-center justify-center bg-white/70 z-10">
      <div className="h-6 w-6 animate-spin rounded-full border-2 border-gray-300 border-t-gray-600"></div>
      <p className="text-sm text-gray-500 mt-2">Loading Block List...</p>
    </div>
  )}
</div>


      {/* ===== PAGINATION ===== */}
        {/* Pagination */}
      <div className="flex flex-col sm:flex-row items-center justify-between mt-4 gap-4">
        <RowsPerPage
          page={pagination.page}
          pageSize={pagination.pageSize}
          total={pagination.total}
          onChange={(newSize) => setPagination(prev => ({ ...prev, pageSize: newSize, page: 1 }))}
        />
        <Pagination
          page={pagination.page}
          totalPages={pagination.total_pages}
          onPageChange={(newPage) => setPagination(prev => ({ ...prev, page: newPage }))}
        />
      </div>

    
    </div>
  );
}
