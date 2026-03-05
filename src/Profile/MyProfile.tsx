import { useState, useRef, ChangeEvent } from 'react';
import { Pencil } from 'lucide-react';
import MyProfilePassword from './MyProfilePassword';
import MyProfileProfile from './MyProfileProfile';
import '../Components/_theme.scss';

type TabType = 'profile' | 'password';

export default function MyProfile() {
    const [activeTab, setActiveTab] = useState<TabType>('profile');

    const [profileImage, setProfileImage] = useState<string | null>(null);

    const [profileFile, setProfileFile] = useState<File | null>(null);

    const fileInputRef = useRef<HTMLInputElement | null>(null);

    const handleImageChange = (event: ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];

        if (file) {
            setProfileFile(file);

            const reader = new FileReader();
            reader.onloadend = () => {
                setProfileImage(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    const triggerFileSelect = () => {
        fileInputRef.current?.click();
    };

    return (
        <div className='theme-container'>

            {/* Tabs */}
            <div className="flex gap-8 sm:mt-6 border-b border-gray-300 px-2">
                <button
                    onClick={() => setActiveTab('profile')}
                    className={`py-4 font-semibold text-sm ${
                        activeTab === 'profile'
                            ? 'border-b-2 border-black text-black'
                            : 'text-gray-500'
                    }`}
                >
                    Profile
                </button>

                <button
                    onClick={() => setActiveTab('password')}
                    className={`py-4 font-semibold text-sm ${
                        activeTab === 'password'
                            ? 'border-b-2 border-black text-black'
                            : 'text-gray-500'
                    }`}
                >
                    Password
                </button>
            </div>

            {/* Banner */}
            <div className="h-48 bg-gradient-to-r from-orange-200 to-rose-100" />

            <div className="px-4 sm:px-6 lg:px-8">
                <div className="relative -mt-20 sm:-mt-24 flex flex-col sm:flex-row sm:items-end sm:justify-between pb-6">
                    <div className="flex flex-col sm:flex-row sm:items-end gap-4">

                        {/* Profile Image */}
                        <div className="relative inline-block ml-3">
                            <img
                                className="h-32 w-32 sm:h-44 sm:w-44 rounded-full border-4 border-white object-cover"
                                src={profileImage}
                                alt="User Avatar"
                            />

                            <button
                                type="button"
                                onClick={triggerFileSelect}
                                className="absolute bottom-2 right-2 bg-white p-2 rounded-full border border-gray-200"
                            >
                                <Pencil size={18} />
                            </button>

                            <input
                                type="file"
                                ref={fileInputRef}
                                onChange={handleImageChange}
                                accept="image/*"
                                className="hidden"
                            />
                        </div>

                        <div>
                            <h1 className="text-2xl font-bold text-gray-900">
                                Steve Harrington
                            </h1>
                        </div>
                    </div>
                </div>

                {/* Dynamic Content */}
                <div className="mt-4">
                    {activeTab === 'profile' ? (
                       <MyProfileProfile 
  profileImageFile={profileFile} 
  setProfileImage={setProfileImage}
/>
                    ) : (
                        <MyProfilePassword />
                    )}
                </div>
            </div>
        </div>
    );
}