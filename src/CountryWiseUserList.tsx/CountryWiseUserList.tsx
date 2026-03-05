import { useState, useEffect, useMemo } from 'react';
import Flag from 'react-world-flags';
import useApi from '../hooks/useApiPost';

interface CountryData {
  code: string;
  name: string;
  desktopUsers: number;
  mobileUsers: number;
}

export default function CountryWiseUserList() {
  const [countries, setCountries] = useState<CountryData[]>([]);
  const { get , loading } = useApi();

  const COLORS = {
    desktop: '#fae43d',
    mobile: '#60399a',
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await get('/admin/users-cnt-country-wise');

        console.log('API Response:', response); // Debug log

        if (response.data) {
          // Map API response to CountryData type
          const mappedData: CountryData[] = response.data.map((item: any) => {
            // Handle South Korea special case
            const countryName = item.country.includes('South Korea')
              ? 'South Korea'
              : item.country;

            return {
              code: getCountryCode(countryName),
              name: countryName,
              desktopUsers: Number(item.count), // you can separate mobile/desktop if API provides
              mobileUsers: 0, // placeholder if API doesn't separate
            };
          });

          setCountries(mappedData);
        }
      } catch (err) {
        console.error('Error fetching country data:', err);
      }
    };

    fetchData();
  }, []);

  // Helper function to get 2-letter country codes for react-world-flags
const getCountryCode = (countryName: string) => {
  const mapping: Record<string, string> = {
    Afghanistan: "af",
    Albania: "al",
    Algeria: "dz",
    Andorra: "ad",
    Angola: "ao",
    Antigua: "ag",
    Argentina: "ar",
    Armenia: "am",
    Aruba: "aw",
    Australia: "au",
    Austria: "at",
    Azerbaijan: "az",
    Bahamas: "bs",
    Bahrain: "bh",
    Bangladesh: "bd",
    Barbados: "bb",
    Belarus: "by",
    Belgium: "be",
    Belize: "bz",
    Benin: "bj",
    Bhutan: "bt",
    Bolivia: "bo",
    "Bosnia and Herzegovina": "ba",
    Botswana: "bw",
    Brazil: "br",
    Brunei: "bn",
    Bulgaria: "bg",
    "Burkina Faso": "bf",
    Burundi: "bi",
    "Côte d'Ivoire": "ci",
    "Cabo Verde": "cv",
    Cambodia: "kh",
    Cameroon: "cm",
    Canada: "ca",
    "Central African Republic": "cf",
    Chad: "td",
    Chile: "cl",
    China: "cn",
    Colombia: "co",
    Comoros: "km",
    "Costa Rica": "cr",
    Croatia: "hr",
    Cuba: "cu",
    Cyprus: "cy",
    "Czech Republic": "cz",
    Denmark: "dk",
    Djibouti: "dj",
    Dominica: "dm",
    "Dominican Republic": "do",
    Ecuador: "ec",
    Egypt: "eg",
    "El Salvador": "sv",
    "Equatorial Guinea": "gq",
    Eritrea: "er",
    Estonia: "ee",
    Eswatini: "sz",
    Ethiopia: "et",
    Fiji: "fj",
    Finland: "fi",
    France: "fr",
    Gabon: "ga",
    Gambia: "gm",
    Georgia: "ge",
    Germany: "de",
    Ghana: "gh",
    Greece: "gr",
    Grenada: "gd",
    Guatemala: "gt",
    Guinea: "gn",
    "Guinea-Bissau": "gw",
    Guyana: "gy",
    Haiti: "ht",
    Honduras: "hn",
    Hungary: "hu",
    Iceland: "is",
    India: "in",
    Indonesia: "id",
    Iran: "ir",
    Iraq: "iq",
    Ireland: "ie",
    Israel: "il",
    Italy: "it",
    Jamaica: "jm",
    Japan: "jp",
    Jordan: "jo",
    Kazakhstan: "kz",
    Kenya: "ke",
    "South Korea": "kr",
    "North Korea": "kp",
    Kuwait: "kw",
    Kyrgyzstan: "kg",
    Laos: "la",
    Latvia: "lv",
    Lebanon: "lb",
    Lesotho: "ls",
    Liberia: "lr",
    Libya: "ly",
    Liechtenstein: "li",
    Lithuania: "lt",
    Luxembourg: "lu",
    Madagascar: "mg",
    Malawi: "mw",
    Malaysia: "my",
    Maldives: "mv",
    Mali: "ml",
    Malta: "mt",
    "Marshall Islands": "mh",
    Mauritania: "mr",
    Mauritius: "mu",
    Mexico: "mx",
    Moldova: "md",
    Monaco: "mc",
    Mongolia: "mn",
    Montenegro: "me",
    Morocco: "ma",
    Mozambique: "mz",
    Myanmar: "mm",
    Namibia: "na",
    Nauru: "nr",
    Nepal: "np",
    Netherlands: "nl",
    "New Zealand": "nz",
    Nicaragua: "ni",
    Niger: "ne",
    Nigeria: "ng",
    Norway: "no",
    Oman: "om",
    Pakistan: "pk",
    Palau: "pw",
    Panama: "pa",
    "Papua New Guinea": "pg",
    Paraguay: "py",
    Peru: "pe",
    Philippines: "ph",
    Poland: "pl",
    Portugal: "pt",
    Qatar: "qa",
    Romania: "ro",
    Russia: "ru",
    Rwanda: "rw",
    "Saudi Arabia": "sa",
    Senegal: "sn",
    Serbia: "rs",
    Seychelles: "sc",
    "Sierra Leone": "sl",
    Singapore: "sg",
    Slovakia: "sk",
    Slovenia: "si",
    "Solomon Islands": "sb",
    Somalia: "so",
    "South Africa": "za",
    Spain: "es",
    SriLanka: "lk",
    Sudan: "sd",
    Suriname: "sr",
    Sweden: "se",
    Switzerland: "ch",
    Syria: "sy",
    Taiwan: "tw",
    Tajikistan: "tj",
    Tanzania: "tz",
    Thailand: "th",
    Togo: "tg",
    Tonga: "to",
    Tunisia: "tn",
    Turkey: "tr",
    Turkmenistan: "tm",
    Tuvalu: "tv",
    Uganda: "ug",
    Ukraine: "ua",
    "United Arab Emirates": "ae",
    "United Kingdom": "gb",
    "United States": "us",
    Uruguay: "uy",
    Uzbekistan: "uz",
    Vanuatu: "vu",
    "Vatican City": "va",
    Venezuela: "ve",
    Vietnam: "vn",
    Yemen: "ye",
    Zambia: "zm",
    Zimbabwe: "zw",
  };

  // Fix common API variations
  const nameFix: Record<string, string> = {
    "United States of America": "United States",
    "Korea, Republic of South Korea": "South Korea",
    "Sri Lanka": "SriLanka",
    "Côte d'Ivoire": "Côte d'Ivoire",
    "Libyan Arab Jamahiriya": "Libya",
  };

  const correctedName = nameFix[countryName] || countryName;
  return mapping[correctedName] || '';
};


  const sortedCountries = useMemo(() => {
    return [...countries].sort(
      (a, b) => b.desktopUsers + b.mobileUsers - (a.desktopUsers + a.mobileUsers)
    );
  }, [countries]);

  const maxTotal =
    sortedCountries.length > 0
      ? sortedCountries[0].desktopUsers + sortedCountries[0].mobileUsers
      : 0;


        if (loading) {
    return (
      <div className="w-full px-2 py-4">
        <h1 className="text-2xl sm:text-3xl font-bold mb-4">Countrywise User List</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {Array.from({ length: 8 }).map((_, idx) => (
            <div
              key={idx}
              className="bg-white border border-[#e3e3e3] rounded-xl py-6 px-8 flex items-center gap-5 animate-pulse"
            >
              <div className="w-24 h-24 bg-gray-200 rounded-full flex-shrink-0" />
              <div className="flex-1 space-y-4">
                <div className="h-4 bg-gray-200 rounded w-3/4" />
                <div className="h-3 bg-gray-200 rounded w-1/2" />
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="w-full px-2 py-4">
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
            <div
              key={country.name}
              className="bg-white border border-[#e3e3e3] rounded-xl py-4 px-8 flex items-center gap-5"
            >
              <div className="relative flex-shrink-0 flex items-center justify-center w-24 h-24">
                <svg className="w-full h-full transform -rotate-90">
                  <circle
                    cx="48"
                    cy="48"
                    r={radius}
                    stroke="#f3f4f6"
                    strokeWidth="8"
                    fill="transparent"
                  />
                  <circle
                    cx="48"
                    cy="48"
                    r={radius}
                    stroke={COLORS.desktop}
                    strokeWidth="8"
                    fill="transparent"
                    strokeDasharray={`${desktopShare} ${circumference}`}
                    strokeLinecap="round"
                    className="transition-all duration-1000 ease-out"
                  />
                  <circle
                    cx="48"
                    cy="48"
                    r={radius}
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
                  <span className="text-sm font-black text-gray-800">
                    {country.desktopUsers + country.mobileUsers}
                  </span>
                  <span className="text-[10px] text-gray-400 font-bold uppercase">
                    Users 
                  </span>
                </div>
              </div>

              <div className="flex flex-col gap-3">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-8 h-6 border border-gray-100 overflow-hidden rounded-sm">
                    <Flag code={country.code} className="w-full h-full object-cover" />
                  </div>
                  <span className="text-md font-bold text-gray-700 uppercase tracking-tight">
                    {country.name}
                  </span>
                </div>

                <div className="flex gap-2">
                  <div className="flex items-center gap-1.5">
                    <div
                      className="w-2 h-2 rounded-full"
                      style={{ backgroundColor: COLORS.desktop }}
                    />
                    <span className="text-[11px] text-gray-500 font-semibold">Desktop</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <div
                      className="w-2 h-2 rounded-full"
                      style={{ backgroundColor: COLORS.mobile }}
                    />
                    <span className="text-[11px] text-gray-500 font-semibold">Mobile</span>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
