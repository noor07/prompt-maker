import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import {
    Terminal,
    Sparkles,
    Code2,
    Zap,
    MessageSquare,
    Mail,
    Github,
    Twitter,
    ChevronRight,
    Menu,
    X,
    Copy,
    Check,
    Globe,
    ArrowRight
} from 'lucide-react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { Login } from './Login';
import { SignUp } from './SignUp';
import { ForgotPassword } from './ForgotPassword';

// --- Utility ---
function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

// --- Components ---

const Navbar = ({ activeTab, setActiveTab, isMobileMenuOpen, setIsMobileMenuOpen }: any) => {
    const navigate = useNavigate();
    const { currentUser } = useAuth();
    const isAuthView = activeTab === 'login' || activeTab === 'signup' || activeTab === 'forgot-password';

    const navItems = [
        { id: 'home', label: 'Home' },
        { id: 'features', label: 'Features' },
        { id: 'faq', label: 'FAQ' },
        { id: 'contact', label: 'Contact' },
    ];

    const handleAction = () => {
        if (currentUser) {
            navigate('/app');
        } else {
            setActiveTab('login');
        }
    };

    return (
        <nav className="fixed top-6 left-1/2 -translate-x-1/2 w-[90%] max-w-5xl rounded-full border border-white/10 bg-black/40 backdrop-blur-xl z-50 px-6 py-4 shadow-lg shadow-purple-500/10 transition-all duration-300">
            <div className="flex items-center justify-between w-full">
                <div className="flex items-center gap-2 cursor-pointer flex-none" onClick={() => setActiveTab('home')}>
                    <div className="rounded-lg bg-indigo-500/10 p-2">
                        <Sparkles className="h-5 w-5 text-indigo-400" />
                    </div>
                    <span className="text-lg font-bold bg-gradient-to-r from-indigo-400 to-violet-400 bg-clip-text text-transparent hidden sm:block">
                        Prompt Maker
                    </span>
                </div>

                {isAuthView ? (
                    <button
                        onClick={() => setActiveTab('home')}
                        className="text-sm font-medium text-slate-400 hover:text-white transition-colors"
                    >
                        Back to Home
                    </button>
                ) : (
                    <>
                        {/* Desktop Nav */}
                        <div className="hidden md:flex items-center justify-center gap-8 flex-1">
                            {navItems.map((item) => (
                                <button
                                    key={item.id}
                                    onClick={() => setActiveTab(item.id)}
                                    className={cn(
                                        "text-sm font-medium transition-colors hover:text-indigo-400",
                                        activeTab === item.id ? "text-indigo-400" : "text-slate-400"
                                    )}
                                >
                                    {item.label}
                                </button>
                            ))}
                            <button
                                onClick={() => setActiveTab('login')}
                                className="text-sm font-medium text-slate-400 hover:text-indigo-400 transition-colors"
                            >
                                Login
                            </button>
                        </div>

                        <div className="flex items-center gap-4 flex-none">
                            <button
                                onClick={handleAction}
                                className="rounded-full bg-indigo-600 px-5 py-2.5 text-sm font-semibold text-white transition-all hover:bg-indigo-500 hover:shadow-lg hover:shadow-indigo-500/20 active:scale-95"
                            >
                                {currentUser ? 'Go to App' : 'Get Started'}
                            </button>

                            {/* Mobile Menu Button */}
                            <button
                                className="md:hidden p-2 text-slate-400 hover:text-white"
                                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                            >
                                {isMobileMenuOpen ? <X /> : <Menu />}
                            </button>
                        </div>
                    </>
                )}
            </div>

            {/* Mobile Nav */}
            <AnimatePresence>
                {!isAuthView && isMobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -20, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: -20, scale: 0.95 }}
                        className="absolute top-full left-0 right-0 mt-4 mx-auto w-full max-w-sm rounded-2xl border border-white/10 bg-black/80 backdrop-blur-xl p-4 md:hidden shadow-2xl"
                    >
                        <div className="space-y-1">
                            {navItems.map((item) => (
                                <button
                                    key={item.id}
                                    onClick={() => {
                                        setActiveTab(item.id);
                                        setIsMobileMenuOpen(false);
                                    }}
                                    className={cn(
                                        "block w-full rounded-lg px-4 py-3 text-left text-sm font-medium transition-colors",
                                        activeTab === item.id
                                            ? "bg-indigo-500/10 text-indigo-400"
                                            : "text-slate-400 hover:bg-white/5 hover:text-white"
                                    )}
                                >
                                    {item.label}
                                </button>
                            ))}
                            <button
                                onClick={() => {
                                    setActiveTab('login');
                                    setIsMobileMenuOpen(false);
                                }}
                                className="block w-full rounded-lg px-4 py-3 text-left text-sm font-medium text-indigo-400 hover:bg-indigo-500/10 transition-colors"
                            >
                                Login
                            </button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
};

const TerminalHero = () => {
    const [text, setText] = useState('');
    const [isDeleting, setIsDeleting] = useState(false);
    const [loopNum, setLoopNum] = useState(0);
    const [typingSpeed, setTypingSpeed] = useState(50);

    const scenarios = [
        "Generate a production-ready React component for a landing page...",
        "Write a python script to scrape stock prices from Yahoo Finance...",
        "Create a 30-day social media content calendar for a coffee brand...",
        "Explain quantum computing to a 5-year old..."
    ];

    useEffect(() => {
        const i = loopNum % scenarios.length;
        const fullText = scenarios[i];

        const handleTyping = () => {
            setText(isDeleting
                ? fullText.substring(0, text.length - 1)
                : fullText.substring(0, text.length + 1)
            );

            setTypingSpeed(isDeleting ? 30 : 50);

            if (!isDeleting && text === fullText) {
                setTimeout(() => setIsDeleting(true), 1500);
            } else if (isDeleting && text === '') {
                setIsDeleting(false);
                setLoopNum(loopNum + 1);
            }
        };

        const timer = setTimeout(handleTyping, typingSpeed);
        return () => clearTimeout(timer);
    }, [text, isDeleting, loopNum]);

    return (
        <div className="relative w-full max-w-lg rounded-xl border border-white/5 bg-slate-950/50 shadow-2xl backdrop-blur-xl">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] bg-indigo-500/20 blur-[100px] -z-10 rounded-full" />
            <div className="flex items-center gap-2 border-b border-white/5 bg-white/5 px-4 py-3">
                <div className="flex gap-2">
                    <div className="h-3 w-3 rounded-full bg-red-500/20 border border-red-500/50" />
                    <div className="h-3 w-3 rounded-full bg-yellow-500/20 border border-yellow-500/50" />
                    <div className="h-3 w-3 rounded-full bg-green-500/20 border border-green-500/50" />
                </div>
                <div className="ml-2 text-xs font-medium text-slate-500 flex items-center gap-1">
                    <Terminal className="h-3 w-3" />
                    prompt-maker — v2.0
                </div>
            </div>
            <div className="p-4 font-mono text-sm">
                <div className="flex gap-2">
                    <span className="text-green-400">➜</span>
                    <span className="text-indigo-400">~</span>
                    <span className="text-slate-300">generate-prompt</span>
                </div>
                <div className="mt-2 text-slate-300 min-h-[80px]">
                    {text}
                    <span className="animate-pulse bg-slate-500 w-2 h-4 inline-block align-middle ml-1" />
                </div>
                <div className="mt-4 rounded bg-slate-900 p-3 text-xs text-slate-400 border border-white/5">
                    <div className="flex justify-between items-center mb-2">
                        <span className="text-slate-500">Output Preview</span>
                        <Copy className="h-3 w-3 cursor-pointer hover:text-white" />
                    </div>
                    <div className="space-y-1">
                        <div className="w-3/4 h-2 bg-slate-800 rounded animate-pulse" />
                        <div className="w-1/2 h-2 bg-slate-800 rounded animate-pulse" />
                        <div className="w-full h-2 bg-slate-800 rounded animate-pulse" />
                    </div>
                </div>
            </div>
        </div>
    );
};

const ProblemSolution = () => (
    <div className="py-24 bg-slate-900/30 border-y border-white/5">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
                <h2 className="text-3xl font-bold text-white sm:text-4xl">Stop wasting time</h2>
                <p className="mt-4 text-lg text-slate-400">The difference between guessing and engineering.</p>
            </div>
            <div className="grid md:grid-cols-2 gap-8">
                {/* Old Way */}
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    className="rounded-2xl border border-red-500/10 bg-red-500/5 p-8"
                >
                    <div className="flex items-center gap-3 mb-6">
                        <div className="rounded-full bg-red-500/10 p-2">
                            <X className="h-6 w-6 text-red-500" />
                        </div>
                        <h3 className="text-xl font-bold text-white">The Old Way</h3>
                    </div>
                    <ul className="space-y-4">
                        {[
                            "Vague instructions leading to generic output",
                            "Endless trial-and-error loops",
                            "Wasted API tokens and costs",
                            "Frustration and inconsistent results",
                            "Frequent hallucinations and made-up facts",
                            "Messy, unstructured text dumps",
                            "Manual rewriting for every new task"
                        ].map((item, i) => (
                            <li key={i} className="flex items-start gap-3 text-slate-400">
                                <X className="h-5 w-5 text-red-500/50 mt-0.5 shrink-0" />
                                <span>{item}</span>
                            </li>
                        ))}
                    </ul>
                </motion.div>

                {/* New Way */}
                <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    className="rounded-2xl border border-indigo-500/20 bg-indigo-500/10 p-8 backdrop-blur-sm relative overflow-hidden group"
                >
                    <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                    <div className="flex items-center gap-3 mb-6">
                        <div className="rounded-full bg-indigo-500/20 p-2 ring-1 ring-indigo-500/50">
                            <Check className="h-6 w-6 text-indigo-400" />
                        </div>
                        <h3 className="text-xl font-bold text-white">The PromptMaker Way</h3>
                    </div>
                    <ul className="space-y-4">
                        {[
                            "Structured frameworks (CO-STAR, RTF)",
                            "Perfect 1st shot results",
                            "Optimized token usage",
                            "Predictable, high-quality outputs",
                            "Context-anchored accuracy",
                            "Clean formats (JSON, Markdown, Code)",
                            "Reusable templates & variables"
                        ].map((item, i) => (
                            <li key={i} className="flex items-start gap-3 text-slate-300">
                                <Check className="h-5 w-5 text-indigo-400 mt-0.5 shrink-0" />
                                <span>{item}</span>
                            </li>
                        ))}
                    </ul>
                </motion.div>
            </div>
        </div>
    </div>
);

const FeatureCard = ({ icon: Icon, title, description }: any) => (
    <motion.div
        whileHover={{ y: -5 }}
        className="group relative rounded-2xl border border-white/5 bg-white/5 p-8 transition-colors hover:bg-white/10"
    >
        <div className="absolute inset-0 -z-10 bg-gradient-to-b from-indigo-500/10 to-transparent opacity-0 transition-opacity group-hover:opacity-100 rounded-2xl" />
        <div className="mb-4 inline-block rounded-lg bg-indigo-500/10 p-3 text-indigo-400 ring-1 ring-indigo-500/20">
            <Icon className="h-6 w-6" />
        </div>
        <h3 className="mb-2 text-lg font-semibold text-white">{title}</h3>
        <p className="text-slate-400 leading-relaxed">{description}</p>
    </motion.div>
);

const Home = () => {
    const navigate = useNavigate();
    const { currentUser } = useAuth();

    // Headline Animation State
    const [headlineText, setHeadlineText] = useState('');
    const [isHeadlineDeleting, setIsHeadlineDeleting] = useState(false);
    const [headlineLoopNum, setHeadlineLoopNum] = useState(0);
    const [headlineTypingSpeed, setHeadlineTypingSpeed] = useState(150);
    const headlineWords = ["Prompt", "Script", "Image", "Video", "Analysis", "Code"];

    useEffect(() => {
        const i = headlineLoopNum % headlineWords.length;
        const fullWord = headlineWords[i];

        const handleHeadlineTyping = () => {
            setHeadlineText(isHeadlineDeleting
                ? fullWord.substring(0, headlineText.length - 1)
                : fullWord.substring(0, headlineText.length + 1)
            );

            setHeadlineTypingSpeed(isHeadlineDeleting ? 50 : 150);

            if (!isHeadlineDeleting && headlineText === fullWord) {
                setTimeout(() => setIsHeadlineDeleting(true), 2000); // Wait 2s
            } else if (isHeadlineDeleting && headlineText === '') {
                setIsHeadlineDeleting(false);
                setHeadlineLoopNum(headlineLoopNum + 1);
            }
        };

        const timer = setTimeout(handleHeadlineTyping, headlineTypingSpeed);
        return () => clearTimeout(timer);
    }, [headlineText, isHeadlineDeleting, headlineLoopNum]);

    const handleAction = () => {
        if (currentUser) {
            navigate('/app');
        } else {
            navigate('/login');
        }
    };

    return (
        <div className="space-y-32 pb-24">
            {/* Hero Section */}
            <section className="relative pt-32 lg:pt-48">
                <div className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80">
                    <div className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-20 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]" />
                </div>

                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="grid lg:grid-cols-2 gap-12 items-center">
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.5 }}
                        >
                            <h1 className="text-4xl font-bold tracking-tight text-white sm:text-7xl mb-6 leading-[1.1]">
                                Craft the perfect <br />
                                <span className="bg-gradient-to-r from-indigo-400 to-cyan-400 bg-clip-text text-transparent">
                                    {headlineText}
                                </span>
                                <span className="animate-pulse text-indigo-400">|</span>
                            </h1>
                            <p className="text-lg leading-8 text-slate-400 mb-8 max-w-xl">
                                Stop guessing. Start generating. Our AI-powered prompt engineer turns your vague ideas into precise, high-performance instructions for any LLM.
                            </p>
                            <div className="flex items-center gap-4">
                                <button
                                    onClick={handleAction}
                                    className="rounded-full bg-indigo-600 px-8 py-3 text-sm font-semibold text-white transition-all hover:bg-indigo-500 hover:shadow-lg hover:shadow-indigo-500/25 active:scale-95 flex items-center gap-2"
                                >
                                    {currentUser ? 'Go to App' : 'Start Generating'} <ChevronRight className="h-4 w-4" />
                                </button>
                                <button className="rounded-full px-8 py-3 text-sm font-semibold text-slate-300 transition-all hover:text-white hover:bg-slate-800">
                                    View Examples
                                </button>
                            </div>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.5, delay: 0.3 }}
                            className="flex justify-center lg:justify-end relative"
                        >
                            {/* Spotlight Effect */}
                            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-indigo-500/20 blur-[120px] -z-10 rounded-full" />
                            <TerminalHero />
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Features Grid */}
            <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="mb-16 text-center">
                    <h2 className="text-3xl font-bold text-white sm:text-4xl">Everything you need</h2>
                    <p className="mt-4 text-lg text-slate-400">Master the art of prompt engineering with our advanced toolkit.</p>
                </div>
                <div className="grid md:grid-cols-3 gap-8">
                    <FeatureCard
                        icon={Code2}
                        title="Optimized Structure"
                        description="Our algorithms restructure your input using proven prompt engineering frameworks (CO-STAR, RTF) for maximum clarity."
                    />
                    <FeatureCard
                        icon={Zap}
                        title="Instant Refinement"
                        description="Turn a one-line request into a comprehensive, multi-step prompt in milliseconds. Compatible with GPT-4, Claude, and Gemini."
                    />
                    <FeatureCard
                        icon={MessageSquare}
                        title="Context Awareness"
                        description="Add variables, constraints, and tonal instructions easily. We handle the formatting so you can focus on the idea."
                    />
                </div>
            </section>

            {/* Problem Section */}
            <ProblemSolution />

            {/* FAQ (Home) */}
            <div className="border-t border-white/5">
                <FAQ />
            </div>
        </div>
    );
};

const Features = () => (
    <div className="pt-32 pb-24 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-16"
        >
            <h2 className="text-3xl font-bold text-white sm:text-4xl">Advanced Features</h2>
            <p className="mt-4 text-lg text-slate-400">Deep dive into what makes Prompt Maker special</p>
        </motion.div>

        <div className="grid gap-12">
            {[1, 2, 3].map((_, i) => (
                <motion.div
                    key={i}
                    initial={{ opacity: 0, x: i % 2 === 0 ? -20 : 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.1 }}
                    className={cn(
                        "flex flex-col gap-8 md:items-center",
                        i % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                    )}
                >
                    <div className="flex-1 space-y-4">
                        <div className="inline-flex rounded-lg bg-indigo-500/10 p-3 text-indigo-400">
                            <Sparkles className="h-6 w-6" />
                        </div>
                        <h3 className="text-2xl font-bold text-white">Smart Context Injection</h3>
                        <p className="text-slate-400 text-lg leading-relaxed">
                            Typically, LLMs struggle with ambiguity. Our system automatically identifies missing context in your request and prompts you for clarification, ensuring the final output is exactly what you envisioned.
                        </p>
                        <ul className="space-y-2 text-slate-300">
                            {['Auto-detected variables', 'Tone analysis', 'Format standardization'].map((item) => (
                                <li key={item} className="flex items-center gap-2">
                                    <Check className="h-4 w-4 text-indigo-400" /> {item}
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div className="flex-1 rounded-2xl border border-white/5 bg-slate-900/50 p-8 h-64 flex items-center justify-center relative overflow-hidden">
                        <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/5 to-transparent" />
                        <span className="text-slate-600 font-medium tracking-wide">Visualization Placeholder</span>
                    </div>
                </motion.div>
            ))}
        </div>
    </div>
);

const FAQ = () => {
    const [openIndex, setOpenIndex] = useState<number | null>(null);

    const faqs = [
        { q: "Why can't I just talk to ChatGPT normally?", a: "You can, but lack of structure often leads to average results. PromptMaker applies proven engineering frameworks to ensure your intent is perfectly understood by the AI." },
        { q: "Does this work for Midjourney/Image gen?", a: "Yes! Our system handles parameter weighting and stylistic descriptors automatically, making it perfect for image generation models." },
        { q: "Is my data secure?", a: "Absolutely. We do not store your API keys, and your prompts are only saved if you explicitly choose to save them to your library." },
        { q: "Can I share prompts with my team?", a: "Yes, the Pro plan includes team workspaces where you can share, version, and collaborate on your prompt library." },
    ];

    return (
        <div className="pt-32 pb-24 mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-center mb-16"
            >
                <h2 className="text-3xl font-bold text-white sm:text-4xl">Frequently Asked Questions</h2>
            </motion.div>
            <div className="space-y-4">
                {faqs.map((faq, i) => (
                    <motion.div
                        key={i}
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: i * 0.1 }}
                        className="rounded-xl border border-white/5 bg-white/5 overflow-hidden"
                    >
                        <button
                            onClick={() => setOpenIndex(openIndex === i ? null : i)}
                            className="flex items-center justify-between w-full p-6 text-left"
                        >
                            <span className="text-lg font-semibold text-white">{faq.q}</span>
                            <ChevronRight className={cn("h-5 w-5 text-slate-400 transition-transform", openIndex === i && "rotate-90")} />
                        </button>
                        <AnimatePresence>
                            {openIndex === i && (
                                <motion.div
                                    initial={{ height: 0, opacity: 0 }}
                                    animate={{ height: "auto", opacity: 1 }}
                                    exit={{ height: 0, opacity: 0 }}
                                    className="px-6 pb-6 text-slate-400"
                                >
                                    {faq.a}
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </motion.div>
                ))}
            </div>
        </div>
    );
};

const Contact = () => (
    <div className="pt-32 pb-24 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 gap-16">
            <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="space-y-8"
            >
                <div>
                    <h2 className="text-3xl font-bold text-white sm:text-4xl">Get in touch</h2>
                    <p className="mt-4 text-lg text-slate-400">Have questions? We'd love to hear from you. Send us a message and we'll respond as soon as possible.</p>
                </div>

                <div className="space-y-6">
                    <div className="flex items-center gap-4 text-slate-300">
                        <div className="rounded-lg bg-white/5 border border-white/5 p-3">
                            <Mail className="h-6 w-6 text-indigo-400" />
                        </div>
                        <span>support@promptmaker.ai</span>
                    </div>
                    <div className="flex items-center gap-4 text-slate-300">
                        <div className="rounded-lg bg-white/5 border border-white/5 p-3">
                            <Github className="h-6 w-6 text-indigo-400" />
                        </div>
                        <span>github.com/promptmaker</span>
                    </div>
                    <div className="flex items-center gap-4 text-slate-300">
                        <div className="rounded-lg bg-white/5 border border-white/5 p-3">
                            <Twitter className="h-6 w-6 text-indigo-400" />
                        </div>
                        <span>@promptmaker_ai</span>
                    </div>
                </div>
            </motion.div>

            <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="rounded-2xl border border-white/5 bg-white/5 p-8 backdrop-blur"
            >
                <form className="space-y-6">
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label htmlFor="first-name" className="block text-sm font-medium text-slate-300">First name</label>
                            <input type="text" id="first-name" className="mt-1 block w-full rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 text-white placeholder-slate-500 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500" placeholder="Jane" />
                        </div>
                        <div>
                            <label htmlFor="last-name" className="block text-sm font-medium text-slate-300">Last name</label>
                            <input type="text" id="last-name" className="mt-1 block w-full rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 text-white placeholder-slate-500 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500" placeholder="Doe" />
                        </div>
                    </div>
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-slate-300">Email</label>
                        <input type="email" id="email" className="mt-1 block w-full rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 text-white placeholder-slate-500 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500" placeholder="jane@example.com" />
                    </div>
                    <div>
                        <label htmlFor="message" className="block text-sm font-medium text-slate-300">Message</label>
                        <textarea id="message" rows={4} className="mt-1 block w-full rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 text-white placeholder-slate-500 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500" placeholder="How can we help?" />
                    </div>
                    <button type="submit" className="w-full rounded-lg bg-indigo-600 px-4 py-3 text-sm font-semibold text-white transition-all hover:bg-indigo-500 hover:shadow-lg hover:shadow-indigo-500/20 active:scale-95">
                        Send Message
                    </button>
                </form>
            </motion.div>
        </div>
    </div>
);

const MegaFooter = () => {
    const [typedText, setTypedText] = useState('');
    const [isDeleting, setIsDeleting] = useState(false);
    const [loopNum, setLoopNum] = useState(0);
    const [typingSpeed, setTypingSpeed] = useState(150);

    const phrases = ["Level up.", "Scale up.", "Ship faster.", "Go viral."];
    const footerRef = useRef(null);
    const isInView = useInView(footerRef, { once: false, amount: 0.1 });

    useEffect(() => {
        if (!isInView) return;

        const i = loopNum % phrases.length;
        const fullText = phrases[i];

        const handleTyping = () => {
            setTypedText(isDeleting
                ? fullText.substring(0, typedText.length - 1)
                : fullText.substring(0, typedText.length + 1)
            );

            setTypingSpeed(isDeleting ? 50 : 150);

            if (!isDeleting && typedText === fullText) {
                setTimeout(() => setIsDeleting(true), 2000);
            } else if (isDeleting && typedText === '') {
                setIsDeleting(false);
                setLoopNum(loopNum + 1);
            }
        };

        const timer = setTimeout(handleTyping, typingSpeed);
        return () => clearTimeout(timer);
    }, [typedText, isDeleting, loopNum, isInView, typingSpeed]);

    return (
        <footer ref={footerRef} className="border-t border-white/5 bg-slate-950 pt-24 pb-12">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                {/* Top Row: Newsletter */}
                <div className="flex flex-col items-center text-center mb-24">
                    <h3 className="text-2xl font-bold text-white mb-6">Join the elite.</h3>
                    <div className="flex w-full max-w-md gap-2">
                        <input
                            type="email"
                            placeholder="Enter your email"
                            className="flex-1 rounded-full bg-slate-900 border border-white/10 px-6 py-4 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        />
                        <button className="rounded-full bg-gradient-to-r from-indigo-600 to-violet-600 px-8 py-4 font-bold text-white transition-transform hover:scale-105 active:scale-95 flex items-center gap-2">
                            Subscribe <ArrowRight className="h-4 w-4" />
                        </button>
                    </div>
                </div>

                {/* Middle Row: Big Typography */}
                <div className="mb-24 text-center">
                    <h1 className="text-6xl md:text-9xl font-bold tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-white/20 to-white/5 select-none">
                        {typedText}
                        <span className="animate-pulse text-indigo-500">_</span>
                    </h1>
                </div>

                {/* Bottom Row */}
                <div className="grid md:grid-cols-4 gap-12 border-t border-white/5 pt-12">
                    <div className="col-span-1 space-y-6">
                        <div className="flex items-center gap-2">
                            <Sparkles className="h-6 w-6 text-indigo-400" />
                            <span className="text-xl font-bold text-white">Prompt Maker</span>
                        </div>
                        <div className="flex gap-4">
                            <div className="p-2 rounded-full bg-white/5 hover:bg-white/10 cursor-pointer transition-colors">
                                <Twitter className="h-5 w-5 text-slate-400" />
                            </div>
                            <div className="p-2 rounded-full bg-white/5 hover:bg-white/10 cursor-pointer transition-colors">
                                <Github className="h-5 w-5 text-slate-400" />
                            </div>
                            <div className="p-2 rounded-full bg-white/5 hover:bg-white/10 cursor-pointer transition-colors">
                                <Mail className="h-5 w-5 text-slate-400" />
                            </div>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-slate-500 cursor-pointer hover:text-white transition-colors">
                            <Globe className="h-4 w-4" />
                            <span>English (US)</span>
                        </div>
                    </div>

                    {/* Product Column */}
                    <div>
                        <h4 className="font-semibold text-white mb-6">Product</h4>
                        <ul className="space-y-4 text-sm text-slate-400">
                            <li><a href="#features" className="hover:text-indigo-400 transition-colors">Features</a></li>
                            <li><a href="#pricing" className="hover:text-indigo-400 transition-colors">Pricing</a></li>
                            <li><a href="#" className="hover:text-indigo-400 transition-colors">Integrations</a></li>
                            <li><a href="#" className="hover:text-indigo-400 transition-colors">Changelog</a></li>
                        </ul>
                    </div>

                    {/* Company Column */}
                    <div>
                        <h4 className="font-semibold text-white mb-6">Company</h4>
                        <ul className="space-y-4 text-sm text-slate-400">
                            <li><a href="#" className="hover:text-indigo-400 transition-colors">About Us</a></li>
                            <li><a href="#" className="hover:text-indigo-400 transition-colors">Careers</a></li>
                            <li><a href="#" className="hover:text-indigo-400 transition-colors">Privacy Policy</a></li>
                            <li><a href="#" className="hover:text-indigo-400 transition-colors">Terms of Service</a></li>
                        </ul>
                    </div>

                    {/* Resources Column */}
                    <div>
                        <h4 className="font-semibold text-white mb-6">Resources</h4>
                        <ul className="space-y-4 text-sm text-slate-400">
                            <li><a href="#" className="hover:text-indigo-400 transition-colors">Documentation</a></li>
                            <li><a href="#" className="hover:text-indigo-400 transition-colors">Prompt Library</a></li>
                            <li><a href="#" className="hover:text-indigo-400 transition-colors">Blog</a></li>
                            <li><a href="#" className="hover:text-indigo-400 transition-colors">Community</a></li>
                        </ul>
                    </div>
                </div>

                <div className="mt-12 text-center text-xs text-slate-600">
                    © 2024 Prompt Maker AI. All rights reserved.
                </div>
            </div>
        </footer>
    );
};

const ModernApp = ({ initialTab = 'home' }: { initialTab?: string }) => {
    const [activeTab, setActiveTab] = useState(initialTab);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    return (
        <div className="min-h-screen bg-slate-950 text-slate-200 selection:bg-indigo-500/30">
            {activeTab !== 'login' && activeTab !== 'signup' && activeTab !== 'forgot-password' && (
                <Navbar
                    activeTab={activeTab}
                    setActiveTab={setActiveTab}
                    isMobileMenuOpen={isMobileMenuOpen}
                    setIsMobileMenuOpen={setIsMobileMenuOpen}
                />
            )}

            <main className="relative z-10">
                <AnimatePresence mode="wait">
                    {activeTab === 'home' && (
                        <motion.div
                            key="home"
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            transition={{ duration: 0.3 }}
                        >
                            <Home />
                        </motion.div>
                    )}
                    {activeTab === 'features' && (
                        <motion.div
                            key="features"
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            transition={{ duration: 0.3 }}
                        >
                            <Features />
                        </motion.div>
                    )}
                    {activeTab === 'faq' && (
                        <motion.div
                            key="faq"
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            transition={{ duration: 0.3 }}
                        >
                            <FAQ />
                        </motion.div>
                    )}
                    {activeTab === 'contact' && (
                        <motion.div
                            key="contact"
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            transition={{ duration: 0.3 }}
                        >
                            <Contact />
                        </motion.div>
                    )}
                    {activeTab === 'login' && (
                        <motion.div
                            key="login"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.3 }}
                        >
                            <Login
                                isInternal
                                onBack={() => setActiveTab('home')}
                                onSwitchToSignup={() => setActiveTab('signup')}
                                onForgotPassword={() => setActiveTab('forgot-password')}
                            />
                        </motion.div>
                    )}
                    {activeTab === 'signup' && (
                        <motion.div
                            key="signup"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.3 }}
                        >
                            <SignUp
                                isInternal
                                onBack={() => setActiveTab('home')}
                                onSwitchToLogin={() => setActiveTab('login')}
                            />
                        </motion.div>
                    )}
                    {activeTab === 'forgot-password' && (
                        <motion.div
                            key="forgot-password"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.3 }}
                        >
                            <ForgotPassword
                                onBack={() => setActiveTab('login')}
                            />
                        </motion.div>
                    )}
                </AnimatePresence>
            </main>

            {(activeTab !== 'login' && activeTab !== 'signup' && activeTab !== 'forgot-password') && <MegaFooter />}
        </div>
    );
}

export default ModernApp;
