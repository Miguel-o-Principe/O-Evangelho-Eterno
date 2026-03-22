import React, { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useChapters } from '../hooks/useChapters';
import { useAuth } from '../contexts/AuthContext';

export const ChaptersIndex = () => {
    const scrollContainerRef = useRef<HTMLDivElement>(null);
    const navigate = useNavigate();
    const { user } = useAuth();
    const { chapters, loading: chaptersLoading } = useChapters();

    const isAdmin = user?.user_metadata?.is_admin === true;

    const scrollCarousel = (distance: number) => {
        if (scrollContainerRef.current) {
            scrollContainerRef.current.scrollBy({ left: distance, behavior: 'smooth' });
        }
    };

    return (
        <main className="flex-1">
            <style>{`
                .no-scrollbar::-webkit-scrollbar { display: none; }
                .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
                .chapter-card { transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1); }
                .chapter-card:hover { transform: translateY(-4px); }
                #chapter-scroll { scroll-padding-left: 2rem; }
                @media (min-width: 640px) { #chapter-scroll { scroll-padding-left: 5rem; } }
            `}</style>

            {/* Page Title & Author Controls */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 px-8 sm:px-20 py-4 mb-8">
                <div className="flex flex-col gap-3">
                    <h1 className="text-4xl sm:text-5xl font-bold leading-tight tracking-tight">Seja Bem-Vindo de Volta ao Jardim do Éden</h1>
                    <p className="text-slate-600 dark:text-slate-400 text-lg max-w-4xl font-light">
                        Mergulhe na profunda Arquitetura da Graça. Cada capítulo é uma pedra fundamental na compreensão da jornada teológica e espiritual do livro.
                    </p>
                </div>

                {isAdmin && (
                    <button
                        onClick={() => navigate('/admin')}
                        className="flex items-center gap-2 px-6 py-3 bg-primary text-white font-bold rounded-xl shadow-lg shadow-primary/20 hover:brightness-110 transition-all shrink-0"
                    >
                        <span className="material-symbols-outlined">admin_panel_settings</span>
                        Painel Admin
                    </button>
                )}
            </div>

            {/* Carousel View */}
            <div className="relative group/carousel w-full">
                {/* Navigation Buttons (Desktop) */}
                <button onClick={() => scrollCarousel(-400)} className="absolute left-6 top-1/2 -translate-y-1/2 z-20 size-12 hidden md:flex items-center justify-center bg-white dark:bg-card-dark rounded-full shadow-xl border border-slate-100 dark:border-slate-700 opacity-0 group-hover/carousel:opacity-100 transition-opacity">
                    <span className="material-symbols-outlined">chevron_left</span>
                </button>
                <button onClick={() => scrollCarousel(400)} className="absolute right-6 top-1/2 -translate-y-1/2 z-20 size-12 hidden md:flex items-center justify-center bg-white dark:bg-card-dark rounded-full shadow-xl border border-slate-100 dark:border-slate-700 opacity-0 group-hover/carousel:opacity-100 transition-opacity">
                    <span className="material-symbols-outlined">chevron_right</span>
                </button>

                {/* Gradient Overlays */}
                <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-background-light dark:from-background-dark to-transparent z-10 pointer-events-none hidden sm:block"></div>
                <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-background-light dark:from-background-dark to-transparent z-10 pointer-events-none hidden sm:block"></div>

                {/* Scrollable Area */}
                <div id="chapter-scroll" ref={scrollContainerRef} className="flex flex-col sm:flex-row sm:overflow-x-auto sm:snap-x sm:snap-mandatory gap-8 px-4 sm:px-20 pb-12 pt-2 no-scrollbar scroll-smooth items-stretch">

                    {/* Admin Quick Add Card */}
                    {isAdmin && (
                        <div
                            onClick={() => navigate('/admin')}
                            className="chapter-card sm:snap-start sm:snap-always shrink-0 w-full sm:w-[340px] flex flex-col items-center justify-center gap-4 rounded-2xl bg-primary/5 dark:bg-primary/10 border-2 border-dashed border-primary/30 hover:border-primary/60 hover:bg-primary/10 dark:hover:bg-primary/20 transition-all cursor-pointer group py-12 sm:py-0"
                        >
                            <div className="size-16 rounded-full bg-primary/10 dark:bg-primary/20 flex items-center justify-center group-hover:scale-110 transition-transform">
                                <span className="material-symbols-outlined text-3xl text-primary">add</span>
                            </div>
                            <h3 className="text-xl font-bold text-primary italic">Novo Capítulo</h3>
                            <p className="text-slate-500 text-sm text-center px-8">Adicionar um novo capítulo, editar ou gerenciar conteúdo.</p>
                        </div>
                    )}

                    {chaptersLoading ? (
                        <div className="flex items-center justify-center w-full py-24">
                            <span className="material-symbols-outlined animate-spin text-4xl text-primary">sync</span>
                        </div>
                    ) : chapters.map((chap) => (
                        <div
                            key={chap.id}
                            onClick={() => navigate(`/capitulo/${chap.order_num}`)}
                            className="chapter-card sm:snap-start sm:snap-always shrink-0 w-full sm:w-[340px] flex flex-col gap-0 rounded-2xl bg-white dark:bg-card-dark border border-slate-100 dark:border-slate-800 shadow-sm hover:shadow-2xl transition-all overflow-hidden cursor-pointer"
                        >
                            <div
                                className="w-full aspect-[3/4] bg-cover bg-center relative chapter-img"
                                style={{ backgroundImage: `url('${chap.image_url}')` }}
                            >
                                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent"></div>
                                <div className="absolute bottom-6 left-6 right-6 text-white">
                                    <span className="chapter-num text-primary font-bold text-xs uppercase tracking-[0.2em] mb-2 block">Capítulo {String(chap.order_num).padStart(2, '0')}</span>
                                    <h3 className="chapter-title text-2xl font-bold leading-tight italic">{chap.title}</h3>
                                </div>
                            </div>
                            <div className="flex flex-col flex-1 p-6 gap-6">
                                <p className="chapter-desc text-slate-600 dark:text-slate-400 text-sm leading-relaxed line-clamp-3">{chap.description}</p>
                                <button className="w-full flex items-center justify-center gap-2 rounded-lg h-11 px-4 bg-slate-50 dark:bg-slate-800/50 text-slate-900 dark:text-slate-100 hover:bg-primary hover:text-white transition-all text-sm font-bold mt-auto group">
                                    Explorar
                                    <span className="material-symbols-outlined text-lg translate-x-0 group-hover:translate-x-1 transition-transform">arrow_forward</span>
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </main>
    );
};
