import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useTheme } from '../contexts/ThemeContext';
import { supabase } from '../lib/supabase';

export const Login = () => {
    const { theme, toggleTheme } = useTheme();
    const [isRegistering, setIsRegistering] = useState(false);
    const [loading, setLoading] = useState(false);

    // Form States
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [fullName, setFullName] = useState('');
    const [errorMsg, setErrorMsg] = useState('');
    const [successMsg, setSuccessMsg] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [rememberMe, setRememberMe] = useState(false);

    const navigate = useNavigate();
    const location = useLocation();

    const toggleRegister = (registering: boolean) => {
        setIsRegistering(registering);
        setEmail('');
        setPassword('');
        setFullName('');
        setErrorMsg('');
        setSuccessMsg('');
    };

    useEffect(() => {
        const queryParams = new URLSearchParams(location.search);
        if (queryParams.get('action') === 'register') {
            setIsRegistering(true);
        }

        const savedEmail = localStorage.getItem('OEE_savedEmail');
        if (savedEmail) {
            setEmail(savedEmail);
            setRememberMe(true);
        }
    }, [location]);

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setErrorMsg('');

        const { error } = await supabase.auth.signInWithPassword({
            email,
            password
        });

        if (error) {
            setErrorMsg('Credenciais inválidas. Verifique seu e-mail e senha.');
            setLoading(false);
        } else {
            if (rememberMe) {
                localStorage.setItem('OEE_savedEmail', email);
            } else {
                localStorage.removeItem('OEE_savedEmail');
            }
            navigate('/capitulos');
        }
    };

    const handleRegister = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setErrorMsg('');
        setSuccessMsg('');

        const { error } = await supabase.auth.signUp({
            email,
            password,
            options: {
                data: {
                    full_name: fullName,
                }
            }
        });

        if (error) {
            setErrorMsg(error.message);
            setLoading(false);
        } else {
            setSuccessMsg('Cadastro realizado! Verifique seu e-mail para confirmar a conta, ou faça login se a confirmação estiver desativada no painel.');
            setIsRegistering(false);
            setLoading(false);
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
                <div className="w-full max-w-[1440px] flex flex-col lg:flex-row items-center justify-center gap-12 xl:gap-28">

                    <div className="w-full lg:w-[35%] flex flex-col items-center lg:items-end text-center lg:text-right space-y-6">
                        <h1 className="text-3xl sm:text-4xl xl:text-6xl font-bold leading-tight italic">
                            O Evangelho Eterno
                            <span className="text-xl sm:text-2xl xl:text-3xl font-light block mt-2 opacity-70">e a Arquitetura da Graça</span>
                        </h1>
                        <div className="h-1 w-24 bg-primary rounded-full lg:ml-auto"></div>
                        <p className="text-slate-600 dark:text-slate-400 font-light text-base xl:text-xl leading-relaxed max-w-sm lg:max-w-none">
                            Você está exausto do teatro religioso? Este não é mais um manual moral, é a implosão de todo o esforço de agradar a um Deus que já está saciado na Cruz. Mergulhe nas profundezas da Arquitetura da Graça. Revisite o Jardim do Éden e ganhe um novo olhar sobre toda a Realidade. Uma união ousada e inovadora de Teologia, Filosofia, Cosmologia e Psicanálise.
                        </p>
                    </div>

                    <div className="w-full lg:w-auto flex justify-center py-8" style={{ perspective: '1200px' }}>
                        <div className="float-animation">
                            <div className="book-wrapper relative w-[260px] sm:w-[320px] xl:w-[380px] shrink-0 rounded-2xl overflow-hidden bg-slate-100 dark:bg-card-dark border border-white/10 flex">
                                <div className="relative w-full opacity-100 flex flex-col">
                                    <img src="/images/bg-login.png" alt="O Evangelho Eterno Imagem" className="w-full h-auto object-contain object-center block" />
                                    <div className="absolute inset-0 bg-gradient-to-t from-dark-bg/60 via-dark-bg/10 to-transparent"></div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="w-full lg:w-[35%] max-w-md">
                        <div className="bg-white dark:bg-card-dark p-8 sm:p-10 rounded-2xl shadow-xl border border-slate-100 dark:border-slate-800 relative overflow-hidden">
                            <div className="absolute top-0 left-0 w-full h-1.5 bg-primary opacity-60"></div>

                            {!isRegistering ? (
                                <div className="transition-opacity duration-300">
                                    <h2 className="text-2xl font-bold mb-1 text-primary">Acesso da Comunidade</h2>
                                    <p className="text-slate-500 dark:text-slate-400 text-[10px] mb-8 italic uppercase tracking-[0.2em]">Faça login para interagir e comentar</p>

                                    <form onSubmit={handleLogin} className="space-y-6" autoComplete="off">
                                        {errorMsg && <div className="p-3 mb-4 text-xs font-bold text-red-600 bg-red-100 rounded-lg">{errorMsg}</div>}
                                        {successMsg && <div className="p-3 mb-4 text-xs font-bold text-green-600 bg-green-100 rounded-lg">{successMsg}</div>}

                                        <div className="space-y-1.5">
                                            <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400 ml-1">E-mail de acesso</label>
                                            <div className="relative">
                                                <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-xl">mail</span>
                                                <input type="email" name="email" autoComplete="off" value={email} onChange={e => setEmail(e.target.value)} required className="w-full bg-slate-50 dark:bg-slate-900/40 border border-slate-100 dark:border-slate-800 rounded-xl py-3.5 pl-11 focus:ring-2 focus:ring-primary/40 transition-all outline-none text-sm" placeholder="exemplo@email.com" />
                                            </div>
                                        </div>

                                        <div className="space-y-1.5">
                                            <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400 ml-1">Sua Senha</label>
                                            <div className="relative">
                                                <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-xl">lock</span>
                                                <input type={showPassword ? "text" : "password"} name="password" autoComplete="new-password" value={password} onChange={e => setPassword(e.target.value)} required className="w-full bg-slate-50 dark:bg-slate-900/40 border border-slate-100 dark:border-slate-800 rounded-xl py-3.5 pl-11 pr-11 focus:ring-2 focus:ring-primary/40 transition-all outline-none text-sm" placeholder="••••••••" />
                                                <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-primary transition-colors flex items-center justify-center p-1" title={showPassword ? "Ocultar senha" : "Ver senha"}>
                                                    <span className="material-symbols-outlined text-[20px]">{showPassword ? 'visibility_off' : 'visibility'}</span>
                                                </button>
                                            </div>
                                        </div>

                                        <div className="flex items-center justify-between text-[11px]">
                                            <label className="flex items-center gap-2 cursor-pointer group">
                                                <input type="checkbox" checked={rememberMe} onChange={(e) => setRememberMe(e.target.checked)} className="rounded text-primary focus:ring-primary bg-slate-100 dark:bg-slate-800 border-slate-300 dark:border-slate-600 transition-colors" />
                                                <span className="text-slate-500 font-medium group-hover:text-primary transition-colors">Lembrar acesso</span>
                                            </label>
                                            <button type="button" className="text-primary font-bold hover:underline">Esqueceu a senha?</button>
                                        </div>

                                        <div className="pt-4 flex flex-col gap-4">
                                            <button type="submit" disabled={loading} className="flex justify-center items-center w-full h-12 border border-primary text-primary font-bold rounded-xl hover:bg-primary/5 transition-all text-sm tracking-wide disabled:opacity-70">
                                                {loading ? <span className="material-symbols-outlined animate-spin text-xl">sync</span> : 'Entrar na Conta'}
                                            </button>

                                            <p className="text-center text-xs text-slate-500">
                                                Não possui uma conta?
                                                <button type="button" onClick={() => toggleRegister(true)} className="text-primary font-bold hover:underline ml-1">Cadastre-se aqui</button>
                                            </p>

                                            <div className="relative flex py-2 items-center">
                                                <div className="flex-grow border-t border-slate-100 dark:border-slate-800"></div>
                                                <span className="flex-shrink mx-4 text-slate-400 text-[9px] uppercase font-bold tracking-[0.3em]">Ou apenas Leia livremente</span>
                                                <div className="flex-grow border-t border-slate-100 dark:border-slate-800"></div>
                                            </div>

                                            <button type="button" onClick={() => navigate('/capitulos')} className="w-full h-14 bg-primary text-white shadow-lg shadow-primary/20 flex items-center justify-center gap-2 text-sm font-bold rounded-xl hover:brightness-110 transition-all uppercase tracking-widest mt-2">
                                                <span className="material-symbols-outlined text-xl">auto_stories</span>
                                                Começar a Leitura
                                            </button>
                                        </div>
                                    </form>
                                </div>
                            ) : (
                                <div className="transition-opacity duration-300">
                                    <h2 className="text-2xl font-bold mb-1 text-primary">Criar Nova Conta</h2>
                                    <p className="text-slate-500 dark:text-slate-400 text-[10px] mb-6 italic uppercase tracking-[0.2em]">Cadastre-se para iniciar a leitura</p>

                                    <div className="mb-6 p-3 bg-primary/5 dark:bg-primary/10 rounded-lg border border-primary/10 flex items-start gap-3">
                                        <span className="material-symbols-outlined text-primary text-xl">forum</span>
                                        <div>
                                            <p className="text-[11px] font-bold text-slate-700 dark:text-slate-200 uppercase tracking-tighter">Participação na Comunidade</p>
                                            <p className="text-[10px] text-slate-500 leading-tight">Membros registrados podem comentar nos capítulos e interagir.</p>
                                        </div>
                                    </div>

                                    <form onSubmit={handleRegister} className="space-y-4" autoComplete="off">
                                        {errorMsg && <div className="p-3 text-xs font-bold text-red-600 bg-red-100 rounded-lg">{errorMsg}</div>}

                                        <div className="space-y-1.5">
                                            <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400 ml-1">Nome Completo</label>
                                            <input type="text" name="fullName" autoComplete="off" value={fullName} onChange={e => setFullName(e.target.value)} required className="w-full bg-slate-50 dark:bg-slate-900/40 border border-slate-100 dark:border-slate-800 rounded-xl py-3 pl-4 focus:ring-2 focus:ring-primary/40 transition-all outline-none text-sm" placeholder="Seu nome" />
                                        </div>

                                        <div className="space-y-1.5">
                                            <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400 ml-1">E-mail</label>
                                            <input type="email" name="registerEmail" autoComplete="off" value={email} onChange={e => setEmail(e.target.value)} required className="w-full bg-slate-50 dark:bg-slate-900/40 border border-slate-100 dark:border-slate-800 rounded-xl py-3 pl-4 focus:ring-2 focus:ring-primary/40 transition-all outline-none text-sm" placeholder="seu@email.com" />
                                        </div>

                                        <div className="space-y-1.5">
                                            <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400 ml-1">Criar Senha</label>
                                            <div className="relative">
                                                <input type={showPassword ? "text" : "password"} name="registerPassword" autoComplete="new-password" value={password} onChange={e => setPassword(e.target.value)} required className="w-full bg-slate-50 dark:bg-slate-900/40 border border-slate-100 dark:border-slate-800 rounded-xl py-3 pl-4 pr-11 focus:ring-2 focus:ring-primary/40 transition-all outline-none text-sm" placeholder="••••••••" />
                                                <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-primary transition-colors flex items-center justify-center p-1" title={showPassword ? "Ocultar senha" : "Ver senha"}>
                                                    <span className="material-symbols-outlined text-[20px]">{showPassword ? 'visibility_off' : 'visibility'}</span>
                                                </button>
                                            </div>
                                        </div>

                                        <div className="pt-4 flex flex-col gap-4">
                                            <button type="submit" disabled={loading} className="flex justify-center items-center w-full h-12 bg-primary text-white font-bold rounded-xl hover:brightness-110 shadow-lg shadow-primary/20 transition-all text-sm tracking-wide disabled:opacity-70">
                                                {loading ? <span className="material-symbols-outlined animate-spin text-xl">sync</span> : 'Finalizar Cadastro'}
                                            </button>

                                            <button type="button" onClick={() => toggleRegister(false)} className="text-xs text-slate-500 font-medium hover:text-primary transition-colors">
                                                <span className="material-symbols-outlined text-sm align-middle mr-1">arrow_back</span>
                                                Voltar para o Login
                                            </button>
                                        </div>
                                    </form>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </main >

            <footer className="p-10 text-center opacity-40 mt-auto">
                <p className="text-[10px] font-medium uppercase tracking-[0.4em]">O Evangelho Eterno e A Arquitetura da Graça • 2026</p>
            </footer>
        </div >
    );
};
