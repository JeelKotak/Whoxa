import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { SearchCheck, Check, X, FileText, Bell } from 'lucide-react';
import Search from '../Components/Search';
import Notifications from './Notifications';
import SignOutModal from './SignOutModal';

interface NavbarProps {
    isSearchOpen: boolean;
    setIsSearchOpen: (val: boolean) => void;
}

export default function Navbar({ isSearchOpen, setIsSearchOpen }: NavbarProps) {
    const [showNotif, setShowNotif] = useState(false);
    const [showProfile, setShowProfile] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");
    const [isNotificationOpen, setIsNotificationOpen] = useState(false);
    const [isSignOutOpen, setIsSignOutOpen] = useState(false);

    const [notifications, setNotifications] = useState([
        { title: "Invitation for crafting engaging designs", time: "3 years", unread: true, icon: (<svg className="w-4 h-4 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 20l9-7-9-7-9 7 9 7z" /></svg>) },
        { title: "Isomorphic dashboard redesign", time: "3 years", unread: true, icon: (<svg className="w-4 h-4 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 7h18M3 12h18M3 17h18" /></svg>) },
        { title: "3 New Incoming Project Files:", time: "3 years", unread: false, icon: (<svg className="w-4 h-4 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 7h18v10H3V7z" /></svg>) },
        { title: "Swornak purchased isomorphic", time: "3 years", unread: false, icon: (<svg className="w-4 h-4 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-3 0-5 3-5 6h10c0-3-2-6-5-6z" /></svg>) },
        { title: 'Task #45890 merged with #45890 in "A..."', time: "3 years", unread: true, icon: (<svg className="w-4 h-4 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m-6-8h6" /></svg>) },
        { title: "3 New Incoming Project Files:", time: "3 years", unread: false, icon: (<svg className="w-4 h-4 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 7h18v10H3V7z" /></svg>) },
        { title: "Swornak purchased isomorphic", time: "3 years", unread: false, icon: (<svg className="w-4 h-4 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-3 0-5 3-5 6h10c0-3-2-6-5-6z" /></svg>) },
        { title: 'Task #45890 merged with #45890 in "A..."', time: "3 years", unread: true, icon: (<svg className="w-4 h-4 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m-6-8h6" /></svg>) },
    ]);

    const navigate = useNavigate();

    const notifRef = useRef<HTMLDivElement>(null);
    const bellRef = useRef<HTMLButtonElement>(null);
    const avatarRef = useRef<HTMLDivElement>(null);
    const profileMenuRef = useRef<HTMLDivElement>(null);
    const searchRef = useRef<HTMLDivElement>(null);

    const menuGroups = [
        {
            heading: "DASHBOARD",
            items: [
                { name: 'Dashboard', path: '/dashboard' }
            ]
        },
        {
            heading: "LIST",
            items: [
                { name: 'Report Types List', path: '/report-types-list' },
                { name: 'User Report List', path: '/user-report-list' },
                { name: 'Group Report List', path: '/group-report-list' },
                { name: 'User List', path: '/user-list' },
                { name: 'CountryWise User List', path: '/countrywise-user-list' },
                { name: 'Group List', path: '/group-list' },
                { name: 'Language List', path: '/language-list' },
                { name: 'Translate Language', path: '/translate-language' },
                { name: 'Avatar List', path: '/avatar-list' },
            ]
        },
        {
            heading: "CALLS",
            items: [
                { name: 'Audio Call List', path: '/audio-call-list' },
                { name: 'Video Call List', path: '/video-call-list' }
            ]
        },
        {
            heading: "NOTIFICATIONS",
            items: [
                { name: 'Push Notifications List', path: '/push-notification-list' },
                { name: 'Push Notifications Add', path: '/push-notification-add' }
            ]
        },
    ];

    const handlePageClick = (path: string) => {
        navigate(path);
        setIsSearchOpen(false);
        setSearchTerm("");
    };

    const toggleNotif = (e: React.MouseEvent) => {
        e.stopPropagation();
        setShowProfile(false);
        if (isSearchOpen) setIsSearchOpen(false);
        setShowNotif(!showNotif);
    };

    const handleMarkAllAsRead = () => {
        setNotifications(prev => prev.map(n => ({ ...n, unread: false })));
    };

    const toggleProfile = (e: React.MouseEvent) => {
        e.stopPropagation();
        setShowNotif(false);
        if (isSearchOpen) setIsSearchOpen(false);
        setShowProfile(!showProfile);
    };

    const toggleSearch = (e: React.MouseEvent) => {
        e.stopPropagation();
        setShowNotif(false);
        setShowProfile(false);
        setIsSearchOpen(!isSearchOpen);
    }

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.ctrlKey && e.key === 'k') {
                e.preventDefault();
                setIsSearchOpen(true);
            }
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [setIsSearchOpen]);

    useEffect(() => {
        const handleClick = (e: MouseEvent) => {
            const target = e.target as Node;
            if (showNotif && notifRef.current && !notifRef.current.contains(target) &&
                bellRef.current && !bellRef.current.contains(target)) {
                setShowNotif(false);
            }
            if (showProfile &&
                avatarRef.current && !avatarRef.current.contains(target) &&
                profileMenuRef.current && !profileMenuRef.current.contains(target)) {
                setShowProfile(false);
            }
            if (isSearchOpen && searchRef.current && !searchRef.current.contains(target)) {
                setIsSearchOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClick);
        return () => document.removeEventListener("mousedown", handleClick);
    }, [showNotif, showProfile, isSearchOpen, setIsSearchOpen]);

    const hasUnread = notifications.some(n => n.unread);

    return (
        <>
            <header className="theme-container fixed top-0 right-0 z-[70] w-full lg:w-[calc(100%-270px)] lg:ml-[270px] h-[70px] bg-white flex items-center justify-between px-6 shadow-sm font-inter text-left">
                <div className="flex items-center gap-4">
                    <img src="./Images/Logo.png" alt="logo" className='h-9 w-26 lg:hidden pl-12' />

                    <button onClick={toggleSearch} className="lg:hidden rounded-full hover:bg-gray-100 p-2">
                        <SearchCheck className="w-6 h-6 text-gray-500" />
                    </button>

                    <div className="hidden lg:block">
                        <Search
                            searchTerm={searchTerm}
                            setSearchTerm={setSearchTerm}
                            placeholder="Search your page..."
                            onClick={() => setIsSearchOpen(true)}
                            showBadge={true}
                        />
                    </div>
                </div>

                <div className="flex items-center gap-6 relative">
                    <button ref={bellRef} onClick={toggleNotif} className="relative cursor-pointer bg-white border border-gray-200 rounded-sm p-1.5 hover:bg-gray-50 transition-colors">
                        <Bell className="w-6 h-6 text-gray-600" />
                        {hasUnread && (
                            <span className="absolute -top-1 -right-1 flex h-3 w-3">
                                <span className="absolute inline-flex h-full w-full rounded-full bg-yellow-400 opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-3 w-3 bg-yellow-500 border-2 border-white"></span>
                            </span>
                        )}
                    </button>

                    <div className="relative">
                        <div
                            ref={avatarRef}
                            onClick={toggleProfile}
                            className="cursor-pointer hover:opacity-80 transition-opacity"
                        >
                            <img src="./Images/avatar.webp" alt="User Avatar" className="w-8 h-8 rounded-full object-cover border border-gray-200" />
                        </div>

                        {showProfile && (
                            <div ref={profileMenuRef} className="absolute right-0 top-12 w-64 bg-white shadow-xl rounded-lg border border-gray-200 z-50 overflow-hidden text-left">
                                <div className="p-4 border-b border-gray-200 flex items-center space-x-3">
                                    <img src="./Images/avatar.webp" alt="Avatar" className="w-10 h-10 rounded-full border border-gray-200 shadow-sm" />
                                    <div className="flex flex-col">
                                        <div className="font-semibold text-sm text-gray-900">Albert Flores</div>
                                        <div className="text-xs text-gray-500">flores@doe.io</div>
                                    </div>
                                </div>
                                <nav className="py-2">
                                    <button
                                        onClick={() => {
                                            navigate('/my-profile');
                                            setShowProfile(false);
                                        }}
                                        className="w-full text-left block px-4 py-2 hover:bg-gray-50 cursor-pointer text-sm text-gray-700"
                                    >
                                        My Profile
                                    </button>
                                    <div className="my-1 border-t border-gray-200"></div>
                                    <button
                                        onClick={() => {
                                            setIsSignOutOpen(true);
                                            setShowNotif(false);
                                        }}
                                        className="w-full text-left block px-4 py-2 hover:bg-gray-50 cursor-pointer text-sm text-gray-700 font-semibold"
                                    >
                                        Sign Out
                                    </button>
                                </nav>
                            </div>
                        )}
                    </div>

                    {showNotif && (
                        <div ref={notifRef} className="absolute right-0 top-14 lg:w-[450px] w-[calc(100vw-32px)] bg-white rounded-xl shadow-2xl border border-gray-100 overflow-hidden z-40 font-inter">
                            <div className="flex justify-between items-center px-5 py-3.5 border-b border-gray-50 text-left">
                                <h3 className="text-lg font-semibold text-gray-800">Notifications</h3>
                                <div className="flex items-center gap-2">
                                    <input
                                        type="checkbox"
                                        checked={!hasUnread}
                                        className="w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500 cursor-pointer"
                                        onChange={handleMarkAllAsRead}
                                    />
                                    <button 
                                        onClick={handleMarkAllAsRead}
                                        className="text-sm font-medium sidebar-active-text hover:opacity-80 transition-opacity"
                                    >
                                        Mark all as read
                                    </button>
                                </div>
                            </div>
                            <div className="max-h-[400px] overflow-y-auto">
                                {notifications.map((notif, index) => (
                                    <div key={index} className="flex items-start gap-3 px-5 py-3 hover-bg-soft cursor-pointer transition-colors border-b border-gray-50 last:border-0">
                                        <div className="w-8 h-8 flex-shrink-0 flex items-center justify-center bg-gray-100 rounded-full text-gray-500">{notif.icon}</div>
                                        <div className="flex-grow">
                                            <p className="text-sm font-medium text-gray-700 leading-snug">{notif.title}</p>
                                            <span className="text-xs text-gray-400">{notif.time}</span>
                                        </div>
                                        <div className="flex-shrink-0 mt-1">
                                            {notif.unread ?
                                                <div className="w-2 h-2 sidebar-active-line rounded-full bg-yellow-500"></div> :
                                                <Check size={14} className="text-gray-300" />
                                            }
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <div className="p-2 border-t border-gray-100 bg-[#f1f1f1]">
                                <button onClick={() => {
                                    setIsNotificationOpen(true);
                                    setShowNotif(false);
                                }} className="w-full text-center py-2 text-sm font-medium text-gray-600 hover:bg-white hover:shadow-sm transition-all rounded-md">
                                    View All Activity
                                </button>
                            </div>
                        </div>
                    )}
                </div>

                {isSearchOpen && (
                    <div className="fixed inset-0 z-[999] flex items-start justify-center pt-[110px] px-4 bg-black/60">
                        <div ref={searchRef} className="relative w-full max-w-[450px] bg-white rounded-xl shadow-2xl overflow-hidden border border-gray-100">
                            <div className="p-4 border-b border-gray-100 flex items-center gap-3">
                                <Search
                                    searchTerm={searchTerm}
                                    setSearchTerm={setSearchTerm}
                                    placeholder="Search your page..."
                                    onClick={() => { }}
                                />
                                <button onClick={() => setIsSearchOpen(false)} className="p-2 rounded-lg text-gray-400 hover:bg-gray-100 transition-colors">
                                    <X size={20} />
                                </button>
                            </div>
                            <div className="max-h-[60vh] overflow-y-auto p-2">
                                {menuGroups.map((group) => {
                                    const groupMatches = group.items.filter(item =>
                                        item.name.toLowerCase().includes(searchTerm.toLowerCase())
                                    );
                                    if (groupMatches.length === 0) return null;
                                    return (
                                        <div key={group.heading} className="mb-4">
                                            <div className="px-3 py-2 text-[11px] font-bold text-gray-400 uppercase tracking-wider text-left">
                                                {group.heading}
                                            </div>
                                            {groupMatches.map((item) => (
                                                <button
                                                    key={item.name}
                                                    onClick={() => handlePageClick(item.path)}
                                                    className="w-full flex items-center gap-4 px-3 py-2.5 rounded-lg hover-bg-soft text-left group transition-all"
                                                >
                                                    <div className="w-9 h-9 flex items-center justify-center bg-white rounded-lg border border-gray-300 group-hover:bg-gray-100 transition-colors">
                                                        <FileText className="w-4 h-4 text-gray-400 group-hover:sidebar-active-text" />
                                                    </div>
                                                    <div>
                                                        <div className="text-sm font-semibold text-gray-800">{item.name}</div>
                                                        <div className="text-[12px] text-gray-400">{item.path}</div>
                                                    </div>
                                                </button>
                                            ))}
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    </div>
                )}
            </header>

            {isNotificationOpen && (
                <Notifications
                    isOpen={isNotificationOpen}
                    onClose={() => setIsNotificationOpen(false)}
                />
            )}
            {isSignOutOpen && (
                <SignOutModal
                    onClose={() => setIsSignOutOpen(false)}
                    onConfirm={() => navigate('/')}
                />
            )}
        </>
    );
}