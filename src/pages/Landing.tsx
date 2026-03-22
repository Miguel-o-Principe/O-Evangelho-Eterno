import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useTheme } from '../contexts/ThemeContext';

export const Landing = () => {
    const { theme, toggleTheme } = useTheme();
    const navigate = useNavigate();

    return (
        <div className="bg-background-light dark:bg-background-dark text-slate-900 dark:text-slate-100 font-display min-h-screen antialiased transition-colors duration-300 flex flex-col overflow-x-hidden">
            <nav className="w-full p-6 flex justify-between items-center z-20">
                <div className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-primary text-3xl">menu_book</span>
                    <span className="font-bold text-sm tracking-widest uppercase hidden sm:block">O Evangelho Eterno</span>
                </div>

                <div className="flex items-center gap-4">
                    <Link to="/login" className="text-sm font-bold text-slate-600 hover:text-primary dark:text-slate-400 dark:hover:text-primary transition-colors">
                        Fazer Login
                    </Link>
                    <button onClick={toggleTheme} className="p-2 rounded-full hover:bg-slate-200 dark:hover:bg-slate-800 transition-colors" title="Alternar tema">
                        <span className="material-symbols-outlined">{theme === 'dark' ? 'light_mode' : 'dark_mode'}</span>
                    </button>
                </div>
            </nav>

            <main className="flex-1 flex flex-col justify-center items-center py-10 px-6 sm:px-12">
                <div className="w-full max-w-[1440px] flex flex-col lg:flex-row items-center justify-center gap-12 xl:gap-28">

                    <div className="w-full lg:w-[45%] flex flex-col items-center lg:items-start text-center lg:text-left space-y-6">
                        <h1 className="text-4xl sm:text-5xl xl:text-7xl font-bold leading-tight italic">
                            O Evangelho Eterno
                            <span className="text-2xl sm:text-3xl xl:text-4xl font-light block mt-4 opacity-70">e a Arquitetura da Graça</span>
                        </h1>
                        <div className="h-1 w-24 bg-primary rounded-full"></div>
                        <p className="text-slate-600 dark:text-slate-400 font-light text-lg xl:text-2xl leading-relaxed max-w-2xl">
                            Você está exausto do teatro religioso? Este não é mais um manual moral, é a implosão de todo o esforço de agradar a um Deus que já está saciado na Cruz. Mergulhe nas profundezas da Arquitetura da Graça. Revisite o Jardim do Éden e ganhe um novo olhar sobre toda a Realidade. Uma união ousada e inovadora de Teologia, Filosofia, Cosmologia e Psicanálise.
                        </p>

                        <div className="flex flex-col sm:flex-row gap-4 pt-8 w-full sm:w-auto">
                            <button onClick={() => navigate('/capitulos')} className="h-14 px-8 bg-primary text-white shadow-[0_10px_25px_rgba(236,19,55,0.4)] hover:scale-105 flex items-center justify-center gap-3 text-sm font-bold rounded-xl transition-all uppercase tracking-widest">
                                <span className="material-symbols-outlined text-xl">auto_stories</span>
                                Começar a Leitura
                            </button>
                            <a href="https://www.amazon.com.br/dp/B0GM8HTQF4" target="_blank" rel="noopener noreferrer" className="h-14 px-8 border-2 border-slate-200 dark:border-slate-800 hover:border-primary dark:hover:border-primary text-slate-800 dark:text-slate-200 hover:text-primary dark:hover:text-primary flex items-center justify-center gap-3 text-sm font-bold rounded-xl transition-all uppercase tracking-widest">
                                <span className="material-symbols-outlined text-xl">shopping_cart</span>
                                Obra Completa
                            </a>
                        </div>
                    </div>

                    <div className="w-full lg:w-auto flex justify-center py-8" style={{ perspective: '1200px' }}>
                        <div className="float-animation">
                            <div className="book-wrapper relative w-[300px] sm:w-[400px] xl:w-[480px] shrink-0 rounded-2xl overflow-hidden bg-slate-100 dark:bg-card-dark border border-white/10 flex shadow-2xl">
                                <div className="relative w-full opacity-100 flex flex-col">
                                    <img src="/images/capa.jpg" alt="O Evangelho Eterno Imagem" className="w-full h-auto object-contain object-center block" />
                                    <div className="absolute inset-0 bg-gradient-to-t from-dark-bg/60 via-dark-bg/10 to-transparent"></div>
                                </div>
                            </div>
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
