import { useState, useEffect, useCallback, useMemo } from "react";
import { Eye } from "lucide-react";
import "../Components/_theme.scss";
import Search from "../Components/Search";
import UserReportTypeModal from "./UserReportListModal";
import { toast } from "react-hot-toast";
import useApi from "../hooks/useApiPost";
import RowsPerPage from "../Components/RowsPerPage";
import Pagination from "../Components/Pagination";
import ToggleSwitch from "../Components/ToggleSwitch";

interface ReportedUser {
  report_to_user: number;
  report_to_group: number | null;
  report_count: string;
  reported_user: {
    user_name: string;
    profile_pic: string;
    user_id: number;
    blocked_by_admin: boolean;
  };
}

export default function UserReportList() {
  const { post, put, loading } = useApi();

  const [data, setData] = useState<ReportedUser[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedUser, setSelectedUser] = useState<ReportedUser | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [actionLoadingId, setActionLoadingId] = useState<number | null>(null);

  const [pagination, setPagination] = useState({
    page: 1,
    pageSize: 10,
    total: 0,
    total_pages: 1,
  });

  /* ================= FETCH DATA ================= */

  const fetchData = useCallback(async () => {
    try {
      const payload = {
        page: pagination.page,
        limit: pagination.pageSize,
        type: "user",
      };

      const res = await post("/report/reported-entities", payload);

      if (res?.status) {
        setData(res.data?.data || []);

        setPagination((prev) => ({
          ...prev,
          page: res.data.pagination?.page || 1,
          pageSize: res.data.pagination?.limit || prev.pageSize,
          total: res.data.pagination?.total || 0,
          total_pages: res.data.pagination?.total_pages || 1,
        }));
      } else {
        toast.error(res?.message || "Failed to fetch users");
      }
    } catch (error: any) {
      toast.error(error?.response?.data?.message || "Something went wrong");
    }
  }, [pagination.page, pagination.pageSize]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  /* ================= BLOCK / UNBLOCK ================= */

  const handleToggle = async (userId: number, blocked: boolean) => {
    setActionLoadingId(userId);

    try {
      const res = await put("/admin/block-user", { user_id: userId });

      if (res?.status) {
        toast.success(
          `User ${blocked ? "unblocked" : "blocked"} successfully`
        );

        setData((prev) =>
          prev.map((item) =>
            item.reported_user.user_id === userId
              ? {
                  ...item,
                  reported_user: {
                    ...item.reported_user,
                    blocked_by_admin: !blocked,
                  },
                }
              : item
          )
        );
      } else {
        toast.error(res?.message || "Failed to update status");
      }
    } catch (error: any) {
      toast.error(error?.response?.data?.message || "Update failed");
    } finally {
      setActionLoadingId(null);
    }
  };

  /* ================= SEARCH FILTER ================= */

  const filteredData = useMemo(() => {
    return data.filter((item) =>
      item.reported_user.user_name
        .toLowerCase()
        .includes(searchTerm.toLowerCase())
    );
  }, [data, searchTerm]);

  /* ================= RENDER ================= */

  return (
    <div className="w-full bg-white text-[#111827] theme-container relative">
      <div className="px-4 pt-4 pb-12">

        {/* HEADER */}
        <div className="flex flex-col sm:flex-row justify-between gap-4 mb-6">
          <h1 className="text-2xl font-bold">User Report List</h1>
          <Search
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            placeholder="Search by name..."
          />
        </div>

        {/* TABLE */}
        <div className="border border-gray-200 rounded-md overflow-hidden bg-white">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[900px] text-left">
              <thead className="bg-gray-100 text-gray-500 text-xs uppercase font-semibold">
                <tr>
                  <th className="px-4 py-4">User ID</th>
                  <th className="px-4 py-4">User</th>
                  <th className="px-4 py-4">Reports</th>
                  <th className="px-4 py-4">Active</th>
                  <th className="px-4 py-4 text-center">Action</th>
                </tr>
              </thead>

              <tbody className="divide-y divide-gray-200">
                {loading ? (
                  <tr>
                    <td colSpan={5} className="py-10 text-center">
                      <div className="flex justify-center items-center gap-2">
                        <div className="h-6 w-6 animate-spin rounded-full border-2 border-gray-300 border-t-gray-600"></div>
                        <p className="text-sm text-gray-500">
                          Loading users...
                        </p>
                      </div>
                    </td>
                  </tr>
                ) : filteredData.length > 0 ? (
                  filteredData.map((item) => (
                    <tr
                      key={item.reported_user.user_id}
                      className="hover:bg-gray-50 transition"
                    >
                      <td className="px-4 py-6 text-sm">
                        {item.reported_user.user_id}
                      </td>

                      <td className="px-4 py-6">
                        <div className="flex items-center gap-3">
                          <img
                            src={item.reported_user.profile_pic}
                            className="w-9 h-9 rounded-full bg-gray-100"
                            alt="avatar"
                          />
                          <span className="text-sm font-medium">
                            {item.reported_user.user_name}
                          </span>
                        </div>
                      </td>

                      <td className="px-4 py-6 text-sm">
                        {item.report_count}
                      </td>

                      <td className="px-4 py-6">
                        <ToggleSwitch
                          checked={!item.reported_user.blocked_by_admin}
                          onChange={() =>
                            handleToggle(
                              item.reported_user.user_id,
                              item.reported_user.blocked_by_admin
                            )
                          }
                          loading={
                            actionLoadingId ===
                            item.reported_user.user_id
                          }
                          variant="primary"
                        />
                      </td>

                      <td className="px-4 py-6 text-center">
                        <button
                          onClick={() => {
                            setSelectedUser(item);
                            setIsModalOpen(true);
                          }}
                          className="p-1.5 border rounded text-gray-500 hover:bg-gray-100"
                        >
                          <Eye size={16} />
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={5} className="py-10 text-center text-gray-500">
                      No results found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* PAGINATION */}
        <div className="flex flex-col sm:flex-row items-center justify-between mt-4 gap-4">
          <RowsPerPage
            page={pagination.page}
            pageSize={pagination.pageSize}
            total={pagination.total}
            onChange={(newSize) =>
              setPagination((prev) => ({
                ...prev,
                pageSize: newSize,
                page: 1,
              }))
            }
          />
          <Pagination
            page={pagination.page}
            totalPages={pagination.total_pages}
            onPageChange={(newPage) =>
              setPagination((prev) => ({ ...prev, page: newPage }))
            }
          />
        </div>
      </div>

      {/* MODAL */}
      <UserReportTypeModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        reportId={selectedUser?.reported_user.user_id || 0}
      />
    </div>
  );
}
