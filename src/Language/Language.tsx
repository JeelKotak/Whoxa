import { useState, useRef } from "react";
import Search from "../Components/Search";
import '../Components/_theme.scss';
import { SquarePen, Languages, ChevronDown } from "lucide-react";
import AddLanguage from "./AddLanguage";
import EditLanguage from "./EditLanguage";
import { useNavigate } from "react-router-dom";

type LanguageData = {
    id: string;
    name: string;
    country: string;
    direction: "LTR" | "RTL";
    status: "Active" | "Inactive";
    isDefault: boolean;
};

export const initialLanguages: LanguageData[] = [
    { id: "#1", name: "English", country: "United States", direction: "LTR", status: "Active", isDefault: true },
    { id: "#2", name: "Arabic", country: "United Arab Emirates", direction: "RTL", status: "Active", isDefault: false },
    { id: "#3", name: "French", country: "France", direction: "LTR", status: "Active", isDefault: false },
    { id: "#4", name: "Spanish", country: "Spain", direction: "LTR", status: "Inactive", isDefault: false },
    { id: "#5", name: "German", country: "Germany", direction: "LTR", status: "Active", isDefault: false },
    { id: "#6", name: "Mandarin", country: "China", direction: "LTR", status: "Active", isDefault: false },
    { id: "#7", name: "Hindi", country: "India", direction: "LTR", status: "Active", isDefault: false },
    { id: "#8", name: "Portuguese", country: "Brazil", direction: "LTR", status: "Active", isDefault: false },
    { id: "#9", name: "Japanese", country: "Japan", direction: "LTR", status: "Active", isDefault: false },
    { id: "#10", name: "Russian", country: "Russia", direction: "LTR", status: "Active", isDefault: false },
    { id: "#11", name: "Hebrew", country: "Israel", direction: "RTL", status: "Active", isDefault: false },
];

export default function Language() {
    const [languages, setLanguages] = useState(initialLanguages);
    const [currentPage, setCurrentPage] = useState(1);
    const [searchTerm, setSearchTerm] = useState("");
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false)
    const dropdownRef = useRef<HTMLDivElement>(null);
    const [isAddLanguageOpen, setIsAddLanguageOpen] = useState(false);
    const navigate = useNavigate();

    const [editingId, setEditingId] = useState<string | null>(null);

    const handleStatusToggle = (id: string) => {
        setLanguages((prev) =>
            prev.map((lang) =>
                lang.id === id
                    ? { ...lang, status: lang.status === "Active" ? "Inactive" : "Active" }
                    : lang
            )
        );
    };

    const handleDefaultToggle = (id: string) => {
        setLanguages((prev) =>
            prev.map((lang) => ({
                ...lang,
                isDefault: lang.id === id,
                status: lang.id === id ? "Active" : lang.status
            }))
        );
    };

    const handleUpdateLanguage = (updatedLang: LanguageData) => {
        setLanguages(prev => prev.map(l => l.id === updatedLang.id ? updatedLang : l));
        setEditingId(null);
    };

    const filteredLanguages = languages.filter((lang) =>
        lang.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        lang.country.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const totalPages = Math.max(1, Math.ceil(filteredLanguages.length / rowsPerPage));
    const paginatedLanguages = filteredLanguages.slice((currentPage - 1) * rowsPerPage, currentPage * rowsPerPage);

    const selectedLanguage = languages.find(l => l.id === editingId);

    return (
        <div className="relative w-full bg-white theme-container min-h-screen">
            <div className="px-2 py-4">
                <div className="flex flex-col sm:flex-row justify-between items-center mb-8 gap-4">
                    <div>
                        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Language List</h1>
                        <nav className="flex items-center gap-2 text-sm text-gray-500 font-medium mt-1">
                            <span className="text-gray-900 cursor-pointer">List</span>
                            <span className="w-1 h-1 bg-gray-300 rounded-full" />
                            <span className="text-gray-400">Language List</span>
                        </nav>
                    </div>

                    <Search
                        searchTerm={searchTerm}
                        setSearchTerm={setSearchTerm}
                        placeholder="Search languages..."
                    />
                </div>

                <div className="bg-white border border-gray-200 rounded-md overflow-hidden">
                    <div className="p-5 flex justify-between items-center border-b border-gray-100">
                        <h2 className="text-lg font-semibold text-gray-800">Language Overview</h2>
                        <button
                            onClick={() => setIsAddLanguageOpen(true)}
                            className="flex items-center gap-2 text-white px-4 py-2 rounded-lg bg-brand-secondary text-sm font-medium">
                            <span>Add Language</span>
                        </button>
                    </div>

                    <div className="overflow-x-auto">
                        <table className="w-full text-left">
                            <thead className="bg-[#f1f1f1] border-b border-gray-200">
                                <tr className="text-xs font-bold text-gray-600 uppercase tracking-wider">
                                    <th className="px-6 py-4">ID</th>
                                    <th className="px-6 py-4">Language</th>
                                    <th className="px-6 py-4">Country</th>
                                    <th className="px-6 py-4">Language Alignment</th>
                                    <th className="px-6 py-4 text-center">Status</th>
                                    <th className="px-6 py-4 text-center">Default</th>
                                    <th className="px-6 py-4 text-center">Action</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200">
                                {paginatedLanguages.length > 0 ? (
                                    paginatedLanguages.map((lang) => (
                                        <tr key={lang.id} className="hover:bg-gray-50 transition-colors">
                                            <td className="px-6 py-5 text-sm font-medium text-gray-900">{lang.id}</td>
                                            <td className="px-6 py-5">
                                                <p className="text-sm font-semibold text-gray-800">{lang.name}</p>
                                            </td>
                                            <td className="px-6 py-5 text-sm text-gray-600">{lang.country}</td>
                                            <td className="px-6 py-5 text-sm text-gray-600">{lang.direction}</td>
                                            <td className="px-6 py-5">
                                                <div className="flex justify-center">
                                                    <button
                                                        onClick={() => handleStatusToggle(lang.id)}
                                                        className={`relative inline-flex h-6 w-11 rounded-full border-2 border-transparent transition-colors duration-200 ${lang.status === "Active" ? "bg-brand-secondary" : "bg-gray-200"}`}
                                                    >
                                                        <span className={`inline-block h-5 w-5 transform rounded-full bg-white transition duration-200 ${lang.status === "Active" ? "translate-x-5" : "translate-x-0"}`} />
                                                    </button>
                                                </div>
                                            </td>
                                            <td className="px-6 py-5">
                                                <div className="flex justify-center">
                                                    <button
                                                        onClick={() => handleDefaultToggle(lang.id)}
                                                        className={`relative inline-flex h-6 w-11 rounded-full border-2 border-transparent transition-colors duration-200 ${lang.isDefault ? "bg-brand-secondary" : "bg-gray-200"}`}
                                                    >
                                                        <span className={`inline-block h-5 w-5 transform rounded-full bg-white transition duration-200 ${lang.isDefault ? "translate-x-5" : "translate-x-0"}`} />
                                                    </button>
                                                </div>
                                            </td>
                                            <td className="px-6 py-5">
                                                <div className="flex justify-center items-center gap-3">
                                                    <button
                                                        onClick={() => setEditingId(lang.id)}
                                                        className="px-2 py-1 text-gray-500 cursor-pointer"
                                                    >
                                                        <SquarePen size={22} />
                                                    </button>
                                                    <button
                                                        onClick={() => navigate('/translate-language')}
                                                        className="px-2 py-1 text-gray-500 cursor-pointer">
                                                        <Languages size={22} />
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan={7} className="px-6 py-16 text-center text-gray-400 italic">No languages found.</td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Pagination */}
                <div className="flex flex-col md:flex-row items-center justify-between mt-6 gap-4 text-sm text-gray-600 mb-10">
                    <div className="flex items-center gap-2">
                        <span className="text-gray-700">Rows per page</span>
                        <div className="relative" ref={dropdownRef}>
                            <button
                                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                                className={`flex items-center justify-between border rounded-md px-2 py-1 text-xs outline-none cursor-pointer w-12 h-8 transition-all duration-200 
                  ${isDropdownOpen ? "bg-white border-blue-600 shadow-sm" : "bg-gray-200 border-gray-300 hover:border-gray-400"}`}
                            >
                                {rowsPerPage}
                                <ChevronDown size={14} className={`transition-transform duration-200 ${isDropdownOpen ? "rotate-180" : "rotate-0"}`} />
                            </button>
                            {isDropdownOpen && (
                                <ul className="absolute bottom-full mb-1 left-0 w-full bg-white border border-gray-300 rounded-md shadow-lg overflow-hidden z-20">
                                    {[5, 10, 20, 30].map((val) => (
                                        <li
                                            key={val}
                                            onClick={() => {
                                                setRowsPerPage(val);
                                                setCurrentPage(1);
                                                setIsDropdownOpen(false);
                                            }}
                                            className="px-2 py-1 text-sm hover:bg-indigo-50 hover:text-indigo-600 cursor-pointer text-center"
                                        >
                                            {val}
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </div>
                    </div>

                    <div className="flex items-center gap-4">
                        <span className="text-gray-700">Page {currentPage} of {totalPages}</span>
                        <div className="flex items-center gap-1">
                            <button onClick={() => setCurrentPage(1)} disabled={currentPage === 1} className={`p-1.5 border border-gray-300 rounded-md ${currentPage === 1 ? 'text-gray-400' : 'text-gray-700 hover:bg-gray-100 cursor-pointer'}`}>
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="11 17 6 12 11 7"></polyline><polyline points="18 17 13 12 18 7"></polyline></svg>
                            </button>
                            <button onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))} disabled={currentPage === 1} className={`p-1.5 border border-gray-300 rounded-md ${currentPage === 1 ? 'text-gray-400' : 'text-gray-700 hover:bg-gray-100 cursor-pointer'}`}>
                                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M15 18l-6-6 6-6" /></svg>
                            </button>
                            <button onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))} disabled={currentPage === totalPages} className={`p-1.5 border border-gray-300 rounded-md ${currentPage === totalPages ? 'text-gray-400' : 'text-gray-700 hover:bg-gray-100 cursor-pointer'}`}>
                                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 18l6-6-6-6" /></svg>
                            </button>
                            <button onClick={() => setCurrentPage(totalPages)} disabled={currentPage === totalPages} className={`p-1.5 border border-gray-300 rounded-md ${currentPage === totalPages ? 'text-gray-400' : 'text-gray-700 hover:bg-gray-100 cursor-pointer'}`}>
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="13 17 18 12 13 7"></polyline><polyline points="6 17 11 12 6 7"></polyline></svg>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            {isAddLanguageOpen && (
                <AddLanguage onClose={() => setIsAddLanguageOpen(false)} />
            )}
            {editingId && selectedLanguage && (
                <EditLanguage
                    language={selectedLanguage}
                    onClose={() => setEditingId(null)}
                    onUpdate={handleUpdateLanguage}
                />
            )}
        </div>  
    );
}