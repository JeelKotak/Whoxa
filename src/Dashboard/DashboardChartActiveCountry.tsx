import { useState, useEffect } from "react";
import {
  ComposableMap,
  Geographies,
  Geography,
} from "react-simple-maps";
import useApi from "../hooks/useApiPost";

const geoUrl =
  "https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json";

interface CountryData {
  name: string;
  users: number;
}

interface GeoProperties {
  name: string;
  ISO_A2: string;
}

const DashboardChartCountry = () => {
  const [countryData, setCountryData] = useState<CountryData[]>([]);
  const [totalActive, setTotalActive] = useState(0);
  const [tooltipContent, setTooltipContent] = useState("");

  const { get, loading, error } = useApi();

  // ✅ Fetch API Data
  const fetchCountryData = async () => {
    try {
      const response = await get(
        "/admin/users-cnt-country-wise-last-30-mins"
      );

      const formattedData: CountryData[] =
        response?.data?.map((item: any) => ({
          name: item.country,
          users: Number(item.count),
        })) || [];

      setCountryData(formattedData);

      const total = formattedData.reduce(
        (sum, item) => sum + item.users,
        0
      );
      setTotalActive(total);
    } catch (err) {
      console.error("Failed to fetch country data", err);
    }
  };

  useEffect(() => {
    fetchCountryData();
  }, []);

  const getCountryUsers = (name: string) => {
    const found = countryData.find((c) => c.name === name);
    return found ? found.users : 0;
  };

  return (
    <div className="bg-white p-6 rounded-xl border border-[#e3e3e3] min-h-[400px] flex flex-col font-sans">
      {/* Header */}
      <div className="mb-4">
        <h3 className="text-xl font-bold text-gray-800">
          Active Users by Country{" "}
          <span className="text-gray-400 font-normal text-md">
            (Last 30 Minutes Users)
          </span>
        </h3>

        <p className="text-5xl font-bold text-slate-800 mt-2">
          {loading ? "Loading..." : totalActive.toLocaleString()}
        </p>
      </div>

      <div className="flex flex-1 gap-8 mt-4 items-start">
        {/* ================= TABLE ================= */}
        <div className="w-1/2 border border-gray-200 rounded-lg flex flex-col h-[280px]">
          <div className="bg-gray-50 p-3 flex justify-between border-b border-gray-200">
            <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">
              Country
            </span>
            <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">
              Active Users
            </span>
          </div>

          <div className="flex-1 overflow-y-auto">
            {countryData.length > 0 ? (
              countryData.map((data) => (
                <div
                  key={data.name}
                  className="flex justify-between items-center p-3 border-b border-gray-100 text-sm"
                >
                  <div className="flex items-center gap-2">
                    {/* ✅ FLAG */}
                    <img
                      src={`https://flagcdn.com/w40/${data.name === "United States" ? "us" : data.name === "India" ? "in" : ""
                        }.png`}
                      alt={data.name}
                      className="w-5 h-4 object-cover rounded-sm"
                    />
                    <span className="text-slate-700 font-medium">
                      {data.name}
                    </span>
                  </div>

                  <span className="text-slate-600 font-mono">
                    {data.users.toLocaleString()}
                  </span>
                </div>
              ))
            ) : (
              <div className="h-full flex items-center justify-center text-gray-400">
                No Data
              </div>
            )}
          </div>
        </div>

        {/* ================= MAP ================= */}
        <div className="w-1/2 flex items-center justify-center h-[295px] relative">
          {tooltipContent && (
            <div className="absolute top-2 left-2 bg-black text-white text-xs px-2 py-1 rounded shadow">
              {tooltipContent}
            </div>
          )}

          <ComposableMap
            projectionConfig={{ scale: 190, center: [10, 10] }}
            width={800}
            height={400}
            className="w-full h-full"
          >
            <Geographies geography={geoUrl}>
              {({ geographies }) =>
                geographies.map((geo: any) => {
                  const users = getCountryUsers(geo.properties.name);
                  const isActive = users > 0;

                  return (
                    <Geography
                      key={geo.rsmKey}
                      geography={geo}
                      onMouseEnter={() => {
                        setTooltipContent(
                          `${geo.properties.name}: ${users}`
                        );
                      }}
                      onMouseLeave={() => {
                        setTooltipContent("");
                      }}
                      style={{
                        default: {
                          fill: isActive ? "#3B82F6" : "#F1F5F9",
                          stroke: "#CBD5E1",
                          strokeWidth: 0.5,
                          outline: "none",
                        },
                        hover: {
                          fill: "#2563EB",
                          outline: "none",
                          cursor: "pointer",
                        },
                        pressed: {
                          fill: "#1D4ED8",
                          outline: "none",
                        },
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
