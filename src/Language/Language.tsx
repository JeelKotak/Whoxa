import { useEffect, useMemo, useState } from "react";
import Search from "../Components/Search";
import "../Components/_theme.scss";
import { SquarePen, Languages } from "lucide-react";
import AddLanguage from "./AddLanguage";
import EditLanguage from "./EditLanguage";
import { useNavigate } from "react-router-dom";
import useApi from "../hooks/useApiPost";
import RowsPerPage from "../Components/RowsPerPage";
import Pagination from "../Components/Pagination";
import Toggle from "./Toggle";

type LanguageData = {
  id: string;
  name: string;
  country: string;
  direction: "LTR" | "RTL";
  status: "Active" | "Inactive";
  isDefault: boolean;
};

export default function Language() {
  const navigate = useNavigate();
  const { post, loading } = useApi();

  // =============================
  // STATE
  // =============================
  const [languages, setLanguages] = useState<LanguageData[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isAddLanguageOpen, setIsAddLanguageOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  const [pagination, setPagination] = useState({
    page: 1,
    pageSize: 10,
    total: 0,
    total_pages: 1,
  });

  // =============================
  // FETCH DATA
  // =============================
  const fetchLanguages = async (page: number, limit: number) => {
    try {
      const res = await post("/language/get-language", {
        page: String(page),
        limit: String(limit),
      });

      if (res.status) {
        const records = res.data.Records || [];

        const formatted: LanguageData[] = records.map((item: any) => ({
          id: String(item.language_id),
          name: item.language,
          country: item.country,
          direction: item.language_alignment,
          status: item.status ? "Active" : "Inactive",
          isDefault: item.default_status,
        }));

        setLanguages(formatted);

        const apiPagination = res.data.Pagination;

        setPagination({
          page: apiPagination.current_page,
          pageSize: apiPagination.records_per_page,
          total: apiPagination.total_records,
          total_pages: apiPagination.total_pages,
        });
      }
    } catch (error) {
      console.error("Failed to fetch languages");
    }
  };

  useEffect(() => {
    fetchLanguages(pagination.page, pagination.pageSize);
  }, [pagination.page, pagination.pageSize]);


  const filteredLanguages = useMemo(() => {
    if (!searchTerm) return languages;

    return languages.filter(
      (lang) =>
        lang.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        lang.country.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [languages, searchTerm]);

  const selectedLanguage = languages.find((l) => l.id === editingId);

  const handleStatusToggle = async (id: string, value: boolean) => {
    try {
      await post("/admin/update-language", {
        language_id: Number(id),
        status: value,
      });

      setLanguages((prev) =>
        prev.map((lang) =>
          lang.id === id
            ? { ...lang, status: value ? "Active" : "Inactive" }
            : lang
        )
      );

      fetchLanguages(pagination.page, pagination.pageSize); // Refresh list after status change
    } catch (error) {
      console.error("Failed to update status");
    }
  };

  const handleDefaultToggle = async (id: string, value: boolean) => {
    try {
      await post("/admin/update-language", {
        language_id: Number(id),
        default_status: value,
      });

      setLanguages((prev) =>
        prev.map((lang) =>
          lang.id === id ? { ...lang, isDefault: value } : lang
        )
      );
      fetchLanguages(pagination.page, pagination.pageSize); // Refresh list after default change
    } catch (error) {
      console.error("Failed to update default language");
    }
  };

  // =============================
  // UI
  // =============================
  return (
    <div className="relative w-full bg-white theme-container min-h-screen">
      <div className="px-2 py-4">
        {/* HEADER */}
        <div className="flex flex-col sm:flex-row justify-between items-center mb-8 gap-4">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
            Language List
          </h1>

          <Search
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            placeholder="Search languages..."
          />
        </div>

        {/* TABLE */}
        <div className="bg-white border border-gray-200 rounded-md overflow-hidden">
          <div className="p-5 flex justify-between items-center border-b border-gray-100">
            <h2 className="text-lg font-semibold text-gray-800">
              Language Overview
            </h2>

            <button
              onClick={() => setIsAddLanguageOpen(true)}
              className="text-white px-4 py-2 rounded-lg bg-brand-secondary text-sm font-medium"
            >
              Add Language
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="bg-[#f1f1f1] border-b border-gray-200">
                <tr className="text-xs font-bold text-gray-600 uppercase">
                  <th className="px-6 py-4">ID</th>
                  <th className="px-6 py-4">Language</th>
                  <th className="px-6 py-4">Country</th>
                  <th className="px-6 py-4">Alignment</th>
                  <th className="px-6 py-4 text-center">Status</th>
                  <th className="px-6 py-4 text-center">Default</th>
                  <th className="px-6 py-4 text-center">Action</th>
                </tr>
              </thead>

              <tbody className="divide-y divide-gray-200">
                {loading ? (
                  <tr>
                    <td colSpan={7} className="text-center py-12">
                      Loading...
                    </td>
                  </tr>
                ) : filteredLanguages.length > 0 ? (
                  filteredLanguages.map((lang) => (
                    <tr key={lang.id} className="hover:bg-gray-50">
                      <td className="px-6 py-5">{lang.id}</td>
                      <td className="px-6 py-5 font-semibold">
                        {lang.name}
                      </td>
                      <td className="px-6 py-5">{lang.country}</td>
                      <td className="px-6 py-5">{lang.direction}</td>

                      <td className="px-6 py-5 text-center">
                        <Toggle
                          enabled={lang.status === "Active"}
                          onChange={(val) => handleStatusToggle(lang.id, val)}
                        />
                      </td>

                      <td className="px-6 py-5 text-center">
                        <Toggle
                          enabled={lang.isDefault}
                          onChange={(val) => handleDefaultToggle(lang.id, val)}
                        />
                      </td>

                      <td className="px-6 py-5 text-center flex justify-center gap-3">
                        <button onClick={() => setEditingId(lang.id)}>
                          <SquarePen size={18} />
                        </button>

                       
                       <button
  onClick={() => {
    localStorage.setItem("selectedLanguageId", lang.id);
    navigate("/translate-language");
  }}
>
  <Languages size={18} />
</button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={7} className="text-center py-12">
                      No languages found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* ============================= */}
        {/* PAGINATION (YOUR EXACT UI) */}
        {/* ============================= */}
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

      {isAddLanguageOpen && (
        <AddLanguage onClose={() => setIsAddLanguageOpen(false)} onSuccess={() => fetchLanguages(pagination.page, pagination.pageSize)}
        />
      )}

      {editingId && selectedLanguage && (
        <EditLanguage
          language={selectedLanguage}
          onClose={() => setEditingId(null)}
          onUpdate={(updated) => {
            setLanguages((prev) =>
              prev.map((lang) =>
                lang.id === updated.id ? updated : lang
              )
            );
          }}
        />
      )}
    </div>
  );
}
