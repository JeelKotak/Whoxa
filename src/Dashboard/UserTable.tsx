import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import useApi from "../hooks/useApiPost";

interface User {
  user_id: number;
  full_name: string;
  profile_pic: string;
  country: string;
  platforms: string[];
  createdAt: string;
  updatedAt: string;
}

const UserTable = () => {
  const navigate = useNavigate();
  const { loading, error, data, post } = useApi();
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await post("/admin/users", {
          page: 1,
          pageSize: 5,
          orderBy: "createdAt",
          orderDirection: "DESC",
        });
        setUsers(res.data.users);
      } catch (err) {
        console.error(err);
      }
    };

    fetchUsers();
  }, []);

  return (
    <div className="bg-white p-6 rounded-xl border border-[#e3e3e3] w-full">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold text-gray-800">Recent Users</h2>
        <button
          onClick={() => navigate("/user-list")}
          className="text-gray-500 hover:text-blue-600 text-sm font-medium"
        >
          View All
        </button>
      </div>


      <div className="w-full overflow-x-auto">
        <div className="max-h-[385px] overflow-y-auto custom-scrollbar">
          <table className="w-full text-left min-w-[600px] border-separate border-spacing-0">
            <thead>
              <tr className="text-gray-500 text-xs uppercase tracking-wider">
                <th className="sticky top-0 z-10 bg-gray-50 px-4 py-3 rounded-l-lg w-16">
                  S.L
                </th>
                <th className="sticky top-0 z-10 bg-gray-50 px-4 py-3">Profile</th>
                <th className="sticky top-0 z-10 bg-gray-50 px-4 py-3">Country</th>
                <th className="sticky top-0 z-10 bg-gray-50 px-4 py-3 w-24">Platform</th>
                <th className="sticky top-0 z-10 bg-gray-50 px-4 py-3 rounded-r-lg w-32">
                  Joined At
                </th>
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-100">
              {users.map((user, index) => (
                <tr
                  key={user.user_id}
                  className="text-sm text-gray-600 hover:bg-gray-50 transition-colors"
                >
                  <td className="px-4 py-4 font-medium text-gray-400">{index + 1}</td>
                  <td className="px-4 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 flex-shrink-0 rounded-full bg-yellow-100 flex items-center justify-center overflow-hidden">
                        <img
                          src={user.profile_pic}
                          alt={user.full_name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <span className="font-semibold text-gray-700 whitespace-nowrap">
                        {user.full_name || "N/A"}
                      </span>
                    </div>
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap">{user.country}</td>
                  <td className="px-4 py-4">
                    {user.platforms.map((p) => (
                      <span
                        key={p}
                        className="bg-green-100 text-green-600 px-3 py-1 rounded-full text-xs font-medium mr-1"
                      >
                        {p}
                      </span>
                    ))}
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap">
                    <div className="flex flex-col">
                      <span className="text-gray-700">
                        {new Date(user.createdAt).toLocaleDateString()}
                      </span>
                      <span className="text-xs text-gray-400">
                        {new Date(user.createdAt).toLocaleTimeString()}
                      </span>
                    </div>
                  </td>
                </tr>
              ))}

              {users.length === 0 && !loading && (
                <tr>
                  <td colSpan={5} className="px-4 py-4 text-center text-gray-400">
                    No users found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default UserTable;
