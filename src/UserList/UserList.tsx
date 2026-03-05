import { useState, useEffect, useRef } from "react";
import Search from "../Components/Search";
import useApi from "../hooks/useApiPost";
import RowsPerPage from "../Components/RowsPerPage";
import Pagination from "../Components/Pagination";

type UserType = {
  orderId: number;
  name: string;
  username: string;
  phone: string;
  email: string;
  avatar: string;
  country: string;
  createdDate: string;
  platform: string;
  reportCounts: number;
  status: boolean;
  user_id: number;
};

export default function UserList() {
  const [users, setUsers] = useState<UserType[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const { post } = useApi();

  const [pagination, setPagination] = useState({
    page: 1,
    pageSize: 10,
    total: 0,
    total_pages: 1,
  });

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Fetch users
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const payload = {
          page: pagination.page,
          pageSize: pagination.pageSize,
          orderBy: "createdAt",
          orderDirection: "DESC",
          search: searchTerm || undefined,
        };

        const data = await post("/admin/users", payload);

        if (data.status) {
          const transformed = data.data.users.map((user: any, index: number) => ({
            orderId: index + 1 + (pagination.page - 1) * pagination.pageSize,
            name: user.full_name || "-",
            username: user.user_name || "-",
            phone: user.mobile_num || "-",
            email: user.email || "-",
            avatar: user.profile_pic || "https://api.whoxachat.com//uploads/default/avatar/avatar_1.png",
            country: user.country || "-",
            createdDate: new Date(user.createdAt).toLocaleDateString(),
            platform: user.platforms?.[0] || "Web",
            reportCounts: user.reportCounts || 0,
            status: !user.blocked_by_admin,
            user_id: user.user_id,
          }));

          setUsers(transformed);
          setPagination({
            page: data.data.pagination.page,
            pageSize: data.data.pagination.pageSize,
            total: data.data.pagination.total,
            total_pages: data.data.pagination.total_pages,
          });
        }
      } catch (err) {
        console.error("Error fetching users:", err);
      }
    };

    fetchUsers();
  }, [pagination.page, pagination.pageSize, searchTerm]);

  // Toggle user status
  const handleToggle = (id: number) => {
    setUsers(prev => prev.map(u => u.orderId === id ? { ...u, status: !u.status } : u));
  };

  return (
    <div className="w-full bg-white text-[#111827] theme-container px-2 pt-4 pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start gap-4 mb-6">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold">User List</h1>
          <nav className="flex items-center gap-2 text-sm text-black font-medium mt-1">
            <a className="hover:text-gray-600 cursor-pointer transition-colors">List</a>
            <span className="w-1 h-1 bg-gray-300 rounded-full" />
            <span className="text-gray-500 cursor-default">User List</span>
          </nav>
        </div>

        {/* Search */}
        <div className="flex gap-3 w-full sm:w-auto">
          <Search
            searchTerm={searchTerm}
            setSearchTerm={term => setSearchTerm(term)}
            placeholder="Search by name or username..."
          />
        </div>
      </div>

      {/* Table */}
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
              {users.length > 0 ? (
                users.map(user => (
                  <tr key={user.orderId} className="hover:bg-[#f1f1f1] transition-colors">
                    <td className="px-4 py-6 text-sm font-medium text-gray-900">#{user.orderId}</td>
                    <td className="px-4 py-6">
                      <div className="flex items-center gap-3">
                        <img src={user.avatar} alt="avatar" className="w-10 h-10 rounded-full border border-gray-200 bg-gray-100" />
                        <div className="min-w-0">
                          <p className="text-sm font-medium">{user.name}</p>
                          <p className="text-xs text-gray-400 mt-1">{user.phone}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-6 text-sm font-medium">{user.username}</td>
                    <td className="px-4 py-6 text-sm text-gray-700">{user.country}</td>
                    <td className="px-4 py-6 text-sm font-medium">{user.createdDate}</td>
                    <td className="px-4 py-6 text-sm">
                      <span className={`px-3 py-1 rounded-full border ${user.platform === "App" ? "border-orange-400 text-orange-500" : "border-green-400 text-green-500"}`}>
                        {user.platform}
                      </span>
                    </td>
                    <td className="px-4 py-6 text-center font-medium">{user.reportCounts}</td>
                    <td className="px-4 py-6 text-center">
                      <span className={`px-3 py-1 rounded-full border text-xs font-medium ${user.status ? "border-green-500 text-green-500" : "border-red-400 text-red-500"}`}>
                        {user.status ? "Online" : "Offline"}
                      </span>
                    </td>
                    <td className="px-4 py-6 text-center">
                      <button
                        type="button"
                        onClick={() => handleToggle(user.orderId)}
                        className={`group relative inline-flex h-6 w-11 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out ${user.status ? "bg-brand-secondary" : "bg-gray-200"}`}
                      >
                        <span className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow transition duration-200 ease-in-out ${user.status ? "translate-x-5" : "translate-x-0"}`} />
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={9} className="py-16">
                    <div className="flex flex-col items-center justify-center gap-2">
                      <div className="h-6 w-6 animate-spin rounded-full border-2 border-gray-300 border-t-gray-600"></div>
                      <p className="text-sm text-gray-500">Loading users...</p>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Pagination */}
      <div className="flex flex-col sm:flex-row items-center justify-between mt-4 gap-4">
        <RowsPerPage
          page={pagination.page}
          pageSize={pagination.pageSize}
          total={pagination.total}
          onChange={(newSize) => setPagination(prev => ({ ...prev, pageSize: newSize, page: 1 }))}
        />
        <Pagination
          page={pagination.page}
          totalPages={pagination.total_pages}
          onPageChange={(newPage) => setPagination(prev => ({ ...prev, page: newPage }))}
        />
      </div>
    </div>
  );
}
