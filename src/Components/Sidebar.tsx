import { useState, useEffect } from 'react';
import { NavLink, useLocation } from "react-router-dom";
import { 
    LayoutDashboard, Menu, X, Minus, Plus, FileText, UserRound, 
    Globe, Users, Languages, UserX, CircleUser, Phone, Bell, 
    Settings, FileCode 
} from 'lucide-react';
import './_theme.scss';
import AddLanguage from '../Language/AddLanguage';
import AddReportType from '../ReportList/AddReportType';
import AddAvatar from '../Avatar/AddAvatar';
import PushNotifcationAdd from '../Notification/PushNotificationAdd';
import { useBranding } from '../Components/BrandingContext';

interface SubMenuItem {
    name: string;
    path: string;
    count?: number;
}

interface MenuItem {
    name: string;
    icon: any;
    path?: string;
    children?: SubMenuItem[];
}

interface MenuGroup {
    heading: string;
    items: MenuItem[];
}

interface SideBarProps {
    isSearchOpen: boolean;
}

export default function SideBar({ isSearchOpen }: SideBarProps) {
    const { logo, siteName } = useBranding();
    const [isOpen, setIsOpen] = useState(false);
    const [expandedMenu, setExpandedMenu] = useState<string | null>(null);
    const [isAddLanguageOpen, setIsAddLanguageOpen] = useState(false);
    const [isAddReportOpen, setIsAddReportOpen] = useState(false);
    const [isAddAvatarOpen, setIsAddAvatarOpen] = useState(false);
    const [isAddNotificationOpen, setIsAddNotificationOpen] = useState(false);
    
    const location = useLocation();

    const menuGroups: MenuGroup[] = [
        {
            heading: "DASHBOARD",
            items: [{ name: 'Dashboard', icon: LayoutDashboard, path: '/dashboard' }]
        },
        {
            heading: "LIST",
            items: [
                {
                    name: 'Report List',
                    icon: FileText,
                    children: [
                        { name: 'Report Types List', path: '/report-types-list' },
                        { name: 'Add Report Type', path: '' }, // Path empty as it triggers modal
                        { name: 'User Report List', path: '/user-report-list' },
                        { name: 'Group Report List', path: '/group-report-list' },
                    ]
                },
                { name: 'User List', icon: UserRound, path: '/user-list' },
                { name: 'Countrywise User List', icon: Globe, path: '/countrywise-user-list' },
                { name: 'Group List', icon: Users, path: '/group-list' },
                {
                    name: 'Language',
                    icon: Languages,
                    children: [
                        { name: 'Language List', path: '/language-list' },
                        { name: 'Add Language', path: '' }, // Path empty as it triggers modal
                    ]
                },
                { name: 'Block List', icon: UserX, path: '/block-list' },
                {
                    name: 'Avatar',
                    icon: CircleUser,
                    children: [
                        { name: 'Avatar List', path: '/avatar-list' },
                        { name: 'Add Avatar', path: '/avatar-add' }, // Path empty as it triggers modal
                    ]
                },
            ]
        },
        {
            heading: "CALLS",
            items: [
                {
                    name: 'Calls',
                    icon: Phone,
                    children: [
                        { name: 'Audio Call List', path: '/audio-call-list' },
                        { name: 'Video Call List', path: '/video-call-list' },
                    ]
                },
            ]
        },
        {
            heading: "NOTIFICATION",
            items: [
                {
                    name: 'Notification',
                    icon: Bell,
                    children: [
                        { name: 'Push Notification List', path: '/push-notification-list' },
                        { name: 'Push Notification Add', path: '/push-notification-add' },
                    ]
                },
            ]
        },
        {
            heading: "SETTING",
            items: [
                { name: 'Settings', icon: Settings, path: '/settings' },
                { name: 'CMS Pages', icon: FileCode, path: '/cms-pages' },
            ]
        }
    ];

    useEffect(() => {
        menuGroups.forEach(group => {
            group.items.forEach(item => {
                if (item.children?.some(child => child.path === location.pathname)) {
                    setExpandedMenu(item.name);
                }
            });
        });
    }, [location.pathname]);

    const toggleMenu = (name: string) => {
        setExpandedMenu(prev => (prev === name ? null : name));
    };

    return (
        <div className="sidebar-container">
            <style>
                {`
                    .custom-scrollbar::-webkit-scrollbar { width: 3px; }
                    .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
                    .custom-scrollbar::-webkit-scrollbar-thumb { background: #e5e7eb; border-radius: 10px; }
                    .custom-scrollbar { scrollbar-width: thin; scrollbar-color: #e5e7eb transparent; }
                `}
            </style>

            {!isSearchOpen && (
                <button
                    onClick={() => setIsOpen(true)}
                    className="lg:hidden fixed top-4 left-6 z-[80] p-2 bg-white border border-gray-200 rounded-md"
                >
                    <Menu className="w-6 h-6 text-gray-600" />
                </button>
            )}

            <aside className={`fixed top-0 left-0 z-[50] w-[270px] h-screen bg-white transition-transform duration-300 ease-in-out
                ${isOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0`}>

                <div className="relative h-full border-r border-gray-100 flex flex-col ">
                    <div className="flex items-center justify-between px-6 h-[70px] shrink-0">
                        <div className="flex items-center gap-2">
                            <img src={logo} alt="Logo" className="w-8 h-8 object-contain" />
                            <span className="text-[20px] font-bold text-[#111827]">{siteName}</span>
                        </div>
                        <button onClick={() => setIsOpen(false)} className="lg:hidden p-2 text-gray-400 hover:text-gray-600">
                            <X size={20} />
                        </button>
                    </div>

                    <div className="mt-4 flex-1 overflow-y-auto custom-scrollbar pb-10">
                        <nav className="flex flex-col gap-6">
                            {menuGroups.map((group) => (
                                <div key={group.heading} className="flex flex-col gap-1">
                                    <div className="ml-6 mb-2 text-left">
                                        <span className="text-[11px] text-[#888888] uppercase tracking-widest font-bold">
                                            {group.heading}
                                        </span>
                                    </div>

                                    {group.items.map((item) => {
                                        const hasChildren = item.children && item.children.length > 0;
                                        const isExpanded = expandedMenu === item.name;
                                        const isParentActive = hasChildren && item.children?.some(child => child.path === location.pathname);
                                        const Icon = item.icon;

                                        if (hasChildren) {
                                            return (
                                                <div key={item.name} className="relative">
                                                    <button
                                                        onClick={() => toggleMenu(item.name)}
                                                        className={`flex items-center justify-between w-full px-6 py-3 transition-all relative group
                                                            ${isParentActive ? 'sidebar-active-text sidebar-active-item-bg font-semibold' : 'text-[#333333] hover:bg-[#f1f1f1]'}`}
                                                    >
                                                        {isParentActive && (
                                                            <div className="absolute left-0 top-0 w-1 h-full sidebar-active-line rounded-r-xl" />
                                                        )}
                                                        <div className="flex items-center gap-3">
                                                            <Icon size={20} className={isParentActive ? "sidebar-active-text" : "text-gray-500 group-hover:text-gray-700"} />
                                                            <span className="text-sm">{item.name}</span>
                                                        </div>
                                                        <span className={`transition-transform duration-300 ${isExpanded ? 'rotate-180' : 'rotate-0'}`}>
                                                            {isExpanded ? <Minus size={14} /> : <Plus size={14} />}
                                                        </span>
                                                    </button>

                                                    <div className={`grid transition-all duration-300 ease-in-out ${isExpanded ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'}`}>
                                                        <div className="overflow-hidden">
                                                            <div className="relative ml-6 mt-1 pl-4 border-l-2 border-gray-100 pb-2">
                                                                {item.children?.map((child) => {
                                                                    
                                                                    // SPECIAL CASE: Add Language
                                                                    if (child.name === 'Add Language') {
                                                                        return (
                                                                            <button
                                                                                key={child.name}
                                                                                onClick={() => {
                                                                                    setIsAddLanguageOpen(true);
                                                                                    if (window.innerWidth < 1024) setIsOpen(false);
                                                                                }}
                                                                                className="flex items-center justify-between w-full px-4 py-2 text-sm transition-all rounded-md relative text-gray-500 hover:text-gray-800"
                                                                            >
                                                                                <span>{child.name}</span>
                                                                            </button>
                                                                        );
                                                                    }

                                                                    // SPECIAL CASE: Add Report Type
                                                                    if (child.name === 'Add Report Type') {
                                                                        return (
                                                                            <button
                                                                                key={child.name}
                                                                                onClick={() => {
                                                                                    setIsAddReportOpen(true);
                                                                                    if (window.innerWidth < 1024) setIsOpen(false);
                                                                                }}
                                                                                className="flex items-center justify-between w-full px-4 py-2 text-sm transition-all rounded-md relative text-gray-500 hover:text-gray-800"
                                                                            >
                                                                                <span>{child.name}</span>
                                                                            </button>
                                                                        );
                                                                    }

                                                                    // SPECIAL CASE: Add Avatar
                                                                    if (child.name === 'Add Avatar') {
                                                                        return (
                                                                            <button
                                                                                key={child.name}
                                                                                onClick={() => {
                                                                                    setIsAddAvatarOpen(true);
                                                                                    if (window.innerWidth < 1024) setIsOpen(false);
                                                                                }}
                                                                                className="flex items-center justify-between w-full px-4 py-2 text-sm transition-all rounded-md relative text-gray-500 hover:text-gray-800"
                                                                            >
                                                                                <span>{child.name}</span>
                                                                            </button>
                                                                        );
                                                                    }

                                                                    if (child.name === 'Push Notification Add') {
                                                                        return (
                                                                            <button
                                                                                key={child.name}
                                                                                onClick={() => {
                                                                                    setIsAddNotificationOpen(true);
                                                                                    if (window.innerWidth < 1024) setIsOpen(false);
                                                                                }}
                                                                                className="flex items-center justify-between w-full px-4 py-2 text-sm transition-all rounded-md relative text-gray-500 hover:text-gray-800"
                                                                            >
                                                                                <span>{child.name}</span>
                                                                            </button>
                                                                        );
                                                                    }

                                                                    return (
                                                                        <NavLink
                                                                            key={child.name}
                                                                            to={child.path}
                                                                            onClick={() => { if (window.innerWidth < 1024) setIsOpen(false); }}
                                                                            className={({ isActive }) => `flex items-center justify-between w-full px-4 py-2 text-sm transition-all rounded-md relative 
                                                                                ${isActive ? 'sidebar-active-text font-medium' : 'text-gray-500 hover:text-gray-800'}`}
                                                                        >
                                                                            {({ isActive }) => (
                                                                                <div className="flex items-center">
                                                                                    {isActive && (
                                                                                        <div className="absolute -left-[21px] top-1/2 -translate-y-1/2 w-2.5 h-2.5 sidebar-active-line rounded-full border-2 border-white shadow-sm" />
                                                                                    )}
                                                                                    <span>{child.name}</span>
                                                                                </div>
                                                                            )}
                                                                        </NavLink>
                                                                    );
                                                                })}
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            );
                                        }

                                        return (
                                            <NavLink
                                                key={item.name}
                                                to={item.path || '#'}
                                                onClick={() => { if (window.innerWidth < 1024) setIsOpen(false); }}
                                                className={({ isActive }) => `flex items-center justify-between w-full px-6 py-3 transition-all relative group
                                                    ${isActive ? 'sidebar-active-text sidebar-active-item-bg font-semibold' : 'text-[#333333] hover:bg-[#f1f1f1]'}`}
                                            >
                                                {({ isActive }) => (
                                                    <>
                                                        {isActive && (
                                                            <div className="absolute left-0 top-0 w-1 h-full sidebar-active-line rounded-r-xl" />
                                                        )}
                                                        <div className="flex items-center gap-3">
                                                            <Icon size={20} className={isActive ? "sidebar-active-text" : "text-gray-500 group-hover:text-gray-700"} />
                                                            <span className="text-sm">{item.name}</span>
                                                        </div>
                                                    </>
                                                )}
                                            </NavLink>
                                        );
                                    })}
                                </div>
                            ))}
                        </nav>
                    </div>
                </div>
            </aside>

            {isOpen && (
                <div className="fixed inset-0 bg-black/20 z-[45] lg:hidden" onClick={() => setIsOpen(false)} />
            )}

            {/* MODALS */}
            {isAddLanguageOpen && (
                <AddLanguage onClose={() => setIsAddLanguageOpen(false)} />
            )}

            {isAddReportOpen && (
                <AddReportType onClose={() => setIsAddReportOpen(false)} />
            )}

            {isAddAvatarOpen && (
                <AddAvatar onClose={() => setIsAddAvatarOpen(false)} />
            )}

            {isAddNotificationOpen && (
                <PushNotifcationAdd onClose={() => setIsAddNotificationOpen(false)} />
            )}
        </div>
    );
}