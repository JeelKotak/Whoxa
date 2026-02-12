import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Mail, Lock, Eye, EyeOff } from 'lucide-react';
import toast, { Toaster } from 'react-hot-toast';

export default function LoginPage() {
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);
    const [, setCopied] = useState(false);

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const demoEmail = "demo@whoxa.com";
    const demoPassword = "Admin@123?";

    const handleLogin = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        
        if (email === demoEmail && password === demoPassword) {
            setTimeout(() => navigate('/dashboard'), 1000);
        } else if (!email || !password) {
            toast.error('Please enter both email and password.');
        } else {
            toast.error('Invalid credentials. Try using the autofill.');
        }
    };

    const handleCopy = async () => {
        setEmail(demoEmail);
        setPassword(demoPassword);

        try {
            const textToCopy = `Email: ${demoEmail}\nPassword: ${demoPassword}`;
            await navigator.clipboard.writeText(textToCopy);
            toast.success('Credentials copied and filled!');
        } catch (err) {
            console.warn("Clipboard access denied.");
        }

        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return ( 
        <div className="min-h-screen flex items-center justify-center px-4 xl:py-4">
            <Toaster position="top-center" reverseOrder={false} />

            {/* LOGIN CARD */}
            <div className="w-full max-w-[520px] bg-white rounded-2xl">
                
                {/* Logo Section */}
                <div className="flex items-center gap-3 mb-4">
                    <img src='./Images/Logo.png' alt="Logo" className="w-12 h-10 object-contain" />
                    <span className="text-2xl font-bold tracking-tight text-gray-900">Whoxa Chat</span>
                </div>

                {/* Heading */}
                <h1 className="text-4xl font-extrabold text-gray-800 leading-tight mb-8">
                    Welcome back! <br />
                    <span className="relative inline-block">
                        Sign in
                        <svg className="absolute -bottom-2 left-0 w-full" viewBox="0 0 138 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M1 8.5C30.5 2.5 107.5 -1.5 137 8.5" stroke="#9CA3AF" strokeWidth="2" strokeLinecap="round" />
                        </svg>
                    </span> to continue.
                </h1>

                {/* Login Form */}
                <form className="space-y-5" onSubmit={handleLogin}>
                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                            Email <span className="text-red-500">*</span>
                        </label>
                        <div className="relative">
                            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                            <input
                                type="email"
                                placeholder="Enter your email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full rounded-md border border-gray-300 pl-10 pr-3 py-3 outline-none focus:border-[#FFB300] focus:ring-1 focus:ring-[#FFB300] transition-all placeholder:text-gray-400"
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                            Password <span className="text-red-500">*</span>
                        </label>
                        <div className="relative">
                            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                            <input
                                type={showPassword ? "text" : "password"}
                                placeholder="Enter your password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full rounded-md border border-gray-300 pl-10 pr-10 py-3 outline-none focus:border-[#FFB300] focus:ring-1 focus:ring-[#FFB300] transition-all placeholder:text-gray-400"
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                            >
                                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                            </button>
                        </div>
                    </div>

                    <button 
                        type="submit" 
                        className="w-full rounded-md bg-yellow-400 py-3 font-bold text-white mt-4"
                    >
                        Sign In
                    </button>
                </form>

                {/* Demo Credentials Table */}
                <div className="mt-10 border border-[#FFC107] rounded-lg overflow-hidden bg-white">
                    <table className="w-full text-sm border-collapse">
                        <tbody>
                            <tr className="border-b border-[#FFC107]">
                                <td className="p-3 font-semibold text-gray-700 border-r border-[#FFC107] w-1/3 ">
                                    Email:
                                </td>
                                <td className="p-3 text-gray-900">
                                    {demoEmail}
                                </td>
                            </tr>
                            <tr className="border-b border-[#FFC107]">
                                <td className="p-3 font-semibold text-gray-700 border-r border-[#FFC107] ">
                                    Password:
                                </td>
                                <td className="p-3 text-gray-900 ">
                                    {demoPassword}
                                </td>
                            </tr>
                            <tr>
                                <td colSpan={2} className="p-4 text-center">
                                    <button
                                        type="button"
                                        onClick={handleCopy}
                                        className="w-full md:w-48 mx-auto bg-yellow-400 py-2.5 text-white font-bold flex items-center justify-center rounded-lg cursor-pointer text-lg "
                                    >
                                        Copy
                                    </button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}