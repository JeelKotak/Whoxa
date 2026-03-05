import React, { createContext, useContext, useState
    
 } from 'react';

interface BrandingContextType {
    logo: string;
    siteName: string;
    updateLogo: (newLogo: string) => void;
    updateSiteName: (newName: string) => void;
}

const BrandingContext = createContext<BrandingContextType | undefined>(undefined);

export const BrandingProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [logo, setLogo] = useState<string>(localStorage.getItem('siteLogo') || "./Images/Logo.png");
    const [siteName, setSiteName] = useState<string>(localStorage.getItem('siteName') || "Whoxa Admin");

    const updateLogo = (newLogo: string) => {
        setLogo(newLogo);
        localStorage.setItem('siteLogo', newLogo);
    };

    const updateSiteName = (newName: string) => {
        setSiteName(newName);
        localStorage.setItem('siteName', newName);
    };

    return (
        <BrandingContext.Provider value={{ logo, siteName, updateLogo, updateSiteName }}>
            {children}
        </BrandingContext.Provider>
    );
};

export const useBranding = () => {
    const context = useContext(BrandingContext);
    if (!context) throw new Error("useBranding must be used within BrandingProvider");
    return context;
};