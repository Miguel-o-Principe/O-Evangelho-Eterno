import React, { useEffect, useState, Suspense } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { mdxComponents } from '../components/MDXProvider';
import { CommentSection } from '../components/CommentSection';
import { PostMeta } from '../hooks/usePosts';

export const Post = () => {
    const { slug } = useParams<{ slug: string }>();
    const navigate = useNavigate();
    const [PostComponent, setPostComponent] = useState<React.ComponentType<any> | null>(null);
    const [meta, setMeta] = useState<PostMeta | null>(null);
    const [error, setError] = useState(false);

    useEffect(() => {
        window.scrollTo(0, 0);
        setError(false);
        setPostComponent(null);
        setMeta(null);

        if (slug) {
            import(`../posts/${slug}.mdx`)
                .then(module => {
                    // console.log("Module Loaded", module);
                    setPostComponent(() => module.default);
                    setMeta(module.meta);
                })
                .catch(err => {
                    console.error("Failed to load generic post module:", err);
                    setError(true);
                });
        }
    }, [slug]);

    if (error) {
        return (
            <div className="flex flex-col items-center justify-center py-32 px-6 fade-up">
                <span className="material-symbols-outlined text-6xl text-slate-300 dark:text-slate-700 mb-6">description</span>
                <h2 className="text-2xl font-bold mb-4">Postagem não encontrada</h2>
                <p className="text-slate-500 mb-8 max-w-sm text-center">O artigo que você procura não existe ou ainda não foi publicado.</p>
                <button
                    onClick={() => navigate('/capitulos')}
                    className="flex items-center gap-2 px-6 py-3 bg-primary text-white font-bold rounded-xl shadow-lg shadow-primary/20 hover:brightness-110 transition-all text-sm"
                >
                    <span className="material-symbols-outlined text-xl">arrow_back</span>
                    Voltar para o Índice
                </button>
            </div>
        );
    }

    if (!PostComponent || !meta) {
        return (
            <div className="flex justify-center items-center py-32 min-h-[60vh]">
                <span className="material-symbols-outlined animate-spin text-4xl text-primary">sync</span>
            </div>
        );
    }

    // Convert date string
    const formattedDate = new Intl.DateTimeFormat('pt-BR', {
        day: 'numeric',
        month: 'long',
        year: 'numeric'
    }).format(new Date(meta.date));

    return (
        <React.Fragment>
            {/* Header Visual */}
            <header className="relative h-[60vh] md:h-[70vh] w-full overflow-hidden flex items-end">
                <div className="absolute inset-0 scale-105">
                    {meta.coverImage ? (
                        <img src={meta.coverImage} alt={meta.title} className="w-full h-full object-cover" />
                    ) : (
                        <div className="w-full h-full bg-gradient-to-br from-slate-900 to-primary/40"></div>
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-dark-bg via-dark-bg/60 to-transparent"></div>
                </div>

                <div className="relative w-full pb-20 px-6 fade-up z-10">
                    <div className="max-w-5xl mx-auto">
                        <div className="flex flex-col items-center text-center">
                            <div className="w-12 h-[2px] bg-primary mb-8 text-white"></div>

                            <h1 className="text-4xl md:text-6xl font-serif font-bold text-white mb-6 italic leading-tight max-w-4xl text-balance">
                                {meta.title}
                            </h1>

                            {meta.description && (
                                <p className="text-slate-200 text-lg md:text-xl font-light mb-8 max-w-2xl px-4 text-center text-balance opacity-90 leading-relaxed shadow-sm">
                                    {meta.description}
                                </p>
                            )}

                            <div className="flex items-center justify-center flex-wrap gap-6 text-white/50 text-[10px] font-bold uppercase tracking-widest mt-4 bg-black/20 px-6 py-3 rounded-full backdrop-blur-sm border border-white/5">
                                <span className="flex items-center gap-2">
                                    <span className="material-symbols-outlined text-sm text-primary">edit</span>
                                    {meta.author}
                                </span>
                                <span className="flex items-center gap-2">
                                    <span className="material-symbols-outlined text-sm text-primary">calendar_month</span>
                                    {formattedDate}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </header>

            {/* Conteúdo Principal MDX */}
            <main className="max-w-3xl mx-auto px-6 py-16 md:py-24 bg-white dark:bg-dark-bg w-full relative z-20">
                <article className="prose-custom font-serif transition-all duration-300">
                    {/* Renderizamos o componente MDX injetando nosso map de estilos tailwind */}
                    <PostComponent components={mdxComponents} />
                </article>

                {/* Navegação Final de Artigo */}
                <footer className="mt-24 pt-16 border-t border-slate-200 dark:border-white/5">
                    <div className="flex justify-between items-center bg-slate-50 dark:bg-card-dark p-6 rounded-3xl border border-slate-100 dark:border-slate-800">
                        <div>
                            <span className="text-[10px] uppercase tracking-widest text-slate-500 font-bold block mb-1">Gostou da leitura?</span>
                            <h4 className="font-serif italic text-lg text-slate-800 dark:text-slate-200">Deixe seu comentário abaixo</h4>
                        </div>
                        <button onClick={() => navigate('/capitulos')} className="p-4 rounded-full bg-primary/10 text-primary hover:bg-primary hover:text-white transition-colors group relative overflow-hidden flex items-center justify-center shrink-0">
                            <div className="absolute inset-0 bg-primary translate-y-[100%] group-hover:translate-y-0 transition-transform duration-300 ease-out z-0"></div>
                            <span className="material-symbols-outlined relative z-10 transition-transform group-hover:scale-110">arrow_back</span>
                        </button>
                    </div>
                </footer>
            </main>

            {/* Comments */}
            <section className="bg-slate-50 dark:bg-[#0a0f18] pb-24 px-6 pt-12">
                <CommentSection chapterId={`post-${slug}`} />
            </section>
        </React.Fragment>
    );
};
