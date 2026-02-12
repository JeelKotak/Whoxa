import { Trash } from 'lucide-react';
import './_theme.scss';

interface DeleteModalProps {
    onClose: () => void;
    onConfirm: () => void;
}

export default function CategoriesDeleteModal({ onClose, onConfirm }: DeleteModalProps) {
    return (
        <div className="fixed inset-0 z-[999] flex items-center justify-center bg-black/40 theme-container">
            <div className="bg-white rounded-xl p-9 max-w-[480px] w-full mx-4 shadow-xl flex flex-col items-center text-center animate-in fade-in zoom-in duration-200">
                
                <div className="w-16 h-16 bg-[#f1f1f1] rounded-full flex items-center justify-center mb-4">
                    <Trash className="w-8 h-8 text-gray-400" strokeWidth={1.5} />
                </div>

                <h3 className="text-xl font-semibold text-gray-800 mb-2 tracking-wide">
                    Are you sure want to delete ?
                </h3>
                
                <p className="text-gray-500 text-md font-semiibold mb-8 leading-relaxed tracking-wider">
                    This Item will be deleted Permanently. You can not undo this action.
                </p>

                <div className="flex gap-4 w-full">
                    <button 
                        onClick={onClose}
                        className="flex-1 px-6 py-2.5 rounded-xl bg-[#f1f1f1] text-gray-600 font-bold hover:bg-gray-100 transition-all active:scale-95"
                    >
                        Cancel
                    </button>
                    <button 
                        onClick={onConfirm}
                        className="flex-1 px-6 py-2.5 rounded-xl bg-brand-secondary text-white font-bold"
                    >
                        Delete
                    </button>
                </div>
            </div>
        </div>
    );
}