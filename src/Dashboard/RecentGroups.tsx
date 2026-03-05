import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useApi from "../hooks/useApiPost"; // your custom hook

interface Participant {
  participant_id: number;
  User: {
    user_name: string;
    profile_pic: string;
    full_name: string;
    country: string;
    user_id: number;
  };
}

interface GroupChat {
  chat_id: number;
  group_name: string;
  group_icon: string | null;
  createdAt: string;
  participants: Participant[];
}

const RecentGroups = () => {
  const navigate = useNavigate();
  const { post, loading, error } = useApi();

  const [groups, setGroups] = useState<GroupChat[]>([]);

  useEffect(() => {
    const fetchGroups = async () => {
      try {
        const res = await post("/admin/group-chats", {
          page: 1,
          pageSize: 5,
          sortBy: "createdAt",
          sortOrder: "desc",
        });

        if (res.status && res.data && res.data.chats) {
          setGroups(res.data.chats);
        } else {
          setGroups([]);
        }
      } catch (err) {
        console.error(err);
        setGroups([]);
      }
    };

    fetchGroups();
  }, []);

  return (
    <div className="bg-white p-6 rounded-xl border border-[#e3e3e3] h-[365px] flex flex-col">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-gray-700 font-bold text-lg">Recent Groups</h3>
        <button
          onClick={() => navigate("/group-list")}
          className="text-blue-600 hover:underline text-sm font-medium"
        >
          View All
        </button>
      </div>

      {/* Table */}
      <div className="overflow-y-auto custom-scrollbar flex-grow">
        {loading && <p className="text-center text-gray-400">Loading...</p>}
        {error && <p className="text-center text-red-500">{JSON.stringify(error)}</p>}

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
            {groups.map((group) => (
              <tr key={group.chat_id} className="hover:bg-gray-50 transition-colors">
                <td className="px-4 py-5">
                  <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center border border-gray-200 shadow-sm overflow-hidden">
                    <img
                      src={group.group_icon || "https://advance.whoxachat.com/uploads/not-found-images/group-image.png"}
                      alt={group.group_name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </td>
                <td className="px-4 py-4 text-gray-700 font-medium">{group.group_name}</td>
                <td className="px-4 py-4 text-gray-500 text-sm">
                  {new Date(group.createdAt).toLocaleString()}
                </td>
                <td className="px-4 py-4 text-gray-500 font-semibold">{group.participants.length}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default RecentGroups;
