import { useState, useEffect } from 'react';
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
import useApi from '../hooks/useApiPost';

export default function DashboardChartActiveUsers() {
    const { post, loading, error } = useApi();

    const [selectedYear, setSelectedYear] = useState('2026');
    const yearOptions = ['2026', '2025', '2024', '2023'];
    const [selectedMonth, setSelectedMonth] = useState('Feb');
    const monthOptions = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'June', 'July', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'];

    const [chartData, setChartData] = useState<{ day: string; users: number }[]>([]);

    const chartSettings = {
        color: "#2dd4bf",
        dataKey: "users",
        label: "Active Users"
    };

    // Fetch data from API whenever month/year changes
    useEffect(() => {
        const fetchData = async () => {
            try {
                const monthIndex = monthOptions.indexOf(selectedMonth) + 1; // Convert month name to number
                const res = await post('/admin/get-daily-active-users', {
                    month: monthIndex,
                    year: Number(selectedYear)
                });

                if (res.status && res.data) {
                    const formattedData = res.data.map((item: any) => ({
                        day: item.date.replace('\n', ' '),
                        users: item.count
                    }));
                    setChartData(formattedData);
                } else {
                    setChartData([]);
                }
            } catch (err) {
                console.error(err);
                setChartData([]);
            }
        };

        fetchData();
    }, [selectedMonth, selectedYear]);

    const MainChart = (
        <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData} margin={{ top: 10, right: 20, left: -15, bottom: 10 }}>
                <CartesianGrid vertical={false} stroke="#f1f5f9" strokeDasharray="3 3" />
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
                    fill={chartSettings.color}
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
                        <h3 className="text-xl font-bold text-gray-800">Daily Active Users</h3>
                    </div>

                    <div className='flex items-center gap-6'>
                        <div className="flex items-center gap-2">
                            <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: chartSettings.color }} />
                            <span className="text-sm font-medium text-slate-500 whitespace-nowrap">{chartSettings.label}</span>
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

                {/* Scrollable Chart */}
                <div className="w-full overflow-x-auto pb-4 custom-scrollbar">
                    <div className="h-[350px] min-w-[1000px]">
                        {loading ? <p className="text-center text-gray-400">Loading...</p> : MainChart}
                        {error && <p className="text-center text-red-500 mt-2">{JSON.stringify(error)}</p>}
                    </div>
                </div>
            </div>
        </div>
    );
}
