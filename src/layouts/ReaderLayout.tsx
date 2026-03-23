import React, { useState, useEffect } from 'react';
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { useTheme } from '../contexts/ThemeContext';
import { useAuth } from '../contexts/AuthContext';
import { supabase } from '../lib/supabase';
import { ReaderSettings } from '../components/ReaderSettings';

export const ReaderLayout = () => {
    const { theme, toggleTheme } = useTheme();
    const { user, session } = useAuth();
    const [settingsOpen, setSettingsOpen] = useState(false);
    const [userMenuOpen, setUserMenuOpen] = useState(false);
    const [progress, setProgress] = useState(0);
    const [searchOpen, setSearchOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const location = useLocation();
    const navigate = useNavigate();

    const handleLogout = async () => {
        await supabase.auth.signOut();
        navigate('/');
    };

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        if (searchQuery.trim()) {
            // Use native browser find
            (window as any).find(searchQuery, false, false, true);
        }
    };

    useEffect(() => {
        const handleScroll = () => {
            const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
            const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
            const scrolled = (winScroll / height) * 100;
            setProgress(scrolled);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const closeMenu = (e: MouseEvent) => {
        if (!(e.target as Element).closest('.user-menu-container')) {
            setUserMenuOpen(false);
        }
    };

    useEffect(() => {
        document.addEventListener('click', closeMenu);
        return () => document.removeEventListener('click', closeMenu);
    }, []);

    useEffect(() => {
        window.scrollTo(0, 0);
        setSearchOpen(false);
        setSearchQuery('');
    }, [location.pathname]);

    return (
        <div className="min-h-screen bg-background-light dark:bg-dark-bg text-slate-800 dark:text-[#f5e6c8] font-sans transition-colors duration-500">
            <nav className="glass-nav fixed top-0 w-full z-50 border-b border-slate-200 dark:border-white/10">
                <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
                    {(() => {
                        const path = location.pathname;
                        if (path.startsWith('/post/')) {
                            return (
                                <Link to="/artigos" className="flex items-center gap-2 group transition-all">
                                    <span className="material-symbols-outlined text-slate-400 group-hover:text-primary transition-colors">arrow_back</span>
                                    <span className="text-[10px] font-bold tracking-[0.2em] uppercase text-slate-400 group-hover:text-slate-900 dark:group-hover:text-white transition-colors">Artigos</span>
                                </Link>
                            );
                        }
                        const sectionMatch = path.match(/^\/capitulo\/([^/]+)\/secao\//);
                        if (sectionMatch) {
                            return (
                                <Link to={`/capitulo/${sectionMatch[1]}`} className="flex items-center gap-2 group transition-all">
                                    <span className="material-symbols-outlined text-slate-400 group-hover:text-primary transition-colors">arrow_back</span>
                                    <span className="text-[10px] font-bold tracking-[0.2em] uppercase text-slate-400 group-hover:text-slate-900 dark:group-hover:text-white transition-colors">Capítulo</span>
                                </Link>
                            );
                        }
                        return (
                            <Link to="/capitulos" className="flex items-center gap-2 group transition-all">
                                <span className="material-symbols-outlined text-slate-400 group-hover:text-primary transition-colors">arrow_back</span>
                                <span className="text-[10px] font-bold tracking-[0.2em] uppercase text-slate-400 group-hover:text-slate-900 dark:group-hover:text-white transition-colors">Capítulos</span>
                            </Link>
                        );
                    })()}

                    {/* Chapter info will be dynamic in the page itself, we can leave the center empty here or just static for now */}
                    <div className="hidden md:flex flex-col items-center">
                        <span className="text-[9px] uppercase tracking-[0.4em] text-primary font-bold mb-0.5">O Evangelho Eterno</span>
                    </div>

                    <div className="flex items-center gap-2">
                        {/* Search */}
                        {searchOpen && (
                            <form onSubmit={handleSearch} className="flex items-center gap-1 animate-in slide-in-from-right-4 fade-in duration-200">
                                <input
                                    type="text"
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    placeholder="Buscar no texto..."
                                    className="w-32 sm:w-48 px-3 py-1.5 text-xs bg-slate-100 dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700 outline-none focus:ring-2 focus:ring-primary/40 transition-all"
                                    autoFocus
                                />
                                <button type="button" onClick={() => { setSearchOpen(false); setSearchQuery(''); }} className="p-1 hover:bg-slate-100 dark:hover:bg-white/5 rounded-full transition-colors">
                                    <span className="material-symbols-outlined text-sm text-slate-400">close</span>
                                </button>
                            </form>
                        )}
                        <button onClick={() => setSearchOpen(!searchOpen)} className="p-2 hover:bg-slate-100 dark:hover:bg-white/5 rounded-full transition-colors" title="Buscar no capítulo">
                            <span className="material-symbols-outlined text-xl">search</span>
                        </button>
                        <button onClick={() => setSettingsOpen(!settingsOpen)} className="p-2 hover:bg-slate-100 dark:hover:bg-white/5 rounded-full transition-colors relative" title="Configurações de Leitura">
                            <span className="material-symbols-outlined text-xl">settings_brightness</span>
                        </button>
                        <button onClick={toggleTheme} className="p-2 hover:bg-slate-100 dark:hover:bg-white/5 rounded-full transition-colors hidden sm:block">
                            <span className="material-symbols-outlined text-xl">{theme === 'dark' ? 'light_mode' : 'dark_mode'}</span>
                        </button>

                        {/* User Menu */}
                        <div className="relative user-menu-container ml-2">
                            <button
                                onClick={() => setUserMenuOpen(!userMenuOpen)}
                                className="size-8 rounded-full border border-slate-200 dark:border-slate-700 bg-center bg-cover hover:ring-2 hover:ring-primary transition-all overflow-hidden relative shadow-sm"
                                title="Menu do Usuário"
                            >
                                <img
                                    src={user?.user_metadata?.avatar_url || `https://ui-avatars.com/api/?name=${user?.user_metadata?.full_name || 'User'}&background=random`}
                                    alt="Avatar"
                                    className="w-full h-full object-cover"
                                />
                            </button>
                            {userMenuOpen && (
                                <div className="absolute right-0 mt-3 w-48 bg-white dark:bg-card-dark border border-slate-200 dark:border-slate-800 rounded-2xl shadow-2xl py-3 z-50 animate-slideIn">
                                    {!session ? (
                                        <>
                                            <Link to="/login" className="flex items-center gap-3 px-5 py-2.5 text-sm hover:bg-slate-50 dark:hover:bg-white/5 transition-colors">
                                                <span className="material-symbols-outlined text-xl opacity-60">login</span> Login
                                            </Link>
                                            <Link to="/login?action=register" className="flex items-center gap-3 px-5 py-2.5 text-sm hover:bg-slate-50 dark:hover:bg-white/5 transition-colors">
                                                <span className="material-symbols-outlined text-xl opacity-60">person_add</span> Cadastro
                                            </Link>
                                        </>
                                    ) : (
                                        <>
                                            <div className="px-5 py-2 mb-2 border-b border-slate-100 dark:border-white/5">
                                                <p className="text-xs font-bold text-slate-900 dark:text-slate-100 truncate">{user?.user_metadata?.full_name || 'Usuário'}</p>
                                                <p className="text-[10px] text-slate-500 truncate">{user?.email}</p>
                                            </div>
                                            <Link to="/configuracoes" className="flex items-center gap-3 px-5 py-2.5 text-sm hover:bg-slate-50 dark:hover:bg-white/5 transition-colors">
                                                <span className="material-symbols-outlined text-xl opacity-60">settings</span> Configurações
                                            </Link>
                                            <button onClick={handleLogout} className="w-full flex items-center gap-3 px-5 py-2.5 text-sm text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 transition-colors text-left">
                                                <span className="material-symbols-outlined text-xl opacity-80">logout</span> Sair
                                            </button>
                                        </>
                                    )}
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                <ReaderSettings isOpen={settingsOpen} onClose={() => setSettingsOpen(false)} />
                <div className="h-[3px] bg-primary transition-all duration-300 shadow-[0_0_10px_rgba(212,168,75,0.6)]" style={{ width: `${progress}%` }}></div>
            </nav>

            <Outlet />

            {/* Floating Amazon CTA */}
            <a
                href="https://www.amazon.com.br/dp/B0GM8HTQF4"
                target="_blank"
                rel="noopener noreferrer"
                className="fixed bottom-6 right-6 z-50 flex items-center gap-2 px-5 py-3 bg-primary text-white font-bold rounded-full shadow-[0_10px_25px_rgba(236,19,55,0.4)] hover:scale-105 transition-transform duration-300 md:bottom-8 md:right-8"
                title="Comprar Obra Completa na Amazon"
            >
                <span className="material-symbols-outlined text-xl">shopping_cart</span>
                <span className="hidden sm:inline text-sm uppercase tracking-widest">Obra Completa</span>
            </a>
        </div>
    );
};
