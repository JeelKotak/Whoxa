import { useState } from 'react';
import { 
  Settings2,  
  MessageCircleMore, Key
} from 'lucide-react';
import '../Components/_theme.scss';

import GeneralSettings from './GeneralSettings';
import SMSConfigurations from './SMSConfigurations';
import PushNotificationConfiguration from './PushNotificationConfiguration';
import PurchaseCode from './PurchaseCode';

export default function Settings() {
  const [activeTab, setActiveTab] = useState('General Settings');

  const menuItems = [
    { id: 'General Settings', label: 'General Settings', icon: Settings2 },
    { id: 'SMS Configurations', label: 'SMS Configurations', icon: MessageCircleMore },
    { id: 'Push Notification Configurations', label: 'Push Notification Configurations', icon: MessageCircleMore },
    { id: 'Purchase Code', label: 'Purchase Code', icon: Key },
  ];

  const renderActiveTab = () => {
    switch (activeTab) {
      case 'General Settings': return <GeneralSettings />;
      case 'SMS Configurations': return <SMSConfigurations />;
      case 'Push Notification Configurations': return <PushNotificationConfiguration />;
      case 'Purchase Code': return <PurchaseCode />;
      default: return null;
    }
  };

  return (
    <div className="px-3 theme-container">
      {/* Header Area */}
      <div className="mb-8">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Settings</h1>
        <nav className="flex items-center gap-2 text-sm text-gray-500 font-medium mt-1">
          <a href='/frontend-website' className="hover:text-blue-600 cursor-pointer transition-colors text-gray-900">Settings Management</a>
          <span className="w-1 h-1 bg-gray-300 rounded-full" />
          <span className="text-gray-400">Settings</span>
        </nav>
      </div>

      {/* Main Container */}
      <div className="flex flex-col lg:flex-row gap-0 bg-white rounded-xl overflow-hidden">
        
        {/* Sidebar */}
        <div className="w-full lg:w-1/4 flex flex-col py-4 space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;

            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`flex items-center justify-between w-full px-6 py-3.5 transition-all relative group border rounded-md border-gray-200
                  ${isActive 
                    ? 'sidebar-active-text sidebar-active-item-bg bg-[var(--brand-secondary)]/[0.1] font-semibold' 
                    : 'text-[#333333] bg-gray-50'
                  }`}
              >

                <div className="flex items-center gap-3">
                  <Icon 
                    size={20} 
                    className={isActive ? "sidebar-active-text" : "text-gray-400 group-hover:text-gray-600"} 
                  />
                  <span className="text-[14px]">{item.label}</span>
                </div>
              </button>
            );
          })}
        </div>

        {/* Content Area */}
        <div className="w-full lg:w-3/4 p-3 lg:pb-4 animate-in fade-in duration-300">
          {renderActiveTab()}
        </div>
      </div>
    </div>
  );
}