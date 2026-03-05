import { useState, useMemo, useEffect } from "react";
import { ComposableMap, Geographies, Geography } from "react-simple-maps";
import useApi from "../hooks/useApiPost";

const geoUrl = "https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json";

// Country name → ISO alpha-2 code for flagcdn
const countryCodeMap: Record<string, string> = {
  "Afghanistan": "af",
  "Albania": "al",
  "Algeria": "dz",
  "Andorra": "ad",
  "Angola": "ao",
  "Antigua and Barbuda": "ag",
  "Argentina": "ar",
  "Armenia": "am",
  "Aruba": "aw",
  "Australia": "au",
  "Austria": "at",
  "Azerbaijan": "az",
  "Bahamas": "bs",
  "Bahrain": "bh",
  "Bangladesh": "bd",
  "Barbados": "bb",
  "Belarus": "by",
  "Belgium": "be",
  "Belize": "bz",
  "Benin": "bj",
  "Bhutan": "bt",
  "Bolivia": "bo",
  "Bosnia and Herzegovina": "ba",
  "Botswana": "bw",
  "Brazil": "br",
  "Brunei": "bn",
  "Bulgaria": "bg",
  "Burkina Faso": "bf",
  "Burundi": "bi",
  "Côte d'Ivoire": "ci",
  "Cabo Verde": "cv",
  "Cambodia": "kh",
  "Cameroon": "cm",
  "Canada": "ca",
  "Central African Republic": "cf",
  "Chad": "td",
  "Chile": "cl",
  "China": "cn",
  "Colombia": "co",
  "Comoros": "km",
  "Costa Rica": "cr",
  "Croatia": "hr",
  "Cuba": "cu",
  "Cyprus": "cy",
  "Czech Republic": "cz",
  "Democratic Republic of the Congo": "cd",
  "Denmark": "dk",
  "Djibouti": "dj",
  "Dominica": "dm",
  "Dominican Republic": "do",
  "Ecuador": "ec",
  "Egypt": "eg",
  "El Salvador": "sv",
  "Equatorial Guinea": "gq",
  "Eritrea": "er",
  "Estonia": "ee",
  "Eswatini": "sz",
  "Ethiopia": "et",
  "Federated States of Micronesia": "fm",
  "Fiji": "fj",
  "Finland": "fi",
  "France": "fr",
  "Gabon": "ga",
  "Gambia": "gm",
  "Georgia": "ge",
  "Germany": "de",
  "Ghana": "gh",
  "Greece": "gr",
  "Grenada": "gd",
  "Guatemala": "gt",
  "Guinea": "gn",
  "Guinea‑Bissau": "gw",
  "Guyana": "gy",
  "Haiti": "ht",
  "Honduras": "hn",
  "Hungary": "hu",
  "Iceland": "is",
  "India": "in",
  "Indonesia": "id",
  "Iran": "ir",
  "Iraq": "iq",
  "Ireland": "ie",
  "Israel": "il",
  "Italy": "it",
  "Jamaica": "jm",
  "Japan": "jp",
  "Jordan": "jo",
  "Kazakhstan": "kz",
  "Kenya": "ke",
  "Kiribati": "ki",
  "Kosovo": "xk",
  "Kuwait": "kw",
  "Kyrgyzstan": "kg",
  "Laos": "la",
  "Latvia": "lv",
  "Lebanon": "lb",
  "Lesotho": "ls",
  "Liberia": "lr",
  "Libya": "ly",
  "Liechtenstein": "li",
  "Lithuania": "lt",
  "Luxembourg": "lu",
  "Madagascar": "mg",
  "Malawi": "mw",
  "Malaysia": "my",
  "Maldives": "mv",
  "Mali": "ml",
  "Malta": "mt",
  "Marshall Islands": "mh",
  "Mauritania": "mr",
  "Mauritius": "mu",
  "Mexico": "mx",
  "Moldova": "md",
  "Monaco": "mc",
  "Mongolia": "mn",
  "Montenegro": "me",
  "Morocco": "ma",
  "Mozambique": "mz",
  "Myanmar": "mm",
  "Namibia": "na",
  "Nauru": "nr",
  "Nepal": "np",
  "Netherlands": "nl",
  "New Zealand": "nz",
  "Nicaragua": "ni",
  "Niger": "ne",
  "Nigeria": "ng",
  "North Korea": "kp",
  "North Macedonia": "mk",
  "Norway": "no",
  "Oman": "om",
  "Pakistan": "pk",
  "Palau": "pw",
  "Panama": "pa",
  "Papua New Guinea": "pg",
  "Paraguay": "py",
  "Peru": "pe",
  "Philippines": "ph",
  "Poland": "pl",
  "Portugal": "pt",
  "Qatar": "qa",
  "Republic of the Congo": "cg",
  "Romania": "ro",
  "Russia": "ru",
  "Rwanda": "rw",
  "Saint Kitts and Nevis": "kn",
  "Saint Lucia": "lc",
  "Saint Vincent and the Grenadines": "vc",
  "Samoa": "ws",
  "San Marino": "sm",
  "Sao Tome and Principe": "st",
  "Saudi Arabia": "sa",
  "Senegal": "sn",
  "Serbia": "rs",
  "Seychelles": "sc",
  "Sierra Leone": "sl",
  "Singapore": "sg",
  "Slovakia": "sk",
  "Slovenia": "si",
  "Solomon Islands": "sb",
  "Somalia": "so",
  "South Africa": "za",
  "South Korea": "kr",
  "South Sudan": "ss",
  "Spain": "es",
  "Sri Lanka": "lk",
  "Sudan": "sd",
  "Suriname": "sr",
  "Sweden": "se",
  "Switzerland": "ch",
  "Syria": "sy",
  "Taiwan": "tw",
  "Tajikistan": "tj",
  "Tanzania": "tz",
  "Thailand": "th",
  "Timor‑Leste": "tl",
  "Togo": "tg",
  "Tonga": "to",
  "Trinidad and Tobago": "tt",
  "Tunisia": "tn",
  "Turkey": "tr",
  "Turkmenistan": "tm",
  "Tuvalu": "tv",
  "Uganda": "ug",
  "Ukraine": "ua",
  "United Arab Emirates": "ae",
  "United Kingdom": "gb",
  "United States": "us",
  "United States of America": "us",
  "Uruguay": "uy",
  "Uzbekistan": "uz",
  "Vanuatu": "vu",
  "Vatican City": "va",
  "Venezuela": "ve",
  "Vietnam": "vn",
  "Yemen": "ye",
  "Zambia": "zm",
  "Zimbabwe": "zw"
};


// Map geo name → display name
const mapNameMap: Record<string, string> = {
  "United States of America": "USA",
  "Russian Federation": "Russia",
  "Korea, Republic of": "South Korea",
  "United Kingdom": "United Kingdom",
  // Add more if needed
};

const DashboardChartCountryWise = () => {
  const { get, loading, error } = useApi();

  const [countryStats, setCountryStats] = useState<
    { name: string; count: number; flag?: string }[]
  >([]);

  const [hoveredCountry, setHoveredCountry] = useState<string | null>(null);
  const [tooltipPos, setTooltipPos] = useState({ x: 0, y: 0 });

  const highlightedCountries = useMemo(() => {
    return new Set(countryStats.map((c) => c.name));
  }, [countryStats]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await get("/admin/users-cnt-country-wise");
        if (res.status && res.data) {
          const formattedData = res.data
            .map((item: any) => {
              const countryName =
                item.country === "United States" || item.country === "United States of America"
                  ? "USA"
                  : item.country;

              const countryCode = countryCodeMap[item.country];

              return {
                name: countryName,
                count: Number(item.count),
                flag: countryCode
                  ? `https://flagcdn.com/w40/${countryCode}.png`
                  : undefined,
              };
            })
            .sort((a, b) => b.count - a.count)
            .slice(0, 5); // top 5 only

          setCountryStats(formattedData);
        } else {
          setCountryStats([]);
        }
      } catch (err) {
        console.error(err);
        setCountryStats([]);
      }
    };

    fetchData();
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
                    const countryName = mapNameMap[geo.properties.name] || geo.properties.name;
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
                <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-white border-b border-r border-gray-200 rotate-45"></div>
              </div>
            )}
          </div>
        </div>

        {/* RIGHT: Stats List Section */}
        <div className="w-full lg:w-60">
          {loading && <p className="text-center text-gray-400">Loading...</p>}
          {error && <p className="text-center text-red-500">{JSON.stringify(error)}</p>}

          <div className="flex flex-col">
            {countryStats.map((country) => (
              <div
                key={country.name}
                className="flex items-center justify-between py-4 border-t border-gray-100 first:border-t-0"
              >
                <div className="flex items-center gap-4">
                  {country.flag && (
                    <img
                      src={country.flag}
                      alt={country.name}
                      className="w-6 h-4 object-cover rounded-sm shadow-sm"
                    />
                  )}
                  <span className="text-[#475569] font-bold text-sm tracking-tight">
                    {country.name}
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
