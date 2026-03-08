import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useTheme } from '../contexts/ThemeContext';
import { useAuth } from '../contexts/AuthContext';
import { supabase } from '../lib/supabase';

interface MainNavbarProps {
    onMenuToggle: () => void;
}

export const MainNavbar: React.FC<MainNavbarProps> = ({ onMenuToggle }) => {
    const { theme, toggleTheme } = useTheme();
    const { user, session } = useAuth();
    const [userMenuOpen, setUserMenuOpen] = useState(false);
    const location = useLocation();
    const navigate = useNavigate();

    const handleLogout = async () => {
        await supabase.auth.signOut();
        navigate('/');
    };

    useEffect(() => {
        const closeMenu = (e: MouseEvent) => {
            if (!(e.target as Element).closest('.user-menu-container')) {
                setUserMenuOpen(false);
            }
        };
        document.addEventListener('click', closeMenu);
        return () => document.removeEventListener('click', closeMenu);
    }, []);

    return (
        <header className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 px-8 sm:px-20 py-4 mb-8">
            <div className="flex items-center gap-4">
                <button onClick={onMenuToggle} className="md:hidden text-slate-600 dark:text-slate-400">
                    <span className="material-symbols-outlined">menu</span>
                </button>
                <Link to="/capitulos" className="flex items-center gap-3">
                    <div className="size-8 text-primary flex items-center justify-center">
                        <span className="material-symbols-outlined text-3xl">menu_book</span>
                    </div>
                    <h2 className="text-lg sm:text-xl font-bold leading-tight tracking-tight hidden xs:block">O Evangelho Eterno</h2>
                </Link>
            </div>

            <div className="flex flex-1 justify-end gap-4 items-center">
                <nav className="hidden md:flex items-center gap-8 mr-4">
                    <Link className={`text-sm font-medium hover:text-primary transition-colors ${location.pathname === '/sobre-a-obra' ? 'text-primary' : ''}`} to="/sobre-a-obra">Sobre a Obra</Link>
                    <Link className={`text-sm font-medium hover:text-primary transition-colors ${location.pathname === '/sobre-o-autor' ? 'text-primary' : ''}`} to="/sobre-o-autor">Sobre o Autor</Link>
                </nav>

                <button onClick={toggleTheme} className="p-2 rounded-full hover:bg-slate-200 dark:hover:bg-slate-800 transition-colors" title="Alternar tema">
                    <span className="material-symbols-outlined">{theme === 'dark' ? 'light_mode' : 'dark_mode'}</span>
                </button>

                <div className="flex gap-3">
                    <a href="https://www.amazon.com.br/dp/B0GM8HTQF4" target="_blank" rel="noopener noreferrer" className="flex min-w-[100px] cursor-pointer items-center justify-center rounded-lg h-10 px-4 bg-primary text-white hover:brightness-110 transition-all text-sm font-bold shadow-md">
                        Comprar
                    </a>

                    <div className="relative user-menu-container">
                        <button
                            onClick={() => setUserMenuOpen(!userMenuOpen)}
                            className="hidden sm:block size-10 rounded-full border border-slate-200 dark:border-slate-700 bg-center bg-cover hover:ring-2 hover:ring-primary transition-all overflow-hidden relative shadow-sm"
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
                                        <Link to="/" className="flex items-center gap-3 px-5 py-2.5 text-sm hover:bg-slate-50 dark:hover:bg-white/5 transition-colors">
                                            <span className="material-symbols-outlined text-xl opacity-60">login</span> Login
                                        </Link>
                                        <Link to="/?action=register" className="flex items-center gap-3 px-5 py-2.5 text-sm hover:bg-slate-50 dark:hover:bg-white/5 transition-colors">
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
        </header>
    );
};
