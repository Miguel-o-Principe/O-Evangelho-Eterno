import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useTheme } from '../contexts/ThemeContext';
import { supabase } from '../lib/supabase';

export const ResetPassword = () => {
    const { theme, toggleTheme } = useTheme();
    const [searchParams] = useSearchParams();
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const [errorMsg, setErrorMsg] = useState('');
    const [successMsg, setSuccessMsg] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        // Check if we have the reset token from the email link
        const hash = window.location.hash;
        if (!hash || !hash.includes('type=recovery')) {
            setErrorMsg('Link de reset inválido ou expirado. Solicite um novo link.');
        }
    }, []);

    const handleResetPassword = async (e: React.FormEvent) => {
        e.preventDefault();
        setErrorMsg('');
        setSuccessMsg('');

        if (password !== confirmPassword) {
            setErrorMsg('As senhas não correspondem.');
            return;
        }

        if (password.length < 6) {
            setErrorMsg('A senha deve ter no mínimo 6 caracteres.');
            return;
        }

        setLoading(true);

        const { error } = await supabase.auth.updateUser({
            password: password
        });

        if (error) {
            setErrorMsg('Erro ao redefinir senha: ' + error.message);
            setLoading(false);
        } else {
            setSuccessMsg('Senha redefinida com sucesso! Redirecionando para login...');
            setTimeout(() => {
                navigate('/');
            }, 2000);
        }
    };

    return (
        <div className="bg-background-light dark:bg-background-dark text-slate-900 dark:text-slate-100 font-display min-h-screen antialiased transition-colors duration-300 flex flex-col overflow-x-hidden">
            <nav className="w-full p-6 flex justify-between items-center z-20">
                <div className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-primary text-3xl">menu_book</span>
                    <span className="font-bold text-sm tracking-widest uppercase hidden sm:block">O Evangelho Eterno</span>
                </div>

                <button onClick={toggleTheme} className="p-2 rounded-full hover:bg-slate-200 dark:hover:bg-slate-800 transition-colors" title="Alternar tema">
                    <span className="material-symbols-outlined">{theme === 'dark' ? 'light_mode' : 'dark_mode'}</span>
                </button>
            </nav>

            <main className="flex-1 flex flex-col justify-center items-center py-10 px-6 sm:px-12">
                <div className="w-full max-w-md">
                    <div className="bg-white dark:bg-card-dark p-8 sm:p-10 rounded-2xl shadow-xl border border-slate-100 dark:border-slate-800 relative overflow-hidden">
                        <div className="absolute top-0 left-0 w-full h-1.5 bg-primary opacity-60"></div>

                        <h2 className="text-2xl font-bold mb-1 text-primary">Redefinir Senha</h2>
                        <p className="text-slate-500 dark:text-slate-400 text-sm mb-6 italic">Crie uma nova senha para sua conta</p>

                        <form onSubmit={handleResetPassword} className="space-y-6" autoComplete="off">
                            {errorMsg && <div className="p-3 mb-4 text-xs font-bold text-red-600 bg-red-100 rounded-lg">{errorMsg}</div>}
                            {successMsg && <div className="p-3 mb-4 text-xs font-bold text-green-600 bg-green-100 rounded-lg">{successMsg}</div>}

                            <div className="space-y-1.5">
                                <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400 ml-1">Nova Senha</label>
                                <div className="relative">
                                    <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-xl">lock</span>
                                    <input 
                                        type={showPassword ? "text" : "password"} 
                                        name="password" 
                                        autoComplete="new-password" 
                                        value={password} 
                                        onChange={e => setPassword(e.target.value)} 
                                        required 
                                        className="w-full bg-slate-50 dark:bg-slate-900/40 border border-slate-100 dark:border-slate-800 rounded-xl py-3.5 pl-11 pr-11 focus:ring-2 focus:ring-primary/40 transition-all outline-none text-sm" 
                                        placeholder="••••••••"
                                    />
                                    <button 
                                        type="button" 
                                        onClick={() => setShowPassword(!showPassword)} 
                                        className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-primary transition-colors flex items-center justify-center p-1" 
                                        title={showPassword ? "Ocultar senha" : "Ver senha"}
                                    >
                                        <span className="material-symbols-outlined text-[20px]">{showPassword ? 'visibility_off' : 'visibility'}</span>
                                    </button>
                                </div>
                            </div>

                            <div className="space-y-1.5">
                                <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400 ml-1">Confirmar Senha</label>
                                <div className="relative">
                                    <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-xl">lock_check</span>
                                    <input 
                                        type={showPassword ? "text" : "password"} 
                                        name="confirmPassword" 
                                        autoComplete="new-password" 
                                        value={confirmPassword} 
                                        onChange={e => setConfirmPassword(e.target.value)} 
                                        required 
                                        className="w-full bg-slate-50 dark:bg-slate-900/40 border border-slate-100 dark:border-slate-800 rounded-xl py-3.5 pl-11 pr-11 focus:ring-2 focus:ring-primary/40 transition-all outline-none text-sm" 
                                        placeholder="••••••••"
                                    />
                                    <button 
                                        type="button" 
                                        onClick={() => setShowPassword(!showPassword)} 
                                        className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-primary transition-colors flex items-center justify-center p-1" 
                                        title={showPassword ? "Ocultar senha" : "Ver senha"}
                                    >
                                        <span className="material-symbols-outlined text-[20px]">{showPassword ? 'visibility_off' : 'visibility'}</span>
                                    </button>
                                </div>
                            </div>

                            <div className="pt-4 flex flex-col gap-4">
                                <button 
                                    type="submit" 
                                    disabled={loading} 
                                    className="flex justify-center items-center w-full h-12 bg-primary text-white font-bold rounded-xl hover:brightness-110 shadow-lg shadow-primary/20 transition-all text-sm tracking-wide disabled:opacity-70"
                                >
                                    {loading ? <span className="material-symbols-outlined animate-spin text-xl">sync</span> : 'Redefinir Senha'}
                                </button>

                                <button 
                                    type="button" 
                                    onClick={() => navigate('/')} 
                                    className="text-xs text-slate-500 font-medium hover:text-primary transition-colors"
                                >
                                    <span className="material-symbols-outlined text-sm align-middle mr-1">arrow_back</span>
                                    Voltar para o Login
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </main>

            <footer className="p-10 text-center opacity-40 mt-auto">
                <p className="text-[10px] font-medium uppercase tracking-[0.4em]">O Evangelho Eterno e A Arquitetura da Graça • 2026</p>
            </footer>
        </div>
    );
};
