import { useState, useEffect, useRef } from "react";
import { ChevronDown } from "lucide-react";
import '../Components/_theme.scss';
import Search from "../Components/Search";
import PushNotificationAdd from "./PushNotificationAdd";

const notifications = [
    { 
        id: "#626", 
        title: "New Album Alert!", 
        message: "Music Makers just released a new track. Check it out now!", 
        views: "1,240", 
        createdAt: "January 23, 2026" 
    },
    { 
        id: "#625", 
        title: "Garden Tips", 
        message: "Sherry shared a new tip: 'Best time to water your succulents.'", 
        views: "850", 
        createdAt: "January 23, 2026" 
    },
    { 
        id: "#624", 
        title: "Pitch Deck Updated", 
        message: "Kelli uploaded the latest version of the Q1 Pitch Deck.", 
        views: "3,100", 
        createdAt: "January 22, 2026" 
    },
    { 
        id: "#623", 
        title: "Flashback Friday", 
        message: "Mattie posted a photo from the 2018 reunion. Take a look!", 
        views: "2,150", 
        createdAt: "January 22, 2026" 
    },
    { 
        id: "#622", 
        title: "Route Changed", 
        message: "Ricardo updated the trail map for tomorrow's hike.", 
        views: "420", 
        createdAt: "January 21, 2026" 
    },
    { 
        id: "#626", 
        title: "New Album Alert!", 
        message: "Music Makers just released a new track. Check it out now!", 
        views: "1,240", 
        createdAt: "January 23, 2026" 
    },
    { 
        id: "#625", 
        title: "Garden Tips", 
        message: "Sherry shared a new tip: 'Best time to water your succulents.'", 
        views: "850", 
        createdAt: "January 23, 2026" 
    },
    { 
        id: "#624", 
        title: "Pitch Deck Updated", 
        message: "Kelli uploaded the latest version of the Q1 Pitch Deck.", 
        views: "3,100", 
        createdAt: "January 22, 2026" 
    },
    { 
        id: "#623", 
        title: "Flashback Friday", 
        message: "Mattie posted a photo from the 2018 reunion. Take a look!", 
        views: "2,150", 
        createdAt: "January 22, 2026" 
    },
    { 
        id: "#622", 
        title: "Route Changed", 
        message: "Ricardo updated the trail map for tomorrow's hike.", 
        views: "420", 
        createdAt: "January 21, 2026" 
    }
];

export default function PushNotificationList() {
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [currentPage, setCurrentPage] = useState(1);
    const [searchTerm, setSearchTerm] = useState("");
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    const [isAddNotificationOpen, setIsAddNotificationOpen] = useState(false);

    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsDropdownOpen(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    // Filter based on Title or Message
    const filteredNotifications = notifications.filter((item) =>
        item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.message.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const totalPages = Math.max(1, Math.ceil(filteredNotifications.length / rowsPerPage));
    const paginatedData = filteredNotifications.slice(
        (currentPage - 1) * rowsPerPage, 
        currentPage * rowsPerPage
    );

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
                            <span className="text-gray-500 font-normal">Push Notification List</span>
                        </nav>
                    </div>
                    <Search searchTerm={searchTerm} setSearchTerm={setSearchTerm} placeholder="Search notifications..." />
                </div>

                {/* Table */}
                <div className="border border-gray-200 rounded-lg overflow-hidden">
                    <div className="p-5 flex justify-between items-center border-b border-gray-100">
                        <h2 className="text-lg font-semibold text-gray-800">Avatar Overview</h2>
                        <button
                            onClick={() => setIsAddNotificationOpen(true)}
                            className="flex items-center gap-2 text-white px-4 py-2 rounded-lg bg-brand-secondary text-sm font-medium hover:opacity-90 transition-opacity"
                        >
                            <span>Add Notification</span>
                        </button>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead className="bg-gray-50 border-b border-gray-200">
                                <tr className="text-[11px] font-bold text-gray-500 uppercase tracking-wider">
                                    <th className="px-6 py-4">ID</th>
                                    <th className="px-6 py-4">Title</th>
                                    <th className="px-6 py-4">Message</th>
                                    <th className="px-6 py-4">Views</th>
                                    <th className="px-6 py-4">Created At</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100 bg-white">
                                {paginatedData.map((item) => (
                                    <tr key={item.id} className="hover:bg-gray-50 transition-colors">
                                        <td className="px-6 py-5 text-sm text-gray-700 font-medium">
                                            {item.id}
                                        </td>
                                        <td className="px-6 py-5 text-sm font-semibold text-gray-900 whitespace-nowrap">
                                            {item.title}
                                        </td>
                                        <td className="px-6 py-5 text-sm text-gray-600 min-w-[300px]">
                                            {item.message}
                                        </td>
                                        <td className="px-6 py-5 text-sm text-gray-600 whitespace-nowrap">
                                            {item.views}
                                        </td>
                                        <td className="px-6 py-5 text-sm text-gray-600 whitespace-nowrap">
                                            {item.createdAt}
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
                                <ul className="absolute bottom-full mb-1 left-0 w-full bg-white border border-gray-300 rounded-md overflow-hidden z-20 shadow-lg">
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
                                className={`p-1.5 border border-gray-300 rounded-md ${currentPage === 1 ? 'opacity-30 cursor-not-allowed' : 'text-gray-700 hover:bg-gray-50'}`}
                            >
                                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="11 17 6 12 11 7"></polyline><polyline points="18 17 13 12 18 7"></polyline></svg>
                            </button>
                            <button 
                                onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))} 
                                disabled={currentPage === 1}
                                className={`p-1.5 border border-gray-300 rounded-md ${currentPage === 1 ? 'opacity-30 cursor-not-allowed' : 'text-gray-700 hover:bg-gray-50'}`}
                            >
                                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M15 18l-6-6 6-6" /></svg>
                            </button>
                            <button 
                                onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))} 
                                disabled={currentPage === totalPages}
                                className={`p-1.5 border border-gray-300 rounded-md ${currentPage === totalPages ? 'opacity-30 cursor-not-allowed' : 'text-gray-700 hover:bg-gray-50'}`}
                            >
                                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 18l6-6-6-6" /></svg>
                            </button>
                            <button 
                                onClick={() => setCurrentPage(totalPages)} 
                                disabled={currentPage === totalPages}
                                className={`p-1.5 border border-gray-300 rounded-md ${currentPage === totalPages ? 'opacity-30 cursor-not-allowed' : 'text-gray-700 hover:bg-gray-50'}`}
                            >
                                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="13 17 18 12 13 7"></polyline><polyline points="6 17 11 12 6 7"></polyline></svg>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            {isAddNotificationOpen && (
                <PushNotificationAdd onClose={() => setIsAddNotificationOpen(false)} />
            )}
        </div>
    );
}