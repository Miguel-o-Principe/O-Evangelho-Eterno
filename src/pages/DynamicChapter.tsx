import React, { useRef } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { useChapter } from '../hooks/useChapter';
import { useChapterSections } from '../hooks/useChapterSections';
import { AmazonCTA } from '../components/AmazonCTA';
import { ChapterMeta } from '../components/ChapterMeta';
import { CommentSection } from '../components/CommentSection';

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

export const DynamicChapter = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const orderNum = parseInt(id || '1', 10);
    const { chapter, prevChapter, nextChapter, loading, error } = useChapter(orderNum);
    const { sections, loading: sectionsLoading } = useChapterSections(chapter?.id || null);
    const sectionsScrollRef = useRef<HTMLDivElement>(null);

    const scrollSections = (distance: number) => {
        sectionsScrollRef.current?.scrollBy({ left: distance, behavior: 'smooth' });
    };

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-background-light dark:bg-dark-bg">
                <div className="flex flex-col items-center gap-4">
                    <span className="material-symbols-outlined animate-spin text-4xl text-primary">sync</span>
                    <p className="text-sm text-slate-500 uppercase tracking-widest font-bold">Carregando capítulo...</p>
                </div>
            </div>
        );
    }

    if (error || !chapter) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-background-light dark:bg-dark-bg">
                <div className="text-center">
                    <span className="material-symbols-outlined text-6xl text-slate-300 dark:text-slate-700 mb-4 block">menu_book</span>
                    <h1 className="text-2xl font-serif italic text-slate-600 dark:text-slate-400">Capítulo não encontrado</h1>
                    <Link to="/capitulos" className="mt-6 inline-block text-sm text-primary hover:underline">← Voltar aos capítulos</Link>
                </div>
            </div>
        );
    }

    const numStr = String(chapter.order_num).padStart(2, '0');

    return (
        <>
            <ChapterMeta
                title={chapter.subtitle || chapter.title}
                description={chapter.description}
                chapterNumber={numStr}
                image={chapter.image_url}
            />

            {/* Header Visual */}
            <header className="relative h-[80vh] w-full overflow-hidden flex items-end">
                <div className="absolute inset-0 scale-105">
                    <img
                        src={chapter.image_url}
                        alt={chapter.title}
                        className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-dark-bg via-dark-bg/40 to-transparent"></div>
                </div>

                <div className="relative w-full pb-20 px-6 fade-up">
                    <div className="max-w-5xl mx-auto">
                        <div className="flex flex-col items-center text-center">
                            <div className="w-12 h-[2px] bg-primary mb-8 text-white"></div>
                            {chapter.tag_line && (
                                <span className="text-primary font-bold tracking-[0.5em] uppercase text-[10px] mb-6 block">
                                    {chapter.tag_line}
                                </span>
                            )}
                            <h1 className="text-4xl md:text-6xl font-serif font-bold text-white mb-8 italic leading-tight max-w-5xl">
                                {chapter.subtitle || chapter.title}
                            </h1>
                            <div className="flex items-center gap-8 text-white/50 text-[10px] font-bold uppercase tracking-widest">
                                <span className="flex items-center gap-2">
                                    <span className="material-symbols-outlined text-sm text-primary">menu_book</span>
                                    Cap. {numStr}
                                </span>
                                <span className="flex items-center gap-2">
                                    <span className="material-symbols-outlined text-sm text-primary">hourglass_empty</span>
                                    {chapter.read_time} min de leitura
                                </span>
                            </div>
                            {chapter.tags && chapter.tags.length > 0 && (
                                <div className="flex flex-wrap justify-center gap-2 mt-6">
                                    {chapter.tags.map(tag => (
                                        <button
                                            key={tag}
                                            onClick={() => navigate(`/capitulos?tag=${tag}`)}
                                            className="px-3 py-1 text-[10px] font-bold uppercase tracking-widest bg-white/10 text-white/60 rounded-full border border-white/10 backdrop-blur-sm hover:bg-white/20 hover:text-white transition-all"
                                        >
                                            #{tag}
                                        </button>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </header>

            {/* Conteúdo Principal */}
            <main className="max-w-3xl mx-auto px-6 py-24 md:py-32">
                <article className="prose-custom font-serif transition-all duration-300">
                    <ReactMarkdown
                        remarkPlugins={[remarkGfm]}
                        components={markdownComponents}
                    >
                        {chapter.content}
                    </ReactMarkdown>
                </article>

                <AmazonCTA />

                {/* Carrossel de Subseções */}
                {(sectionsLoading || sections.length > 0) && (
                    <div className="mt-24">
                        <div className="flex items-end justify-between mb-8">
                            <div>
                                <span className="text-primary font-bold text-[10px] uppercase tracking-[0.4em] block mb-2">Explore Mais</span>
                                <h2 className="text-2xl font-serif font-bold text-slate-900 dark:text-white italic">Subseções deste Capítulo</h2>
                            </div>
                            <div className="flex items-center gap-2 hidden md:flex">
                                <button onClick={() => scrollSections(-360)} className="size-9 flex items-center justify-center bg-slate-100 dark:bg-white/5 hover:bg-primary hover:text-white rounded-full transition-all">
                                    <span className="material-symbols-outlined text-sm">chevron_left</span>
                                </button>
                                <button onClick={() => scrollSections(360)} className="size-9 flex items-center justify-center bg-slate-100 dark:bg-white/5 hover:bg-primary hover:text-white rounded-full transition-all">
                                    <span className="material-symbols-outlined text-sm">chevron_right</span>
                                </button>
                            </div>
                        </div>

                        {sectionsLoading ? (
                            <div className="flex justify-center py-12">
                                <span className="material-symbols-outlined animate-spin text-2xl text-primary">sync</span>
                            </div>
                        ) : (
                            <div ref={sectionsScrollRef} className="flex flex-col sm:flex-row sm:overflow-x-auto gap-5 pb-4 no-scrollbar scroll-smooth">
                                {sections.map((sec) => (
                                    <div
                                        key={sec.id}
                                        onClick={() => navigate(`/capitulo/${id}/secao/${sec.id}`)}
                                        className="chapter-card sm:shrink-0 sm:w-[280px] flex flex-col gap-0 rounded-2xl bg-white dark:bg-card-dark border border-slate-100 dark:border-slate-800 shadow-sm hover:shadow-xl transition-all overflow-hidden cursor-pointer"
                                    >
                                        {/* Imagem herdada do capítulo pai */}
                                        <div
                                            className="w-full h-36 bg-cover bg-center relative"
                                            style={{ backgroundImage: `url('${chapter?.image_url}')` }}
                                        >
                                            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent"></div>
                                            <div className="absolute bottom-4 left-4 right-4 text-white">
                                                <span className="text-primary font-bold text-[9px] uppercase tracking-[0.2em] mb-1 block">
                                                    Seção {String(sec.order_num).padStart(2, '0')}
                                                </span>
                                                <h3 className="text-base font-bold leading-tight italic line-clamp-2">{sec.title}</h3>
                                            </div>
                                        </div>
                                        <div className="flex flex-col flex-1 p-4 gap-3">
                                            <p className="text-slate-500 dark:text-slate-400 text-xs leading-relaxed line-clamp-2">{sec.description}</p>
                                            <div className="mt-auto flex items-center justify-between">
                                                <span className="text-[10px] text-slate-400 flex items-center gap-1">
                                                    <span className="material-symbols-outlined text-xs">hourglass_empty</span>
                                                    {sec.read_time} min
                                                </span>
                                                <button className="flex items-center gap-1 text-primary text-[11px] font-bold group">
                                                    Ler
                                                    <span className="material-symbols-outlined text-sm group-hover:translate-x-1 transition-transform">arrow_forward</span>
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                )}

                <div className="mt-24">
                    <CommentSection chapterId={String(chapter.order_num)} />
                </div>

                {/* Navegação Final de Capítulo */}
                <footer className="mt-32 pt-16 border-t border-slate-200 dark:border-white/5">
                    <div className="flex flex-col md:flex-row items-stretch gap-6">
                        {prevChapter ? (
                            <Link
                                to={`/capitulo/${prevChapter.order_num}`}
                                className="flex-1 p-8 rounded-3xl bg-slate-100/50 dark:bg-white/5 hover:bg-slate-200 dark:hover:bg-white/10 transition-all group"
                            >
                                <div className="flex items-start gap-4">
                                    <span className="material-symbols-outlined text-slate-400 group-hover:-translate-x-1 transition-transform">arrow_back</span>
                                    <div>
                                        <span className="text-[10px] uppercase tracking-widest text-slate-500 font-bold">
                                            Capítulo {String(prevChapter.order_num).padStart(2, '0')}
                                        </span>
                                        <h4 className="font-serif italic text-xl mt-2 text-slate-600 dark:text-slate-400">
                                            {prevChapter.title}
                                        </h4>
                                    </div>
                                </div>
                            </Link>
                        ) : (
                            <div className="flex-1 p-8 rounded-3xl bg-slate-100/50 dark:bg-white/5 opacity-50">
                                <span className="text-[10px] uppercase tracking-widest text-slate-500 font-bold">Introdução</span>
                                <h4 className="font-serif italic text-xl mt-2 text-slate-600 dark:text-slate-400">— O Início da Jornada</h4>
                            </div>
                        )}

                        {nextChapter ? (
                            <Link
                                to={`/capitulo/${nextChapter.order_num}`}
                                className="flex-1 p-8 rounded-3xl bg-primary text-white shadow-xl shadow-primary/20 hover:scale-[1.03] transition-all group"
                            >
                                <div className="flex justify-between items-start">
                                    <div>
                                        <span className="text-[10px] uppercase tracking-widest text-white/70 font-bold">Próximo Capítulo</span>
                                        <h4 className="font-serif italic text-2xl mt-2">{nextChapter.title}</h4>
                                    </div>
                                    <span className="material-symbols-outlined text-3xl group-hover:translate-x-2 transition-transform">arrow_forward</span>
                                </div>
                            </Link>
                        ) : (
                            <div className="flex-1 p-8 rounded-3xl bg-slate-100/50 dark:bg-white/5 opacity-50">
                                <span className="text-[10px] uppercase tracking-widest text-slate-500 font-bold">Fim</span>
                                <h4 className="font-serif italic text-xl mt-2 text-slate-600 dark:text-slate-400">— Fim do Livro</h4>
                            </div>
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
