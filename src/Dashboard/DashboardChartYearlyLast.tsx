import { useState, useEffect, useMemo } from 'react';
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
import useApi from '../hooks/useApiPost';

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

    const [videoData, setVideoData] = useState<number[]>(Array(12).fill(0));
    const [audioData, setAudioData] = useState<number[]>(Array(12).fill(0));

    const { post, loading, error } = useApi();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await post('/admin/yearly-calls-data', { year: Number(selectedYear) });
                if (res.status && res.data) {
                    const videoArr = Array(12).fill(0);
                    const audioArr = Array(12).fill(0);

                    res.data.videoCallsCount.forEach((item: any) => {
                        const idx = Number(item.month) - 1;
                        videoArr[idx] = Number(item.count);
                    });

                    res.data.audioCallsCount.forEach((item: any) => {
                        const idx = Number(item.month) - 1;
                        audioArr[idx] = Number(item.count);
                    });

                    setVideoData(videoArr);
                    setAudioData(audioArr);
                } else {
                    setVideoData(Array(12).fill(0));
                    setAudioData(Array(12).fill(0));
                }
            } catch (err) {
                console.error(err);
                setVideoData(Array(12).fill(0));
                setAudioData(Array(12).fill(0));
            }
        };

        fetchData();
    }, [selectedYear]);

    // Get maximum value to scale Y-axis dynamically
    const maxValue = useMemo(() => {
        return Math.max(...videoData, ...audioData, 1);
    }, [videoData, audioData]);

    const options: ChartOptions<"bar"> = {
        responsive: true,
        maintainAspectRatio: false,
        interaction: { mode: 'index', intersect: false },
        plugins: {
            legend: { display: false },
            datalabels: {
                anchor: 'end',
                align: 'start',
                formatter: (value) => value,
                font: { weight: 'bold', size: 11 },
                color: '#1e293b',
                backgroundColor: 'rgb(255, 255, 255)',
                borderRadius: 8,
                padding: { top: 3, bottom: 3, left: 4, right: 4 },
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
                    label: (context) => ` ${context.dataset.label}: ${context.raw}`
                }
            }
        },
        scales: {
            y: {
                beginAtZero: true,
                max: Math.ceil(maxValue + 1), // add 1 for padding
                ticks: { stepSize: 1, callback: (v) => v.toString() },
                grid: { color: '#f3f4f6', drawTicks: false },
                border: { display: false }
            },
            x: {
                grid: { display: false },
                border: { display: false }
            }
        }
    };

    const data = {
        labels: ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'],
        datasets: [
            {
                label: 'Video Call',
                data: videoData,
                backgroundColor: '#2d7a6f',
                borderRadius: 6,
                borderSkipped: false,
                barPercentage: 0.8,
                categoryPercentage: 0.6
            },
            {
                label: 'Audio Call',
                data: audioData,
                backgroundColor: '#ffcf67',
                borderRadius: 6,
                borderSkipped: false,
                barPercentage: 0.8,
                categoryPercentage: 0.6
            }
        ]
    };

    return (
        <div className="bg-white p-6 rounded-xl border border-[#e3e3e3] w-full">
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-gray-800">Video/Audio Call</h2>
                <div className='flex items-center gap-6'>
                    <div className="flex items-center gap-4">
                        {data.datasets.map(ds => (
                            <div key={ds.label} className="flex items-center gap-2">
                                <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: ds.backgroundColor as string }} />
                                <span className="text-sm font-medium text-slate-500 whitespace-nowrap">{ds.label}</span>
                            </div>
                        ))}
                    </div>
                    <ResizableSelect
                        options={yearOptions}
                        value={selectedYear}
                        onChange={(val) => setSelectedYear(val)}
                        width="w-24"
                    />
                </div>
            </div>

            {/* Chart */}
            <div className="w-full overflow-x-auto pb-4 custom-scrollbar">
                <div className="h-[380px] min-w-[800px]">
                    <Bar options={options} data={data} />
                </div>
            </div>

            {loading && <p className="text-center text-gray-400 mt-2">Loading...</p>}
            {error && <p className="text-center text-red-500 mt-2">{JSON.stringify(error)}</p>}
        </div>
    );
}
