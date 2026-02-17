import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { signOut } from 'firebase/auth';
import { auth } from '../firebase';
import {
    Sparkles,
    Plus,
    History,
    LayoutTemplate,
    LogOut,
    User,
    MessageSquare
} from 'lucide-react';
import type { ClassValue } from 'clsx';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

interface SidebarItemProps {
    icon: React.ElementType;
    label: string;
    active?: boolean;
    onClick: () => void;
    className?: string;
}

const SidebarItem = ({ icon: Icon, label, active, onClick, className }: SidebarItemProps) => (
    <button
        onClick={onClick}
        className={cn(
            "w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all group",
            active
                ? "bg-indigo-500/10 text-indigo-400 ring-1 ring-indigo-500/20"
                : "text-slate-400 hover:text-slate-200 hover:bg-white/5",
            className
        )}
    >
        <Icon className={cn(
            "h-5 w-5 transition-colors",
            active ? "text-indigo-400" : "text-slate-500 group-hover:text-slate-300"
        )} />
        <span className="truncate">{label}</span>
    </button>
);

interface DashboardLayoutProps {
    children: React.ReactNode;
    activeNav: string;
    setActiveNav: (nav: string) => void;
    rightPanel?: React.ReactNode;
    recentPrompts?: Array<{ id: string; keywords: string }>;
    onNewChat?: () => void;
}

export const DashboardLayout: React.FC<DashboardLayoutProps> = ({
    children,
    activeNav,
    setActiveNav,
    rightPanel,
    recentPrompts = [],
    onNewChat
}) => {
    const { currentUser } = useAuth();
    const navigate = useNavigate();

    const handleLogout = async () => {
        try {
            await signOut(auth);
            navigate('/');
        } catch (error) {
            console.error("Failed to log out", error);
        }
    };

    return (
        <div className="h-screen w-full flex bg-slate-950 text-slate-200 font-sans overflow-hidden">
            {/* Sidebar (Left) */}
            <aside className="w-64 flex-shrink-0 border-r border-white/5 bg-slate-900/50 backdrop-blur-xl flex flex-col">
                {/* Top: Logo + New Chat */}
                <div className="p-6 space-y-6">
                    <div
                        className="flex items-center gap-2 cursor-pointer group"
                        onClick={() => navigate('/')}
                    >
                        <div className="rounded-lg bg-indigo-500/10 p-2 group-hover:bg-indigo-500/20 transition-colors">
                            <Sparkles className="h-5 w-5 text-indigo-400" />
                        </div>
                        <span className="text-xl font-bold bg-gradient-to-r from-white to-slate-400 bg-clip-text text-transparent">
                            Prompt Maker
                        </span>
                    </div>

                    <button
                        onClick={onNewChat}
                        className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-gradient-to-r from-indigo-600 to-violet-600 text-sm font-bold text-white shadow-lg shadow-indigo-500/20 hover:scale-[1.02] active:scale-[0.98] transition-all"
                    >
                        <Plus className="h-4 w-4" />
                        New Chat
                    </button>
                </div>

                {/* Middle: Navigation + Recent Prompts */}
                <div className="flex-1 flex flex-col min-h-0">
                    <nav className="px-4 space-y-1 py-4 border-b border-white/5">
                        <SidebarItem
                            icon={Plus}
                            label="Generator"
                            active={activeNav === 'new'}
                            onClick={() => setActiveNav('new')}
                        />
                        <SidebarItem
                            icon={History}
                            label="History"
                            active={activeNav === 'history'}
                            onClick={() => setActiveNav('history')}
                        />
                        <SidebarItem
                            icon={LayoutTemplate}
                            label="Templates"
                            active={activeNav === 'templates'}
                            onClick={() => setActiveNav('templates')}
                        />
                    </nav>

                    <div className="flex-1 overflow-y-auto px-4 py-6 scrollbar-hide">
                        <label className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] px-4 mb-4 block">
                            Recent Prompts
                        </label>
                        <div className="space-y-1">
                            {recentPrompts.length > 0 ? (
                                recentPrompts.map((prompt) => (
                                    <SidebarItem
                                        key={prompt.id}
                                        icon={MessageSquare}
                                        label={prompt.keywords || "Untitled Prompt"}
                                        onClick={() => {/* Navigate to prompt or load it */ }}
                                        className="py-2 text-xs"
                                    />
                                ))
                            ) : (
                                <p className="px-4 text-xs text-slate-600 italic">No recent prompts</p>
                            )}
                        </div>
                    </div>
                </div>

                {/* Bottom: User Profile */}
                <div className="p-4 border-t border-white/5 bg-slate-950/20">
                    <div className="flex items-center gap-3 p-2">
                        <div className="h-9 w-9 rounded-full bg-slate-800 border border-white/10 flex items-center justify-center overflow-hidden">
                            {currentUser?.photoURL ? (
                                <img src={currentUser.photoURL} alt="Avatar" className="h-full w-full object-cover" />
                            ) : (
                                <User className="h-5 w-5 text-slate-500" />
                            )}
                        </div>
                        <div className="flex-1 min-w-0">
                            <p className="text-sm font-bold text-white truncate">
                                {currentUser?.displayName || currentUser?.email?.split('@')[0]}
                            </p>
                            <p className="text-[10px] text-slate-500 truncate">{currentUser?.email}</p>
                        </div>
                    </div>
                    <button
                        onClick={handleLogout}
                        className="mt-2 w-full flex items-center justify-center gap-2 px-4 py-2 rounded-lg text-xs font-bold text-slate-400 hover:text-white hover:bg-white/5 transition-all"
                    >
                        <LogOut className="h-3.5 w-3.5" />
                        Log Out
                    </button>
                </div>
            </aside>

            {/* Main Content (Center) */}
            <main className="flex-1 flex flex-col relative min-w-0">
                <div className="flex-1 overflow-y-auto p-8 scrollbar-hide bg-slate-950/50">
                    <div className="max-w-4xl mx-auto w-full">
                        {children}
                    </div>
                </div>
            </main>

            {/* Preview Panel (Right) */}
            <aside className="w-96 flex-shrink-0 border-l border-white/5 bg-slate-900/50 backdrop-blur-xl flex flex-col hidden lg:flex">
                {rightPanel}
            </aside>
        </div>
    );
};
