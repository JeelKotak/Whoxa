import { useState, useEffect, useMemo } from "react";
import "../Components/_theme.scss";
import Search from "../Components/Search";
import AddReportType from "./AddReportType";
import useApi from "../hooks/useApiPost";
import RowsPerPage from "../Components/RowsPerPage";
import Pagination from "../Components/Pagination";
import ToggleSwitch from "../Components/ToggleSwitch";

interface ReportType {
  report_type_id: number;
  report_text: string;
  report_for: string;
  is_deleted: boolean;
  createdAt: string;
  updatedAt: string;
  status?: boolean;
  createdDate?: string;
}

interface PaginationState {
  page: number;
  pageSize: number;
  total: number;
  total_pages: number;
}

export default function ReportTypesList() {
  const { post, loading, error } = useApi();

  const [reportTypes, setReportTypes] = useState<ReportType[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isAddReportTypeOpen, setIsAddReportTypeOpen] = useState(false);

  const [pagination, setPagination] = useState<PaginationState>({
    page: 1,
    pageSize: 10,
    total: 0,
    total_pages: 1,
  });

  /* ===============================
     FETCH DATA
  =============================== */
  useEffect(() => {
    const fetchReportTypes = async () => {
      try {
        const res = await post("/report/report-types");

        if (res?.data?.ReportTypes) {
          const formatted = res.data.ReportTypes
            .filter((item: ReportType) => !item.is_deleted)
            .sort((a: ReportType, b: ReportType) => a.report_type_id - b.report_type_id)
            .map((item: ReportType) => ({
              ...item,
              status: true,
              createdDate: new Date(item.createdAt).toLocaleDateString(),
            }));

          setReportTypes(formatted);
        }
      } catch (err) {
        console.error("Error fetching report types:", err);
      }
    };

    fetchReportTypes();
  }, []);

  /* ===============================
     SEARCH FILTER (MEMOIZED)
  =============================== */
  const filteredData = useMemo(() => {
    return reportTypes.filter((item) =>
      item.report_text.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [reportTypes, searchTerm]);

  /* ===============================
     UPDATE PAGINATION TOTALS
  =============================== */
  useEffect(() => {
    const total = filteredData.length;
    const total_pages = Math.max(1, Math.ceil(total / pagination.pageSize));

    setPagination((prev) => ({
      ...prev,
      page: Math.min(prev.page, total_pages),
      total,
      total_pages,
    }));
  }, [filteredData, pagination.pageSize]);

  /* ===============================
     PAGINATED DATA (MEMOIZED)
  =============================== */
  const paginatedData = useMemo(() => {
    const start = (pagination.page - 1) * pagination.pageSize;
    const end = pagination.page * pagination.pageSize;
    return filteredData.slice(start, end);
  }, [filteredData, pagination.page, pagination.pageSize]);
const [loadingId, setLoadingId] = useState<number | null>(null);

  /* ===============================
     TOGGLE ACTIVE STATUS
  =============================== */
 const handleToggle = async (id: number, newStatus: boolean) => {
  try {
    setLoadingId(id);

    const res = await post("/report/delete-report-type", {
      report_type_id: id,
      delete: !newStatus, // because API expects delete flag
    });

    if (res?.status) {
      setReportTypes((prev) =>
        prev.map((item) =>
          item.report_type_id === id
            ? { ...item, status: newStatus }
            : item
        )
      );
    } else {
      alert("Failed to update status");
    }
  } catch (err) {
    console.error("Error toggling report type:", err);
    alert("Something went wrong");
  } finally {
    setLoadingId(null);
  }
};


  /* ===============================
     RESET PAGE ON SEARCH
  =============================== */
  useEffect(() => {
    setPagination((prev) => ({ ...prev, page: 1 }));
  }, [searchTerm]);



  return (
    <div className="w-full bg-white text-[#111827] theme-container">
      <div className="px-2 pt-4 pb-12">

        {/* HEADER */}
        <div className="flex flex-col sm:flex-row justify-between items-start gap-4 mb-6">
          <h1 className="text-2xl sm:text-3xl font-bold">
            Report Types List
          </h1>
          <Search
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            placeholder="Search by report text..."
          />
        </div>

        {/* TABLE */}
        <div className="border border-[#e3e3e3] rounded-md overflow-hidden bg-white mt-4">
          <div className="p-5 flex justify-between items-center border-b border-gray-100">
            <h2 className="text-lg font-semibold text-gray-800">
              Report Overview
            </h2>
            <button
              onClick={() => setIsAddReportTypeOpen(true)}
              className="text-white px-4 py-2 rounded-lg bg-brand-secondary text-sm font-medium"
            >
              Add Report
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full min-w-[900px] text-left">
              <thead className="bg-[#f1f1f1] text-gray-500 text-xs uppercase font-semibold">
                <tr>
                  <th className="px-4 py-4">ID</th>
                  <th className="px-4 py-4">Report Text</th>
                  <th className="px-4 py-4">Report For</th>
                  <th className="px-4 py-4">Created</th>
                  <th className="px-4 py-4 text-center">Active</th>
                </tr>
              </thead>

              <tbody className="divide-y divide-gray-200">
                {loading ? (
                  <tr>
                    <td colSpan={5} className="py-12 text-center">
                    <div className="flex flex-col items-center justify-center gap-2">
                        <div className="h-6 w-6 animate-spin rounded-full border-2 border-gray-300 border-t-gray-600"></div>
                        <p className="text-sm text-gray-500">Loading Report Types List...</p>
                      </div>
                    </td>
                  </tr>
                ) : error ? (
                  <tr>
                    <td colSpan={5} className="py-12 text-center text-red-500">
                      Failed to load data
                    </td>
                  </tr>
                ) : paginatedData.length ? (
                  paginatedData.map((item) => (
                    <tr
                      key={item.report_type_id}
                      className="hover:bg-gray-50"
                    >
                      <td className="px-4 py-6 text-sm font-medium">
                        #{item.report_type_id}
                      </td>
                      <td className="px-4 py-6 text-sm font-semibold">
                        {item.report_text}
                      </td>
                      <td className="px-4 py-6 text-sm">
                        {item.report_for}
                      </td>
                      <td className="px-4 py-6 text-sm text-gray-600">
                        {item.createdDate}
                      </td>


                      <td className="px-4 py-6 text-center">
                       <ToggleSwitch
  checked={item.status ?? false}
  onChange={(value) =>
    handleToggle(item.report_type_id, value)
  }
  loading={loadingId === item.report_type_id}
  size="md"
/>

                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={5} className="py-12 text-center">
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

      {isAddReportTypeOpen && (
        <AddReportType
          onClose={() => setIsAddReportTypeOpen(false)}
        />
      )}
    </div>
  );
}
