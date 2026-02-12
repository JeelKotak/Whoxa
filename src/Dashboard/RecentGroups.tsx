import { useNavigate } from "react-router-dom";

const groupData = [
  {
    id: 1,
    name: 'College Legends',
    createdAt: '12/5/2025, 3:24:17 PM',
    members: 5,
    image: '🎓'
  },
  {
    id: 2,
    name: 'RouteRangers',
    createdAt: '11/4/2025, 4:58:42 PM',
    members: 4,
    image: '🧭'
  },
  {
    id: 3,
    name: 'College Legends',
    createdAt: '12/5/2025, 3:24:17 PM',
    members: 5,
    image: '🎓'
  },
  {
    id: 4,
    name: 'RouteRangers',
    createdAt: '11/4/2025, 4:58:42 PM',
    members: 4,
    image: '🧭'
  },
];

const RecentGroups = () => {
  const navigate = useNavigate();

  return (
    <div className="bg-white p-6 rounded-xl border border-[#e3e3e3] h-[365px] flex flex-col">
      {/* Header stays fixed at the top */}
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-gray-700 font-bold text-lg">Recent Groups</h3>
        <button
          onClick={() => navigate('/group-list')}
          className="text-blue-600 hover:underline text-sm font-medium">View All</button>
      </div>

      {/* This wrapper handles the scrolling */}
      <div className="overflow-y-auto custom-scrollbar flex-grow">
        <table className="w-full text-left border-collapse">
          <thead className="sticky top-0 z-10">
            <tr className="bg-gray-50 uppercase text-xs text-gray-500 tracking-wider">
              <th className="px-4 py-3 font-bold">Group Image</th>
              <th className="px-4 py-3 font-bold">Name</th>
              <th className="px-4 py-3 font-bold">Created At</th>
              <th className="px-4 py-3 font-bold">Members</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {groupData.map((group) => (
              <tr key={group.id} className="hover:bg-gray-50 transition-colors">
                <td className="px-4 py-5">
                  <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center border border-gray-200 shadow-sm text-xl">
                    {group.image}
                  </div>
                </td>
                <td className="px-4 py-4 text-gray-700 font-medium">{group.name}</td>
                <td className="px-4 py-4 text-gray-500 text-sm">{group.createdAt}</td>
                <td className="px-4 py-4 text-gray-500 font-semibold">{group.members}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default RecentGroups;