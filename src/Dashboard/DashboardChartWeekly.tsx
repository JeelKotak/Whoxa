import { Users } from 'lucide-react';

const DashboardChartWeekly = () => {
  const weeklyData = [
    { day: 'Sun', value: 100, active: true },
    { day: 'Mon', value: 75, active: true },
    { day: 'Tue', value: 100, active: true },
    { day: 'Wed', value: 30, active: true },
    { day: 'Thu', value: 22, active: true },
    { day: 'Fri', value: 10, active: true },
    { day: 'Sat', value: 50, active: true },
  ];

  return (
    <div className="bg-white p-6 rounded-xl border border-[#e3e3e3] w-full">
      <div className="flex justify-between items-center mb-12">
        <h2 className="text-xl font-bold text-gray-800">Weekly New Users</h2>
        <Users className="text-gray-400 w-5 h-5" />
      </div>

      <div className="space-y-8">
        {weeklyData.map((item) => (
          <div key={item.day} className="flex items-center gap-4">
            <span className="text-gray-500 text-sm w-8">{item.day}</span>
            <div className="flex-1 h-6 bg-gray-100 overflow-hidden">
              {item.active && (
                <div 
                  className="h-full bg-yellow-400 " 
                  style={{ width: `${item.value}%` }}
                />
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DashboardChartWeekly;