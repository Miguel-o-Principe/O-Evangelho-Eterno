import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useTheme } from '../contexts/ThemeContext';
import { CommentSection } from '../components/CommentSection';
import { supabase } from '../lib/supabase';
import { PostMeta } from '../hooks/usePosts';
import { ChapterMeta } from '../components/ChapterMeta';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
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
            <span className="absolute top-0 left-4 text-6xl text-primary/10 font-serif">&#34;</span>
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

export const Post = () => {
    const { slug } = useParams<{ slug: string }>();
    const navigate = useNavigate();
    const { theme } = useTheme();
    const [post, setPost] = useState<PostMeta | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    useEffect(() => {
        window.scrollTo(0, 0);
        setError(false);
        setPost(null);
        setLoading(true);

        const fetchPost = async () => {
            if (!slug) return;

            try {
                const { data, error: queryError } = await supabase
                    .from('posts')
                    .select('*')
                    .eq('slug', slug)
                    .eq('published', true)
                    .single();

                if (queryError || !data) {
                    setError(true);
                    return;
                }

                const formattedPost: PostMeta = {
                    id: data.id,
                    title: data.title,
                    description: data.description,
                    date: new Date(data.date).toISOString().split('T')[0],
                    author: data.author,
                    coverImage: data.cover_image,
                    slug: data.slug,
                    readTime: data.read_time,
                    content: data.content,
                    published: data.published,
                    tags: data.tags || [],
                };

                setPost(formattedPost);
            } catch (err) {
                console.error('Error loading post:', err);
                setError(true);
            } finally {
                setLoading(false);
            }
        };

        fetchPost();
    }, [slug]);

    if (error) {
        return (
            <div className="flex flex-col items-center justify-center py-32 px-6 fade-up">
                <span className="material-symbols-outlined text-6xl text-slate-300 dark:text-slate-700 mb-6">description</span>
                <h2 className="text-2xl font-bold mb-4">Postagem não encontrada</h2>
                <p className="text-slate-500 mb-8 max-w-sm text-center">O artigo que você procura não existe ou ainda não foi publicado.</p>
                <button
                    onClick={() => navigate('/artigos')}
                    className="flex items-center gap-2 px-6 py-3 bg-primary text-white font-bold rounded-xl shadow-lg shadow-primary/20 hover:brightness-110 transition-all text-sm"
                >
                    <span className="material-symbols-outlined text-xl">arrow_back</span>
                    Voltar para Artigos
                </button>
            </div>
        );
    }

    if (loading) {
        return (
            <div className="flex justify-center items-center py-32 min-h-[60vh]">
                <span className="material-symbols-outlined animate-spin text-4xl text-primary">sync</span>
            </div>
        );
    }

    if (!post) {
        return (
            <div className="flex flex-col items-center justify-center py-32 px-6 fade-up">
                <span className="material-symbols-outlined text-6xl text-slate-300 dark:text-slate-700 mb-6">description</span>
                <h2 className="text-2xl font-bold mb-4">Postagem não encontrada</h2>
                <p className="text-slate-500 mb-8 max-w-sm text-center">O artigo que você procura não existe ou ainda não foi publicado.</p>
                <button
                    onClick={() => navigate('/artigos')}
                    className="flex items-center gap-2 px-6 py-3 bg-primary text-white font-bold rounded-xl shadow-lg shadow-primary/20 hover:brightness-110 transition-all text-sm"
                >
                    <span className="material-symbols-outlined text-xl">arrow_back</span>
                    Voltar para Artigos
                </button>
            </div>
        );
    }

    // Convert date string
    const formattedDate = new Intl.DateTimeFormat('pt-BR', {
        day: 'numeric',
        month: 'long',
        year: 'numeric'
    }).format(new Date(post.date));

    return (
        <React.Fragment>
            <ChapterMeta
                title={post.title}
                description={post.description || post.title}
                image={post.coverImage}
            />
            {/* Header Visual */}
            <header className="relative min-h-[60vh] md:min-h-[70vh] w-full overflow-hidden flex items-end">
                <div className="absolute inset-0 scale-105">
                    {post.coverImage ? (
                        <img src={post.coverImage} alt={post.title} className="w-full h-full object-cover" />
                    ) : (
                        <div className="w-full h-full bg-gradient-to-br from-slate-900 to-primary/40"></div>
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-dark-bg via-dark-bg/60 to-transparent"></div>
                </div>

                <div className="relative w-full pt-24 pb-20 px-6 fade-up z-10">
                    <div className="max-w-5xl mx-auto">
                        <div className="flex flex-col items-center text-center">
                            <div className="w-12 h-[2px] bg-primary mb-8 text-white"></div>

                            <h1 className="text-4xl md:text-6xl font-serif font-bold text-white mb-6 italic leading-tight max-w-4xl text-balance">
                                {post.title}
                            </h1>

                            {post.description && (
                                <p className="text-slate-200 text-lg md:text-xl font-light mb-8 max-w-2xl px-4 text-center text-balance opacity-90 leading-relaxed shadow-sm">
                                    {post.description}
                                </p>
                            )}

                            <div className="flex items-center justify-center flex-wrap gap-6 text-white/50 text-[10px] font-bold uppercase tracking-widest mt-4 bg-black/20 px-6 py-3 rounded-full backdrop-blur-sm border border-white/5">
                                <span className="flex items-center gap-2">
                                    <span className="material-symbols-outlined text-sm text-primary">edit</span>
                                    {post.author}
                                </span>
                                <span className="flex items-center gap-2">
                                    <span className="material-symbols-outlined text-sm text-primary">calendar_month</span>
                                    {formattedDate}
                                </span>
                            </div>
                            {post.tags && post.tags.length > 0 && (
                                <div className="flex flex-wrap justify-center gap-2 mt-5">
                                    {post.tags.map(tag => (
                                        <button
                                            key={tag}
                                            onClick={() => navigate(`/artigos?tag=${tag}`)}
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

            {/* Conteúdo Principal do Supabase */}
            <main className="max-w-3xl mx-auto px-6 py-16 md:py-24 w-full relative z-20">
                <article className="prose-custom font-serif transition-all duration-300">
                    <ReactMarkdown remarkPlugins={[remarkGfm]} components={markdownComponents}>
                        {post.content}
                    </ReactMarkdown>
                </article>

                <AmazonCTA />

                {/* Navegação Final de Artigo */}
                <footer className="mt-24 pt-16 border-t border-slate-200 dark:border-white/5">
                    <div className="flex justify-between items-center bg-slate-50 dark:bg-card-dark p-6 rounded-3xl border border-slate-100 dark:border-slate-800">
                        <div>
                            <span className="text-[10px] uppercase tracking-widest text-slate-500 font-bold block mb-1">Gostou da leitura?</span>
                            <h4 className="font-serif italic text-lg text-slate-800 dark:text-slate-200">Deixe seu comentário abaixo</h4>
                        </div>
                        <button onClick={() => navigate('/artigos')} className="flex items-center gap-2 px-5 py-3 bg-primary/10 text-primary group relative overflow-hidden rounded-xl font-bold text-sm shrink-0 transition-colors">
                            <div className="absolute inset-0 bg-primary translate-y-[100%] group-hover:translate-y-0 transition-transform duration-300 ease-out z-0"></div>
                            <span className="material-symbols-outlined relative z-10 text-xl group-hover:text-white transition-colors">arrow_back</span>
                            <span className="relative z-10 uppercase tracking-widest text-[11px] group-hover:text-white transition-colors">Artigos</span>
                        </button>
                    </div>
                </footer>

                <div className="mt-24">
                    <CommentSection chapterId={`post-${slug}`} />
                </div>
            </main>
        </React.Fragment>
    );
};
