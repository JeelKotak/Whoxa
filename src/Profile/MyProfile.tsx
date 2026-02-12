import { useState, useRef,type ChangeEvent } from 'react';
import { Pencil } from 'lucide-react';
import MyProfilePassword from './MyProfilePassword';
import MyProfileProfile from './MyProfileProfile';
import '../Components/_theme.scss';

type TabType = 'profile' | 'password';

export default function MyProfile() {
    const [activeTab, setActiveTab] = useState<TabType>('profile');
    const [profileImage, setProfileImage] = useState<string>("https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?q=80&w=400&h=400&auto=format&fit=crop");
    
    const fileInputRef = useRef<HTMLInputElement | null>(null);

    const handleImageChange = (event: ChangeEvent<HTMLInputElement>): void => {
        const file = event.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                const result = reader.result as string;
                setProfileImage(result);
            };
            reader.readAsDataURL(file);
        }
    };

    const triggerFileSelect = (): void => {
        fileInputRef.current?.click();
    };

    return (
        <div className='theme-container'>
            {/* Header / Breadcrumbs */}
            <div className='px-2'>
                <h1 className="text-xl sm:text-3xl font-bold font-lexend">My Profile</h1>
                <nav className="flex items-center gap-2 text-sm text-black font-medium mt-1">
                    <a className="hover:text-gray-600 cursor-pointer transition-colors">Settings</a>
                    <span className="w-1 h-1 bg-gray-300 rounded-full" />
                    <span className="text-gray-500">My Profile</span>
                </nav>
            </div>

            {/* Tab Navigation */}
            <div className="flex gap-8 sm:mt-6 border-b border-gray-300 px-2">
                <button 
                    onClick={() => setActiveTab('profile')}
                    className={`py-4 font-semibold text-sm transition-all ${
                        activeTab === 'profile' ? 'border-b-2 border-black text-black' : 'text-gray-500 hover:text-black'
                    }`}
                >
                    Profile
                </button>
                <button 
                    onClick={() => setActiveTab('password')}
                    className={`py-4 font-semibold text-sm transition-all ${
                        activeTab === 'password' ? 'border-b-2 border-black text-black' : 'text-gray-500 hover:text-black'
                    }`}
                >
                    Password
                </button>
            </div>

            {/* Fixed Visual Header (Banner & Photo) */}
            <div className="h-48 bg-gradient-to-r from-orange-200 to-rose-100" />
            
            <div className="px-4 sm:px-6 lg:px-8">
                <div className="relative -mt-20 sm:-mt-24 flex flex-col sm:flex-row sm:items-end sm:justify-between pb-6 ">
                    <div className="flex flex-col sm:flex-row sm:items-end gap-4">
                        
                        {/* Profile Image Container */}
                        <div className="relative inline-block ml-3">
                            <img
                                className="h-32 w-32 sm:h-44 sm:w-44 rounded-full border-4 border-white object-cover bg-white"
                                src={profileImage}
                                alt="User Avatar"
                            />
                            
                            {/* Pencil Button (Southeast) */}
                            <button 
                                type="button"
                                onClick={triggerFileSelect}
                                className="absolute bottom-1 right-1 sm:bottom-2 sm:right-2 bg-white p-2 rounded-full  border border-gray-200 hover:bg-gray-50 transition-colors group"
                                aria-label="Change profile picture"
                            >
                                <Pencil size={18} className="text-gray-700 group-hover:scale-110 transition-transform" />
                            </button>

                            {/* Hidden File Input */}
                            <input 
                                type="file" 
                                ref={fileInputRef}
                                onChange={handleImageChange}
                                accept="image/*"
                                className="hidden"
                            />
                        </div>

                        <div className="mb-1">
                            <h1 className="text-2xl font-bold text-gray-900">Steve Harrington</h1>
                            <p className='text-md font-ms text-gray-500'>
                                {activeTab === 'profile' 
                                    ? "Update your photo and personal details." 
                                    : "Manage your password and security settings."}
                            </p>
                        </div>
                    </div>
                </div>

                <div className='border-b border-dashed mt-8 border-gray-300 mx-6'></div>

                {/* --- Dynamic Content Area --- */}
                <div className="mt-4">
                    {activeTab === 'profile' ? <MyProfileProfile /> : <MyProfilePassword />}
                </div>
            </div>
        </div>
    );
}