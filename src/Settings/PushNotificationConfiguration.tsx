import { useState } from 'react';
import '../Components/_theme.scss';

export default function PushNotificationConfiguration() {
    const [formData] = useState({
        OneSignalAppID:'',
        OneSignalAPIKey: '',
        AndroidChannelID:''
    });

    return (
        <div className="space-y-8 animate-in fade-in duration-500 theme-container">
            <div className="w-full">
                <form className="space-y-6">
                    {/* Username and Password Row */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div>
                            <label htmlFor="OneSignalAppID" className="block text-[15px] font-semibold text-black mb-2">
                                OneSignal App ID
                            </label>
                            <input
                                type="password"
                                id="OneSignalAppID"
                                value={formData.OneSignalAppID}
                                placeholder='********'
                                className="w-full p-3 border border-gray-200 rounded-xl text-gray-700 focus:ring-2 focus:ring-[var(--brand-primary)] outline-none transition-all"
                            />
                        </div>

                        <div>
                            <label htmlFor="OneSignalAPIKey" className="block text-[15px] font-semibold text-black mb-2">
                           OneSignal API Key
                            </label>
                            <input
                                type="password"
                                id="OneSignalAPIKey"
                                value={formData.OneSignalAPIKey}
                                placeholder='********'
                                className="w-full p-3 border border-gray-200 rounded-xl text-gray-700 focus:ring-2 focus:ring-[var(--brand-primary)] outline-none transition-all"
                            />
                        </div>

                        <div>
                            <label htmlFor="AndroidChannelID" className="block text-[15px] font-semibold text-black mb-2">
                                Android Channel ID
                            </label>
                            <input
                                type="password"
                                id="AndroidChannelID"
                                value={formData.AndroidChannelID}
                                placeholder='********'
                                className="w-full p-3 border border-gray-200 rounded-xl text-gray-700 focus:ring-2 focus:ring-[var(--brand-primary)] outline-none transition-all"
                            />
                        </div>
                    </div>

                    {/* Submit Button */}
                    <div className="pt-2">
                        <button
                            type="submit"
                            className="px-10 py-3 bg-brand-secondary text-white font-semibold rounded-xl"
                        >
                            Submit
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}