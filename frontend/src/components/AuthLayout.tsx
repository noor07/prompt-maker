import React from 'react';
import { Sparkles, ArrowLeft } from 'lucide-react';
import { AuthCarousel } from './AuthCarousel';

interface AuthLayoutProps {
    children: React.ReactNode;
    title: string;
    subtitle: string;
    onBack?: () => void;
}

export const AuthLayout: React.FC<AuthLayoutProps> = ({ children, title, subtitle, onBack }) => {
    return (
        <div className="min-h-screen w-full flex flex-col lg:flex-row bg-slate-950 font-sans selection:bg-indigo-500/30">
            {/* Left Pane - Form Area */}
            <div className="w-full lg:w-1/2 flex flex-col relative z-10 min-h-screen">
                {/* Header Branding */}
                <div className="p-8 flex items-center justify-between">
                    <div className="flex items-center gap-2 cursor-pointer transition-transform hover:scale-105" onClick={onBack}>
                        <div className="rounded-xl bg-indigo-500/10 p-2 border border-indigo-500/20">
                            <Sparkles className="h-6 w-6 text-indigo-400" />
                        </div>
                        <span className="text-xl font-bold bg-gradient-to-r from-indigo-400 to-violet-400 bg-clip-text text-transparent">
                            Prompt Maker
                        </span>
                    </div>

                    {onBack && (
                        <button
                            onClick={onBack}
                            className="flex items-center gap-2 text-sm font-medium text-slate-400 hover:text-white transition-colors group"
                        >
                            <ArrowLeft className="h-4 w-4 group-hover:-translate-x-1 transition-transform" />
                            Back to Home
                        </button>
                    )}
                </div>

                {/* Form Content - Centered */}
                <div className="flex-1 flex items-center justify-center p-8 md:p-12 lg:p-16">
                    <div className="w-full max-w-md space-y-8">
                        <div>
                            <h1 className="text-3xl font-bold text-white tracking-tight">{title}</h1>
                            <p className="text-slate-400 mt-2">{subtitle}</p>
                        </div>
                        {children}
                    </div>
                </div>

                {/* Footer Branding Removed */}
            </div>

            {/* Right Pane - Master Showcase */}
            <div className="hidden lg:flex lg:w-1/2 bg-slate-900 overflow-hidden relative items-center justify-center border-l border-white/5">
                {/* Background Mesh Gradient */}
                <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-900 to-indigo-950/40" />
                <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-indigo-600/10 blur-[150px] rounded-full -mr-48 -mt-48" />
                <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-violet-600/10 blur-[150px] rounded-full -ml-48 -mb-48" />

                {/* Master Carousel Component */}
                <AuthCarousel />
            </div>
        </div>
    );
};
