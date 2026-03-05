import { useState, useEffect } from "react";
import { Users } from "lucide-react";
import useApi from "../hooks/useApiPost";

interface WeeklyData {
  day: string;
  count: number;
}

const DashboardChartWeekly = () => {
  const { get, loading, error } = useApi();
  const [weeklyData, setWeeklyData] = useState<WeeklyData[]>([]);

  // 🔹 Fetch API Data
  const fetchWeeklyData = async () => {
    try {
      const response = await get("/admin/new-users-of-week");
      const apiData: WeeklyData[] = response?.data?.newUsers || [];
      setWeeklyData(apiData);
    } catch (err) {
      console.error("Failed to fetch weekly data", err);
    }
  };

  useEffect(() => {
    fetchWeeklyData();
  }, []);

  // Max value for scaling bar width
  const maxCount = Math.max(...weeklyData.map((d) => d.count), 1);

  return (
    <div className="bg-white p-6 rounded-xl border border-[#e3e3e3] w-full">
      <div className="flex justify-between items-center mb-12">
        <h2 className="text-xl font-bold text-gray-800">Weekly New Users</h2>
        <Users className="text-gray-400 w-5 h-5" />
      </div>

      {loading ? (
        <div className="flex items-center justify-center h-32 text-gray-500">
          Loading...
        </div>
      ) : error ? (
        <div className="flex items-center justify-center h-32 text-red-500">
          Failed to load data
        </div>
      ) : (
        <div className="space-y-8">
          {weeklyData.map((item) => (
            <div key={item.day} className="flex items-center gap-4">
              <span className="text-gray-500 text-sm w-8">{item.day}</span>

              {/* Bar */}
              <div className="flex-1 h-6 bg-gray-100 overflow-hidden relative rounded">
                {item.count > 0 && (
                  <div
                    className="h-full bg-yellow-400 flex items-center justify-end pr-2 text-xs font-semibold text-gray-800 rounded"
                    style={{
                      width: `${(item.count / maxCount) * 100}%`,
                    }}
                  >
                    {item.count}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default DashboardChartWeekly;
