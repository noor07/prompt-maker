import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Code, Zap, Image, Globe, Cpu, Layers, Sparkles } from 'lucide-react';

// --- Sub-Component: Slide 1 "The Architect" ---
const ArchitectSlide = () => {
    const code = `def generate_prompt(topic):
    """
    Architecting the future of AI.
    """
    prompt = f"Create a masterpiece about {topic}"
    print(f"Executing: {prompt}")
    return AI.generate(prompt)

# Start engineering...`;

    const [displayedCode, setDisplayedCode] = useState("");

    useEffect(() => {
        let i = 0;
        const timer = setInterval(() => {
            setDisplayedCode(code.slice(0, i));
            i++;
            if (i > code.length) clearInterval(timer);
        }, 30);
        return () => clearInterval(timer);
    }, []);

    const highlightCode = (text: string) => {
        return text.split(/(\s+)/).map((word, i) => {
            if (['def', 'return', 'import', 'from', 'as'].includes(word))
                return <span key={i} className="text-pink-400">{word}</span>;
            if (['print', 'generate_prompt'].includes(word))
                return <span key={i} className="text-blue-400">{word}</span>;
            if (word.startsWith('"') || word.startsWith('f"'))
                return <span key={i} className="text-emerald-400">{word}</span>;
            return <span key={i} className="text-slate-300">{word}</span>;
        });
    };

    return (
        <div className="w-full max-w-lg aspect-video rounded-2xl border border-white/10 bg-[#0d1117] shadow-2xl overflow-hidden flex flex-col">
            {/* Mac Window Header */}
            <div className="h-10 bg-slate-900 border-b border-white/5 flex items-center px-4 gap-2">
                <div className="flex gap-1.5">
                    <div className="w-3 h-3 rounded-full bg-red-500/80" />
                    <div className="w-3 h-3 rounded-full bg-amber-500/80" />
                    <div className="w-3 h-3 rounded-full bg-emerald-500/80" />
                </div>
                <div className="flex-1 text-center text-[10px] font-medium text-slate-500 uppercase tracking-widest">architect.py</div>
            </div>
            {/* Code Content */}
            <div className="p-6 font-mono text-sm leading-relaxed overflow-hidden">
                <pre className="whitespace-pre-wrap">
                    {highlightCode(displayedCode)}
                    <motion.span
                        animate={{ opacity: [1, 0] }}
                        transition={{ duration: 0.8, repeat: Infinity }}
                        className="inline-block w-2 h-4 bg-indigo-500 ml-0.5 align-middle"
                    />
                </pre>
            </div>
        </div>
    );
};

// --- Sub-Component: Slide 2 "The Creator" ---
const CreatorSlide = () => {
    const items = [
        { icon: <Globe className="h-5 w-5" />, text: "SEO Strategy" },
        { icon: <Code className="h-5 w-5" />, text: "React Component" },
        { icon: <Layers className="h-5 w-5" />, text: "App Architecture" },
        { icon: <Zap className="h-5 w-5" />, text: "Speed Optimization" },
        { icon: <Image className="h-5 w-5" />, text: "Midjourney v6" },
        { icon: <Layers className="h-5 w-5" />, text: "Email Marketing" }
    ];

    return (
        <div className="relative w-full h-[400px] overflow-hidden flex gap-6">
            <div className="absolute inset-0 z-10 pointer-events-none bg-gradient-to-at-top via-transparent to-transparent bg-gradient-to-b from-slate-900 via-transparent to-slate-900" />

            {/* Scrolling Column 1 (Up) */}
            <div className="flex-1 flex flex-col gap-4 animate-scroll-up">
                {[...items, ...items].map((item, i) => (
                    <div key={i} className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-md p-6 flex flex-col gap-3 shadow-xl">
                        <div className="p-2 rounded-lg bg-indigo-500/10 border border-indigo-500/20 w-fit">{item.icon}</div>
                        <span className="text-sm font-bold text-white mb-1">{item.text}</span>
                        <div className="h-1.5 w-full bg-slate-800 rounded-full overflow-hidden">
                            <div className="h-full bg-indigo-500 w-3/4" />
                        </div>
                    </div>
                ))}
            </div>

            {/* Scrolling Column 2 (Down) */}
            <div className="flex-1 flex flex-col gap-4 animate-scroll-down">
                {[...items, ...items].map((item, i) => (
                    <div key={i} className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-md p-6 flex flex-col gap-3 shadow-xl">
                        <div className="p-2 rounded-lg bg-emerald-500/10 border border-emerald-500/20 w-fit">{item.icon}</div>
                        <span className="text-sm font-bold text-white mb-1">{item.text}</span>
                        <div className="h-1.5 w-full bg-slate-800 rounded-full overflow-hidden">
                            <div className="h-full bg-emerald-500 w-1/2" />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

// --- Sub-Component: Slide 3 "The Brain" ---
const BrainSlide = () => {
    const icons = [
        <Code key="1" className="h-6 w-6 text-indigo-400" />,
        <Zap key="2" className="h-6 w-6 text-amber-400" />,
        <Image key="3" className="h-6 w-6 text-pink-400" />,
        <Cpu key="4" className="h-6 w-6 text-emerald-400" />,
        <Globe key="5" className="h-6 w-6 text-sky-400" />
    ];

    return (
        <div className="relative w-full h-[400px] flex items-center justify-center">
            {/* Pulsing Core */}
            <motion.div
                animate={{ scale: [1, 1.15, 1], opacity: [0.5, 0.8, 0.5] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="absolute w-48 h-48 bg-indigo-500/20 blur-[60px] rounded-full"
            />
            <motion.div
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="relative w-32 h-32 bg-indigo-500 rounded-full flex items-center justify-center shadow-[0_0_50px_rgba(99,102,241,0.5)] border border-indigo-400/50"
            >
                <Sparkles className="h-12 w-12 text-white" />
            </motion.div>

            {/* Orbiting Icons */}
            <div className="absolute w-full h-full animate-spin-slow">
                {icons.map((icon, i) => {
                    const angle = (i / icons.length) * (2 * Math.PI);
                    const radius = 140;
                    const x = Math.cos(angle) * radius;
                    const y = Math.sin(angle) * radius;

                    return (
                        <motion.div
                            key={i}
                            style={{
                                left: `calc(50% + ${x}px - 24px)`,
                                top: `calc(50% + ${y}px - 24px)`
                            }}
                            className="absolute p-3 rounded-xl border border-white/10 bg-white/5 backdrop-blur-xl shadow-2xl"
                        >
                            {icon}
                        </motion.div>
                    );
                })}
            </div>
        </div>
    );
};

// --- Main AuthCarousel Component ---
export const AuthCarousel = () => {
    const [index, setIndex] = useState(0);
    const slides = [
        { component: <ArchitectSlide />, title: "The Architect", subtitle: "Build complex logic with natural language." },
        { component: <CreatorSlide />, title: "The Creator", subtitle: "Generate endless content at light speed." },
        { component: <BrainSlide />, title: "The Neural Core", subtitle: "AI that thinks like a master engineer." }
    ];

    useEffect(() => {
        const timer = setInterval(() => {
            setIndex((prev) => (prev + 1) % slides.length);
        }, 8000);
        return () => clearInterval(timer);
    }, []);

    return (
        <div className="w-full h-full flex flex-col px-12 pb-12 pt-12 relative overflow-hidden">
            <div className="flex-1 flex flex-col justify-center gap-12">
                <AnimatePresence mode="wait">
                    <motion.div
                        key={index}
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 1.05 }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                        className="flex flex-col items-center gap-12"
                    >
                        {slides[index].component}

                        <div className="text-center space-y-3">
                            <h2 className="text-4xl font-black text-white tracking-tight">{slides[index].title}</h2>
                            <p className="text-lg text-slate-400 font-medium">{slides[index].subtitle}</p>
                        </div>
                    </motion.div>
                </AnimatePresence>
            </div>

            {/* Pill Indicators */}
            <div className="flex justify-center gap-2.5 mt-auto">
                {slides.map((_, i) => (
                    <button
                        key={i}
                        onClick={() => setIndex(i)}
                        className={`h-2 rounded-full transition-all duration-500 ${i === index ? 'w-8 bg-indigo-500 shadow-[0_0_10px_rgba(99,102,241,0.5)]' : 'w-2 bg-slate-700 hover:bg-slate-600'
                            }`}
                    />
                ))}
            </div>

            <style>{`
                @keyframes scroll-up {
                    0% { transform: translateY(0); }
                    100% { transform: translateY(-50%); }
                }
                @keyframes scroll-down {
                    0% { transform: translateY(-50%); }
                    100% { transform: translateY(0); }
                }
                .animate-scroll-up {
                    animation: scroll-up 20s linear infinite;
                }
                .animate-scroll-down {
                    animation: scroll-down 20s linear infinite;
                }
                .animate-spin-slow {
                    animation: spin 30s linear infinite;
                }
            `}</style>
        </div>
    );
};
