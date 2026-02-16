import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Terminal, Palette, Zap, ArrowLeft } from 'lucide-react';

interface AuthLayoutProps {
    children: React.ReactNode;
    title: string;
    subtitle: string;
    onBack?: () => void;
}

const slides = [
    {
        icon: <Terminal className="h-10 w-10 text-indigo-400" />,
        title: "Generate production-ready code.",
        subtext: "From simple logic to complex algorithms in seconds.",
        color: "from-indigo-500/20 to-violet-500/20"
    },
    {
        icon: <Palette className="h-10 w-10 text-pink-400" />,
        title: "Unlock your imagination.",
        subtext: "Craft detailed Midjourney prompts that stun.",
        color: "from-pink-500/20 to-rose-500/20"
    },
    {
        icon: <Zap className="h-10 w-10 text-amber-400" />,
        title: "10x your workflow.",
        subtext: "Automate emails, reports, and analysis.",
        color: "from-amber-500/20 to-orange-500/20"
    }
];

export const AuthLayout: React.FC<AuthLayoutProps> = ({ children, title, subtitle, onBack }) => {
    const [currentSlide, setCurrentSlide] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % slides.length);
        }, 4000);
        return () => clearInterval(timer);
    }, []);

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

            {/* Right Pane - Showcase Showcase */}
            <div className="hidden lg:flex lg:w-1/2 bg-slate-900 overflow-hidden relative items-center justify-center">
                {/* Background Mesh Gradient */}
                <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-900 to-indigo-950/40" />
                <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-indigo-600/10 blur-[150px] rounded-full -mr-48 -mt-48" />
                <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-violet-600/10 blur-[150px] rounded-full -ml-48 -mb-48" />

                {/* Animated Carousel Section */}
                <div className="relative z-10 w-full max-w-xl px-12">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={currentSlide}
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                            transition={{ duration: 0.6, ease: "easeOut" }}
                            className="relative"
                        >
                            {/* Decorative Glass Card */}
                            <div className={cn(
                                "rounded-[32px] border border-white/10 bg-white/5 backdrop-blur-2xl p-10 shadow-2xl transition-all duration-700",
                                "ring-1 ring-white/10"
                            )}>
                                <div className={cn(
                                    "mb-8 inline-flex rounded-2xl p-4 bg-gradient-to-br shadow-inner",
                                    slides[currentSlide].color
                                )}>
                                    {slides[currentSlide].icon}
                                </div>
                                <h2 className="text-4xl font-bold text-white leading-tight mb-4">
                                    {slides[currentSlide].title}
                                </h2>
                                <p className="text-lg text-slate-400 font-medium">
                                    {slides[currentSlide].subtext}
                                </p>
                            </div>

                            {/* Carousel Indicators */}
                            <div className="mt-12 flex gap-3 justify-center">
                                {slides.map((_, i) => (
                                    <div
                                        key={i}
                                        className={cn(
                                            "h-1.5 rounded-full transition-all duration-500",
                                            i === currentSlide ? "w-8 bg-indigo-500" : "w-2 bg-slate-700 hover:bg-slate-600"
                                        )}
                                    />
                                ))}
                            </div>
                        </motion.div>
                    </AnimatePresence>
                </div>
            </div>
        </div>
    );
};

// Utility
function cn(...inputs: any[]) {
    return inputs.filter(Boolean).join(' ');
}
