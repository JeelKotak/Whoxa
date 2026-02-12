import { useState, useEffect, useRef } from "react";
import { ChevronDown } from "lucide-react";
import '../Components/_theme.scss';
import Search from "../Components/Search";

const groups = [
    { orderId: "#13", name: "College Legends", avatar: "https://api.dicebear.com/7.x/identicon/svg?seed=college", createdDate: "Dec 5, 2025", blockedTo: "Campus Security" },
    { orderId: "#4", name: "RouteRangers", avatar: "https://api.dicebear.com/7.x/identicon/svg?seed=route", createdDate: "Nov 4, 2025", blockedTo: "Local Traffic" },
    { orderId: "#12", name: "Study Buddies", avatar: "https://api.dicebear.com/7.x/identicon/svg?seed=study", createdDate: "Oct 12, 2025", blockedTo: "Library Staff" },
    { orderId: "#11", name: "Fitness Fanatics", avatar: "https://api.dicebear.com/7.x/identicon/svg?seed=gym", createdDate: "Sep 20, 2025", blockedTo: "Gym Management" },
    { orderId: "#10", name: "Foodie Finds", avatar: "https://api.dicebear.com/7.x/identicon/svg?seed=food", createdDate: "Aug 15, 2025", blockedTo: "Restaurant Row" },
    { orderId: "#9", name: "Dev Ops", avatar: "https://api.dicebear.com/7.x/identicon/svg?seed=code", createdDate: "Jul 30, 2025", blockedTo: "Main Server" },
    { orderId: "#8", name: "Book Worms", avatar: "https://api.dicebear.com/7.x/identicon/svg?seed=books", createdDate: "Jul 01, 2025", blockedTo: "Archive Dept" },
    { orderId: "#7", name: "Travel Tips", avatar: "https://api.dicebear.com/7.x/identicon/svg?seed=travel", createdDate: "Jun 15, 2025", blockedTo: "Agency Portal" },
    { orderId: "#6", name: "Art Alley", avatar: "https://api.dicebear.com/7.x/identicon/svg?seed=art", createdDate: "May 22, 2025", blockedTo: "Gallery Admin" },
    { orderId: "#5", name: "Gaming Hub", avatar: "https://api.dicebear.com/7.x/identicon/svg?seed=game", createdDate: "May 05, 2025", blockedTo: "Discord Bot" },
    { orderId: "#3", name: "Music Makers", avatar: "https://api.dicebear.com/7.x/identicon/svg?seed=music", createdDate: "Apr 18, 2025", blockedTo: "Studio B" },
    { orderId: "#2", name: "Garden Squad", avatar: "https://api.dicebear.com/7.x/identicon/svg?seed=garden", createdDate: "Mar 10, 2025", blockedTo: "Park Services" },
    { orderId: "#1", name: "Startup Lab", avatar: "https://api.dicebear.com/7.x/identicon/svg?seed=startup", createdDate: "Feb 28, 2025", blockedTo: "Investor Suite" }
];

export default function BlockList() {
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [currentPage, setCurrentPage] = useState(1);
    const [searchTerm, setSearchTerm] = useState("");
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsDropdownOpen(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const filteredInvoices = groups.filter((inv) =>
        inv.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const totalPages = Math.max(1, Math.ceil(filteredInvoices.length / rowsPerPage));
    const paginatedInvoices = filteredInvoices.slice((currentPage - 1) * rowsPerPage, currentPage * rowsPerPage);

    return (
        <div className="w-full bg-white text-[#111827] theme-container">
            <div className="px-2 pt-4 pb-12">
                {/* Header */}
                <div className="flex flex-col sm:flex-row justify-between items-start gap-4 mb-6">
                    <div>
                        <h1 className="text-3xl font-bold">Block List</h1>
                        <nav className="flex items-center gap-2 text-sm text-black font-medium mt-1">
                            <span>List</span>
                            <span className="w-1 h-1 bg-gray-300 rounded-full" />
                            <span className="text-gray-500">Block List</span>
                        </nav>
                    </div>
                    <Search searchTerm={searchTerm} setSearchTerm={setSearchTerm} placeholder="Search groups..." />
                </div>

                {/* Table */}
                <div className="border border-gray-200 rounded-md overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead className="bg-gray-50 border-b border-gray-200">
                                <tr className="text-xs font-bold text-gray-500 uppercase tracking-wider">
                                    <th className="px-6 py-4 whitespace-nowrap">ID</th>
                                    <th className="px-6 py-4 whitespace-nowrap">Date</th>
                                    <th className="px-6 py-4">Blocked By</th>
                                    <th className="px-6 py-4 text-center">Blocked To</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100">
                                {paginatedInvoices.map((inv) => (
                                    <tr key={inv.orderId} className="hover:bg-gray-50 transition-colors whitespace-nowrap">
                                        <td className="px-6 py-4 font-medium">{inv.orderId}</td>
                                        <td className="px-6 py-4 text-gray-600">{inv.createdDate}</td>
                                        <td className="px-6 py-4">
                                            <div className="flex gap-3">
                                                <img src={inv.avatar} className="w-8 h-8 rounded-full" alt="" />
                                                <span className="font-semibold text-gray-900">{inv.name}</span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 text-gray-600">
                                            {inv.blockedTo}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Pagination Controls */}
                <div className="flex flex-col md:flex-row items-center justify-between mt-6 gap-4 text-sm text-gray-600 mb-10">
                    <div className="flex items-center gap-2">
                        <span className="text-gray-700">Rows per page</span>
                        <div className="relative" ref={dropdownRef}>
                            <button
                                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                                className={`flex items-center justify-between border rounded-md px-2 py-1 text-xs outline-none cursor-pointer w-14 h-8 transition-all duration-200 
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
                                            className="px-2 py-1.5 text-sm hover:bg-indigo-50 hover:text-indigo-600 cursor-pointer text-center"
                                        >
                                            {val}
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </div>
                    </div>

                    <div className="flex items-center gap-4">
                        <span className="text-gray-700 font-medium">Page {currentPage} of {totalPages}</span>
                        <div className="flex items-center gap-1">
                            <button
                                onClick={() => setCurrentPage(1)}
                                disabled={currentPage === 1}
                                className={`p-1.5 border border-gray-300 rounded-md ${currentPage === 1 ? 'text-gray-300' : 'text-gray-700 hover:bg-gray-100 cursor-pointer'}`}
                            >
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="11 17 6 12 11 7"></polyline><polyline points="18 17 13 12 18 7"></polyline></svg>
                            </button>
                            <button
                                onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                                disabled={currentPage === 1}
                                className={`p-1.5 border border-gray-300 rounded-md ${currentPage === 1 ? 'text-gray-300' : 'text-gray-700 hover:bg-gray-100 cursor-pointer'}`}
                            >
                                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M15 18l-6-6 6-6" /></svg>
                            </button>
                            <button
                                onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                                disabled={currentPage === totalPages}
                                className={`p-1.5 border border-gray-300 rounded-md ${currentPage === totalPages ? 'text-gray-300' : 'text-gray-700 hover:bg-gray-100 cursor-pointer'}`}
                            >
                                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 18l6-6-6-6" /></svg>
                            </button>
                            <button
                                onClick={() => setCurrentPage(totalPages)}
                                disabled={currentPage === totalPages}
                                className={`p-1.5 border border-gray-300 rounded-md ${currentPage === totalPages ? 'text-gray-300' : 'text-gray-700 hover:bg-gray-100 cursor-pointer'}`}
                            >
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="13 17 18 12 13 7"></polyline><polyline points="6 17 11 12 6 7"></polyline></svg>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}