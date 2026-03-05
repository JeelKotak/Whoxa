import { useEffect, useState, useCallback } from "react";
import Search from "../Components/Search";
import "../Components/_theme.scss";
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
    user_name: string;
    profile_pic: string;
    first_name: string;
    last_name: string;
  };
}

export default function AudioCallList() {
  const { post, loading } = useApi();

  const [calls, setCalls] = useState<CallItem[]>([]);
  const [searchTerm, setSearchTerm] = useState("");

  const [pagination, setPagination] = useState({
    page: 1,
    pageSize: 10,
    total: 0,
    total_pages: 1,
  });

  const fetchCalls = useCallback(async () => {
    try {
      const res = await post("/admin/calls-list", {
        call_type: "audio",
        page: pagination.page,
        limit: pagination.pageSize,
      });

      const apiData = res?.data;

      setCalls(apiData?.call || []);
      setPagination((prev) => ({
        ...prev,
        total: apiData?.pagination?.total_records || 0,
        total_pages: apiData?.pagination?.total_pages || 1,
      }));
    } catch (error) {
      console.error("Error fetching calls:", error);
    }
  }, [pagination.page, pagination.pageSize]);

  useEffect(() => {
    fetchCalls();
  }, [fetchCalls]);

  const setCurrentPage = (page: number) => {
    setPagination((prev) => ({ ...prev, page }));
  };

  return (
    <div className="w-full bg-white text-[#111827] theme-container font-sans">
      <div className="px-2 pt-4 pb-12">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start gap-4 mb-6">
          <div>
            <h1 className="text-3xl font-bold">Audio Call List</h1>
          </div>

          <Search
            searchTerm={searchTerm}
            setSearchTerm={(val) => {
              setSearchTerm(val);
              setPagination((prev) => ({ ...prev, page: 1 }));
            }}
            placeholder="Search calls..."
          />
        </div>

        {/* Table */}
        <div className="border border-gray-200 rounded-lg overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr className="text-xs font-bold text-gray-500 uppercase">
                  <th className="px-6 py-4">ID</th>
                  <th className="px-6 py-4">Caller</th>
                  <th className="px-6 py-4">Chat</th>
                  <th className="px-6 py-4">Status</th>
                  <th className="px-6 py-4">Duration</th>
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
                          Loading calls...
                        </p>
                      </div>
                    </td>
                  </tr>
                ) : calls.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="py-10 text-center text-gray-500">
                      No calls found
                    </td>
                  </tr>
                ) : (
                  calls.map((call) => (
                    <tr
                      key={call.call_id}
                      className="hover:bg-gray-50 transition-colors"
                    >
                      <td className="px-6 py-5 text-sm font-medium">
                        #{call.call_id}
                      </td>

                      <td className="px-6 py-5">
                        <div className="flex items-center gap-3">
                          <img
                            src={call.caller?.profile_pic}
                            className="w-9 h-9 rounded-full"
                          />
                          <span className="text-sm font-semibold">
                            {call.caller?.first_name}{" "}
                            {call.caller?.last_name}
                          </span>
                        </div>
                      </td>

                      <td className="px-6 py-5">
                        <div className="flex items-center gap-3">
                          <img
                            src={call.Chat?.group_icon}
                            className="w-9 h-9 rounded-full"
                          />
                          <div>
                            <div className="text-sm font-semibold">
                              {call.Chat?.group_name || "Private Chat"}
                            </div>
                            <div className="text-xs text-gray-400">
                              {call.Chat?.chat_type}
                            </div>
                          </div>
                        </div>
                      </td>

                      <td className="px-6 py-5">
                        <span
                          className={`px-2 py-1 rounded-full text-xs font-bold ${
                            call.call_status === "missed"
                              ? "bg-red-100 text-red-600"
                              : "bg-green-100 text-green-600"
                          }`}
                        >
                          {call.call_status}
                        </span>
                      </td>

                      <td className="px-6 py-5 text-sm text-gray-600">
                        {call.call_duration}s
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

        {/* Pagination */}
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
