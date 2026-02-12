import { useState } from 'react';
import TwillioSMSConfigurations from './TwillioSMSConfigurations';
import MSG91SMSConfigurations from './MSG91SMSConfigurations';

export default function SMSConfigurations() {
    const tabs = ['Twillio', 'MSG 91'];
    const [activeTab, setActiveTab] = useState('Twillio');

    return (
        <div className="w-full bg-white text-[#111827]">
            <div className="px-2 pb-12">

                <div className=" rounded-xl bg-white overflow-hidden">

                    {/* Tab Navigation */}
                    <div className="px-6 border-b border-[#e3e3e3]">
                        <div className="flex gap-8 overflow-x-auto">
                            {tabs.map((tab) => (
                                <button
                                    key={tab}
                                    onClick={() => setActiveTab(tab)}
                                    className={`py-4 text-sm font-medium relative whitespace-nowrap ${
                                        activeTab === tab ? 'text-black' : 'text-gray-500'
                                    }`}
                                >
                                    {tab}
                                    {activeTab === tab && <div className="absolute bottom-0 left-0 w-full h-0.5 bg-black" />}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Content Area */}
                    <div className='p-4'>
                        {activeTab === 'Twillio' && <TwillioSMSConfigurations />}
                        {activeTab === 'MSG 91' && <MSG91SMSConfigurations />}
                    </div>
                </div>
            </div>
        </div>
    );
}