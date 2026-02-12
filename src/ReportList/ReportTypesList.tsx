import { useState, useEffect, useRef } from "react";
import { ChevronDown } from "lucide-react";
import '../Components/_theme.scss'
import Search from "../Components/Search";
import AddReportType from "./AddReportType";

const users = [
  { orderId: 1, reportText: "System audit completed successfully last week", reportFor: "user", createdDate: "November 3, 2022", status: true },
  { orderId: 2, reportText: "Weekly sales report needs immediate review", reportFor: "user", createdDate: "October 3, 2022", status: true },
  { orderId: 3, reportText: "Inventory levels are critically low today", reportFor: "user", createdDate: "November 30, 2022", status: true },
  { orderId: 4, reportText: "Compliance check failed multiple security tests", reportFor: "user", createdDate: "September 17, 2022", status: true },
  { orderId: 5, reportText: "Performance metrics show significant improvement trends", reportFor: "user", createdDate: "December 4, 2022", status: true },
  { orderId: 6, reportText: "Safety review identified several critical issues", reportFor: "user", createdDate: "July 13, 2023", status: true },
  { orderId: 7, reportText: "Tax export process completed without errors", reportFor: "user", createdDate: "February 28, 2023", status: true },
  { orderId: 8, reportText: "Usage logs indicate unusual activity patterns", reportFor: "user", createdDate: "July 3, 2023", status: true },
  { orderId: 9, reportText: "Customer feedback reveals positive satisfaction scores", reportFor: "user", createdDate: "November 30, 2022", status: true },
  { orderId: 10, reportText: "API metrics show excellent response times", reportFor: "user", createdDate: "January 25, 2023", status: true },
  { orderId: 11, reportText: "Bug report contains detailed reproduction steps", reportFor: "user", createdDate: "March 12, 2023", status: true },
  { orderId: 12, reportText: "User analytics reveal interesting behavioral patterns", reportFor: "user", createdDate: "January 15, 2023", status: true },
  { orderId: 13, reportText: "Server health monitoring detected performance issues", reportFor: "user", createdDate: "June 22, 2023", status: true },
  { orderId: 14, reportText: "Revenue analysis shows quarterly growth targets", reportFor: "user", createdDate: "May 5, 2023", status: true },
  { orderId: 15, reportText: "Annual goals require strategic planning adjustments", reportFor: "user", createdDate: "August 30, 2023", status: true }
];

export default function ReportTypesList() {
  const [invoicesData, setInvoicesData] = useState(users);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [isAddReportTypeOpen, setIsAddReportTypeOpen] = useState(false);

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
    inv.reportText.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalPages = Math.max(1, Math.ceil(filteredInvoices.length / rowsPerPage));
  const paginatedInvoices = filteredInvoices.slice((currentPage - 1) * rowsPerPage, currentPage * rowsPerPage);

  return (
    <div className="w-full bg-white text-[#111827] theme-container">
      <div className="px-2 pt-4 pb-12">
        <div className="flex flex-col sm:flex-row justify-between items-start gap-4 mb-6">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold">Report Types List</h1>
            <nav className="flex items-center gap-2 text-sm text-black font-medium mt-1">
              <a className="hover:text-gray-600 cursor-pointer transition-colors">List</a>
              <span className="w-1 h-1 bg-gray-300 rounded-full" />
              <a className="hover:text-gray-600 cursor-pointer transition-colors">Report List</a>
              <span className="w-1 h-1 bg-gray-300 rounded-full" />
              <span className="text-gray-500 cursor-default">Report Types List</span>
            </nav>
          </div>
          <div className="flex gap-3 w-full sm:w-auto">
            <Search
              searchTerm={searchTerm}
              setSearchTerm={setSearchTerm}
              placeholder="Search by report text..."
            />
          </div>
        </div>

        <div className="border border-[#e3e3e3] rounded-md overflow-hidden bg-white mt-4">
          <div className="p-5 flex justify-between items-center border-b border-gray-100">
            <h2 className="text-lg font-semibold text-gray-800">Report Overview</h2>
            <button
              onClick={() => setIsAddReportTypeOpen(true)}
              className="flex items-center gap-2 text-white px-4 py-2 rounded-lg bg-brand-secondary text-sm font-medium"
            >
              <span>Add Report</span>
            </button>
          </div>
          <div className="overflow-x-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent">
            <table className="w-full min-w-[1000px] text-left">
              <thead className="bg-[#f1f1f1] text-gray-500 border-b border-[#e3e3e3]">
                <tr className="text-xs font-semibold uppercase whitespace-nowrap">
                  <th className="px-4 py-4 w-16">ID</th>
                  <th className="px-4 py-4 w-160">Report Text</th>
                  <th className="px-3 py-4">Report For</th>
                  <th className="px-4 py-4">Created</th>
                  <th className="px-4 py-4 text-center">Active</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-300">
                {paginatedInvoices.length > 0 ? (
                  paginatedInvoices.map((inv) => (
                    <tr key={inv.orderId} className="hover:bg-[#f1f1f1] transition-colors">
                      {/* ID Column */}
                      <td className="px-4 py-6 text-sm font-medium text-gray-900">
                        #{inv.orderId}
                      </td>
                      <td className="px-4 py-6">
                        <div className="flex flex-col">
                          <p className="text-sm font-semibold text-[#111827]">{inv.reportText}</p>
                          <p className="text-xs text-gray-500">{inv.reportFor}</p>
                        </div>
                      </td>
                      {/* Report For Column */}
                      <td className="px-4 py-6 text-sm font-md text-gray-900">
                        {inv.reportFor}
                      </td>
                      {/* Created Column */}
                      <td className="px-4 py-6">
                        <p className="text-sm font-medium text-gray-700">{inv.createdDate}</p>
                      </td>
                      {/* Active Toggle Column */}
                      <td className="px-4 py-6 text-center">
                        <button
                          type="button"
                          onClick={() => handleToggle(inv.orderId)}
                          className={`group relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${inv.status ? "bg-brand-secondary" : "bg-gray-200"
                            }`}
                        >
                          <span
                            className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${inv.status ? "translate-x-5" : "translate-x-0"
                              }`}
                          />
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
      {isAddReportTypeOpen && (
        <AddReportType onClose={() => setIsAddReportTypeOpen(false)} />
      )}
    </div>
  );
}