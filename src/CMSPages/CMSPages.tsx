import { useState, useEffect } from 'react';
import PagesReusable from '../Components/PagesReusable';

import { PagesPrivacyPolicy } from './PagesPrivacyPolicy';
import { PagesTermsConditions } from './PagesTermsConditions';

export default function Pages() {
    const tabs = ['Privacy Policy', 'Terms & Conditions'];
    const [activeTab, setActiveTab] = useState('Privacy Policy');
    const [content, setContent] = useState('');

    useEffect(() => {
        const loadPageData = () => {
            switch (activeTab) {
                case 'Privacy Policy':
                    setContent(PagesPrivacyPolicy);
                    break;
                case 'Terms & Conditions':
                    setContent(PagesTermsConditions);
                    break;
                default:
                    setContent('');
            }
        };

        loadPageData();
    }, [activeTab]);

    const handleUpdate = (updatedData: { title: string; content: string }) => {
        setContent(updatedData.content);
        console.log(`Updated ${activeTab}:`, updatedData);
    };

    return (
        <div className="w-full bg-white text-[#111827]">
            <div className="px-2 pt-4 pb-12">
                <div className="flex flex-col sm:flex-row justify-between items-start mb-6">
                    <div>
                        <h1 className="text-3xl font-bold tracking-tight">Pages</h1>
                        <nav className="flex items-center gap-2 text-sm text-black font-medium mt-1">
                            <a href='/pages' className="text-gray-900">Settings</a>
                            <span className="w-1.5 h-1.5 bg-gray-200 rounded-full" />
                            <span className="text-gray-600">CMS Pages</span>
                        </nav>
                    </div>
                </div>

                <div className="border border-[#e3e3e3]  rounded-md bg-white overflow-hidden">
                    <div className="px-5 py-4">
                        <h2 className="text-gray-800 text-lg font-semibold">Pages</h2>
                    </div>
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
                    <div className='p-2 sm:p-10'>
                        <PagesReusable
                            key={activeTab} 
                            initialTitle={activeTab}
                            initialContent={content}
                            onUpdate={handleUpdate}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}