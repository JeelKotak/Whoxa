import { useState } from 'react';
import { toast } from 'react-toastify';
import { Eye, EyeOff } from 'lucide-react';
import '../Components/_theme.scss';
import useApi from '../hooks/useApiPost';

export default function MyProfilePassword() {
    const [formData, setFormData] = useState({
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
    });

    const [showCurrent, setShowCurrent] = useState(false);
    const [showNew, setShowNew] = useState(false);
    const [showConfirm, setShowConfirm] = useState(false);

   

const { put, loading } = useApi();

const handleCreate = async () => {
    const { currentPassword, newPassword, confirmPassword } = formData;

    if (!currentPassword || !newPassword || !confirmPassword) {
        toast.error("Please fill in all mandatory fields.");
        return;
    }

    if (newPassword !== confirmPassword) {
        toast.error("New password and confirmation do not match.");
        return;
    }

    try {
        const payload = {
            current_password: currentPassword,
            password: newPassword,
            confirm_password: confirmPassword
        };

        const res = await put('/admin/password', payload); // replace with your API endpoint

        if (res?.data?.status) {
            toast.success("Password updated successfully!");
            setFormData({ currentPassword: '', newPassword: '', confirmPassword: '' });
        } else {
            toast.error(res?.data?.message || "Something went wrong");
        }

    } catch (err: any) {
        toast.error(err?.response?.data?.message || "Failed to update password");
    }
};

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    return (
        <div className="pb-32 bg-white theme-container">
            <div className="max-w-[1800px] mx-auto px-4 md:px-8 mt-6 space-y-12">
                <section className="scroll-mt-28 grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
                    <div>
                        <h3 className="text-lg font-bold text-gray-900">Change Password</h3>
                        <p className="text-sm text-gray-500">Update your account security.</p>
                    </div>

                    <div className="md:col-span-2 bg-white space-y-6">
                        
                        {/* Current Password Field */}
                        <div className="space-y-2">
                            <label className="text-sm font-bold text-gray-700">Current Password <span className="text-red-500">*</span></label>
                            <div className="relative">
                                <input 
                                    type={showCurrent ? "text" : "password"}
                                    name="currentPassword"
                                    value={formData.currentPassword} 
                                    onChange={handleChange} 
                                    placeholder="••••••••" 
                                    className="w-full p-2.5 pr-12 border border-gray-300 rounded-lg outline-none focus:ring-1 focus:ring-[var(--brand-secondary)] text-sm" 
                                />
                                <button 
                                    type="button"
                                    onClick={() => setShowCurrent(!showCurrent)}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                                >
                                    {showCurrent ? <Eye size={18} /> : <EyeOff size={18} />}
                                </button>
                            </div>
                        </div>

                        {/* New Password Field */}
                        <div className="space-y-2">
                            <label className="text-sm font-bold text-gray-700">New Password <span className="text-red-500">*</span></label>
                            <div className="relative">
                                <input 
                                    type={showNew ? "text" : "password"}
                                    name="newPassword"
                                    value={formData.newPassword} 
                                    onChange={handleChange} 
                                    placeholder="••••••••" 
                                    className="w-full p-2.5 pr-12 border border-gray-300 rounded-lg outline-none focus:ring-1 focus:ring-[var(--brand-secondary)] text-sm" 
                                />
                                <button 
                                    type="button"
                                    onClick={() => setShowNew(!showNew)}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                                >
                                    {showNew ? <Eye size={18} /> : <EyeOff size={18} />}
                                </button>
                            </div>
                        </div>

                        {/* Confirm Password Field */}
                        <div className="space-y-2">
                            <label className="text-sm font-bold text-gray-700">Confirm New Password <span className="text-red-500">*</span></label>
                            <div className="relative">
                                <input 
                                    type={showConfirm ? "text" : "password"}
                                    name="confirmPassword"
                                    value={formData.confirmPassword} 
                                    onChange={handleChange} 
                                    placeholder="••••••••" 
                                    className="w-full p-2.5 pr-12 border border-gray-300 rounded-lg outline-none focus:ring-1 focus:ring-[var(--brand-secondary)] text-sm" 
                                />
                                <button 
                                    type="button"
                                    onClick={() => setShowConfirm(!showConfirm)}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                                >
                                    {showConfirm ? <Eye size={18} /> : <EyeOff size={18} />}
                                </button>
                            </div>
                        </div>

                    </div>
                </section>
            </div>

            <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-300 p-4 flex flex-row justify-end gap-3 z-40">
                <button className="px-6 py-2.5 text-sm font-bold text-gray-700 border border-gray-300 rounded-lg hover:bg-[#f1f1f1]">Cancel</button>
                <button onClick={handleCreate} className="px-6 py-2.5 text-sm font-bold text-white rounded-lg cursor-pointer bg-brand-secondary">
                   Update Password
                </button>
            </div>
        </div>
    );
}