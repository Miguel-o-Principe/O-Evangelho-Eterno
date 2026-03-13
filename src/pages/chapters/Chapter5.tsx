import React from 'react';
import { Link } from 'react-router-dom';
import Chapter5Content from './content/Chapter5.mdx';
import { AmazonCTA } from '../../components/AmazonCTA';
import { ChapterMeta } from '../../components/ChapterMeta';

export const Chapter5 = () => {
    return (
        <>
            <ChapterMeta
                title="A Transição do Fazer ao Ser no Retorno ao Jardim"
                description="O fim da neurose e a passagem definitiva do 'Fazer' para o 'Ser': Chega de mentiras e personagens."
                chapterNumber="05"
                image="/images/capitulo-5-bg.png"
            />
            <header className="relative h-[80vh] w-full overflow-hidden flex items-end">
                <div className="absolute inset-0 scale-105">
                    <img src="/images/capitulo-5-bg.png" alt="O Jardim: Do Personagem à Presença" className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-gradient-to-t from-dark-bg via-dark-bg/40 to-transparent"></div>
                </div>

                <div className="relative w-full pb-20 px-6 fade-up">
                    <div className="max-w-5xl mx-auto">
                        <div className="flex flex-col items-center text-center">
                            <div className="w-12 h-[2px] bg-primary mb-8 text-white"></div>
                            <span className="text-primary font-bold tracking-[0.5em] uppercase text-[10px] mb-6 block">Arquitetura da Existência</span>
                            <h1 className="text-4xl md:text-6xl font-serif font-bold text-white mb-8 italic leading-tight max-w-5xl">
                                A Transição do Fazer ao Ser no Retorno ao Jardim
                            </h1>
                            <div className="flex items-center gap-8 text-white/50 text-[10px] font-bold uppercase tracking-widest">
                                <span className="flex items-center gap-2"><span className="material-symbols-outlined text-sm text-primary">park</span> Cap. 05</span>
                                <span className="flex items-center gap-2"><span className="material-symbols-outlined text-sm text-primary">hourglass_empty</span> 40 min de leitura</span>
                            </div>
                        </div>
                    </div>
                </div>
            </header>

            <main className="max-w-3xl mx-auto px-6 py-24 md:py-32">
                <article className="prose-custom font-serif transition-all duration-300">
                    <Chapter5Content />
                </article>

                <AmazonCTA />

                <footer className="mt-32 pt-16 border-t border-slate-200 dark:border-white/5">
                    <div className="flex flex-col md:flex-row items-stretch gap-6">
                        <Link to="/capitulo/4.1" className="flex-1 p-8 rounded-3xl bg-slate-100/50 dark:bg-white/5 hover:bg-slate-200 dark:hover:bg-white/10 transition-all group">
                            <div className="flex items-start gap-4">
                                <span className="material-symbols-outlined text-slate-400 group-hover:-translate-x-1 transition-transform">arrow_back</span>
                                <div>
                                    <span className="text-[10px] uppercase tracking-widest text-slate-500 font-bold">Capítulo 04.1</span>
                                    <h4 className="font-serif italic text-xl mt-2 text-slate-600 dark:text-slate-400">A Cosmologia da Vida</h4>
                                </div>
                            </div>
                        </Link>

                        <Link to="/capitulo/6" className="flex-1 p-8 rounded-3xl bg-primary text-white shadow-xl shadow-primary/20 hover:scale-[1.03] transition-all group">
                            <div className="flex justify-between items-start">
                                <div>
                                    <span className="text-[10px] uppercase tracking-widest text-white/70 font-bold">Próximo Capítulo</span>
                                    <h4 className="font-serif italic text-2xl mt-2">O Evangelho Eterno</h4>
                                </div>
                                <span className="material-symbols-outlined text-3xl group-hover:translate-x-2 transition-transform">arrow_forward</span>
                            </div>
                        </Link>
                    </div>

                    <div className="mt-20 text-center">
                        <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="text-[10px] uppercase tracking-[0.4em] font-bold text-slate-400 hover:text-primary transition-colors">Voltar ao topo</button>
                    </div>
                </footer>
            </main>
        </>
    );
};
