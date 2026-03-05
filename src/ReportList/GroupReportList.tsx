import { useState, useEffect, useCallback, useMemo } from "react";
import { Eye } from "lucide-react";
import "../Components/_theme.scss";
import Search from "../Components/Search";
import GroupReportTypeModal from "./GroupReportListModal";
import useApi from "../hooks/useApiPost";
import toast from "react-hot-toast";
import RowsPerPage from "../Components/RowsPerPage";
import Pagination from "../Components/Pagination";

interface GroupReport {
  orderId: string;
  name: string;
  avatar: string;
  reportCount: number;
  status: boolean;
  rawData: any;
}

export default function GroupReportList() {
  const { post } = useApi();

  const [reportsData, setReportsData] = useState<GroupReport[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedGroup, setSelectedGroup] = useState<GroupReport | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

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
        type: "group",
      };

      const res = await post("/report/reported-entities", payload);

      if (res?.status) {
        const mappedData: GroupReport[] = (res.data.data || []).map(
          (item: any, index: number) => ({
            orderId: `#${(pagination.page - 1) * pagination.pageSize + index + 1}`,
            name: item.reported_group?.group_name || "Unknown",
            avatar: item.reported_group?.group_icon || "",
            reportCount: Number(item.report_count) || 0,
            status: item.reported_group?.is_group_blocked || false,
            rawData: item,
          })
        );

        setReportsData(mappedData);

        setPagination((prev) => ({
          ...prev,
          page: res.data.pagination?.page || 1,
          pageSize: res.data.pagination?.limit || prev.pageSize,
          total: res.data.pagination?.total || 0,
          total_pages: res.data.pagination?.total_pages || 1,
        }));
      } else {
        toast.error(res?.message || "Failed to fetch reported groups");
      }
    } catch (error: any) {
      toast.error(error?.response?.data?.message || "Something went wrong");
    }
  }, [pagination.page, pagination.pageSize]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  /* ================= SEARCH (CLIENT SIDE) ================= */

  const filteredReports = useMemo(() => {
    return reportsData.filter((item) =>
      item.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [reportsData, searchTerm]);

  /* ================= PAGINATION HELPERS ================= */

  const setCurrentPage = (page: number) => {
    setPagination((prev) => ({ ...prev, page }));
  };

  const visiblePages = useMemo(() => {
    return Array.from({ length: pagination.total_pages }, (_, i) => i + 1)
      .filter(
        (page) =>
          page === 1 ||
          page === pagination.total_pages ||
          (page >= pagination.page - 2 &&
            page <= pagination.page + 2)
      );
  }, [pagination]);

  /* ================= TOGGLE (LOCAL ONLY) ================= */

  const handleToggle = (orderId: string) => {
    setReportsData((prev) =>
      prev.map((item) =>
        item.orderId === orderId
          ? { ...item, status: !item.status }
          : item
      )
    );
  };

  /* ================= RENDER ================= */

  return (
    <div className="w-full bg-white text-[#111827] theme-container">
      <div className="px-4 pt-4 pb-12">

        {/* HEADER */}
        <div className="flex flex-col sm:flex-row justify-between gap-4 mb-6">
          <h1 className="text-2xl font-bold">Group Report List</h1>

          <Search
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            placeholder="Search by group name..."
          />
        </div>

        {/* TABLE */}
        <div className="border border-gray-200 rounded-md overflow-hidden bg-white">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[800px] text-left">
              <thead className="bg-gray-100 text-gray-500 ">
                <tr className="text-xs font-semibold uppercase">
                  <th className="px-4 py-4">Group ID</th>
                  <th className="px-4 py-4">Group</th>
                  <th className="px-4 py-4">Reports</th>
                  <th className="px-4 py-4">Block</th>
                  <th className="px-4 py-4 text-center">Action</th>
                </tr>
              </thead>

              <tbody className="divide-y divide-gray-200">
                {filteredReports.length > 0 ? (
                  filteredReports.map((item) => (
                    <tr key={item.orderId} className="hover:bg-gray-50">
                      <td className="px-4 py-6 text-sm">
                        {item.orderId}
                      </td>

                      <td className="px-4 py-6">
                        <div className="flex items-center gap-3">
                          <img
                            src={item.avatar}
                            className="w-9 h-9 rounded-full bg-gray-100"
                            alt="avatar"
                          />
                          <span className="text-sm font-medium">
                            {item.name}
                          </span>
                        </div>
                      </td>

                      <td className="px-4 py-6 text-sm">
                        {item.reportCount}
                      </td>

                      <td className="px-4 py-6">
                        <button
                          onClick={() => handleToggle(item.orderId)}
                          className={`relative inline-flex h-6 w-11 rounded-full transition ${
                            item.status
                              ? "bg-indigo-500"
                              : "bg-gray-300"
                          }`}
                        >
                          <span
                            className={`inline-block h-5 w-5 transform rounded-full bg-white shadow transition ${
                              item.status
                                ? "translate-x-5"
                                : "translate-x-0"
                            }`}
                          />
                        </button>
                      </td>

                      <td className="px-4 py-6 text-center">
                        <button
                          onClick={() => {
                            setSelectedGroup(item);
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

      {/* MODAL */}
      <GroupReportTypeModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        reportId={selectedGroup?.rawData?.report_to_group || 0}
      />
    </div>
  );
}
