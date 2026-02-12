import { useState } from 'react';
import '../Components/_theme.scss';

export default function PurchaseCode() {
    const [formData] = useState({
        PurchaseCode: "5d76259d-f ********************",
    });

    return (
        <div className="space-y-8 animate-in fade-in duration-500 theme-container">
            <div className="w-full">
                <form className="space-y-8">

                    {/* Handyman Commission Row */}
                    <div className="w-full">
                        <label
                            htmlFor="Purchase Code(This is From Demo Account)"
                            className="block text-[15px] font-semibold text-black mb-1"
                        >
                            Purchase Code (This is From Demo Account)
                        </label>
                        <input
                            type="string"
                            id="Purchase Code(This is From Demo Account)"
                            value={formData.PurchaseCode}
                            className="w-full p-2 border border-gray-200 rounded-xl text-gray-700 focus:ring-2 focus:ring-[var(--brand-primary)] outline-none transition-all"
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