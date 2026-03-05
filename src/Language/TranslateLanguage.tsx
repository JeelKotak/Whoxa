import { useEffect, useState, useMemo } from "react";
import toast, { Toaster } from "react-hot-toast";
import "../Components/_theme.scss";
import { useNavigate } from "react-router-dom";
import useApi from "../hooks/useApiPost";
import TranslateAllModal from "./TranslateAllModal";

interface TranslationItem {
  key_id: number;
  key: string;
  Translation: string;
}

export default function TranslateLanguage() {
  const navigate = useNavigate();
  const { post, loading } = useApi();

  const language_id = localStorage.getItem("selectedLanguageId") || "2"; // Default to "2" if not set

  const [languages, setLanguages] = useState<TranslationItem[]>([]);
  const [originalTranslations, setOriginalTranslations] = useState<
    Record<number, string>
  >({});

  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 10;

  const [showTranslateModal, setShowTranslateModal] = useState(false);

  /* ---------------------------------- API --------------------------------- */

  const fetchTranslations = async () => {
    try {
      const res = await post("/language/get-language-words", {
        language_id,
      });

      if (res?.status) {
        const records = res.data.Records || [];

        setLanguages(records);

        const original: Record<number, string> = {};
        records.forEach((item: TranslationItem) => {
          original[item.key_id] = item.Translation;
        });

        setOriginalTranslations(original);
      }
    } catch (error) {
      toast.error("Failed to fetch translations");
      console.error(error);
    }
  };

  useEffect(() => {
    fetchTranslations();
  }, []);

  /* ---------------------------- Helper Functions --------------------------- */

  const isChanged = (item: TranslationItem) =>
    originalTranslations[item.key_id] !== item.Translation;

  const updateLocalTranslation = (id: number, value: string) => {
    setLanguages((prev) =>
      prev.map((item) =>
        item.key_id === id ? { ...item, Translation: value } : item
      )
    );
  };

  /* ---------------------------- Individual Update -------------------------- */

  const handleUpdate = async (item: TranslationItem) => {
    try {
      const res = await post("/admin/manual-edit-keyword", {
        language_id,
        key_id: item.key_id,
        key: item.Translation,
      });

      if (res?.status) {
        toast.success("Translation updated");

        setOriginalTranslations((prev) => ({
          ...prev,
          [item.key_id]: item.Translation,
        }));
      }
    } catch (error) {
      toast.error("Failed to update translation");
      console.error(error);
    }
  };

  /* --------------------------- Auto Translate API -------------------------- */

  const handleAutoTranslate = async (item: TranslationItem) => {
    try {
      const res = await post("/admin/translate-single-keyword", {
        language_id,
        key_id: item.key_id,
        key: item.key,
      });

      if (res?.status) {
        const translatedValue = res.data?.translation || item.Translation;

        updateLocalTranslation(item.key_id, translatedValue);

        setOriginalTranslations((prev) => ({
          ...prev,
          [item.key_id]: translatedValue,
        }));

        toast.success("Translated successfully");
      }
    } catch (error) {
      toast.error("Translation failed");
      console.error(error);
    }
  };

  /* ------------------------------ Pagination ------------------------------- */

  const totalPages = Math.max(1, Math.ceil(languages.length / rowsPerPage));

  const paginatedLanguages = useMemo(
    () =>
      languages.slice(
        (currentPage - 1) * rowsPerPage,
        currentPage * rowsPerPage
      ),
    [languages, currentPage]
  );

  /* ------------------------------------------------------------------------- */

  return (
    <>
      <div className="w-full bg-white min-h-screen theme-container">
        <Toaster />

        <div className="px-2 py-4 pb-12">
          {/* Header */}

          <div className="flex flex-col sm:flex-row justify-between items-center mb-8 gap-4">
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
                Language Translation
              </h1>

              <nav className="flex items-center gap-2 text-sm font-medium mt-1">
                <span className="cursor-pointer hover:text-blue-600">
                  List
                </span>

                <p className="bg-gray-500 w-1 h-1 rounded-full" />

                <button
                  onClick={() => navigate("/language-list")}
                  className="text-black hover:underline"
                >
                  Language
                </button>

                <span className="text-gray-300 font-bold">·</span>

                <span className="text-gray-400">
                  Translate Language
                </span>
              </nav>
            </div>
          </div>

          {/* Table */}

          <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
            <div className="p-5 flex justify-between items-center border-b border-gray-100">
              <h2 className="text-lg font-semibold text-gray-800">
                Language Overview
              </h2>

              <button
                onClick={() => setShowTranslateModal(true)}
                className="flex items-center gap-2 text-white px-4 py-2 rounded-lg bg-brand-secondary text-sm font-medium"
              >
                Translate All
              </button>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full min-w-[800px] text-left">
                <thead className="bg-[#f1f1f1] border-b border-gray-200">
                  <tr className="text-xs font-bold text-gray-600 uppercase">
                    <th className="px-6 py-4">ID</th>
                    <th className="px-6 py-4">Word</th>
                    <th className="px-6 py-4">Translation</th>
                    <th className="px-6 py-4 text-center">Action</th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-gray-200">
                  {paginatedLanguages.map((lang) => (
                    <tr key={lang.key_id} className="hover:bg-gray-50">
                      <td className="px-6 py-5 text-sm text-gray-600">
                        {lang.key_id}
                      </td>

                      <td className="px-6 py-5">
                        <input
                          type="text"
                          value={lang.key}
                          disabled
                          className="w-full p-2 bg-gray-100 border border-gray-200 rounded-lg text-sm"
                        />
                      </td>

                      <td className="px-6 py-5">
                        <input
                          type="text"
                          value={lang.Translation}
                          onChange={(e) =>
                            updateLocalTranslation(
                              lang.key_id,
                              e.target.value
                            )
                          }
                          className="w-full max-w-[300px] p-2 bg-gray-50 border border-gray-200 rounded-lg text-sm"
                        />
                      </td>

                      <td className="px-6 py-5">
                        <div className="flex justify-center gap-2">
                          <button
                            onClick={() =>
                              handleAutoTranslate(lang)
                            }
                            className="px-3 py-1.5 text-xs font-semibold text-white bg-brand-secondary rounded-lg"
                          >
                            Translate
                          </button>

                          <button
                            disabled={!isChanged(lang)}
                            onClick={() => handleUpdate(lang)}
                            className={`px-3 py-1.5 text-xs font-semibold rounded-lg text-white
                              ${
                                isChanged(lang)
                                  ? "bg-red-500"
                                  : "bg-gray-300 cursor-not-allowed"
                              }`}
                          >
                            Update
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Pagination */}

          <div className="flex flex-col sm:flex-row justify-between items-center gap-4 py-8">
            <div className="text-sm text-gray-500 font-medium">
              Showing{" "}
              <span className="text-gray-900 font-bold">
                {(currentPage - 1) * rowsPerPage + 1}
              </span>{" "}
              to{" "}
              <span className="text-gray-900 font-bold">
                {Math.min(currentPage * rowsPerPage, languages.length)}
              </span>{" "}
              of{" "}
              <span className="text-gray-900 font-bold">
                {languages.length}
              </span>{" "}
              results
            </div>

            <div className="flex items-center gap-1">
              <button
                disabled={currentPage === 1}
                onClick={() =>
                  setCurrentPage((prev) => prev - 1)
                }
                className="px-3 py-1 border rounded-md text-sm disabled:opacity-40"
              >
                Previous
              </button>

              {Array.from({ length: totalPages }, (_, i) => i + 1)
                .slice(
                  Math.max(0, currentPage - 3),
                  Math.min(totalPages, currentPage + 2)
                )
                .map((page) => (
                  <button
                    key={page}
                    onClick={() => setCurrentPage(page)}
                    className={`px-3 py-1 border rounded-md text-sm ${
                      currentPage === page
                        ? "bg-brand-secondary text-white"
                        : ""
                    }`}
                  >
                    {page}
                  </button>
                ))}

              <button
                disabled={currentPage === totalPages}
                onClick={() =>
                  setCurrentPage((prev) => prev + 1)
                }
                className="px-3 py-1 border rounded-md text-sm disabled:opacity-40"
              >
                Next
              </button>
            </div>
          </div>
        </div>
      </div>

      {showTranslateModal && (
        <TranslateAllModal
          onClose={() => setShowTranslateModal(false)}
          onSuccess={fetchTranslations}
        />
      )}
    </>
  );
}