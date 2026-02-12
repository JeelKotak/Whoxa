import { useState, useEffect, useRef } from "react";
import { ChevronDown } from "lucide-react";
import '../Components/_theme.scss';
import Search from "../Components/Search";
import GroupListMembers from "./GroupListMembers";

export interface Member {
    name: string;
    handle: string;
    avatar: string;
    role: "Admin" | "Member";
}

export interface Group {
    orderId: string;
    name: string;
    description: string;
    avatar: string;
    createdDate: string;
    members: Member[];
}

const groups: Group[] = [
    {
        orderId: "#13", name: "College Legends", description: "Where Legends chat, roast, and vibe together", avatar: "https://api.dicebear.com/7.x/identicon/svg?seed=college", createdDate: "December 5, 2025",
        members: [
            { name: "Kevin Temple", handle: "kevin_temple", role: "Admin", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Kevin" },
            { name: "Education Institute", handle: "nousername", role: "Member", avatar: "https://api.dicebear.com/7.x/identicon/svg?seed=Edu" },
            { name: "IT Company", handle: "jhon_brook", role: "Member", avatar: "https://api.dicebear.com/7.x/identicon/svg?seed=IT" },
            { name: "James Deep", handle: "james_deep", role: "Member", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=James" },
            { name: "Travel Company", handle: "jane_williams", role: "Member", avatar: "https://api.dicebear.com/7.x/identicon/svg?seed=Travel" },
        ]
    },
    {
        orderId: "#4", name: "RouteRangers", description: "A planning group built to power smooth getaways.", avatar: "https://api.dicebear.com/7.x/identicon/svg?seed=route", createdDate: "November 4, 2025",
        members: [
            { name: "Sarah Miles", handle: "smiles", role: "Admin", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah" },
            { name: "Road Trip Pro", handle: "vroom_vroom", role: "Member", avatar: "https://api.dicebear.com/7.x/bottts/svg?seed=Road" },
            { name: "Map Maker", handle: "carto_grapher", role: "Member", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Maps" },
            { name: "Gas Buddy", handle: "fuel_up", role: "Member", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Gas" },
        ]
    },
    {
        orderId: "#12", name: "Study Buddies", description: "Late night cramming and resource sharing.", avatar: "https://api.dicebear.com/7.x/identicon/svg?seed=study", createdDate: "October 12, 2025",
        members: [
            { name: "Prof. Oak", handle: "dex_master", role: "Admin", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Oak" },
            { name: "Library Larry", handle: "books_n_coffee", role: "Member", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Larry" },
            { name: "A+ Student", handle: "grade_chaser", role: "Member", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Grade" },
        ]
    },
    {
        orderId: "#11", name: "Fitness Fanatics", description: "Daily workout tracking and motivation.", avatar: "https://api.dicebear.com/7.x/identicon/svg?seed=gym", createdDate: "September 20, 2025",
        members: [
            { name: "Arnold S.", handle: "iron_pumper", role: "Admin", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Arnold" },
            { name: "Yoga Yvette", handle: "stretch_daily", role: "Member", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Yoga" },
        ]
    },
    {
        orderId: "#10", name: "Foodie Finds", description: "Exploring the best local eateries in the city.", avatar: "https://api.dicebear.com/7.x/identicon/svg?seed=food", createdDate: "August 15, 2025",
        members: [
            { name: "Chef Gordon", handle: "raw_cooking", role: "Admin", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Gordon" },
            { name: "Pizza Pete", handle: "slice_life", role: "Member", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Pizza" },
        ]
    },
    {
        orderId: "#9", name: "Dev Ops", description: "Pipeline optimization and cloud architecture.", avatar: "https://api.dicebear.com/7.x/identicon/svg?seed=code", createdDate: "July 30, 2025",
        members: [
            { name: "Cloud Chris", handle: "aws_wizard", role: "Admin", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Chris" },
        ]
    },
    {
        orderId: "#8", name: "Book Worms", description: "Reading one classic every month.", avatar: "https://api.dicebear.com/7.x/identicon/svg?seed=books", createdDate: "July 01, 2025",
        members: [
            { name: "Alice Read", handle: "wonderland", role: "Admin", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Alice" },
        ]
    },
    {
        orderId: "#7", name: "Travel Tips", description: "Budget-friendly travel hacks for students.", avatar: "https://api.dicebear.com/7.x/identicon/svg?seed=travel", createdDate: "June 15, 2025",
        members: [
            { name: "Marco Polo", handle: "explorer", role: "Admin", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Marco" },
        ]
    },
    {
        orderId: "#6", name: "Art Alley", description: "Showcasing digital and traditional art pieces.", avatar: "https://api.dicebear.com/7.x/identicon/svg?seed=art", createdDate: "May 22, 2025",
        members: [
            { name: "Da Vinci", handle: "leo_v", role: "Admin", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Leo" },
        ]
    },
    {
        orderId: "#5", name: "Gaming Hub", description: "Weekly tournaments and strategy discussions.", avatar: "https://api.dicebear.com/7.x/identicon/svg?seed=game", createdDate: "May 05, 2025",
        members: [
            { name: "Master Chief", handle: "halo_hero", role: "Admin", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Master" },
        ]
    },
    {
        orderId: "#3", name: "Music Makers", description: "Collaborative playlist and production tips.", avatar: "https://api.dicebear.com/7.x/identicon/svg?seed=music", createdDate: "April 18, 2025",
        members: [
            { name: "DJ Spin", handle: "vinyl_king", role: "Admin", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Spin" },
        ]
    },
    {
        orderId: "#2", name: "Garden Squad", description: "Urban gardening and plant care advice.", avatar: "https://api.dicebear.com/7.x/identicon/svg?seed=garden", createdDate: "March 10, 2025",
        members: [
            { name: "Green Thumb", handle: "chlorophyll", role: "Admin", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Green" },
        ]
    },
    {
        orderId: "#1", name: "Startup Lab", description: "Pitch deck reviews and founder networking.", avatar: "https://api.dicebear.com/7.x/identicon/svg?seed=startup", createdDate: "February 28, 2025",
        members: [
            { name: "Elon M.", handle: "mars_bound", role: "Admin", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Elon" },
        ]
    }
];

export default function GroupList() {
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [currentPage, setCurrentPage] = useState(1);
    const [searchTerm, setSearchTerm] = useState("");
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [selectedGroup, setSelectedGroup] = useState<Group | null>(null);
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
        inv.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        inv.description.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const totalPages = Math.max(1, Math.ceil(filteredInvoices.length / rowsPerPage));
    const paginatedInvoices = filteredInvoices.slice((currentPage - 1) * rowsPerPage, currentPage * rowsPerPage);

    return (
        <div className="w-full bg-white text-[#111827] theme-container">
            <div className="px-2 pt-4 pb-12">
                <div className="flex flex-col sm:flex-row justify-between items-start gap-4 mb-6">
                    <div>
                        <h1 className="text-3xl font-bold">Group List</h1>
                        <nav className="flex items-center gap-2 text-sm text-black font-medium mt-1">
                            <span>List</span>
                            <span className="w-1 h-1 bg-gray-300 rounded-full" />
                            <span className="text-gray-500">Group List</span>
                        </nav>
                    </div>
                    <Search searchTerm={searchTerm} setSearchTerm={setSearchTerm} placeholder="Search groups..." />
                </div>

                <div className="border border-gray-200 rounded-md overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left">
                            <thead className="bg-gray-50 border-b border-gray-200">
                                <tr className="text-xs font-bold text-gray-500 uppercase tracking-wider">
                                    <th className="px-6 py-4">ID</th>
                                    <th className="px-6 py-4">Full Name</th>
                                    <th className="px-6 py-4">Participants</th>
                                    <th className="px-6 py-4">Creation Date</th>
                                    <th className="px-6 py-4 text-center">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100">
                                {paginatedInvoices.map((inv) => (
                                    <tr key={inv.orderId} className="hover:bg-gray-50 transition-colors">
                                        <td className="px-6 py-5 font-medium">{inv.orderId}</td>
                                        <td className="px-6 py-5">
                                            <div className="flex items-center gap-3">
                                                <img src={inv.avatar} className="w-10 h-10 rounded-full" alt="" />
                                                <div>
                                                    <p className="font-bold text-gray-900">{inv.name}</p>
                                                    <p className="text-xs text-gray-400">{inv.description}</p>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-10 py-5">{inv.members.length}</td>
                                        <td className="px-6 py-5 text-gray-600">{inv.createdDate}</td>
                                        <td className="px-6 py-5 text-center">
                                            <button onClick={() => setSelectedGroup(inv)} className="bg-brand-secondary text-white font-bold py-2 px-6 rounded-lg text-xs cursor-pointer">
                                                View Members
                                            </button>
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

            <GroupListMembers
                group={selectedGroup}
                onClose={() => setSelectedGroup(null)}
            />
        </div>
    );
}