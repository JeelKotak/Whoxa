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

export default function Dashboard() {
  const storageData = [
    {
      title: "Total Users",
      value: "1348",
      unit: 232,
      trendValue: "+384%",
      isNegative: false,
      iconType: "income" as const
    },
    {
      title: "Total Groups",
      value: "2",
      unit: 2,
      trendValue: "-100%",
      isNegative: true,
      iconType: "orders" as const
    },
    {
      title: "Total Audio calls",
      value: "4",
      unit: 0,
      trendValue: "0%",
      isNegative: false,
      iconType: "profit" as const
    },
    {
      title: "Total Video calls",
      value: "2",
      unit: 0,
      trendValue: "0%",
      isNegative: false,
      iconType: "expense" as const
    }
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