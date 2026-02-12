import { useState } from 'react';
import { 
    Chart as ChartJS, 
    CategoryScale, 
    LinearScale, 
    BarElement, 
    Title, 
    Tooltip, 
    Legend, 
    type ChartOptions 
} from 'chart.js';
import { Bar } from 'react-chartjs-2'; 
import ChartDataLabels from 'chartjs-plugin-datalabels'; 
import ResizableSelect from '../Components/CustomSelectDropdown';

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
    ChartDataLabels
);

export default function DashboardChartYearlyLast() {
    const [selectedYear, setSelectedYear] = useState('2026');
    const yearOptions = ['2026', '2025', '2024', '2023'];

    const options: ChartOptions<"bar"> = {
        responsive: true,
        maintainAspectRatio: false,
        interaction: {
            mode: 'index',
            intersect: false,
        },
        plugins: {
            legend: {
                display: false,
            },
            datalabels: {
                anchor: 'end', 
                align: 'start', 
                formatter: (value) => value,
                font: {
                    weight: 'bold',
                    size: 11
                },
                color: '#1e293b',
                backgroundColor: 'rgb(255, 255, 255)', 
                borderRadius: 8, 
                padding: {
                    top: 3,
                    bottom: 3,
                    left: 4,
                    right: 4
                },
                offset: 8 
            },
            tooltip: {
                enabled: true,
                mode: 'index',
                intersect: false,
                backgroundColor: '#ffffff',
                titleColor: '#1e293b',
                bodyColor: '#475569',
                borderColor: '#e3e3e3',
                borderWidth: 1,
                padding: 12,
                boxPadding: 8,
                usePointStyle: true,
                callbacks: {
                    label: (context) => {
                        return ` ${context.dataset.label}: ${context.raw}`;
                    }
                }
            }
        },
        scales: {
            y: {
                beginAtZero: true,
                max: 2, 
                ticks: { 
                    stepSize: 0.5, 
                    callback: (value) => Number(value).toFixed(1) 
                },
                grid: { 
                    color: '#f3f4f6',
                    drawTicks: false
                },
                border: { display: false }
            },
            x: {
                grid: { display: false },
                border: { display: false }
            },
        },
    };

    const data = {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
        datasets: [
            {
                label: 'Video Call',
                data: [0.5, 0.3, 1.8, 0.8, 1.2, 0.7, 1.0, 0.9, 0.6, 1.1, 0.5, 1.3],
                backgroundColor: '#2d7a6f', 
                borderRadius: 6, 
                borderSkipped: false,
                barPercentage: 0.8,
                categoryPercentage: 0.6,
            },
            {
                label: 'Audio Call',
                data: [0.8, 0.6, 0.4, 0.5, 0.4, 0.5, 0.7, 0.6, 0.4, 0.5, 0.7, 0.8],
                backgroundColor: '#ffcf67', 
                borderRadius: 6,
                borderSkipped: false,
                barPercentage: 0.8,
                categoryPercentage: 0.6,
            },
        ],
    };

    return (
        <div className="bg-white p-6 rounded-xl border border-[#e3e3e3] w-full">
            {/* Header Section */}
            <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-gray-800">Video/Audio Call</h2>
                
                <div className='flex items-center gap-6'>
                    <div className="flex items-center gap-4">
                        {data.datasets.map((dataset) => (
                            <div key={dataset.label} className="flex items-center gap-2">
                                <span 
                                    className="w-2.5 h-2.5 rounded-full" 
                                    style={{ backgroundColor: dataset.backgroundColor as string }}
                                />
                                <span className="text-sm font-medium text-slate-500 whitespace-nowrap">
                                    {dataset.label}
                                </span>
                            </div>
                        ))}
                    </div>

                    {/* Year Selector */}
                    <ResizableSelect
                        options={yearOptions}
                        value={selectedYear}
                        onChange={(val) => setSelectedYear(val)}
                        width="w-24"
                    />
                </div>
            </div>

            {/* Scroll Container */}
            <div className="w-full overflow-x-auto pb-4 custom-scrollbar">
                <div className="h-[380px] min-w-[800px]">
                    <Bar options={options} data={data} />
                </div>
            </div>
        </div>
    );
}