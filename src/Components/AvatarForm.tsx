import { Pencil } from 'lucide-react';
import React, { useState, useRef, useEffect } from 'react';

interface AvatarForProps {
    label: string;
    required?: boolean;
    onImageChange?: (file: File) => void;
    downlabel?: string;
    initialImage?: string; // <--- Add this prop
}

export const AvatarForm: React.FC<AvatarForProps> = ({ 
    label, 
    required, 
    onImageChange, 
    downlabel, 
    initialImage 
}) => {
    // Initialize preview with the initialImage URL if provided
    const [preview, setPreview] = useState<string | null>(initialImage || null);
    const fileInputRef = useRef<HTMLInputElement>(null);

    // Sync state if initialImage changes externally
    useEffect(() => {
        if (initialImage) {
            setPreview(initialImage);
        }
    }, [initialImage]);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const objectUrl = URL.createObjectURL(file);
            setPreview(objectUrl);
            if (onImageChange) onImageChange(file);
        }
    };

    return (
        <div className="flex flex-col items-center">
            <label className="self-start mb-2 block text-xs font-bold uppercase tracking-wider text-slate-500">
                {label} {required && <span className="text-rose-500">*</span>}
            </label>

            <div className="relative group">
                <div className="w-28 h-28 rounded-full bg-gray-100 border border-gray-200 flex items-center justify-center overflow-hidden">
                    {preview ? (
                        <img src={preview} alt="Preview" className="w-full h-full object-cover" />
                    ) : (
                        /* Fallback Purple Icon */
                        <div className="text-purple-700 bg-purple-50 w-16 h-16 rounded-full flex items-center justify-center">
                            <svg viewBox="0 0 24 24" className="w-10 h-10" fill="currentColor">
                                <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
                            </svg>
                        </div>
                    )}
                </div>

                <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    className="absolute bottom-1 right-1 bg-white border border-gray-300 w-8 h-8 rounded-full flex items-center justify-center shadow-sm hover:bg-gray-50 transition-colors"
                >
                    <Pencil size={14} />
                </button>

                <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleFileChange}
                    className="hidden"
                    accept="image/*"
                />
            </div>

            <p className="mt-2 text-gray-500 text-sm font-medium">{downlabel}</p>
        </div>
    );
};