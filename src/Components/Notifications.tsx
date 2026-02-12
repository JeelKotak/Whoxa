import { X, Check } from 'lucide-react';

interface NotificationsProps {
    isOpen: boolean;
    onClose: () => void;
}

export default function Notifications({ isOpen, onClose }: NotificationsProps) {
    if (!isOpen) return null;

    const notifications = [
        { title: "Invitation for crafting engaging designs", time: "3 years", unread: true, icon: (<svg className="w-4 h-4 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 20l9-7-9-7-9 7 9 7z" /></svg>) },
        { title: "Isomorphic dashboard redesign", time: "3 years", unread: true, icon: (<svg className="w-4 h-4 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 7h18M3 12h18M3 17h18" /></svg>) },
        { title: "3 New Incoming Project Files:", time: "3 years", unread: false, icon: (<svg className="w-4 h-4 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 7h18v10H3V7z" /></svg>) },
        { title: "Swornak purchased isomorphic", time: "3 years", unread: false, icon: (<svg className="w-4 h-4 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-3 0-5 3-5 6h10c0-3-2-6-5-6z" /></svg>) },
        { title: 'Task #45890 merged with #45890 in "A..."', time: "3 years", unread: true, icon: (<svg className="w-4 h-4 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m-6-8h6" /></svg>) },
        { title: "Invitation for crafting engaging designs", time: "3 years", unread: true, icon: (<svg className="w-4 h-4 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 20l9-7-9-7-9 7 9 7z" /></svg>) },
        { title: "Isomorphic dashboard redesign", time: "3 years", unread: true, icon: (<svg className="w-4 h-4 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 7h18M3 12h18M3 17h18" /></svg>) },
        { title: "3 New Incoming Project Files:", time: "3 years", unread: false, icon: (<svg className="w-4 h-4 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 7h18v10H3V7z" /></svg>) },
        { title: "Swornak purchased isomorphic", time: "3 years", unread: false, icon: (<svg className="w-4 h-4 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-3 0-5 3-5 6h10c0-3-2-6-5-6z" /></svg>) },
        { title: 'Task #45890 merged with #45890 in "A..."', time: "3 years", unread: true, icon: (<svg className="w-4 h-4 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m-6-8h6" /></svg>) },
        { title: "Invitation for crafting engaging designs", time: "3 years", unread: true, icon: (<svg className="w-4 h-4 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 20l9-7-9-7-9 7 9 7z" /></svg>) },
        { title: "Isomorphic dashboard redesign", time: "3 years", unread: true, icon: (<svg className="w-4 h-4 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 7h18M3 12h18M3 17h18" /></svg>) },
        { title: "3 New Incoming Project Files:", time: "3 years", unread: false, icon: (<svg className="w-4 h-4 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 7h18v10H3V7z" /></svg>) },
        { title: "Swornak purchased isomorphic", time: "3 years", unread: false, icon: (<svg className="w-4 h-4 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-3 0-5 3-5 6h10c0-3-2-6-5-6z" /></svg>) },
        { title: 'Task #45890 merged with #45890 in "A..."', time: "3 years", unread: true, icon: (<svg className="w-4 h-4 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m-6-8h6" /></svg>) },

    ];

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <div
                className="absolute inset-0 bg-black/50  transition-opacity"
                onClick={onClose}
            />

            <div className="relative bg-white w-full max-w-[500px] max-h-[700px] rounded-xl  overflow-hidden flex flex-col font-inter">

                <div className="flex justify-between items-center px-5 py-3.5 border-b border-gray-50 text-left">
                    <h3 className="text-lg font-semibold text-gray-800">Notifications</h3>

                    <div className="flex items-center gap-4">
                        <button
                            onClick={onClose}
                            className="p-1.5 rounded-lg text-gray-400"
                        >
                            <X size={20} />
                        </button>
                    </div>
                </div>

                {/* Notifications List - Reusing your exact list item styles */}
                <div className="flex-1 overflow-y-auto custom-scrollbar">
                    {notifications.map((notif, index) => (
                        <div key={index} className="flex items-start gap-3 px-5 py-4 hover-bg-soft cursor-pointer transition-colors border-b border-gray-50 last:border-0">
                            {/* Icon Wrapper */}
                            <div className="w-9 h-9 flex-shrink-0 flex items-center justify-center bg-gray-100 rounded-full text-gray-500">
                                {notif.icon}
                            </div>

                            {/* Text Content */}
                            <div className="flex-grow">
                                <p className="text-sm font-medium text-gray-700 leading-snug">
                                    {notif.title}
                                </p>
                                <span className="text-xs text-gray-400 mt-1 block">
                                    {notif.time}
                                </span>
                            </div>

                            {/* Status Indicator - Reusing your exact logic */}
                            <div className="flex-shrink-0 mt-1">
                                {notif.unread ? (
                                    <div className="w-2 h-2 sidebar-active-line rounded-full"></div>
                                ) : (
                                    <Check size={14} className="text-gray-300" />
                                )}
                            </div>
                        </div>
                    ))}
                </div>

                {/* Footer - Consistent with your Action Button style */}
                <div className="p-4 border-t border-gray-100 bg-white">
                    <button className="w-full py-2.5 bg-blue-50 text-blue-600 rounded-lg text-sm font-semibold ">
                       Notifications Activity
                    </button>
                </div>
            </div>
        </div>
    );
}