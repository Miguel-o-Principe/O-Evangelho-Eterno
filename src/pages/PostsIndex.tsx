import React, { useState, useMemo } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { usePosts } from '../hooks/usePosts';

export const PostsIndex = () => {
    const { posts, loading } = usePosts();
    const [searchTerm, setSearchTerm] = useState('');
    const [searchParams] = useSearchParams();
    const [activeTag, setActiveTag] = useState<string | null>(searchParams.get('tag'));

    const allTags = useMemo(() => {
        const set = new Set<string>();
        posts.forEach(p => (p.tags || []).forEach(t => set.add(t)));
        return Array.from(set).sort();
    }, [posts]);

    const filteredPosts = useMemo(() => posts.filter(post => {
        const lo = searchTerm.toLowerCase();
        const matchesSearch = !searchTerm || (
            post.title.toLowerCase().includes(lo) ||
            post.description.toLowerCase().includes(lo) ||
            post.author.toLowerCase().includes(lo) ||
            (post.tags || []).some(t => t.toLowerCase().includes(lo))
        );
        const matchesTag = !activeTag || (post.tags || []).includes(activeTag);
        return matchesSearch && matchesTag;
    }), [posts, searchTerm, activeTag]);

    return (
        <>
            {/* Header */}
            <header className="relative py-24 md:py-32 px-6">
                <div className="max-w-5xl mx-auto text-center">
                    <div className="w-12 h-[2px] bg-primary rounded-full mx-auto mb-8"></div>
                    <h1 className="text-4xl md:text-6xl font-serif font-bold text-slate-900 dark:text-white mb-6 italic">
                        Artigos & Reflexões
                    </h1>
                    <p className="text-slate-600 dark:text-slate-400 text-lg max-w-2xl mx-auto font-light">
                        Explore reflexões profundas sobre teologia, psicologia e a arquitetura da graça.
                    </p>
                </div>
            </header>

            {/* Search Bar */}
            <div className="max-w-5xl mx-auto px-6 mb-12">
                <div className="relative">
                    <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">search</span>
                    <input
                        type="text"
                        placeholder="Procure por título, autor ou tema..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full bg-slate-50 dark:bg-slate-900/40 border border-slate-200 dark:border-slate-800 rounded-xl py-3.5 pl-12 pr-4 focus:ring-2 focus:ring-primary/40 transition-all outline-none text-sm"
                    />
                </div>
            </div>

            {/* Tag Filter Bar */}
            {!loading && allTags.length > 0 && (
                <div className="max-w-5xl mx-auto px-6 mb-10 flex flex-wrap items-center gap-2">
                    <button
                        onClick={() => setActiveTag(null)}
                        className={`px-4 py-1.5 text-[10px] font-bold uppercase tracking-widest rounded-full transition-all border ${
                            activeTag === null
                                ? 'bg-primary text-white border-primary shadow-md shadow-primary/20'
                                : 'bg-transparent text-slate-500 border-slate-200 dark:border-white/10 hover:border-primary/40 hover:text-primary'
                        }`}
                    >
                        Todos
                    </button>
                    {allTags.map(tag => (
                        <button
                            key={tag}
                            onClick={() => setActiveTag(activeTag === tag ? null : tag)}
                            className={`px-4 py-1.5 text-[10px] font-bold uppercase tracking-widest rounded-full transition-all border ${
                                activeTag === tag
                                    ? 'bg-primary text-white border-primary shadow-md shadow-primary/20'
                                    : 'bg-transparent text-slate-500 border-slate-200 dark:border-white/10 hover:border-primary/40 hover:text-primary'
                            }`}
                        >
                            #{tag}
                        </button>
                    ))}
                </div>
            )}

            {/* Posts Grid */}
            <main className="max-w-5xl mx-auto px-6 pb-24">
                {loading ? (
                    <div className="flex justify-center py-24">
                        <span className="material-symbols-outlined animate-spin text-4xl text-primary">sync</span>
                    </div>
                ) : filteredPosts.length === 0 ? (
                    <div className="text-center py-24">
                        <span className="material-symbols-outlined text-6xl text-slate-300 dark:text-slate-700 mb-6 block">description</span>
                        <h2 className="text-2xl font-bold mb-4">Nenhum artigo encontrado</h2>
                        <p className="text-slate-500 dark:text-slate-400">
                            {posts.length === 0 ? 'Nenhum artigo publicado ainda.' : 'Nenhum artigo corresponde aos seus critérios de busca.'}
                        </p>
                        {activeTag && (
                            <button onClick={() => setActiveTag(null)} className="mt-4 text-sm text-primary font-bold hover:underline">
                                Limpar filtro #{activeTag}
                            </button>
                        )}
                    </div>
                ) : (
                    <div className="grid gap-8 md:gap-12">
                        {filteredPosts.map((post) => {
                            const formattedDate = new Intl.DateTimeFormat('pt-BR', {
                                day: 'numeric',
                                month: 'short',
                                year: 'numeric'
                            }).format(new Date(post.date));

                            return (
                                <Link
                                    key={post.slug}
                                    to={`/post/${post.slug}`}
                                    className="group"
                                >
                                    <article className="flex flex-col md:flex-row gap-6 p-6 md:p-8 rounded-2xl bg-white dark:bg-card-dark border border-slate-100 dark:border-slate-800 hover:shadow-lg hover:border-primary/30 dark:hover:border-primary/30 transition-all">
                                        {/* Cover Image */}
                                        {post.coverImage && (
                                            <div className="w-full md:w-48 h-40 md:h-auto rounded-xl overflow-hidden shrink-0 bg-slate-100 dark:bg-slate-800">
                                                <img
                                                    src={post.coverImage}
                                                    alt={post.title}
                                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                                                />
                                            </div>
                                        )}

                                        {/* Content */}
                                        <div className="flex-1">
                                            <div className="flex items-center gap-3 mb-3">
                                                <span className="text-primary font-bold text-[10px] uppercase tracking-[0.4em]">Artigo</span>
                                                <span className="text-slate-400 text-[10px] font-medium">{formattedDate}</span>
                                            </div>

                                            <h2 className="text-2xl md:text-3xl font-serif font-bold text-slate-900 dark:text-white mb-3 italic group-hover:text-primary transition-colors">
                                                {post.title}
                                            </h2>

                                            <p className="text-slate-600 dark:text-slate-400 font-light text-base leading-relaxed mb-4 line-clamp-2">
                                                {post.description}
                                            </p>

                                            <div className="flex items-center justify-between">
                                                <div className="flex items-center gap-3 text-sm">
                                                    <span className="material-symbols-outlined text-slate-400 text-lg">person</span>
                                                    <span className="text-slate-500 dark:text-slate-400 font-medium">{post.author}</span>
                                                </div>

                                                {post.readTime && (
                                                    <div className="flex items-center gap-2 text-slate-500 dark:text-slate-400 text-sm">
                                                        <span className="material-symbols-outlined text-lg">hourglass_empty</span>
                                                        <span>{post.readTime} min</span>
                                                    </div>
                                                )}
                                            </div>
                                        </div>

                                        <div className="md:hidden flex items-center text-primary">
                                            <span className="material-symbols-outlined">arrow_forward</span>
                                        </div>
                                    </article>
                                </Link>
                            );
                        })}
                    </div>
                )}
            </main>
        </>
    );
};
