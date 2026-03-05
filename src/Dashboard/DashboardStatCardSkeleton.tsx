const DashboardStatCardSkeleton = () => {
  return (
    <div className="border border-gray-100 bg-gray-50/40 rounded-xl p-5 min-w-[260px] animate-pulse">
      
      {/* Top Section */}
      <div className="flex items-center gap-4">
        
        {/* Icon Placeholder */}
        <div className="w-[54px] h-[54px] rounded-xl bg-gray-200" />

        {/* Title + Value */}
        <div className="flex-1 space-y-3">
          <div className="h-4 w-28 bg-gray-200 rounded-md" />
          <div className="h-7 w-20 bg-gray-300 rounded-md" />
        </div>
      </div>

      {/* Bottom Section */}
      <div className="mt-5 flex items-center gap-3">
        
        {/* Trend Badge */}
        <div className="h-7 w-20 bg-gray-200 rounded-full" />

        {/* vs last month text */}
        <div className="h-4 w-36 bg-gray-200 rounded-md" />
      </div>
    </div>
  );
};

export default DashboardStatCardSkeleton;
