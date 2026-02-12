import { useState, useMemo } from "react";
import { ComposableMap, Geographies, Geography } from "react-simple-maps";

const geoUrl = "https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json";

const COUNTRY_STATS = [
    { name: "Canada", count: 1014, flag: "https://flagcdn.com/w40/ca.png" },
    { name: "India", count: 122, flag: "https://flagcdn.com/w40/in.png" },
    { name: "United States of America", count: 44, flag: "https://flagcdn.com/w40/us.png" },
    { name: "Bangladesh", count: 27, flag: "https://flagcdn.com/w40/bd.png" },
    { name: "Brazil", count: 16, flag: "https://flagcdn.com/w40/br.png" },
];

const DashboardChartCountryWise = () => {
    const [hoveredCountry, setHoveredCountry] = useState<string | null>(null);
    const [tooltipPos, setTooltipPos] = useState({ x: 0, y: 0 });

    const highlightedCountries = useMemo(() => {
        return new Set(COUNTRY_STATS.map((c) => c.name));
    }, []);

    return (
        <div className="bg-white p-6 rounded-2xl border border-[#e3e3e3] flex flex-col w-full">
            {/* HEADER */}
            <h3 className="text-xl font-bold text-gray-800 mb-6">Countrywise Users</h3>

            <div className="flex flex-col lg:flex-row gap-12 items-center">
                {/* LEFT: Map Section */}
                <div className="flex-1 w-full">
                    <div className="relative">
                        <ComposableMap
                            projectionConfig={{ scale: 140, center: [0, 10] }} 
                            height={300}
                            width={600}  
                        >
                            <Geographies geography={geoUrl}>
                                {({ geographies }) =>
                                    geographies.map((geo) => {
                                        const countryName = geo.properties.name;
                                        const isHighlighted = highlightedCountries.has(countryName);
                                        const isHovered = hoveredCountry === countryName;

                                        return (
                                            <Geography
                                                key={geo.rsmKey}
                                                geography={geo}
                                                onMouseEnter={(e) => {
                                                    setHoveredCountry(countryName);
                                                    setTooltipPos({ x: e.clientX, y: e.clientY });
                                                }}
                                                onMouseMove={(e) => setTooltipPos({ x: e.clientX, y: e.clientY })}
                                                onMouseLeave={() => setHoveredCountry(null)}
                                                fill={isHighlighted || isHovered ? "#0E94AD" : "#E2E8F0"}
                                                stroke="#FFFFFF"
                                                strokeWidth={0.5}
                                                style={{
                                                    default: { outline: "none", transition: "all 250ms" },
                                                    hover: { outline: "none", cursor: "pointer", fill: "#0A7A8F" },
                                                    pressed: { outline: "none" },
                                                }}
                                            />
                                        );
                                    })
                                }
                            </Geographies>
                        </ComposableMap>

                        {/* Tooltip */}
                        {hoveredCountry && (
                            <div
                                className="fixed z-50 bg-white border border-gray-200 shadow-xl p-3 rounded pointer-events-none transform -translate-x-1/2 -translate-y-[120%]"
                                style={{ left: tooltipPos.x, top: tooltipPos.y }}
                            >
                                <p className="text-xs font-bold text-black">{hoveredCountry}</p>
                                {/* Arrow */}
                                <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-white border-b border-r border-gray-200 rotate-45"></div>
                            </div>
                        )}
                    </div>
                </div>

                {/* RIGHT: Stats List Section */}
                <div className="w-full lg:w-60">
                    <div className="flex flex-col">
                        {COUNTRY_STATS.map((country) => (
                            <div
                                key={country.name}
                                className="flex items-center justify-between py-4 border-t border-gray-100 first:border-t-0"
                            >
                                <div className="flex items-center gap-4">
                                    <img
                                        src={country.flag}
                                        alt={country.name}
                                        className="w-6 h-4 object-cover rounded-sm shadow-sm"
                                    />
                                    <span className="text-[#475569] font-bold text-sm tracking-tight">
                                        {country.name === "United States of America" ? "USA" : country.name}
                                    </span>
                                </div>
                                <div className="flex items-center gap-1">
                                    <span className="text-gray-900 text-sm font-semibold">{country.count}</span>
                                    <span className="text-[#64748B] font-bold text-sm ml-1">Users</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DashboardChartCountryWise;