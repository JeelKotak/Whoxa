import { useState, useRef } from "react";
import Search from "../Components/Search";
import '../Components/_theme.scss';
import { SquarePen, Trash2, ChevronDown } from "lucide-react";
import AddAvatar from "./AddAvatar";
import EditAvatar from "./EditAvatar";
import CategoriesDeleteModal from "../Components/CategoriesDeleteModal";

export type AvatarData = {
    id: number;
    image: string;
    name: string;
    gender: "Male" | "Female";
    status: "Active" | "Inactive";
    createdDate: string;
};

export const initialAvatars: AvatarData[] = [
    { id: 1, image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Manuel", name: "Manuel Langworth", gender: "Male", status: "Active", createdDate: "Nov 3, 2022" },
    { id: 2, image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sherry", name: "aqif cullufja", gender: "Female", status: "Active", createdDate: "Oct 3, 2022" },
    { id: 3, image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Kelli", name: "Kelli Mitchell", gender: "Male", status: "Inactive", createdDate: "Nov 30, 2022" },
    { id: 4, image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Mattie", name: "Mattie Miller", gender: "Male", status: "Active", createdDate: "Sep 17, 2022" },
    { id: 5, image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Ricardo", name: "Ricardo Kling", gender: "Female", status: "Active", createdDate: "Dec 4, 2022"},
];

export default function Avatar() {
    const [avatars, setAvatars] = useState<AvatarData[]>(initialAvatars);
    const [currentPage, setCurrentPage] = useState(1);
    const [searchTerm, setSearchTerm] = useState("");
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);
    
    const [isAddAvatarOpen, setIsAddAvatarOpen] = useState(false);
    const [selectedAvatar, setSelectedAvatar] = useState<AvatarData | null>(null);
    
    // State to handle which avatar is being deleted (null means modal is closed)
    const [avatarToDelete, setAvatarToDelete] = useState<number | null>(null);

    const filteredAvatars = avatars.filter((av) =>
        av.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const totalPages = Math.max(1, Math.ceil(filteredAvatars.length / rowsPerPage));
    const paginatedAvatars = filteredAvatars.slice((currentPage - 1) * rowsPerPage, currentPage * rowsPerPage);

    const handleUpdateAvatar = (updatedData: AvatarData) => {
        setAvatars(prev => prev.map(av => (av.id === updatedData.id ? updatedData : av)));
        setSelectedAvatar(null);
    };

    // Logic to execute when "Delete" is clicked inside the modal
    const handleConfirmDelete = () => {
        if (avatarToDelete !== null) {
            setAvatars(prev => prev.filter(av => av.id !== avatarToDelete));
            setAvatarToDelete(null); // Close modal
        }
    };

    return (
        <div className="relative w-full bg-white theme-container min-h-screen">
            <div className="px-2 py-4">
                {/* Header Section */}
                <div className="flex flex-col sm:flex-row justify-between items-center mb-8 gap-4">
                    <div>
                        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Avatar List</h1>
                        <nav className="flex items-center gap-2 text-sm text-gray-500 font-medium mt-1">
                            <span className="text-gray-900 cursor-pointer">List</span>
                            <span className="w-1 h-1 bg-gray-300 rounded-full" />
                            <span className="text-gray-400">Avatar List</span>
                        </nav>
                    </div>

                    <Search
                        searchTerm={searchTerm}
                        setSearchTerm={setSearchTerm}
                        placeholder="Search Avatars..."
                    />
                </div>

                {/* Table Section */}
                <div className="bg-white border border-gray-200 rounded-md overflow-hidden">
                    <div className="p-5 flex justify-between items-center border-b border-gray-100">
                        <h2 className="text-lg font-semibold text-gray-800">Avatar Overview</h2>
                        <button
                            onClick={() => setIsAddAvatarOpen(true)}
                            className="flex items-center gap-2 text-white px-4 py-2 rounded-lg bg-brand-secondary text-sm font-medium hover:opacity-90 transition-opacity"
                        >
                            <span>Add Avatar</span>
                        </button>
                    </div>

                    <div className="overflow-x-auto">
                        <table className="w-full text-left">
                            <thead className="bg-[#f1f1f1] border-b border-gray-200">
                                <tr className="text-xs font-bold text-gray-600 uppercase tracking-wider">
                                    <th className="px-6 py-4">ID</th>
                                    <th className="px-6 py-4">Avatar</th>
                                    <th className="px-6 py-4">Name</th>
                                    <th className="px-6 py-4">Gender</th>
                                    <th className="px-6 py-4">Status</th>
                                    <th className="px-6 py-4">Created</th>
                                    <th className="px-6 py-4 text-center">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200">
                                {paginatedAvatars.length > 0 ? (
                                    paginatedAvatars.map((avatar) => (
                                        <tr key={avatar.id} className="hover:bg-gray-50 transition-colors">
                                            <td className="px-6 py-5 text-sm font-medium text-gray-900">{avatar.id}</td>
                                            <td className="px-6 py-5">
                                                <div className="w-14 h-14 rounded-full overflow-hidden border border-gray-200 bg-orange-100 flex items-center justify-center">
                                                    <img src={avatar.image} alt={avatar.name} className="w-full h-full object-cover" />
                                                </div>
                                            </td>
                                            <td className="px-6 py-5 text-sm text-gray-600">{avatar.name}</td>
                                            <td className="px-6 py-5">
                                                <span className={`px-3 py-1 rounded-full text-xs font-medium ${avatar.gender === 'Male' ? 'bg-blue-100 text-blue-600' : 'bg-pink-100 text-pink-600'}`}>
                                                    {avatar.gender}
                                                </span>
                                            </td>
                                            <td className="px-6 py-5">
                                                <span className={`px-3 py-1 rounded-full text-xs font-medium ${avatar.status === 'Active' ? 'bg-green-100 text-green-600' : 'bg-gray-100 text-gray-600'}`}>
                                                    {avatar.status}
                                                </span>
                                            </td>
                                            <td className="px-6 py-5 text-sm font-medium text-gray-900">{avatar.createdDate}</td>
                                            <td className="px-6 py-5">
                                                <div className="flex justify-center items-center gap-3">
                                                    <button 
                                                        onClick={() => setSelectedAvatar(avatar)}
                                                        className="px-2 py-1 text-gray-500 cursor-pointer hover:text-brand-secondary transition-colors"
                                                    >
                                                        <SquarePen size={20} />
                                                    </button>
                                                    <button 
                                                        onClick={() => setAvatarToDelete(avatar.id)}
                                                        className="px-2 py-1 text-gray-500 cursor-pointer hover:text-red-500 transition-colors"
                                                    >
                                                        <Trash2 size={20} />
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan={7} className="px-6 py-16 text-center text-gray-400 italic">No Avatars found.</td>
                                    </tr>
                                )}
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

            {/* --- Modals --- */}
            
            {isAddAvatarOpen && (
                <AddAvatar onClose={() => setIsAddAvatarOpen(false)} />
            )}

            {selectedAvatar && (
                <EditAvatar 
                    Avatar={selectedAvatar as any} 
                    onClose={() => setSelectedAvatar(null)} 
                    onUpdate={(data) => handleUpdateAvatar(data as any)}
                />
            )}

            {/* Delete Modal Triggered by state */}
            {avatarToDelete !== null && (
                <CategoriesDeleteModal 
                    onClose={() => setAvatarToDelete(null)} 
                    onConfirm={handleConfirmDelete} 
                />
            )}
        </div>
    );
}