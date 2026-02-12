// Layout.jsx
import { Outlet } from "react-router-dom";
import { useState } from "react";
import Navbar from "./Components/Navbar";
import SideBar from "./Components/Sidebar";
import { BrandingProvider } from './Components/BrandingContext';

export default function Layout() {
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  return (
    <div className="flex h-screen w-full">
      <BrandingProvider>
        <SideBar isSearchOpen={isSearchOpen} />
        <div className="hidden lg:block w-[140px] shrink-0"></div>

        <div className="flex flex-col flex-1 overflow-hidden">
          <div className="h-[70px] shrink-0">
            <Navbar
              isSearchOpen={isSearchOpen}
              setIsSearchOpen={setIsSearchOpen}
            />
          </div>

          <div className="flex-1 overflow-y-auto p-2 lg:pl-[135px]">
            <Outlet />
          </div>
        </div>
      </BrandingProvider>
    </div>
  );
}
