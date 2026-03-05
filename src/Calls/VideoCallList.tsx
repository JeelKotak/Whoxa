import { useEffect, useState, useCallback } from "react";
import "../Components/_theme.scss";
import Search from "../Components/Search";
import useApi from "../hooks/useApiPost";
import RowsPerPage from "../Components/RowsPerPage";
import Pagination from "../Components/Pagination";

interface CallItem {
  call_id: number;
  call_type: string;
  call_status: string;
  call_duration: number;
  createdAt: string;
  Chat: {
    group_icon: string;
    chat_type: string;
    group_name: string;
  };
  caller: {
    first_name: string;
    last_name: string;
    user_name: string;
    profile_pic: string;
  };
}

export default function VideoCallList() {
  const { post, loading } = useApi();

  const [calls, setCalls] = useState<CallItem[]>([]);
  const [searchTerm, setSearchTerm] = useState("");

  const [pagination, setPagination] = useState({
    page: 1,
    pageSize: 10,
    total: 0,
    total_pages: 1,
  });

  // ================= FETCH CALLS =================
  const fetchCalls = useCallback(async () => {
    try {
      const res = await post("/admin/calls-list", {
        call_type: "video",
        page: pagination.page,
        limit: pagination.pageSize,
      });

      const response = res?.data;

      setCalls(response?.call || []);

      setPagination((prev) => ({
        ...prev,
        total: response?.pagination?.total_records || 0,
        total_pages: response?.pagination?.total_pages || 1,
      }));
    } catch (error) {
      console.error("Failed to fetch calls:", error);
    }
  }, [pagination.page, pagination.pageSize]);

  useEffect(() => {
    fetchCalls();
  }, [fetchCalls]);

  // ================= HANDLE PAGE CHANGE =================
  const setCurrentPage = (page: number) => {
    setPagination((prev) => ({ ...prev, page }));
  };

  // ================= FILTER (CLIENT SIDE OPTIONAL) =================
  const filteredCalls = calls.filter((call) =>
    call.caller.user_name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="w-full bg-white text-[#111827] theme-container font-sans">
      <div className="px-2 pt-4 pb-12">
        {/* ================= HEADER ================= */}
        <div className="flex flex-col sm:flex-row justify-between items-start gap-4 mb-6">
          <div>
            <h1 className="text-3xl font-bold">Video Call List</h1>
          </div>
          <Search
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            placeholder="Search by username..."
          />
        </div>

        {/* ================= TABLE ================= */}
        <div className="border border-gray-200 rounded-lg overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr className="text-[11px] font-bold text-gray-500 uppercase tracking-wider">
                  <th className="px-6 py-4">ID</th>
                  <th className="px-6 py-4">Caller</th>
                  <th className="px-6 py-4">Chat Type</th>
                  <th className="px-6 py-4">Status</th>
                  <th className="px-6 py-4">Duration (sec)</th>
                  <th className="px-6 py-4">Created At</th>
                </tr>
              </thead>

              <tbody className="divide-y divide-gray-100 bg-white">
                {loading ? (
                  <tr>
                    <td colSpan={6} className="py-10 text-center">
                      <div className="flex flex-col items-center justify-center gap-2">
                        <div className="h-6 w-6 animate-spin rounded-full border-2 border-gray-300 border-t-gray-600"></div>
                        <p className="text-sm text-gray-500">
                          Loading video calls...
                        </p>
                      </div>
                    </td>
                  </tr>
                ) : filteredCalls.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="py-10 text-center text-gray-400">
                      No video calls found.
                    </td>
                  </tr>
                ) : (
                  filteredCalls.map((call) => (
                    <tr
                      key={call.call_id}
                      className="hover:bg-gray-50 transition-colors whitespace-nowrap"
                    >
                      <td className="px-6 py-5 text-sm font-medium">
                        #{call.call_id}
                      </td>

                      <td className="px-6 py-5">
                        <div className="flex items-center gap-3">
                          <img
                            src={call.caller.profile_pic}
                            className="w-9 h-9 rounded-full"
                            alt="caller"
                          />
                          <div>
                            <div className="text-sm font-semibold">
                              {call.caller.first_name}{" "}
                              {call.caller.last_name}
                            </div>
                            <div className="text-xs text-gray-400">
                              @{call.caller.user_name}
                            </div>
                          </div>
                        </div>
                      </td>

                      <td className="px-6 py-5 text-sm capitalize">
                        {call.Chat.chat_type}
                      </td>

                      <td className="px-6 py-5">
                        <span
                          className={`px-2.5 py-0.5 rounded-full text-[11px] font-bold capitalize ${
                            call.call_status === "missed"
                              ? "bg-red-100 text-red-600"
                              : call.call_status === "ongoing"
                              ? "bg-yellow-100 text-yellow-600"
                              : "bg-green-100 text-green-600"
                          }`}
                        >
                          {call.call_status}
                        </span>
                      </td>

                      <td className="px-6 py-5 text-sm">
                        {call.call_duration}
                      </td>

                      <td className="px-6 py-5 text-sm text-gray-600">
                        {new Date(call.createdAt).toLocaleDateString()}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* ================= PAGINATION ================= */}
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
    </div>
  );
}
