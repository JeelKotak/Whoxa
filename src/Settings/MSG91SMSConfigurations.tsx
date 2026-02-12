import { useState } from 'react';
import '../Components/_theme.scss';

export default function MSG91SMSConfigurations() {
    const [formData] = useState({
        MSG91SenderID:'',
        MSG91APIKey: '',
        MSG91TemplateID:''
    });

    return (
        <div className="space-y-8 animate-in fade-in duration-500 theme-container">
            <div className="w-full">
                <form className="space-y-6">
                    {/* Username and Password Row */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div>
                            <label htmlFor="MSG91SenderID" className="block text-[15px] font-semibold text-black mb-2">
                                MSG91 Sender ID
                            </label>
                            <input
                                type="password"
                                id="MSG91SenderID"
                                value={formData.MSG91SenderID}
                                placeholder='********'
                                className="w-full p-3 border border-gray-200 rounded-xl text-gray-700 focus:ring-2 focus:ring-[var(--brand-primary)] outline-none transition-all"
                            />
                        </div>

                        <div>
                            <label htmlFor="MSG91TemplateID" className="block text-[15px] font-semibold text-black mb-2">
                                MSG91 Template ID
                            </label>
                            <input
                                type="password"
                                id="MSG91TemplateID"
                                value={formData.MSG91TemplateID}
                                placeholder='********'
                                className="w-full p-3 border border-gray-200 rounded-xl text-gray-700 focus:ring-2 focus:ring-[var(--brand-primary)] outline-none transition-all"
                            />
                        </div>

                        <div>
                            <label htmlFor="MSG91APIKey" className="block text-[15px] font-semibold text-black mb-2">
                                MSG91 API Key
                            </label>
                            <input
                                type="password"
                                id="MSG91APIKey"
                                value={formData.MSG91APIKey}
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