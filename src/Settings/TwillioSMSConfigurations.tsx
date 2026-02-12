import { useState } from 'react';
import '../Components/_theme.scss';

export default function TwillioSMSConfigurations() {
    const [formData] = useState({
        TwilioAccountSID: '',
        TwilioAuthToken: '',
        TwilioPhoneNumber: '',
    });

    return (
        <div className="space-y-8 animate-in fade-in duration-500 theme-container">
            <div className="w-full">
                <form className="space-y-6">
                    {/* Username and Password Row */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div>
                            <label htmlFor="TwilioAccountSID" className="block text-[15px] font-semibold text-black mb-2">
                                Twilio Account SID
                            </label>
                            <input
                                type="password"
                                id="TwilioAccountSID"
                                value={formData.TwilioAccountSID}
                                placeholder='********'
                                className="w-full p-3 border border-gray-200 rounded-xl text-gray-700 focus:ring-2 focus:ring-[var(--brand-primary)] outline-none transition-all"
                            />
                        </div>

                        <div>
                            <label htmlFor="TwilioAuthToken" className="block text-[15px] font-semibold text-black mb-2">
                                Twilio Auth Token
                            </label>
                            <input
                                type="password"
                                id="TwilioAuthToken"
                                value={formData.TwilioAccountSID}
                                placeholder='********'
                                className="w-full p-3 border border-gray-200 rounded-xl text-gray-700 focus:ring-2 focus:ring-[var(--brand-primary)] outline-none transition-all"
                            />
                        </div>
                    </div>

                    {/* From Address Row */}
                    <div className="w-full">
                        <label htmlFor="TwilioPhoneNumber" className="block text-[15px] font-semibold text-black mb-2">
                            Twilio Phone Number
                        </label>
                        <input
                            type="password"
                            id="TwilioPhoneNumber"
                            value={formData.TwilioPhoneNumber}
                            placeholder='********'
                            className="w-full p-3 border border-gray-200 rounded-xl text-gray-700 focus:ring-2 focus:ring-[var(--brand-primary)] outline-none transition-all"
                        />
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