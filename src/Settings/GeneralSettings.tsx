import { useState, useEffect, useRef, type ChangeEvent } from 'react';
import {  X } from 'lucide-react';
import { useBranding } from '../Components/BrandingContext';
import '../Components/_theme.scss';

export default function GeneralSettings() {
    const { updateLogo, updateSiteName } = useBranding();

    const [platformName, setPlatformName] = useState<string>("Whoxa Chat");
    const [themeColor, setThemeColor] = useState<string>("#EAB308");

    const [logo, setLogo] = useState<{ file: File | null; preview: string | null }>({ file: null, preview: "./Images/Logo.png" });
    const [footerLogo, setFooterLogo] = useState<{ file: File | null; preview: string | null }>({ file: null, preview: "./Images/Logo.png" });
    const [favicon, setFavicon] = useState<{ file: File | null; preview: string | null }>({ file: null, preview: "./Images/Logo.png" });

    const logoInput = useRef<HTMLInputElement>(null);
    const footerInput = useRef<HTMLInputElement>(null);
    const faviconInput = useRef<HTMLInputElement>(null);

    useEffect(() => {
        const root = document.documentElement;
        root.style.setProperty('--brand-primary', themeColor);
        root.style.setProperty('--brand-secondary', themeColor);
        root.style.setProperty('--sidebar-active-bg', `${themeColor}1a`);

        updateLogo(logo.preview || "");
        updateSiteName(platformName);
    }, [themeColor, logo.preview, platformName, updateLogo, updateSiteName]);

    const handleFileChange = (e: ChangeEvent<HTMLInputElement>, type: 'logo' | 'footer' | 'favicon') => {
        const file = e.target.files?.[0];
        if (!file) return;

        const previewUrl = URL.createObjectURL(file);
        const data = { file, preview: previewUrl };

        if (type === 'logo') setLogo(data);
        else if (type === 'footer') setFooterLogo(data);
        else setFavicon(data);
    };

    const removeImage = (type: 'logo' | 'footer' | 'favicon') => {
        if (type === 'logo') {
            if (logo.preview?.startsWith('blob:')) URL.revokeObjectURL(logo.preview);
            setLogo({ file: null, preview: null });
            if (logoInput.current) logoInput.current.value = "";
        } else if (type === 'footer') {
            if (footerLogo.preview?.startsWith('blob:')) URL.revokeObjectURL(footerLogo.preview);
            setFooterLogo({ file: null, preview: null });
            if (footerInput.current) footerInput.current.value = "";
        } else {
            if (favicon.preview?.startsWith('blob:')) URL.revokeObjectURL(favicon.preview);
            setFavicon({ file: null, preview: null });
            if (faviconInput.current) faviconInput.current.value = "";
        }
    };

    return (
        <div className="space-y-8 animate-in fade-in duration-500 theme-container">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-8">

                {/* Main Logo */}
                <div className="space-y-2">
                    <label className="text-sm font-semibold text-gray-700">Logo</label>
                    <input 
                        ref={logoInput}
                        type="file" 
                        onChange={(e) => handleFileChange(e, 'logo')}
                        className="w-full text-sm text-gray-500 border border-gray-200 rounded-md p-2 file:mr-4 file:py-1 file:px-2 file:rounded-md file:border file:border-gray-400 file:text-sm file:font-semibold file:text-gray-600" 
                    />
                    {logo.preview && (
                        <div className="mt-2 relative inline-block p-2 rounded-lg ">
                            <img src={logo.preview} alt="Logo" className="h-10 object-contain" />
                            <button 
                                onClick={() => removeImage('logo')}
                                className="absolute -top-1 -right-2 bg-red-500 text-white rounded-full p-0.5 "
                            >
                                <X size={14} />
                            </button>
                        </div>
                    )}
                </div>

                {/* Footer Logo */}
                <div className="space-y-2">
                    <label className="text-sm font-semibold text-gray-700">Footer Logo</label>
                    <input 
                        ref={footerInput}
                        type="file" 
                        onChange={(e) => handleFileChange(e, 'footer')}
                        className="w-full text-sm text-gray-500 border border-gray-200 rounded-md p-2 file:mr-4 file:py-1 file:px-2 file:rounded-md file:border file:border-gray-400 file:text-sm file:font-semibold file:text-gray-600" 
                    />
                    {footerLogo.preview && (
                        <div className="mt-2 relative inline-block p-2 rounded-lg">
                            <img src={footerLogo.preview} alt="Footer Logo" className="h-10 object-contain" />
                            <button 
                                onClick={() => removeImage('footer')}
                                className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-0.5"
                            >
                                <X size={14} />
                            </button>
                        </div>
                    )}
                </div>

                {/* Fav Icon */}
                <div className="space-y-2 col-span-1 md:col-span-2">
                    <label className="text-sm font-semibold text-gray-700">Fav Icon</label>
                    <input 
                        ref={faviconInput}
                        type="file" 
                        onChange={(e) => handleFileChange(e, 'favicon')}
                        className="w-full text-sm text-gray-500 border border-gray-200 rounded-md p-2 file:mr-4 file:py-1 file:px-2 file:rounded-md file:border file:border-gray-400 file:text-sm file:font-semibold file:text-gray-600" 
                    />
                    {favicon.preview && (
                        <div className="mt-2 relative inline-block p-2 rounded-lg">
                            <img src={favicon.preview} alt="Favicon" className="h-10 object-contain" />
                            <button 
                                onClick={() => removeImage('favicon')}
                                className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-0.5"
                            >
                                <X size={14} />
                            </button>
                        </div>
                    )}
                </div>

                {/* Platform Name */}
                <div className="space-y-2">
                    <label className="text-sm font-semibold text-gray-700">Name</label>
                    <input
                        type="text"
                        value={platformName}
                        onChange={(e) => setPlatformName(e.target.value)}
                        className="w-full p-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[var(--brand-primary)] outline-none transition-all"
                    />
                </div>

                <div className="space-y-2">
                    <label className="text-sm font-semibold text-gray-700">Copyright Text</label>
                    <input
                        type="text"
                        defaultValue="Copyright 2025 © HandyHue theme by Primocys"
                        className="w-full p-2.5 border border-gray-200 rounded-lg outline-none bg-gray-50 text-gray-600 cursor-not-allowed"
                        readOnly
                    />
                </div>

                <div className="space-y-2">
                    <label className="text-sm font-semibold text-gray-700">Contact E-Mail</label>
                    <input
                        type="text"
                        defaultValue="info.primocys@gmail.com"
                        className="w-full p-2.5 border border-gray-200 rounded-lg outline-none bg-gray-50 text-gray-600 cursor-not-allowed"
                        readOnly
                    />
                </div>
            </div>

            {/* Color Settings Bar */}
            <div className="mt-10 space-y-3">
                <label className="text-sm font-semibold text-gray-700">Color Settings</label>
                <div className="relative w-20 p-1 bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden group focus-within:ring-2 focus-within:ring-[var(--brand-primary)]">
                    <div
                        className="w-full h-8 rounded-lg transition-all duration-300 group-hover:opacity-90"
                        style={{ backgroundColor: themeColor }}
                    />
                    <input
                        type="color"
                        value={themeColor}
                        onChange={(e) => setThemeColor(e.target.value)}
                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                    />
                </div>
            </div>

            <div className="mt-8">
                <button className="bg-brand-secondary text-white px-10 py-3 rounded-xl font-semibold hover:brightness-110 active:scale-95 transition-all">
                    Submit
                </button>
            </div>
        </div>
    );
}