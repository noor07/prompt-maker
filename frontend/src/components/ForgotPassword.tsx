import React, { useState } from 'react';
import { sendPasswordResetEmail } from 'firebase/auth';
import { auth } from '../firebase';
import { Mail, ChevronLeft } from 'lucide-react';
import { AuthLayout } from './AuthLayout';

interface ForgotPasswordProps {
    onBack?: () => void;
}

export const ForgotPassword: React.FC<ForgotPasswordProps> = ({ onBack }) => {
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            setMessage('');
            setError('');
            setLoading(true);
            await sendPasswordResetEmail(auth, email);
            setMessage('Check your inbox for further instructions.');
        } catch (err: any) {
            setError('Failed to reset password: ' + err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <AuthLayout
            title="Reset Password"
            subtitle="Enter your email address and we'll send you instructions to reset your password."
            onBack={onBack}
        >
            <div className="space-y-6">
                {/* Success/Error State */}
                {message && (
                    <div className="rounded-xl border border-emerald-500/20 bg-emerald-500/10 p-4 text-sm text-emerald-400 text-center">
                        {message}
                    </div>
                )}
                {error && (
                    <div className="rounded-xl border border-red-500/20 bg-red-500/10 p-4 text-sm text-red-400 text-center animate-shake">
                        {error}
                    </div>
                )}

                {/* Reset Form */}
                <form onSubmit={handleSubmit} className="space-y-5">
                    <div className="space-y-2">
                        <label className="text-xs font-bold text-slate-400 uppercase tracking-wider ml-1">Email Address</label>
                        <div className="relative group">
                            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-500 group-focus-within:text-indigo-400 transition-colors" />
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                                placeholder="name@company.com"
                                className="w-full h-12 rounded-xl bg-slate-900 border border-slate-800 px-12 text-white placeholder-slate-600 focus:outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 transition-all font-medium"
                            />
                        </div>
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full h-12 mt-6 rounded-xl bg-gradient-to-r from-indigo-600 to-violet-600 px-8 font-bold text-white shadow-lg shadow-indigo-600/20 hover:from-indigo-500 hover:to-violet-500 hover:shadow-indigo-600/40 transition-all active:scale-[0.98] disabled:opacity-50"
                    >
                        {loading ? 'Sending...' : 'Send Reset Link'}
                    </button>
                </form>

                {/* Back to Login */}
                <div className="text-center pt-4">
                    <button
                        onClick={onBack}
                        className="flex items-center gap-2 mx-auto text-sm font-bold text-indigo-400 hover:text-indigo-300 transition-colors group"
                    >
                        <ChevronLeft className="h-4 w-4 group-hover:-translate-x-1 transition-transform" />
                        Back to Log In
                    </button>
                </div>
            </div>
        </AuthLayout>
    );
};
