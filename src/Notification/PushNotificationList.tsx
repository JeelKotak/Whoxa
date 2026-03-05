import { useState, useEffect } from "react";
import "../Components/_theme.scss";
import Search from "../Components/Search";
import PushNotificationAdd from "./PushNotificationAdd";
import RowsPerPage from "../Components/RowsPerPage";
import Pagination from "../Components/Pagination";
import useApi from "../hooks/useApiPost";

interface Notification {
  notification_id: number;
  title: string;
  message: string;
  users: number[];
  createdAt: string;
}

export default function PushNotificationList() {
  const { post, loading } = useApi();

  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isAddNotificationOpen, setIsAddNotificationOpen] = useState(false);

  const [pagination, setPagination] = useState({
    page: 1,
    pageSize: 10,
    total: 0,
    total_pages: 1,
  });

  // ✅ Fetch Notifications
  const fetchNotifications = async () => {
    try {
      const res = await post("/admin/list-broadcast-notification", {
        page: pagination.page,
        records_per_page: pagination.pageSize,
        search: searchTerm || "",
      });

      const records = res?.data?.Records || [];
      const pg = res?.data?.Pagination;

      setNotifications(records);

      if (pg) {
        setPagination((prev) => ({
          ...prev,
          total: pg.total_records,
          total_pages: pg.total_pages,
          page: pg.current_page,
          pageSize: pg.records_per_page,
        }));
      }
    } catch (error) {
      console.error("Error fetching notifications:", error);
    }
  };

  // ✅ Debounced API Call
  useEffect(() => {
    const timer = setTimeout(() => {
      fetchNotifications();
    }, 400);

    return () => clearTimeout(timer);
  }, [pagination.page, pagination.pageSize, searchTerm]);

  return (
    <div className="w-full bg-white text-[#111827] theme-container font-sans">
      <div className="px-2 pt-4 pb-12">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start gap-4 mb-6">
          <div>
            <h1 className="text-3xl font-bold">Push Notification List</h1>
            <nav className="flex items-center gap-2 text-sm font-medium mt-1">
              <span className="text-black">List</span>
              <span className="w-1.5 h-1.5 bg-gray-300 rounded-full" />
              <span className="text-gray-500 font-normal">
                Push Notification List
              </span>
            </nav>
          </div>

          <Search
            searchTerm={searchTerm}
            setSearchTerm={(val: string) => {
              setPagination((prev) => ({ ...prev, page: 1 }));
              setSearchTerm(val);
            }}
            placeholder="Search notifications..."
          />
        </div>

        {/* Table */}
        <div className="border border-gray-200 rounded-lg overflow-hidden">
          <div className="p-5 flex justify-between items-center border-b border-gray-100">
            <h2 className="text-lg font-semibold text-gray-800">
              Notification Overview
            </h2>
            <button
              onClick={() => setIsAddNotificationOpen(true)}
              className="flex items-center gap-2 text-white px-4 py-2 rounded-lg bg-brand-secondary text-sm font-medium hover:opacity-90 transition-opacity"
            >
              Add Notification
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr className="text-[11px] font-bold text-gray-500 uppercase tracking-wider">
                  <th className="px-6 py-4">ID</th>
                  <th className="px-6 py-4">Title</th>
                  <th className="px-6 py-4">Message</th>
                  <th className="px-6 py-4">Users</th>
                  <th className="px-6 py-4">Created At</th>
                </tr>
              </thead>

              <tbody className="divide-y divide-gray-100 bg-white">
                {loading ? (
                  <tr>
                    <td colSpan={9} className="py-16">
                    <div className="flex flex-col items-center justify-center gap-2">
                      <div className="h-6 w-6 animate-spin rounded-full border-2 border-gray-300 border-t-gray-600"></div>
                      <p className="text-sm text-gray-500">Loading notifications...</p>
                    </div>
                  </td>
                  </tr>
                ) : notifications.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="text-center py-6">
                      No notifications found
                    </td>
                  </tr>
                ) : (
                  notifications.map((item) => (
                    <tr
                      key={item.notification_id}
                      className="hover:bg-gray-50 transition-colors"
                    >
                      <td className="px-6 py-5 text-sm text-gray-700 font-medium">
                        #{item.notification_id}
                      </td>
                      <td className="px-6 py-5 text-sm font-semibold text-gray-900 whitespace-nowrap">
                        {item.title}
                      </td>
                      <td className="px-6 py-5 text-sm text-gray-600 min-w-[300px]">
                        {item.message}
                      </td>
                      <td className="px-6 py-5 text-sm text-gray-600 whitespace-nowrap">
                        {item.users?.length ?? 0}
                      </td>
                      <td className="px-6 py-5 text-sm text-gray-600 whitespace-nowrap">
                        {new Date(item.createdAt).toLocaleDateString()}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* ✅ Pagination Section */}
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
              setPagination((prev) => ({
                ...prev,
                page: newPage,
              }))
            }
          />
        </div>
      </div>

      {isAddNotificationOpen && (
        <PushNotificationAdd
          onClose={() => setIsAddNotificationOpen(false)}
          fetchNotifications={fetchNotifications}
        />
      )}
    </div>
  );
}
