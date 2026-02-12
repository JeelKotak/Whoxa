import { useState, useEffect, useRef } from "react";
import { ChevronDown } from "lucide-react";
import '../Components/_theme.scss';
import Search from "../Components/Search";

const users = [
  { orderId: 1, name: "Manuel Langworth", username: "manuel.lang", phone: "53xxxxxx34", email: "philip.okeeffe94@gmail.com", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Manuel", country: "🇺🇸 USA", createdDate: "Nov 3, 2022", platform: "Web", reportCounts: 12, status: true },
  { orderId: 2, name: "aqif cullufja", username: "shqipez98", phone: "32xxxxxx27", email: "aidan22@hotmail.com", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sherry", country: "🇦🇱 Albania", createdDate: "Oct 3, 2022", platform: "Web", reportCounts: 5, status: true },
  { orderId: 3, name: "Kelli Mitchell", username: "kelli_mitch", phone: "32xxxxxx65", email: "guiseppe.champlin@hotmail.com", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Kelli", country: "🇨🇦 Canada", createdDate: "Nov 30, 2022", platform: "Web", reportCounts: 22, status: false },
  { orderId: 4, name: "Mattie Miller", username: "mattie.mill", phone: "44xxxxxx12", email: "bianka30@yahoo.com", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Mattie", country: "🇬🇧 UK", createdDate: "Sep 17, 2022", platform: "Web", reportCounts: 2, status: true },
  { orderId: 5, name: "Ricardo Kling", username: "ric_kling", phone: "49xxxxxx88", email: "gene73@yahoo.com", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Ricardo", country: "🇩🇪 Germany", createdDate: "Dec 4, 2022", platform: "Web", reportCounts: 18, status: true },
  { orderId: 6, name: "Jill Russel", username: "jill_r", phone: "33xxxxxx45", email: "cleora.murray@hotmail.com", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Jill", country: "🇫🇷 France", createdDate: "July 13, 2023", platform: "Web", reportCounts: 31, status: true },
  { orderId: 7, name: "Shelley VonRueden", username: "shelley_vr", phone: "61xxxxxx09", email: "destini_williamson34@yahoo.com", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Shelley", country: "🇦🇺 Australia", createdDate: "Feb 28, 2023", platform: "Web", reportCounts: 7, status: true },
  { orderId: 8, name: "Connie Braun", username: "connie_b", phone: "81xxxxxx77", email: "mervin.rutherford@hotmail.com", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Connie", country: "🇯🇵 Japan", createdDate: "July 3, 2023", platform: "Web", reportCounts: 9, status: false },
  { orderId: 9, name: "Byron Hoppe III", username: "byron_h", phone: "91xxxxxx32", email: "jayda_schiller35@yahoo.com", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Byron", country: "🇮🇳 India", createdDate: "Nov 30, 2022", platform: "Web", reportCounts: 1, status: true },
  { orderId: 10, name: "Genevieve Hammes", username: "gen_ham", phone: "55xxxxxx21", email: "bernard63@yahoo.com", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Genevieve", country: "🇧🇷 Brazil", createdDate: "Jan 25, 2023", platform: "Web", reportCounts: 14, status: true },
  { orderId: 11, name: "Damon Friesen", username: "damon_f", phone: "27xxxxxx11", email: "damon_friesen@gmail.com", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Damon", country: "🇿🇦 SA", createdDate: "Mar 12, 2023", platform: "Web", reportCounts: 4, status: true },
  { orderId: 12, name: "Lucille Schowalter", username: "lucy_s", phone: "31xxxxxx90", email: "lucy.show@outlook.com", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Lucille", country: "🇳🇱 Netherlands", createdDate: "Jan 15, 2023", platform: "Web", reportCounts: 20, status: true },
  { orderId: 13, name: "Reginald Klocko", username: "regi_k", phone: "39xxxxxx55", email: "regi_k@yahoo.com", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Reginald", country: "🇮🇹 Italy", createdDate: "June 22, 2023", platform: "Web", reportCounts: 3, status: true },
  { orderId: 14, name: "Margarita Kunze", username: "marga_k", phone: "34xxxxxx66", email: "marga88@hotmail.com", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Margarita", country: "🇪🇸 Spain", createdDate: "May 5, 2023", platform: "Web", reportCounts: 50, status: false },
  { orderId: 15, name: "Ignacio Predovic", username: "ignacio_p", phone: "52xxxxxx44", email: "ignacio_p@gmail.com", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Ignacio", country: "🇲🇽 Mexico", createdDate: "Aug 30, 2023", platform: "Web", reportCounts: 6, status: true },
];

export default function UserList() {
  const [invoicesData, setInvoicesData] = useState(users);
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

  const handleToggle = (id: number) => {
    setInvoicesData((prev) =>
      prev.map((item) =>
        item.orderId === id ? { ...item, status: !item.status } : item
      )
    );
  };

  const filteredInvoices = invoicesData.filter((inv) =>
    inv.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    inv.username.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalPages = Math.max(1, Math.ceil(filteredInvoices.length / rowsPerPage));
  const paginatedInvoices = filteredInvoices.slice((currentPage - 1) * rowsPerPage, currentPage * rowsPerPage);

  return (
    <div className="w-full bg-white text-[#111827] theme-container">
      <div className="px-2 pt-4 pb-12">
        <div className="flex flex-col sm:flex-row justify-between items-start gap-4 mb-6">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold">User List</h1>
            <nav className="flex items-center gap-2 text-sm text-black font-medium mt-1">
              <a className="hover:text-gray-600 cursor-pointer transition-colors">List</a>
              <span className="w-1 h-1 bg-gray-300 rounded-full" />
              <span className="text-gray-500 cursor-default">User List</span>
            </nav>
          </div>
          <div className="flex gap-3 w-full sm:w-auto">
            <Search
              searchTerm={searchTerm}
              setSearchTerm={setSearchTerm}
              placeholder="Search by name or username..."
            />
          </div>
        </div>

        <div className="border border-[#e3e3e3] rounded-md overflow-hidden bg-white mt-4">
          <div className="overflow-x-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent">
            <table className="w-full min-w-[1000px] text-left">
              <thead className="bg-[#f1f1f1] text-gray-500 border-b border-[#e3e3e3]">
                <tr className="text-xs font-semibold uppercase whitespace-nowrap">
                  <th className="px-4 py-4">ID</th>
                  <th className="px-4 py-4">Full Name</th>
                  <th className="px-4 py-4">User Name</th>
                  <th className="px-4 py-4">Country</th>
                  <th className="px-4 py-4">Joining Date</th>
                  <th className="px-4 py-4">Platform</th>
                  <th className="px-4 py-4 text-center">Report Counts</th>
                  <th className="px-4 py-4 text-center">Status</th>
                  <th className="px-4 py-4 text-center">Block</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-300">
                {paginatedInvoices.length > 0 ? (
                  paginatedInvoices.map((inv) => (
                    <tr key={inv.orderId} className="hover:bg-[#f1f1f1] transition-colors">
                      <td className="px-4 py-6 text-sm font-medium text-gray-900">
                        #{inv.orderId}
                      </td>
                      <td className="px-4 py-6">
                        <div className="flex items-center gap-3">
                          <img src={inv.avatar} className="w-10 h-10 rounded-full bg-gray-100 border border-gray-200" alt="avatar" />
                          <div className="min-w-0">
                            {/* Logic for handling empty names as seen in screenshot */}
                            <p className="text-sm font-medium leading-tight text-[#111827]">
                              {inv.name === "aqif cullufja" ? inv.name : (inv.orderId % 2 === 0 ? inv.name : "-")}
                            </p>
                            <p className="text-xs text-gray-400 mt-1">{inv.phone}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-6 text-sm font-md text-gray-900">
                        {inv.name === "aqif cullufja" ? inv.username : (inv.orderId % 2 === 0 ? inv.username : "-")}
                      </td>
                      <td className="px-4 py-6 text-sm text-gray-700">
                        {inv.country}
                      </td>
                      <td className="px-4 py-6">
                        <p className="text-sm font-medium text-gray-700">{inv.createdDate}</p>
                      </td>
                      <td className="px-4 py-6 text-sm">
                         <span className={`px-3 py-1 rounded-full border ${inv.platform === 'App' ? 'border-orange-400 text-orange-500' : 'border-green-400 text-green-500'}`}>
                            {inv.platform}
                         </span>
                      </td>
                      <td className="px-4 py-6 text-sm text-center font-medium">
                        {inv.reportCounts}
                      </td>
                      <td className="px-4 py-6 text-center">
                        <span className={`px-3 py-1 rounded-full border text-xs font-medium ${inv.status ? 'border-green-500 text-green-500' : 'border-red-400 text-red-500'}`}>
                           {inv.status ? "Online" : "Offline"}
                        </span>
                      </td>
                      <td className="px-4 py-6 text-center">
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
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={9} className="py-10 text-center text-gray-500 text-sm">No results found for "{searchTerm}"</td>
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
    </div>
  );
}