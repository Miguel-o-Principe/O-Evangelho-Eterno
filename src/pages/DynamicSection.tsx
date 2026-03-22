import React from 'react';
import { Link, useParams } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { useSection } from '../hooks/useChapterSections';
import { AmazonCTA } from '../components/AmazonCTA';

const markdownComponents: any = {
    h3: ({ children, ...props }: any) => (
        <h3 className="text-2xl font-serif font-bold text-slate-900 dark:text-white mt-16 mb-8 italic" {...props}>{children}</h3>
    ),
    h4: ({ children, ...props }: any) => (
        <h4 className="text-xl font-serif font-bold text-slate-800 dark:text-slate-200 mt-12 mb-6 italic" {...props}>{children}</h4>
    ),
    p: ({ children, ...props }: any) => (
        <p className="mt-6 mb-8 text-lg font-light leading-relaxed text-slate-800 dark:text-slate-300 antialiased" {...props}>{children}</p>
    ),
    strong: ({ children, ...props }: any) => (
        <strong className="font-bold text-slate-900 dark:text-white" {...props}>{children}</strong>
    ),
    em: ({ children, ...props }: any) => (
        <em className="italic text-slate-700 dark:text-slate-300" {...props}>{children}</em>
    ),
    a: ({ children, ...props }: any) => (
        <a className="text-primary hover:text-primary-dark underline underline-offset-4 decoration-primary/30 hover:decoration-primary transition-colors" {...props}>{children}</a>
    ),
    blockquote: ({ children }: any) => (
        <blockquote className="relative my-16 py-8 px-12 border-l-2 border-primary/30 italic text-2xl text-slate-900 dark:text-white font-light leading-relaxed shadow-sm bg-slate-50/50 dark:bg-slate-900/50 rounded-r-3xl">
            <span className="absolute top-0 left-4 text-6xl text-primary/10 font-serif">"</span>
            {children}
        </blockquote>
    ),
    ul: ({ children, ...props }: any) => (
        <ul className="list-disc list-inside my-6 space-y-2 text-slate-800 dark:text-slate-300 ml-4" {...props}>{children}</ul>
    ),
    ol: ({ children, ...props }: any) => (
        <ol className="list-decimal list-inside my-6 space-y-2 text-slate-800 dark:text-slate-300 ml-4" {...props}>{children}</ol>
    ),
    li: ({ children, ...props }: any) => (
        <li className="leading-relaxed" {...props}>{children}</li>
    ),
    table: ({ children }: any) => (
        <div className="table-container shadow-2xl my-16 overflow-x-auto rounded-xl">
            <table className="w-full text-left border-collapse">{children}</table>
        </div>
    ),
    thead: ({ children, ...props }: any) => <thead className="bg-slate-100 dark:bg-slate-800/50" {...props}>{children}</thead>,
    th: ({ children, ...props }: any) => <th className="py-4 px-6 font-bold text-slate-900 dark:text-white border-b border-slate-200 dark:border-slate-700" {...props}>{children}</th>,
    tbody: ({ children, ...props }: any) => <tbody className="divide-y divide-slate-100 dark:divide-slate-800/50" {...props}>{children}</tbody>,
    tr: ({ children, ...props }: any) => <tr className="hover:bg-slate-50 dark:hover:bg-slate-900/20 transition-colors" {...props}>{children}</tr>,
    td: ({ children, ...props }: any) => <td className="py-4 px-6 text-slate-700 dark:text-slate-300" {...props}>{children}</td>,
};

export const DynamicSection = () => {
    const { chapterId, sectionId } = useParams<{ chapterId: string; sectionId: string }>();
    const { section, chapterImageUrl, chapterOrderNum, prevSection, nextSection, loading, error } = useSection(sectionId || null);

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-background-light dark:bg-dark-bg">
                <div className="flex flex-col items-center gap-4">
                    <span className="material-symbols-outlined animate-spin text-4xl text-primary">sync</span>
                    <p className="text-sm text-slate-500 uppercase tracking-widest font-bold">Carregando subseção...</p>
                </div>
            </div>
        );
    }

    if (error || !section) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-background-light dark:bg-dark-bg">
                <div className="text-center">
                    <span className="material-symbols-outlined text-6xl text-slate-300 dark:text-slate-700 mb-4 block">menu_book</span>
                    <h1 className="text-2xl font-serif italic text-slate-600 dark:text-slate-400">Seção não encontrada</h1>
                    <Link to={`/capitulo/${chapterId}`} className="mt-6 inline-block text-sm text-primary hover:underline">← Voltar ao capítulo</Link>
                </div>
            </div>
        );
    }

    const chapNumStr = String(chapterOrderNum).padStart(2, '0');
    const sectionNumStr = String(section.order_num).padStart(2, '0');
    const coverImage = chapterImageUrl || '/images/capitulo-1-bg.png';

    return (
        <>
            {/* Breadcrumb / back link */}
            <div className="bg-background-light dark:bg-dark-bg border-b border-slate-200 dark:border-white/5 px-6 py-3">
                <div className="max-w-3xl mx-auto">
                    <Link to={`/capitulo/${chapterId}`} className="flex items-center gap-2 text-[11px] uppercase tracking-widest font-bold text-slate-500 hover:text-primary transition-colors">
                        <span className="material-symbols-outlined text-sm">arrow_back</span>
                        Capítulo {chapNumStr}
                    </Link>
                </div>
            </div>

            {/* Header Visual — usa imagem do capítulo pai */}
            <header className="relative h-[70vh] w-full overflow-hidden flex items-end">
                <div className="absolute inset-0 scale-105">
                    <img
                        src={coverImage}
                        alt={section.title}
                        className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-dark-bg via-dark-bg/50 to-dark-bg/10"></div>
                </div>

                <div className="relative w-full pb-20 px-6 fade-up">
                    <div className="max-w-5xl mx-auto">
                        <div className="flex flex-col items-center text-center">
                            <div className="w-12 h-[2px] bg-primary mb-8"></div>
                            {/* Breadcrumb label */}
                            <span className="text-white/40 font-bold tracking-[0.4em] uppercase text-[9px] mb-3 block">
                                Cap. {chapNumStr} · Seção {sectionNumStr}
                            </span>
                            {section.tag_line && (
                                <span className="text-primary font-bold tracking-[0.5em] uppercase text-[10px] mb-5 block">
                                    {section.tag_line}
                                </span>
                            )}
                            <h1 className="text-3xl md:text-5xl font-serif font-bold text-white mb-6 italic leading-tight max-w-4xl">
                                {section.subtitle || section.title}
                            </h1>
                            <div className="flex items-center gap-8 text-white/50 text-[10px] font-bold uppercase tracking-widest">
                                <span className="flex items-center gap-2">
                                    <span className="material-symbols-outlined text-sm text-primary">bookmark</span>
                                    Seção {sectionNumStr}
                                </span>
                                <span className="flex items-center gap-2">
                                    <span className="material-symbols-outlined text-sm text-primary">hourglass_empty</span>
                                    {section.read_time} min de leitura
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </header>

            {/* Conteúdo */}
            <main className="max-w-3xl mx-auto px-6 py-24 md:py-32">
                <article className="prose-custom font-serif transition-all duration-300">
                    <ReactMarkdown remarkPlugins={[remarkGfm]} components={markdownComponents}>
                        {section.content}
                    </ReactMarkdown>
                </article>

                <AmazonCTA />

                {/* Navegação entre subseções */}
                <footer className="mt-32 pt-16 border-t border-slate-200 dark:border-white/5">
                    <div className="flex flex-col md:flex-row items-stretch gap-6">
                        {prevSection ? (
                            <Link
                                to={`/capitulo/${chapterId}/secao/${prevSection.id}`}
                                className="flex-1 p-8 rounded-3xl bg-slate-100/50 dark:bg-white/5 hover:bg-slate-200 dark:hover:bg-white/10 transition-all group"
                            >
                                <div className="flex items-start gap-4">
                                    <span className="material-symbols-outlined text-slate-400 group-hover:-translate-x-1 transition-transform">arrow_back</span>
                                    <div>
                                        <span className="text-[10px] uppercase tracking-widest text-slate-500 font-bold">Seção anterior</span>
                                        <h4 className="font-serif italic text-xl mt-2 text-slate-600 dark:text-slate-400">{prevSection.title}</h4>
                                    </div>
                                </div>
                            </Link>
                        ) : (
                            /* Botão para voltar ao capítulo */
                            <Link
                                to={`/capitulo/${chapterId}`}
                                className="flex-1 p-8 rounded-3xl bg-slate-100/50 dark:bg-white/5 hover:bg-slate-200 dark:hover:bg-white/10 transition-all group"
                            >
                                <div className="flex items-start gap-4">
                                    <span className="material-symbols-outlined text-slate-400 group-hover:-translate-x-1 transition-transform">arrow_back</span>
                                    <div>
                                        <span className="text-[10px] uppercase tracking-widest text-slate-500 font-bold">Voltar ao Capítulo {chapNumStr}</span>
                                        <h4 className="font-serif italic text-xl mt-2 text-slate-600 dark:text-slate-400">Início do capítulo</h4>
                                    </div>
                                </div>
                            </Link>
                        )}

                        {nextSection ? (
                            <Link
                                to={`/capitulo/${chapterId}/secao/${nextSection.id}`}
                                className="flex-1 p-8 rounded-3xl bg-primary text-white shadow-xl shadow-primary/20 hover:scale-[1.03] transition-all group"
                            >
                                <div className="flex justify-between items-start">
                                    <div>
                                        <span className="text-[10px] uppercase tracking-widest text-white/70 font-bold">Próxima Seção</span>
                                        <h4 className="font-serif italic text-2xl mt-2">{nextSection.title}</h4>
                                    </div>
                                    <span className="material-symbols-outlined text-3xl group-hover:translate-x-2 transition-transform">arrow_forward</span>
                                </div>
                            </Link>
                        ) : (
                            <Link
                                to={`/capitulo/${chapterId}`}
                                className="flex-1 p-8 rounded-3xl bg-primary text-white shadow-xl shadow-primary/20 hover:scale-[1.03] transition-all group"
                            >
                                <div className="flex justify-between items-start">
                                    <div>
                                        <span className="text-[10px] uppercase tracking-widest text-white/70 font-bold">Fim das Seções</span>
                                        <h4 className="font-serif italic text-2xl mt-2">Voltar ao Capítulo</h4>
                                    </div>
                                    <span className="material-symbols-outlined text-3xl group-hover:translate-x-2 transition-transform">arrow_forward</span>
                                </div>
                            </Link>
                        )}
                    </div>

                    <div className="mt-20 text-center">
                        <button
                            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                            className="text-[10px] uppercase tracking-[0.4em] font-bold text-slate-400 hover:text-primary transition-colors"
                        >
                            Voltar ao topo
                        </button>
                    </div>
                </footer>
            </main>
        </>
    );
};
