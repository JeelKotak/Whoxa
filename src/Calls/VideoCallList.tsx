import { useState, useEffect, useRef } from "react";
import { ChevronDown } from "lucide-react";
import '../Components/_theme.scss';
import Search from "../Components/Search";

const groups = [
    { 
        orderId: "#626", 
        caller: "Manuel Langworth", 
        callerAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Manuel", 
        chatName: "Music Makers", 
        chatAvatar: "https://api.dicebear.com/7.x/identicon/svg?seed=music", 
        chatType: "group Chat",
        status: "Completed", 
        duration: "680", 
        createdAt: "January 23, 2026" 
    },
    { 
        orderId: "#625", 
        caller: "Sherry Weber", 
        callerAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sherry", 
        chatName: "Garden Squad", 
        chatAvatar: "https://api.dicebear.com/7.x/identicon/svg?seed=garden", 
        chatType: "direct Chat",
        status: "Missed", 
        duration: "0", 
        createdAt: "January 23, 2026" 
    },
    { 
        orderId: "#624", 
        caller: "Kelli Mitchell", 
        callerAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Kelli", 
        chatName: "Startup Lab", 
        chatAvatar: "https://api.dicebear.com/7.x/identicon/svg?seed=startup", 
        chatType: "group Chat",
        status: "Completed", 
        duration: "1450", 
        createdAt: "January 22, 2026" 
    },
    { 
        orderId: "#623", 
        caller: "Mattie Miller", 
        callerAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Mattie", 
        chatName: "College Legends", 
        chatAvatar: "https://api.dicebear.com/7.x/identicon/svg?seed=college", 
        chatType: "group Chat",
        status: "Missed", 
        duration: "0", 
        createdAt: "January 22, 2026" 
    },
    { 
        orderId: "#622", 
        caller: "Ricardo Kling", 
        callerAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Ricardo", 
        chatName: "RouteRangers", 
        chatAvatar: "https://api.dicebear.com/7.x/identicon/svg?seed=route", 
        chatType: "direct Chat",
        status: "Completed", 
        duration: "230", 
        createdAt: "January 21, 2026" 
    }
];

export default function VideoCallList() {
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

    const filteredCalls = groups.filter((inv) =>
        inv.chatName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        inv.caller.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const totalPages = Math.max(1, Math.ceil(filteredCalls.length / rowsPerPage));
    const paginatedCalls = filteredCalls.slice((currentPage - 1) * rowsPerPage, currentPage * rowsPerPage);

    return (
        <div className="w-full bg-white text-[#111827] theme-container font-sans">
            <div className="px-2 pt-4 pb-12">
                {/* Header */}
                <div className="flex flex-col sm:flex-row justify-between items-start gap-4 mb-6">
                    <div>
                        <h1 className="text-3xl font-bold">Video Call List</h1>
                        <nav className="flex items-center gap-2 text-sm font-medium mt-1">
                            <span className="text-black">Calls</span>
                            <span className="w-1.5 h-1.5 bg-gray-300 rounded-full" />
                            <span className="text-gray-500 font-normal">Video Call List</span>
                        </nav>
                    </div>
                    <Search searchTerm={searchTerm} setSearchTerm={setSearchTerm} placeholder="Search calls..." />
                </div>

                {/* Table */}
                <div className="border border-gray-200 rounded-lg overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead className="bg-gray-50 border-b border-gray-200">
                                <tr className="text-[11px] font-bold text-gray-500 uppercase tracking-wider">
                                    <th className="px-6 py-4">ID</th>
                                    <th className="px-6 py-4">Caller</th>
                                    <th className="px-6 py-4">Chat</th>
                                    <th className="px-6 py-4">Call Status</th>
                                    <th className="px-6 py-4">Call Duration(sec)</th>
                                    <th className="px-6 py-4">Created At</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100 bg-white">
                                {paginatedCalls.map((inv) => (
                                    <tr key={inv.orderId} className="hover:bg-gray-50 transition-colors whitespace-nowrap">
                                        {/* ID Column */}
                                        <td className="px-6 py-5 text-sm text-gray-700 font-medium">
                                            {inv.orderId}
                                        </td>
                                        
                                        {/* Caller Column */}
                                        <td className="px-6 py-5">
                                            <div className="flex items-center gap-3">
                                                <img src={inv.callerAvatar} className="w-9 h-9 rounded-full bg-amber-100" alt="caller" />
                                                <span className="text-sm font-semibold text-gray-900">{inv.caller}</span>
                                            </div>
                                        </td>

                                        {/* Chat Column */}
                                        <td className="px-6 py-5">
                                            <div className="flex items-center gap-3">
                                                <img src={inv.chatAvatar} className="w-9 h-9 rounded-full bg-green-50" alt="chat-icon" />
                                                <div>
                                                    <div className="text-sm font-semibold text-gray-900 leading-tight">{inv.chatName}</div>
                                                    <div className="text-[11px] text-gray-400 font-medium">{inv.chatType}</div>
                                                </div>
                                            </div>
                                        </td>

                                        {/* Call Status Column */}
                                        <td className="px-6 py-5">
                                            <span className={`px-2.5 py-0.5 rounded-full text-[11px] font-bold ${
                                                inv.status === 'Missed' 
                                                ? 'bg-red-200 text-red-500' 
                                                : 'bg-green-200 text-green-500'
                                            }`}>
                                                {inv.status}
                                            </span>
                                        </td>

                                        {/* Duration Column */}
                                        <td className="px-6 py-5 text-sm text-gray-600">
                                            {inv.duration}
                                        </td>

                                        {/* Created At Column */}
                                        <td className="px-6 py-5 text-sm text-gray-600">
                                            {inv.createdAt}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Pagination Controls */}
                <div className="flex flex-col md:flex-row items-center justify-between mt-6 gap-4 text-sm text-gray-600">
                    <div className="flex items-center gap-2">
                        <span className="text-gray-700">Rows per page</span>
                        <div className="relative" ref={dropdownRef}>
                            <button
                                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                                className={`flex items-center justify-between border rounded-md px-2 py-1 text-xs outline-none cursor-pointer w-14 h-8 transition-all duration-200 
                                ${isDropdownOpen ? "bg-white border-blue-600" : "bg-gray-100 border-gray-300 hover:border-gray-400"}`}
                            >
                                {rowsPerPage}
                                <ChevronDown size={14} className={`transition-transform duration-200 ${isDropdownOpen ? "rotate-180" : "rotate-0"}`} />
                            </button>
                            {isDropdownOpen && (
                                <ul className="absolute bottom-full mb-1 left-0 w-full bg-white border border-gray-300 rounded-md overflow-hidden z-20">
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
                                className={`p-1.5 border border-gray-300 rounded-md ${currentPage === 1 ? 'text-gray-200' : 'text-gray-700 hover:bg-gray-50'}`}
                            >
                                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="11 17 6 12 11 7"></polyline><polyline points="18 17 13 12 18 7"></polyline></svg>
                            </button>
                            <button 
                                onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))} 
                                disabled={currentPage === 1}
                                className={`p-1.5 border border-gray-300 rounded-md ${currentPage === 1 ? 'text-gray-200' : 'text-gray-700 hover:bg-gray-50'}`}
                            >
                                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M15 18l-6-6 6-6" /></svg>
                            </button>
                            <button 
                                onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))} 
                                disabled={currentPage === totalPages}
                                className={`p-1.5 border border-gray-300 rounded-md ${currentPage === totalPages ? 'text-gray-200' : 'text-gray-700 hover:bg-gray-50'}`}
                            >
                                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 18l6-6-6-6" /></svg>
                            </button>
                            <button 
                                onClick={() => setCurrentPage(totalPages)} 
                                disabled={currentPage === totalPages}
                                className={`p-1.5 border border-gray-300 rounded-md ${currentPage === totalPages ? 'text-gray-200' : 'text-gray-700 hover:bg-gray-50'}`}
                            >
                                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="13 17 18 12 13 7"></polyline><polyline points="6 17 11 12 6 7"></polyline></svg>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}