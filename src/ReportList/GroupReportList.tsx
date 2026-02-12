import { useState, useEffect, useRef } from "react";
import { ChevronDown, Eye } from "lucide-react";
import '../Components/_theme.scss';
import Search from "../Components/Search";
import GroupReportTypeModal from "./GroupReportListModal";

const Groups = [
  { orderId: "#1", reportedName: "Manuel Langworth", reportedAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Manuel", reporterName: "Sarah Jenkins", reporterID: "901", reporterAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah", name: "Manuel Langworth", type: "Group", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Manuel", reportCount: 12, createdDate: "Nov 3, 2022", status: true, reportType: "Scam or Fraud", reportText: "Unknown" },
  { orderId: "#2", reportedName: "Sherry Weber", reportedAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sherry", reporterName: "Kevin Temple", reporterID: "902", reporterAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Kevin", name: "Sherry Weber", type: "Group", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sherry", reportCount: 5, createdDate: "Oct 3, 2022", status: true, reportType: "Harassment", reportText: "Unknown" },
  { orderId: "#3", reportedName: "Kelli Mitchell", reportedAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Kelli", reporterName: "John Doe", reporterID: "903", reporterAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=John", name: "Kelli Mitchell", type: "Group", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Kelli", reportCount: 22, createdDate: "Nov 30, 2022", status: false, reportType: "Spam", reportText: "Unknown" },
  { orderId: "#4", reportedName: "Mattie Miller", reportedAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Mattie", reporterName: "Emma Wilson", reporterID: "904", reporterAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Emma", name: "Mattie Miller", type: "Group", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Mattie", reportCount: 2, createdDate: "Sep 17, 2022", status: true, reportType: "Inappropriate Content", reportText: "Unknown" },
  { orderId: "#5", reportedName: "Ricardo Kling", reportedAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Ricardo", reporterName: "Liam Neeson", reporterID: "905", reporterAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Liam", name: "Ricardo Kling", type: "Group", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Ricardo", reportCount: 18, createdDate: "Dec 4, 2022", status: true, reportType: "Hate Speech", reportText: "Unknown" },
  { orderId: "#6", reportedName: "Jill Russel", reportedAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Jill", reporterName: "Olivia Wilde", reporterID: "906", reporterAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Olivia", name: "Jill Russel", type: "Group", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Jill", reportCount: 31, createdDate: "July 13, 2023", status: true, reportType: "Fake Profile", reportText: "Unknown" },
  { orderId: "#7", reportedName: "Shelley Lind", reportedAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Shelley", reporterName: "Noah Centineo", reporterID: "907", reporterAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Noah", name: "Shelley Lind-VonRueden", type: "Group", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Shelley", reportCount: 7, createdDate: "Feb 28, 2023", status: true, reportType: "Scam or Fraud", reportText: "Unknown" },
  { orderId: "#8", reportedName: "Connie Braun", reportedAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Connie", reporterName: "Ava Max", reporterID: "908", reporterAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Ava", name: "Connie Braun", type: "Group", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Connie", reportCount: 9, createdDate: "July 3, 2023", status: false, reportType: "Harassment", reportText: "Unknown" },
  { orderId: "#9", reportedName: "Byron Hoppe", reportedAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Byron", reporterName: "Sophia Loren", reporterID: "909", reporterAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sophia", name: "Byron Hoppe III", type: "Group", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Byron", reportCount: 1, createdDate: "Nov 30, 2022", status: true, reportType: "Spam", reportText: "Unknown" },
  { orderId: "#10", reportedName: "Genevieve Hammes", reportedAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Genevieve", reporterName: "Lucas Hedges", reporterID: "910", reporterAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Lucas", name: "Genevieve Hammes", type: "Group", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Genevieve", reportCount: 14, createdDate: "Jan 25, 2023", status: true, reportType: "Inappropriate Content", reportText: "Unknown" },
  { orderId: "#11", reportedName: "Damon Friesen", reportedAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Damon", reporterName: "Mia Goth", reporterID: "911", reporterAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Mia", name: "Damon Friesen", type: "Group", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Damon", reportCount: 4, createdDate: "Mar 12, 2023", status: true, reportType: "Hate Speech", reportText: "Unknown" },
  { orderId: "#12", reportedName: "Lucille Schowalter", reportedAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Lucille", reporterName: "Ethan Hawke", reporterID: "912", reporterAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Ethan", name: "Lucille Schowalter", type: "Group", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Lucille", reportCount: 20, createdDate: "Jan 15, 2023", status: true, reportType: "Fake Profile", reportText: "Unknown" },
  { orderId: "#13", reportedName: "Reginald Klocko", reportedAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Reginald", reporterName: "Isabella Rossellini", reporterID: "913", reporterAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Isabella", name: "Reginald Klocko", type: "Group", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Reginald", reportCount: 3, createdDate: "June 22, 2023", status: true, reportType: "Scam or Fraud", reportText: "Unknown" },
  { orderId: "#14", reportedName: "Margarita Kunze", reportedAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Margarita", reporterName: "Oscar Isaac", reporterID: "914", reporterAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Oscar", name: "Margarita Kunze", type: "Group", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Margarita", reportCount: 50, createdDate: "May 5, 2023", status: false, reportType: "Harassment", reportText: "Unknown" },
  { orderId: "#15", reportedName: "Ignacio Predovic", reportedAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Ignacio", reporterName: "Penelope Cruz", reporterID: "915", reporterAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Penelope", name: "Ignacio Predovic", type: "Group", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Ignacio", reportCount: 6, createdDate: "Aug 30, 2023", status: true, reportType: "Spam", reportText: "Unknown" },
];

export default function GroupReportList() {
  const [invoicesData, setInvoicesData] = useState(Groups);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  
  // Modal State
  const [selectedGroup, setSelectedGroup] = useState<typeof Groups[0] | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

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

  const handleToggle = (id: string) => {
    setInvoicesData((prev) =>
      prev.map((item) =>
        item.orderId === id ? { ...item, status: !item.status } : item
      )
    );
  };

  const openModal = (Group: typeof Groups[0]) => {
    setSelectedGroup(Group);
    setIsModalOpen(true);
  };

  const filteredInvoices = invoicesData.filter((inv) =>
    inv.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    inv.type.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalPages = Math.max(1, Math.ceil(filteredInvoices.length / rowsPerPage));
  const paginatedInvoices = filteredInvoices.slice((currentPage - 1) * rowsPerPage, currentPage * rowsPerPage);

  return (
    <div className="w-full bg-white text-[#111827] theme-container">
      <div className="px-2 pt-4 pb-12">
        {/* Header Section */}
        <div className="flex flex-col sm:flex-row justify-between items-start gap-4 mb-6">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold">Group Report List</h1>
            <nav className="flex items-center gap-2 text-sm text-black font-medium mt-1">
              <a className="hover:text-gray-600 cursor-pointer transition-colors">List</a>
              <span className="w-1 h-1 bg-gray-300 rounded-full" />
              <a className="hover:text-gray-600 cursor-pointer transition-colors">Report List</a>
              <span className="w-1 h-1 bg-gray-300 rounded-full" />
              <span className="text-gray-500 cursor-default">Group Report List</span>
            </nav>
          </div>
          <div className="flex gap-3 w-full sm:w-auto">
            <Search
              searchTerm={searchTerm}
              setSearchTerm={setSearchTerm}
              placeholder="Search by name or email..."
            />
          </div>
        </div>

        {/* Table Section */}
        <div className="border border-[#e3e3e3] rounded-md overflow-hidden bg-white mt-4">
          <div className="overflow-x-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent">
            <table className="w-full min-w-[1000px] text-left">
              <thead className="bg-[#f1f1f1] text-gray-500 border-b border-[#e3e3e3]">
                <tr className="text-xs font-semibold uppercase whitespace-nowrap">
                  <th className="px-4 py-4">Reported Group ID</th>
                  <th className="px-4 py-4">Reported Group</th>
                  <th className="px-4 py-4">Report Counts</th>
                  <th className="px-4 py-4">Block</th>
                  <th className="px-4 py-4 text-center">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-300">
                {paginatedInvoices.length > 0 ? (
                  paginatedInvoices.map((inv) => (
                    <tr key={inv.orderId} className="hover:bg-[#f1f1f1] transition-colors">
                      <td className="px-4 py-6 text-sm font-medium text-gray-900">
                        {inv.orderId}
                      </td>
                      <td className="px-4 py-6">
                        <div className="flex items-center gap-3">
                          <img src={inv.avatar} className="w-9 h-9 rounded-full bg-gray-100" alt="avatar" />
                          <div className="min-w-0">
                            <p className="text-sm font-medium leading-tight text-[#111827]">{inv.name}</p>
                            <p className="text-xs text-gray-400 mt-0.5">{inv.type}</p>
                          </div>
                        </div>
                      </td>

                      <td className="px-4 py-6 text-sm font-medium text-gray-900">
                        {inv.reportCount}
                      </td>

                      <td className="px-4 py-6">
                        <button
                          type="button"
                          onClick={() => handleToggle(inv.orderId)}
                          className={`group relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${inv.status ? "bg-brand-secondary" : "bg-gray-200"}`}
                        >
                          <span
                            className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${inv.status ? "translate-x-5" : "translate-x-0"}`}
                          />
                        </button>
                      </td>

                      <td className="px-4 py-6 text-center">
                        <button 
                          onClick={() => openModal(inv)}
                          className="p-1.5 border border-[#e3e3e3] rounded text-gray-500 hover:bg-gray-50 cursor-pointer transition-colors"
                        >
                          <Eye size={16} />
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={5} className="py-10 text-center text-gray-500 text-sm">No results found for "{searchTerm}"</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Pagination Section */}
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

      {/* Modal Component Call */}
      <GroupReportTypeModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        GroupData={selectedGroup} 
      />
    </div>
  );
}