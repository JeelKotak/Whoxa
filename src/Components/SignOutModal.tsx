import { LogOut } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';

interface SignOutProps {
    onClose: () => void;
    onConfirm: () => void;
}

export default function SignOutModal({ onClose, onConfirm }: SignOutProps) {

    const navigate = useNavigate();

const handleLogout = () => {
  // Remove token
  Cookies.remove("whoxaauth");

  // Optional: clear other data
  localStorage.clear();
  sessionStorage.clear();

  // Redirect to login
  navigate("/", { replace: true });

};

    return (
        <div className="fixed inset-0 z-[999] flex items-center justify-center bg-black/40 theme-container">
            <div className="bg-white rounded-xl p-9 max-w-[480px] w-full mx-4 shadow-xl flex flex-col items-center text-center animate-in fade-in zoom-in duration-200">
                
                <div className="w-16 h-16 bg-[#f1f1f1] rounded-full flex items-center justify-center mb-4">
                    <LogOut className="w-8 h-8 text-gray-400" strokeWidth={1.5} />
                </div>

                <h3 className="text-xl font-semibold text-gray-800 mb-10 tracking-wide">
                    Are you sure want to Sign Out ?
                </h3>

                <div className="flex gap-4 w-full">
                    <button 
                        onClick={onClose}
                        className="flex-1 px-6 py-2.5 rounded-xl bg-[#f1f1f1] text-gray-600 font-bold hover:bg-gray-100 transition-all active:scale-95"
                    >
                        Cancel
                    </button>
                    <button 
                        onClick={handleLogout}
                        className="flex-1 px-6 py-2.5 rounded-xl bg-brand-secondary text-white font-bold"
                    >
                        Sign Out
                    </button>
                </div>
            </div>
        </div>
    );
}