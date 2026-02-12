import { useState } from 'react';
import ResizableSelect from '../Components/CustomSelectDropdown';
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer
} from 'recharts';

const data = [
    { day: '01 Jan', users: 20 }, { day: '02 Jan', users: 65 }, { day: '03 Jan', users: 210 },
    { day: '04 Jan', users: 22 }, { day: '05 Jan', users: 15 }, { day: '06 Jan', users: 25 },
    { day: '07 Jan', users: 18 }, { day: '08 Jan', users: 15 }, { day: '09 Jan', users: 12 },
    { day: '10 Jan', users: 28 }, { day: '11 Jan', users: 18 }, { day: '12 Jan', users: 22 },
    { day: '13 Jan', users: 10 }, { day: '14 Jan', users: 2 }, { day: '15 Jan', users: 5 },
    { day: '16 Jan', users: 2 }, { day: '17 Jan', users: 1 }, { day: '18 Jan', users: 2 },
    { day: '19 Jan', users: 65 }, { day: '20 Jan', users: 12 }, { day: '21 Jan', users: 25 },
    { day: '22 Jan', users: 28 }, { day: '23 Jan', users: 38 }, { day: '24 Jan', users: 55 },
    { day: '25 Jan', users: 45 }, { day: '26 Jan', users: 0 }, { day: '27 Jan', users: 0 },
    { day: '28 Jan', users: 0 }, { day: '29 Jan', users: 0 }, { day: '30 Jan', users: 0 },
    { day: '31 Jan', users: 0 }
];

export default function DashboardChartActiveUsers() {
    const [selectedYear, setSelectedYear] = useState('2026');
    const yearOptions = ['2026', '2025', '2024', '2023'];
    const [selectedMonth, setSelectedMonth] = useState('Jan');
    const monthOptions = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'June', 'July', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'];


    const chartSettings = {
        color: "#2dd4bf",
        dataKey: "users",
        label: "Active Users"
    };

    const MainChart = (
        <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data} margin={{ top: 10, right: 20, left: -15, bottom: 10 }}>
                <CartesianGrid
                    vertical={false}
                    stroke="#f1f5f9"
                    strokeDasharray="3 3"
                />
                <XAxis
                    dataKey="day"
                    axisLine={false}
                    tickLine={false}
                    tick={{ fill: '#94a3b8', fontSize: 10, fontWeight: 500 }}
                    angle={-45}
                    dy={10}
                    interval={0} 
                />
                <YAxis
                    axisLine={false}
                    tickLine={false}
                    tick={{ fill: '#94a3b8', fontSize: 12, fontWeight: 500 }}
                />
                <Tooltip
                    cursor={{ fill: 'transparent' }}
                    contentStyle={{
                        borderRadius: '16px',
                        border: 'none',
                        boxShadow: '0 10px 25px rgba(0,0,0,0.05)',
                        padding: '12px',
                        fontSize: '14px'
                    }}
                />
                <Bar
                    dataKey="users"
                    fill="#2dd4bf"
                    radius={[10, 10, 10, 10]}
                    barSize={12}
                    background={{ fill: '#f1f5f9', radius: 10 }}
                    animationDuration={1500}
                />
            </BarChart>
        </ResponsiveContainer>
    );

    return (
        <div className="flex flex-col items-center justify-center font-sans">
            <div className="w-full bg-white rounded-xl p-6 border border-[#e3e3e3]">
                
                {/* Header Section */}
                <div className="flex justify-between items-center mb-10">
                    <div>
                        <h3 className="text-xl font-bold text-gray-800">
                            Daily Active Users
                        </h3>
                    </div>

                    <div className='flex items-center gap-6'>
                        <div className="flex items-center gap-2">
                            <span 
                                className="w-2.5 h-2.5 rounded-full" 
                                style={{ backgroundColor: chartSettings.color }} 
                            />
                            <span className="text-sm font-medium text-slate-500 whitespace-nowrap">
                                {chartSettings.label}
                            </span>
                        </div>

                        {/* Dropdown Group */}
                        <div className='flex gap-2'>
                            <ResizableSelect
                                options={monthOptions}
                                value={selectedMonth}
                                onChange={(val) => setSelectedMonth(val)}
                                width="w-24"
                            />
                            <ResizableSelect
                                options={yearOptions}
                                value={selectedYear}
                                onChange={(val) => setSelectedYear(val)}
                                width="w-24"
                            />
                        </div>
                    </div>
                </div>

                {/* Scrollable Wrapper */}
                <div className="w-full overflow-x-auto pb-4 custom-scrollbar">
                    <div className="h-[350px] min-w-[1000px]">
                        {MainChart}
                    </div>
                </div>
            </div>
        </div>
    );
}