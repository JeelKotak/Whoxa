import { PieChart, Pie, ResponsiveContainer, Cell, Tooltip } from 'recharts';

const data = [
  { name: 'Android', value: 12, fill: '#2DD4BF' },
  { name: 'Web', value: 9, fill: '#38BDF8' },
  { name: 'iOS', value: 79, fill: '#FBBF24' },
];

export default function CustomerAreaChart() {
  return (
    <div className="bg-white p-6 rounded-xl border border-[#e3e3e3] min-h-[460px] flex flex-col">
      <h3 className="text-xl font-bold text-gray-800">Platform Activity</h3>
      
      <div className="relative flex-1 flex flex-col items-center justify-center">
        <div className="w-full h-70 relative">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Tooltip 
                contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)' }}
              />
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                innerRadius={70}
                outerRadius={95}
                paddingAngle={4}
                dataKey="value"
                startAngle={90}
                endAngle={-270}
                stroke="none"
                label={({ name, value }) => `${name}: ${value}%`}
              >
                {data.map((entry, index) => (
                  <Cell 
                    key={`cell-${index}`} 
                    fill={entry.fill} 
                    className="focus:outline-none" 
                  />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Legend */}
        <div className="mt-6 grid grid-cols-3 gap-4 w-full">
          {data.map((item) => (
            <div key={item.name} className="flex flex-col items-center gap-1">
              <div className="flex items-center gap-2">
                <div 
                  className="w-3 h-3 rounded-full" 
                  style={{ backgroundColor: item.fill }} 
                />
                <span className="text-slate-600 text-xs font-semibold">{item.name}</span>
              </div>
              <span className="text-slate-500 text-sm font-medium">{item.value}%</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};