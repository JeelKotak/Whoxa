import { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import '../Components/_theme.scss';
import { useNavigate } from "react-router-dom";

const translationsData = [
    { id: "#1", label: "Select your Language", value: "Select your Language" },
    { id: "#2", label: "Next", value: "Next" },
    { id: "#3", label: "Enter Min Price", value: "Enter Min Price" },
    { id: "4", label: "Home", value: "Home" },
    { id: "5", label: "Booking", value: "Booking" },
    { id: "6", label: "Product", value: "Product" },
    { id: "7", label: "Chat", value: "Chat" },
    { id: "8", label: "Profile", value: "Profile" },
    { id: "9", label: "Hello", value: "Hello" },
];

export default function TranslateLanguage() {
    const [languages, setLanguages] = useState(translationsData);
    const [currentPage, setCurrentPage] = useState(1);
    const [searchTerm] = useState("");
    const [rowsPerPage] = useState(10);
    const navigate = useNavigate();

    const filteredLanguages = languages.filter((lang) =>
        lang.label.toLowerCase().includes(searchTerm.toLowerCase()) ||
        lang.value.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const totalPages = Math.max(1, Math.ceil(filteredLanguages.length / rowsPerPage));
    const paginatedLanguages = filteredLanguages.slice((currentPage - 1) * rowsPerPage, currentPage * rowsPerPage);

    const handleTranslateAll = () => {
        toast.error("You are not allowed to change anything in demo version", {
            duration: 1500,
            position: "top-right",
            style: {
                background: "#522699",
                color: "#fff",
                borderRadius: "10px",
                fontSize: "14px",
                fontWeight: "bold"
            },
        });
    };

    return (
        <div className="w-full bg-white min-h-screen theme-container">
            <Toaster />

            <div className="px-2 py-4 pb-12">
                <div className="flex flex-col sm:flex-row justify-between items-center mb-8 gap-4">
                    <div>
                        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Language Translation</h1>
                        <nav className="flex items-center gap-2 text-sm font-medium mt-1">
                            <a className="hover:text-blue-600 cursor-pointer">List</a>
                            <p className='bg-gray-500 w-1 h-1 rounded-full' />
                            <button onClick={() => navigate('/language-list')} className="text-black cursor-pointer hover:underline">Language</button>
                            <span className="text-gray-300 font-bold">·</span>
                            <span className="text-gray-400">Translate Language</span>
                        </nav>
                    </div>
                </div>

                <div className="bg-white border border-gray-200 rounded-xl overflow-hidden ">
                    <div className="p-5 flex justify-between items-center border-b border-gray-100">
                        <h2 className="text-lg font-semibold text-gray-800">Language Overview</h2>
                        <div className="flex gap-2">
                            <button
                                onClick={handleTranslateAll}
                                className="flex items-center gap-2 text-white px-4 py-2 rounded-lg bg-brand-secondary text-sm font-medium"
                            >
                                <span>Translate all</span>
                            </button>
                        </div>
                    </div>

                    <div className="overflow-x-auto">
                        <table className="w-full min-w-[800px] text-left">
                            <thead className="bg-[#f1f1f1] border-b border-gray-200">
                                <tr className="text-xs font-bold text-gray-600 uppercase tracking-wider">
                                    <th className="px-6 py-4">ID</th>
                                    <th className="px-6 py-4">Word</th>
                                    <th className="px-6 py-4">Translation</th>
                                    <th className="px-6 py-4 text-center">Action</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200">
                                {paginatedLanguages.map((lang) => (
                                    <tr key={lang.id} className="hover:bg-gray-50 transition-colors">
                                        <td className="px-6 py-5 text-sm text-gray-600">{lang.id}</td>
                                        <td className="px-6 py-5">
                                            <input
                                                type="text"
                                                value={lang.label}
                                                onChange={(e) => {
                                                    const newValue = e.target.value;
                                                    setLanguages(prev => prev.map(item =>
                                                        item.id === lang.id ? { ...item, label: newValue } : item
                                                    ));
                                                }}
                                                className="w-full p-2 bg-gray-50 border border-gray-200 rounded-lg text-sm font-md text-gray-800 outline-none focus:ring-1 focus:ring-blue-500"
                                            />
                                        </td>
                                        <td className="px-6 py-5">
                                            <input
                                                type="text"
                                                value={lang.value}
                                                onChange={(e) => {
                                                    const newValue = e.target.value;
                                                    setLanguages(prev => prev.map(item =>
                                                        item.id === lang.id ? { ...item, value: newValue } : item
                                                    ));
                                                }}
                                                className="w-full max-w-[300px] p-2 bg-gray-50 border border-gray-200 rounded-lg text-sm text-gray-800 outline-none focus:ring-1 focus:ring-blue-500"
                                            />
                                        </td>
                                        <td className="px-6 py-5">
                                            <div className="flex items-center justify-center gap-2">
                                                <button
                                                    onClick={handleTranslateAll}
                                                    className="px-3 py-1.5 text-xs font-bold border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
                                                >
                                                    Translate
                                                </button>
                                                <button
                                                    onClick={handleTranslateAll}
                                                    className="px-3 py-1.5 text-xs font-bold border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
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

                {/* Pagination (Keeping your existing logic) */}
                <div className="flex flex-col md:flex-row justify-between items-center gap-4 py-8">
                    <div className="text-sm text-gray-500 font-medium">
                        Showing <span className="text-gray-900 font-bold">{paginatedLanguages.length}</span> of <span className="text-gray-900 font-bold">{filteredLanguages.length}</span> Translations
                    </div>
                    <div className="flex items-center gap-2">
                        <button onClick={() => setCurrentPage(1)} disabled={currentPage === 1} className="p-2 border border-gray-300 rounded-lg disabled:opacity-30">
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="11 17 6 12 11 7"></polyline><polyline points="18 17 13 12 18 7"></polyline></svg>
                        </button>
                        <button onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))} disabled={currentPage === 1} className="p-2 border border-gray-300 rounded-lg disabled:opacity-30">
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M15 18l-6-6 6-6" /></svg>
                        </button>
                        <button onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))} disabled={currentPage === totalPages} className="p-2 border border-gray-300 rounded-lg disabled:opacity-30">
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 18l6-6-6-6" /></svg>
                        </button>
                        <button onClick={() => setCurrentPage(totalPages)} disabled={currentPage === totalPages} className="p-2 border border-gray-300 rounded-lg disabled:opacity-30">
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="13 17 18 12 13 7"></polyline><polyline points="6 17 11 12 6 7"></polyline></svg>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}