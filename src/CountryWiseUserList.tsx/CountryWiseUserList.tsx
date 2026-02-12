import { useState, useEffect, useMemo } from 'react';
import Flag from 'react-world-flags';

interface CountryData {
    code: string;
    name: string;
    desktopUsers: number;
    mobileUsers: number;
}

export default function CountryWiseUserList() {
    const [countries, setCountries] = useState<CountryData[]>([]);

    const COLORS = {
        desktop: '#fae43d', 
        mobile: '#60399a',  
    };

    const initialData: CountryData[] = [
    { code: 'CA', name: 'Canada', desktopUsers: 600, mobileUsers: 414 },
    { code: 'IN', name: 'India', desktopUsers: 41, mobileUsers: 80 },
    { code: 'US', name: 'United States', desktopUsers: 25, mobileUsers: 20 },
    { code: 'MX', name: 'Mexico', desktopUsers: 50, mobileUsers: 64 },
    { code: 'ID', name: 'Indonesia', desktopUsers: 32, mobileUsers: 145 },
    { code: 'DE', name: 'Germany', desktopUsers: 88, mobileUsers: 42 },
    { code: 'GB', name: 'United Kingdom', desktopUsers: 75, mobileUsers: 38 },
    { code: 'NG', name: 'Nigeria', desktopUsers: 12, mobileUsers: 95 },
    { code: 'JP', name: 'Japan', desktopUsers: 55, mobileUsers: 48 },
    { code: 'RU', name: 'Russia', desktopUsers: 10, mobileUsers: 8 },
    { code: 'BR', name: 'Brazil', desktopUsers: 6, mobileUsers: 10 },
    { code: 'PK', name: 'Pakistan', desktopUsers: 18, mobileUsers: 72 },
    { code: 'FR', name: 'France', desktopUsers: 62, mobileUsers: 31 },
    { code: 'EG', name: 'Egypt', desktopUsers: 15, mobileUsers: 58 },
    { code: 'PH', name: 'Philippines', desktopUsers: 22, mobileUsers: 84 },
    { code: 'AU', name: 'Australia', desktopUsers: 45, mobileUsers: 25 },
    { code: 'TR', name: 'Turkey', desktopUsers: 3, mobileUsers: 6 },
    { code: 'VN', name: 'Vietnam', desktopUsers: 4, mobileUsers: 5 },
    { code: 'BD', name: 'Bangladesh', desktopUsers: 7, mobileUsers: 10 },
    { code: 'SA', name: 'Saudi Arabia', desktopUsers: 28, mobileUsers: 52 },
    { code: 'ZA', name: 'South Africa', desktopUsers: 18, mobileUsers: 44 },
    { code: 'KR', name: 'South Korea', desktopUsers: 42, mobileUsers: 38 },
    { code: 'ES', name: 'Spain', desktopUsers: 35, mobileUsers: 22 },
    { code: 'IT', name: 'Italy', desktopUsers: 31, mobileUsers: 19 }
];

    useEffect(() => {
        setCountries(initialData);
    }, []);

    const sortedCountries = useMemo(() => {
        return [...countries].sort((a, b) => (b.desktopUsers + b.mobileUsers) - (a.desktopUsers + a.mobileUsers));
    }, [countries]);

    const maxTotal = sortedCountries.length > 0 
        ? sortedCountries[0].desktopUsers + sortedCountries[0].mobileUsers 
        : 0;

    return (
        <div className="w-full px-2 py-4">
            <div>
                <h1 className="text-2xl sm:text-3xl font-bold">Countrywise User List</h1>
                <nav className="flex items-center gap-2 text-sm text-black font-medium mt-1">
                    <span>List</span>
                    <span className="w-1 h-1 bg-gray-300 rounded-full" />
                    <span className="text-gray-500">Countrywise User List</span>
                </nav>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-6">
                    {sortedCountries.map((country) => {
                        const radius = 42;
                        const circumference = 2 * Math.PI * radius;
                        
                        const desktopShare = (country.desktopUsers / maxTotal) * circumference;
                        const mobileShare = (country.mobileUsers / maxTotal) * circumference;

                        return (
                            <div key={country.code} className="bg-white border border-[#e3e3e3] rounded-xl py-4 px-8 flex items-center gap-5">
                                
                                {/* 1. Split Circular Bar */}
                                <div className="relative flex-shrink-0 flex items-center justify-center w-24 h-24">
                                    <svg className="w-full h-full transform -rotate-90">
                                        <circle
                                            cx="48" cy="48" r={radius}
                                            stroke="#f3f4f6" strokeWidth="8" fill="transparent"
                                        />
                                        {/* Desktop Segment */}
                                        <circle
                                            cx="48" cy="48" r={radius}
                                            stroke={COLORS.desktop}
                                            strokeWidth="8"
                                            fill="transparent"
                                            strokeDasharray={`${desktopShare} ${circumference}`}
                                            strokeLinecap="round"
                                            className="transition-all duration-1000 ease-out"
                                        />
                                        {/* Mobile Segment */}
                                        <circle
                                            cx="48" cy="48" r={radius}
                                            stroke={COLORS.mobile}
                                            strokeWidth="8"
                                            fill="transparent"
                                            strokeDasharray={`${mobileShare} ${circumference}`}
                                            strokeDashoffset={-desktopShare}
                                            strokeLinecap="round"
                                            className="transition-all duration-1000 ease-out"
                                        />
                                    </svg>
                                    <div className="absolute flex flex-col items-center">
                                        <span className="text-sm font-black text-gray-800">{country.desktopUsers + country.mobileUsers}</span>
                                        <span className="text-[10px] text-gray-400 font-bold uppercase">Users</span>
                                    </div>
                                </div>

                                {/* 2. Info & Mini Graph Legend */}
                                <div className="flex flex-col gap-3">
                                    <div className="flex items-center gap-2 mb-2">
                                        <div className="w-8 h-6 border border-gray-100 overflow-hidden rounded-sm">
                                            <Flag code={country.code} className="w-full h-full object-cover" />
                                        </div>
                                        <span className="text-md     font-bold text-gray-700 uppercase tracking-tight">
                                            {country.name}
                                        </span>
                                    </div>

                                    {/* Data Breakdown (Like a Graph Legend) */}
                                    <div className="flex gap-2">
                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center gap-1.5">
                                                <div className="w-2 h-2 rounded-full" style={{ backgroundColor: COLORS.desktop }} />
                                                <span className="text-[11px] text-gray-500 font-semibold">Desktop</span>
                                            </div>
                                        </div>
                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center gap-1.5">
                                                <div className="w-2 h-2 rounded-full" style={{ backgroundColor: COLORS.mobile }} />
                                                <span className="text-[11px] text-gray-500 font-semibold">Mobile</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}