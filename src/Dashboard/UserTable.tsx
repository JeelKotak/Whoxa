import { useNavigate } from "react-router-dom";

const users = [
  { id: "01", name: "Manuel Langworth", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Manuel", code: "🇩🇪", country: "Germany", platform: "Web", date: "Nov 03, 2022", time: "4:19 AM" },
  { id: "02", name: "Sherry Weber", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sherry", code: "🇺🇸", country: "USA", platform: "Web", date: "Oct 03, 2022", time: "2:45 AM" },
  { id: "03", name: "Kelli Mitchell", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Kelli", code: "🇺🇸", country: "USA", platform: "Web", date: "Nov 30, 2022", time: "12:15 PM" },
  { id: "04", name: "Mattie Miller", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Mattie", code: "🇨🇿", country: "Czechia", platform: "Web", date: "Sep 17, 2022", time: "9:22 AM" },
  { id: "05", name: "Ricardo Kling", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Ricardo", code: "🇮🇳", country: "India", platform: "Web", date: "Dec 04, 2022", time: "4:03 AM" },
  { id: "06", name: "Manuel Langworth", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Manuel", code: "🇩🇪", country: "Germany", platform: "Web", date: "Nov 03, 2022", time: "4:19 AM" },
  { id: "07", name: "Sherry Weber", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sherry", code: "🇺🇸", country: "USA", platform: "Web", date: "Oct 03, 2022", time: "2:45 AM" },
  { id: "08", name: "Kelli Mitchell", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Kelli", code: "🇺🇸", country: "USA", platform: "Web", date: "Nov 30, 2022", time: "12:15 PM" },
  { id: "09", name: "Mattie Miller", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Mattie", code: "🇨🇿", country: "Czechia", platform: "Web", date: "Sep 17, 2022", time: "9:22 AM" },
  { id: "10", name: "Ricardo Kling", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Ricardo", code: "🇮🇳", country: "India", platform: "Web", date: "Dec 04, 2022", time: "4:03 AM" }
];

const UserTable = () => {
  const navigate = useNavigate();

  return (
    <div className="bg-white p-6 rounded-xl border border-[#e3e3e3] w-full">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold text-gray-800">Recent User</h2>
        <button
          onClick={() => navigate('/user-list')}
          className="text-gray-500 hover:text-blue-600 text-sm font-medium">View All</button>
      </div>

      <div className="w-full overflow-x-auto">
        <div className="max-h-[385px] overflow-y-auto custom-scrollbar">
          <table className="w-full text-left min-w-[600px] border-separate border-spacing-0">
            <thead>
              <tr className="text-gray-500 text-xs uppercase tracking-wider">
                <th className="sticky top-0 z-10 bg-gray-50 px-4 py-3 rounded-l-lg w-16">S.L</th>
                <th className="sticky top-0 z-10 bg-gray-50 px-4 py-3">Profile</th>
                <th className="sticky top-0 z-10 bg-gray-50 px-4 py-3">Country</th>
                <th className="sticky top-0 z-10 bg-gray-50 px-4 py-3 w-24">Platform</th>
                <th className="sticky top-0 z-10 bg-gray-50 px-4 py-3 rounded-r-lg w-32">Joined At</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-100">
              {users.map((user, index) => (
                <tr key={index} className="text-sm text-gray-600 hover:bg-gray-50 transition-colors">
                  <td className="px-4 py-4 font-medium text-gray-400">{user.id}</td>
                  <td className="px-4 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 flex-shrink-0 rounded-full bg-yellow-100 flex items-center justify-center overflow-hidden">
                        <img src={user.avatar} alt="" className="w-full h-full object-cover" />
                      </div>
                      <span className="font-semibold text-gray-700 whitespace-nowrap">{user.name}</span>
                    </div>
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap">
                    <span className="text-gray-400 mr-2">{user.code}</span>
                    {user.country}
                  </td>
                  <td className="px-4 py-4">
                    <span className="bg-green-100 text-green-600 px-3 py-1 rounded-full text-xs font-medium">
                      {user.platform}
                    </span>
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap">
                    <div className="flex flex-col">
                      <span className="text-gray-700">{user.date}</span>
                      <span className="text-xs text-gray-400">{user.time}</span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default UserTable;