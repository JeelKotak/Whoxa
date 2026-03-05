import { useState, useEffect } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  type ChartOptions,
} from "chart.js";
import { Line } from "react-chartjs-2";
import ResizableSelect from "../Components/CustomSelectDropdown";
import useApi from "../hooks/useApiPost";

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
  const [selectedYear, setSelectedYear] = useState("2026");
  const [usersData, setUsersData] = useState<number[]>(Array(12).fill(0));
  const [groupsData, setGroupsData] = useState<number[]>(Array(12).fill(0));

  const { post, loading, error } = useApi();

  const yearOptions = ["2026", "2025", "2024", "2023"];

  // 🔥 Fetch Data
  const fetchYearlyData = async () => {
    try {
      const response = await post(
        "/admin/yearly-new-users-and-grps",
        { year: Number(selectedYear) }
      );

      const usersArray = Array(12).fill(0);
      const groupsArray = Array(12).fill(0);

      response?.data?.newUsersCount?.forEach((item: any) => {
        const monthIndex = Number(item.month) - 1;
        usersArray[monthIndex] = Number(item.count);
      });

      response?.data?.newGroupsCount?.forEach((item: any) => {
        const monthIndex = Number(item.month) - 1;
        groupsArray[monthIndex] = Number(item.count);
      });

      setUsersData(usersArray);
      setGroupsData(groupsArray);
    } catch (err) {
      console.error("Failed to fetch yearly data", err);
    }
  };

  useEffect(() => {
    fetchYearlyData();
  }, [selectedYear]);

  // ✅ Chart Options (Updated with Detailed Hover)
  const options: ChartOptions<"line"> = {
    responsive: true,
    maintainAspectRatio: false,
    interaction: {
      mode: "index",
      intersect: false,
    },
    plugins: {
      legend: { display: false },
      tooltip: {
        enabled: true,
        backgroundColor: "#ffffff",
        titleColor: "#111827",
        bodyColor: "#374151",
        borderColor: "#e5e7eb",
        borderWidth: 1,
        padding: 12,
        displayColors: true,
        callbacks: {
          title: (context) => `Month: ${context[0].label}`,
          label: (context) => {
            const label = context.dataset.label || "";
            const value = Number(context.raw).toLocaleString();
            return `${label}: ${value}`;
          },
          footer: (context) => {
            const total = context.reduce(
              (sum, item) => sum + Number(item.raw),
              0
            );
            return `Total: ${total.toLocaleString()}`;
          },
        },
      },
    },
    scales: {
      y: {
        beginAtZero: true,
      },
      x: {
        grid: { display: false },
      },
    },
  };

  const chartData = {
    labels: [
      "Jan","Feb","Mar","Apr","May","Jun",
      "Jul","Aug","Sep","Oct","Nov","Dec",
    ],
    datasets: [
      {
        label: "New Users",
        data: usersData,
        borderColor: "#3b82f6",
        backgroundColor: "#3b82f6",
        tension: 0.4,
        pointRadius: 0,
        pointHoverRadius: 6,
        pointHoverBorderWidth: 2,
      },
      {
        label: "New Groups",
        data: groupsData,
        borderColor: "#10b981",
        backgroundColor: "#10b981",
        tension: 0.4,
        pointRadius: 0,
        pointHoverRadius: 6,
        pointHoverBorderWidth: 2,
      },
    ],
  };

  return (
    <div className="bg-white p-6 rounded-xl border border-[#e3e3e3] w-full">
      
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-xl font-bold text-gray-800">
          New Users / Groups
        </h1>

        <ResizableSelect
          options={yearOptions}
          value={selectedYear}
          onChange={(val) => setSelectedYear(val)}
          width="w-24"
        />
      </div>

      {/* Loading */}
      {loading ? (
        <div className="h-[380px] flex items-center justify-center">
          <div className="animate-spin rounded-full h-8 w-8 border-4 border-blue-500 border-t-transparent"></div>
        </div>
      ) : error ? (
        <div className="h-[380px] flex items-center justify-center text-red-500">
          Failed to load data
        </div>
      ) : (
        <div className="h-[380px]">
          <Line options={options} data={chartData} />
        </div>
      )}
    </div>
  );
}
