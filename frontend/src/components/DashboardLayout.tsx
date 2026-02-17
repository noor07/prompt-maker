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
    Settings,
    LogOut,
    User
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
}

const SidebarItem = ({ icon: Icon, label, active, onClick }: SidebarItemProps) => (
    <button
        onClick={onClick}
        className={cn(
            "w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all group",
            active
                ? "bg-indigo-500/10 text-indigo-400 ring-1 ring-indigo-500/20"
                : "text-slate-400 hover:text-slate-200 hover:bg-white/5"
        )}
    >
        <Icon className={cn(
            "h-5 w-5 transition-colors",
            active ? "text-indigo-400" : "text-slate-500 group-hover:text-slate-300"
        )} />
        {label}
    </button>
);

interface DashboardLayoutProps {
    children: React.ReactNode;
    activeNav: string;
    setActiveNav: (nav: string) => void;
    rightPanel?: React.ReactNode;
}

export const DashboardLayout: React.FC<DashboardLayoutProps> = ({
    children,
    activeNav,
    setActiveNav,
    rightPanel
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
        <div className="flex h-screen bg-slate-950 text-slate-200 font-sans overflow-hidden">
            {/* Sidebar (Left) */}
            <aside className="w-64 flex-shrink-0 border-r border-white/5 bg-slate-900/50 backdrop-blur-xl flex flex-col">
                <div className="p-6">
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
                </div>

                <nav className="flex-1 px-4 space-y-2 py-4">
                    <SidebarItem
                        icon={Plus}
                        label="New Prompt"
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
                    <SidebarItem
                        icon={Settings}
                        label="Settings"
                        active={activeNav === 'settings'}
                        onClick={() => setActiveNav('settings')}
                    />
                </nav>

                {/* User Profile (Bottom) */}
                <div className="p-4 border-t border-white/5 bg-slate-950/20">
                    <div className="flex items-center gap-3 p-2">
                        <div className="h-10 w-10 rounded-full bg-indigo-500/20 border border-indigo-500/20 flex items-center justify-center text-indigo-400">
                            {currentUser?.photoURL ? (
                                <img src={currentUser.photoURL} alt="Avatar" className="h-full w-full rounded-full" />
                            ) : (
                                <User className="h-5 w-5" />
                            )}
                        </div>
                        <div className="flex-1 min-w-0">
                            <p className="text-sm font-bold text-white truncate">
                                {currentUser?.displayName || currentUser?.email?.split('@')[0]}
                            </p>
                            <p className="text-xs text-slate-500 truncate">{currentUser?.email}</p>
                        </div>
                    </div>
                    <button
                        onClick={handleLogout}
                        className="mt-2 w-full flex items-center justify-center gap-2 px-4 py-2 rounded-lg text-xs font-bold text-slate-400 hover:text-white hover:bg-white/5 transition-all"
                    >
                        <LogOut className="h-4 w-4" />
                        Log Out
                    </button>
                </div>
            </aside>

            {/* Main Content (Center) */}
            <main className="flex-1 flex overflow-hidden">
                <div className="flex-1 overflow-y-auto bg-slate-950 scrollbar-hide">
                    {children}
                </div>

                {/* Output Panel (Right) */}
                {rightPanel && (
                    <aside className="w-96 flex-shrink-0 border-l border-white/5 bg-slate-900/30 backdrop-blur-xl flex flex-col">
                        {rightPanel}
                    </aside>
                )}
            </main>
        </div>
    );
};
