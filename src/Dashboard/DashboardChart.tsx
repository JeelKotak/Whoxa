import { useState } from 'react';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    type ChartOptions
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import ResizableSelect from '../Components/CustomSelectDropdown';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);

export default function DashboardChart() {
    const [selectedYear, setSelectedYear] = useState('2026');
    const yearOptions = ['2026', '2025', '2024', '2023'];

    const options: ChartOptions<"line"> = {
        responsive: true,
        maintainAspectRatio: false,
        layout: {
            padding: {
                top: 10,
                right: 20,
                left: 0,
                bottom: 0
            }
        },
        interaction: {
            mode: 'index' as const,
            intersect: false,
        },
        plugins: {
             datalabels: {
                display: false,
            },
            legend: {
                display: false,
            },
            tooltip: {
                backgroundColor: '#fff',
                titleColor: '#333',
                bodyColor: '#666',
                borderColor: '#ddd',
                borderWidth: 1,
                padding: 12,
                titleFont: { size: 15, weight: 'bold' },
                bodyFont: { size: 13 },
                displayColors: true,
            },
        },
        scales: {
            y: {
                min: 0,
                max: 80,
                ticks: {
                    stepSize: 20,
                    padding: 10
                },
                grid: {
                    color: '#f0f0f0',
                },
            },
            x: {
                grid: {
                    display: false
                },
            },
        },
    };

    const data = {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
        datasets: [
            {
                label: 'New Users',
                data: [25, 18, 78, 40, 48, 38, 43, 40, 35, 45, 30, 50],
                borderColor: '#3b82f6',
                backgroundColor: '#3b82f6',
                tension: 0.4,
                pointRadius: 0,
            },
            {
                label: 'New Groups',
                data: [40, 32, 22, 28, 20, 25, 35, 30, 22, 28, 35, 40],
                borderColor: '#10b981',
                backgroundColor: '#10b981',
                tension: 0.4,
                pointRadius: 0,
            },
        ],
    };

    return (
        <div className="bg-white p-6 rounded-xl border border-[#e3e3e3] w-full">
            {/* Header Section */}
            <div className="flex flex-col md:flex-row md:items-center justify-between mb-6 gap-4">
                <div>
                    <h1 className="text-xl font-bold text-gray-800">New Users/Groups</h1>
                </div>

                <div className='flex items-center gap-6'>
                    <div className="flex items-center gap-4">
                        {data.datasets.map((dataset) => (
                            <div key={dataset.label} className="flex items-center gap-2">
                                <span 
                                    className="w-2.5 h-2.5 rounded-full" 
                                    style={{ backgroundColor: dataset.borderColor as string }}
                                />
                                <span className="text-sm font-medium text-slate-500 whitespace-nowrap">
                                    {dataset.label}
                                </span>
                            </div>
                        ))}
                    </div>

                    {/* Yearly Data Control */}
                    <div className='flex items-center gap-2'>
                        <ResizableSelect
                            options={yearOptions}
                            value={selectedYear}
                            onChange={(val) => setSelectedYear(val)}
                            width="w-24"
                        />
                    </div>
                </div>
            </div>

            {/* Scrollable Chart Container */}
            <div className="w-full overflow-x-auto pb-2 custom-scrollbar">
                <div className="h-[380px] min-w-[700px]">
                    <Line options={options} data={data} />
                </div>
            </div>
        </div>
    );
}