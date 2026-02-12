import { TrendingDown, TrendingUp, Landmark, Box, DollarSign, Folder } from "lucide-react";

interface DashboardStatCardProps {
    title: string;
    value: string;
    unit: number;
    trendValue: string;
    isNegative: boolean;
    iconType: 'income' | 'orders' | 'profit' | 'expense';
}

const DashboardStatCard = ({
    title,
    value,
    unit,
    trendValue,
    isNegative,
    iconType
}: DashboardStatCardProps) => {

    const iconConfigs = {
        income: {
            icon: Landmark,
            bg: "bg-indigo-600",
            color: "text-white",
            cardBg: "bg-indigo-50/50",
            borderColor: "border-indigo-100"
        },
        orders: {
            icon: Box,
            bg: "bg-rose-500",
            color: "text-white",
            cardBg: "bg-rose-50/50",
            borderColor: "border-rose-100"
        },
        profit: {
            icon: DollarSign,
            bg: "bg-emerald-600",
            color: "text-white",
            cardBg: "bg-emerald-50/50",
            borderColor: "border-emerald-100"
        },
        expense: {
            icon: Folder,
            bg: "bg-amber-500",
            color: "text-white",
            cardBg: "bg-amber-50/50",
            borderColor: "border-amber-100"
        },
    };

    const { icon: Icon, bg, color, cardBg, borderColor } = iconConfigs[iconType];

    return (
        <div className={` ${cardBg} ${borderColor} border rounded-xl p-5 min-w-[260px] `}>
            <div className="flex items-center gap-4">
                {/* Icon Container */}
                <div className={`${bg} ${color} p-3 rounded-xl flex items-center justify-center`}>
                    <Icon size={30} />
                </div>

                {/* Text Content */}
                <div>
                    <p className="text-gray-600 text-md font-medium">{title}</p>
                    <h3 className="text-2xl font-bold text-gray-900 leading-tight">{value}</h3>
                </div>
            </div>

            {/* Trend Indicator */}
            <div className="mt-4 flex items-center gap-2">
                <div className={`flex items-center gap-1 px-3 py-0.5 rounded-full text-md font-md mt-1
                ${isNegative ? 'bg-red-100 text-red-500' : 'bg-emerald-100 text-emerald-600'}`}>
                    {trendValue}
                    {isNegative ? <TrendingDown size={14} strokeWidth={3} /> : <TrendingUp size={14} strokeWidth={3} />}
                </div>
                <span className="text-gray-600 text-sm font-medium whitespace-nowrap">

                    vs last month: <span className="text-gray-900 font-semibold">{unit}</span>

                </span>
            </div>
        </div>
    );
};

export default DashboardStatCard;