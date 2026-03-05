import DashboardStatCard from "../Components/DashboardStatCard";
import DashboardChart from "./DashboardChart";
import DashboardChartCountry from "./DashboardChartActiveCountry";
import DashboardChartActivity from "./DashboardChartActivity";
import DashboardChartWeekly from "./DashboardChartWeekly";
import UserTable from "./UserTable";
import DashboardChartActiveUsers from "./DashboardChartActiveUsers";
import DashboardChartCountryWise from "./DashboardChartCountryWise";
import RecentGroups from "./RecentGroups";
import DashboardChartYearlyLast from "./DashboardChartYearlyLast";
import useDashboardStats from "../hooks/useDashboardStats";
import { calculateTrend } from "../utils/calculateTrend";
import DashboardStatCardSkeleton from "./DashboardStatCardSkeleton";

export default function Dashboard() {

const { stats, loading } = useDashboardStats();

  // 🔹 Show skeleton cards while loading
  if (loading || !stats) {
    return (
      <div className="w-full px-2 py-4">
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
          {Array.from({ length: 4 }).map((_, index) => (
            <DashboardStatCardSkeleton key={index} />
          ))}
        </div>
      </div>
    );
  }

  // Now stats is guaranteed

  const userTrend = calculateTrend(stats.totalUsers, stats.usersLastMonth);
  const groupTrend = calculateTrend(stats.totalGroups, stats.groupsLastMonth);
  const audioTrend = calculateTrend(stats.totalAudioCalls, stats.audioLastMonth);
  const videoTrend = calculateTrend(stats.totalVideoCalls, stats.videoLastMonth);

  const storageData = [
    {
      title: "Total Users",
      value: stats.totalUsers.toLocaleString(),
      unit: stats.usersLastMonth,
      trendValue: `${userTrend.percentage}%`,
      isNegative: userTrend.isNegative,
      iconType: "income" as const,
    },
    {
      title: "Total Groups",
      value: stats.totalGroups.toLocaleString(),
      unit: stats.groupsLastMonth,
      trendValue: `${groupTrend.percentage}%`,
      isNegative: groupTrend.isNegative,
      iconType: "orders" as const,
    },
    {
      title: "Total Audio Calls",
      value: stats.totalAudioCalls.toLocaleString(),
      unit: stats.audioLastMonth,
      trendValue: `${audioTrend.percentage}%`,
      isNegative: audioTrend.isNegative,
      iconType: "profit" as const,
    },
    {
      title: "Total Video Calls",
      value: stats.totalVideoCalls.toLocaleString(),
      unit: stats.videoLastMonth,
      trendValue: `${videoTrend.percentage}%`,
      isNegative: videoTrend.isNegative,
      iconType: "expense" as const,
    },
  ];

  return (
    <div className="w-full px-2 py-4 space-y-10">
      {/* 1. Top Stat Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 ">
        {storageData.map((data, index) => (
          <DashboardStatCard key={index} {...data} />
        ))}
      </div>

      {/* 2. Main Analytics Chart */}
      <div>
        <DashboardChart />
      </div>

      {/* 3. Mid-level Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <DashboardChartCountry />
        </div>
        <div className="lg:col-span-1">
          <DashboardChartActivity />
        </div>
      </div>

      {/* 4. Weekly Data & Recent Users Table */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
        <div className="lg:col-span-1">
          <DashboardChartWeekly />
        </div>

        <div className="lg:col-span-2">
          <UserTable />
        </div>
      </div>

      <div>
        <DashboardChartActiveUsers />
      </div>

      {/* 5. Last Section: Country Stats & Recent Groups (Equally Divided) */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div>
          <DashboardChartCountryWise />
        </div>
        <div>
          <RecentGroups />
        </div>
      </div>

      {/* 6. Yearly Data */}
      <div>
        <DashboardChartYearlyLast />
      </div>
    </div>
  );
};