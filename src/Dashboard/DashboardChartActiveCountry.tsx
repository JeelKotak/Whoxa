import { useState } from "react";
import { ComposableMap, Geographies, Geography } from "react-simple-maps";

const geoUrl = "https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json";

interface CountryData {
    name: string;
    users: number;
}

interface GeoProperties {
    name: string;
}
interface GeoObject {
    rsmKey: string;
    properties: GeoProperties;
}

const DashboardChartCountry = () => {
    const [countryData, setCountryData] = useState<CountryData[]>([]);
    const [totalActive, setTotalActive] = useState(0);

    const handleCountryClick = (geo: GeoObject) => {
        const countryName = geo.properties.name;
        const mockActiveUsers = Math.floor(Math.random() * 500) + 1;

        setCountryData((prev) => {
            const existingIndex = prev.findIndex(item => item.name === countryName);
            
            if (existingIndex !== -1) {
                const updated = [...prev];
                updated[existingIndex].users = mockActiveUsers;
                return updated;
            } else {
                return [{ name: countryName, users: mockActiveUsers }, ...prev];
            }
        });

        setTotalActive(prev => prev + mockActiveUsers);
    };

    const isCountrySelected = (name: string) => countryData.some(c => c.name === name);

    return (
        <div className="bg-white p-6 rounded-xl border border-[#e3e3e3] min-h-[400px] flex flex-col font-sans">
            <div className="mb-4">
                <h3 className="text-xl font-bold text-gray-800">
                    Active Users by Country <span className="text-gray-400 font-normal text-md">(Last 30 Minutes Users)</span>
                </h3>
                <p className="text-5xl font-bold text-slate-800 mt-2">{totalActive.toLocaleString()}</p>
            </div>

            <div className="flex flex-1 gap-8 mt-4 items-start">
                {/* Table Section with Custom Scrollbar */}
                <div className="w-1/2 border border-gray-200 rounded-lg flex flex-col h-[280px]">
                    <div className="bg-gray-50 p-3 flex justify-between border-b border-gray-200">
                        <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Country</span>
                        <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Active User</span>
                    </div>
                    <div className="flex-1 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent">
                        {countryData.length > 0 ? (
                            countryData.map((data) => (
                                <div key={data.name} className="flex justify-between p-3 border-b border-gray-100 text-sm animate-in fade-in slide-in-from-left-2">
                                    <span className="text-slate-700 font-medium">{data.name}</span>
                                    <span className="text-slate-600 font-mono">{data.users.toLocaleString()}</span>
                                </div>
                            ))
                        ) : (
                            <div className="h-full flex items-center justify-center text-gray-400 text-md">
                                No Data
                            </div>
                        )}
                    </div>
                </div>

                {/* Map Section */}
                <div className="w-1/2 flex items-center justify-center h-[295px] overflow-hidden">
                    <ComposableMap
                        projectionConfig={{ scale: 190, center: [10, 10] }}
                        width={800} height={400}
                        className="w-full h-full"
                    >
                        <Geographies geography={geoUrl}>
                            {({ geographies }) =>
                                geographies.map((geo) => {
                                    const isSelected = isCountrySelected(geo.properties.name);
                                    return (
                                        <Geography
                                            key={geo.rsmKey}
                                            geography={geo}
                                            onClick={() => handleCountryClick(geo)}
                                            style={{
                                                default: { 
                                                    fill: isSelected ? "#3B82F6" : "#F8FAFC", 
                                                    stroke: isSelected ? "#2563EB" : "#CBD5E1", 
                                                    strokeWidth: 0.5, 
                                                    outline: "none",
                                                    transition: "all 250ms"
                                                },
                                                hover: { 
                                                    fill: "#3B82F6", 
                                                    stroke: "#2563EB", 
                                                    outline: "none", 
                                                    cursor: "pointer" 
                                                },
                                                pressed: { fill: "#1D4ED8", outline: "none" },
                                            }}
                                        />
                                    );
                                })
                            }
                        </Geographies>
                    </ComposableMap>
                </div>
            </div>
        </div>
    );
};

export default DashboardChartCountry;