import React, { useState, useCallback, useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { useChapters } from '../hooks/useChapters';
import { usePosts } from '../hooks/usePosts';
import { useAllSectionsGrouped } from '../hooks/useChapterSections';

interface SearchResult {
    id: string;
    title: string;
    description?: string;
    type: 'chapter' | 'section' | 'post';
    link: string;
    category?: string;
}

export const SearchBar: React.FC<{ compact?: boolean }> = ({ compact = false }) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [results, setResults] = useState<SearchResult[]>([]);
    const [isOpen, setIsOpen] = useState(false);
    const { chapters } = useChapters();
    const { posts } = usePosts();
    const { sectionsMap } = useAllSectionsGrouped();

    // Mapa de chapter.id → order_num para montar links de seções
    const chapterOrderMap = useMemo(() => {
        const map: Record<string, number> = {};
        chapters.forEach(c => { map[c.id] = c.order_num; });
        return map;
    }, [chapters]);

    // Lista plana de todas as seções
    const allSections = useMemo(
        () => Object.values(sectionsMap).flat(),
        [sectionsMap]
    );

    const handleSearch = useCallback((term: string) => {
        setSearchTerm(term);

        if (!term.trim()) {
            setResults([]);
            setIsOpen(false);
            return;
        }

        const lowerTerm = term.toLowerCase();
        const searchResults: SearchResult[] = [];

        // Capítulos
        chapters.forEach(chapter => {
            if (
                chapter.title.toLowerCase().includes(lowerTerm) ||
                (chapter.description && chapter.description.toLowerCase().includes(lowerTerm)) ||
                (chapter.tags || []).some(t => t.toLowerCase().includes(lowerTerm))
            ) {
                searchResults.push({
                    id: chapter.id,
                    title: chapter.title,
                    description: chapter.description,
                    type: 'chapter',
                    link: `/capitulo/${chapter.order_num}`,
                    category: 'Capítulo'
                });
            }
        });

        // Artigos
        posts.forEach(post => {
            if (
                post.title.toLowerCase().includes(lowerTerm) ||
                (post.description && post.description.toLowerCase().includes(lowerTerm)) ||
                post.author.toLowerCase().includes(lowerTerm) ||
                (post.tags || []).some(t => t.toLowerCase().includes(lowerTerm))
            ) {
                searchResults.push({
                    id: post.id,
                    title: post.title,
                    description: post.description,
                    type: 'post',
                    link: `/post/${post.slug}`,
                    category: 'Artigo'
                });
            }
        });

        // Subseções
        allSections.forEach(sec => {
            const orderNum = chapterOrderMap[sec.chapter_id];
            if (!orderNum) return;
            if (
                sec.title.toLowerCase().includes(lowerTerm) ||
                (sec.description && sec.description.toLowerCase().includes(lowerTerm)) ||
                (sec.subtitle && sec.subtitle.toLowerCase().includes(lowerTerm)) ||
                (sec.tags || []).some(t => t.toLowerCase().includes(lowerTerm))
            ) {
                searchResults.push({
                    id: sec.id,
                    title: sec.title,
                    description: sec.description || sec.subtitle,
                    type: 'section',
                    link: `/capitulo/${orderNum}/secao/${sec.id}`,
                    category: 'Subseção'
                });
            }
        });

        setResults(searchResults.slice(0, 12));
        setIsOpen(true);
    }, [chapters, posts]);

    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            if (!(e.target as Element).closest('.search-container')) {
                setIsOpen(false);
            }
        };

        document.addEventListener('click', handleClickOutside);
        return () => document.removeEventListener('click', handleClickOutside);
    }, []);

    const getIcon = (type: 'chapter' | 'section' | 'post') => {
        if (type === 'post') return 'article';
        if (type === 'section') return 'bookmark';
        return 'menu_book';
    };

    if (compact) {
        return (
            <div className="search-container relative w-full max-w-sm">
                <div className="relative">
                    <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-lg">search</span>
                    <input
                        type="text"
                        placeholder="Buscar capítulos e artigos..."
                        value={searchTerm}
                        onChange={(e) => handleSearch(e.target.value)}
                        onFocus={() => searchTerm && setIsOpen(true)}
                        className="w-full bg-slate-50 dark:bg-slate-900/40 border border-slate-200 dark:border-slate-800 rounded-xl py-2.5 pl-10 pr-4 focus:ring-2 focus:ring-primary/40 transition-all outline-none text-sm"
                    />
                </div>

                {/* Dropdown Results */}
                {isOpen && results.length > 0 && (
                    <div className="absolute top-full left-0 right-0 mt-2 bg-white dark:bg-card-dark rounded-xl shadow-xl border border-slate-100 dark:border-slate-800 overflow-hidden z-50">
                        {results.map((result) => (
                            <Link
                                key={`${result.type}-${result.id}`}
                                to={result.link}
                                onClick={() => { setIsOpen(false); setSearchTerm(''); }}
                                className="flex items-start gap-3 px-4 py-3 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors border-b border-slate-100 dark:border-slate-800 last:border-0"
                            >
                                <span className="material-symbols-outlined text-slate-400 text-lg shrink-0">{getIcon(result.type)}</span>
                                <div className="flex-1 min-w-0">
                                    <p className="text-sm font-medium text-slate-900 dark:text-white truncate">{result.title}</p>
                                    {result.description && (
                                        <p className="text-xs text-slate-500 dark:text-slate-400 truncate">{result.description}</p>
                                    )}
                                    <span className="text-[10px] text-primary font-bold uppercase tracking-widest mt-1 inline-block">{result.category}</span>
                                </div>
                            </Link>
                        ))}
                    </div>
                )}

                {isOpen && searchTerm && results.length === 0 && (
                    <div className="absolute top-full left-0 right-0 mt-2 bg-white dark:bg-card-dark rounded-xl shadow-xl border border-slate-100 dark:border-slate-800 p-6 text-center z-50">
                        <span className="material-symbols-outlined text-3xl text-slate-300 dark:text-slate-700 mb-2 block">search_off</span>
                        <p className="text-sm text-slate-500 dark:text-slate-400">Nenhum resultado encontrado</p>
                    </div>
                )}
            </div>
        );
    }

    // Full page search
    return (
        <div className="search-container max-w-2xl mx-auto mb-12">
            <div className="relative">
                <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 text-2xl">search</span>
                <input
                    type="text"
                    placeholder="Buscar capítulos, artigos e temas..."
                    value={searchTerm}
                    onChange={(e) => handleSearch(e.target.value)}
                    autoFocus
                    className="w-full bg-slate-50 dark:bg-slate-900/40 border border-slate-200 dark:border-slate-800 rounded-2xl py-4 pl-16 pr-6 focus:ring-2 focus:ring-primary/40 transition-all outline-none text-base"
                />
            </div>

            {/* Results Grid */}
            {searchTerm && (
                <div className="mt-8">
                    {results.length > 0 ? (
                        <div className="grid gap-4 md:gap-6">
                            <p className="text-sm font-bold text-slate-500 uppercase tracking-widest">{results.length} resultado(s) encontrado(s)</p>
                            {results.map((result) => (
                                <Link
                                    key={`${result.type}-${result.id}`}
                                    to={result.link}
                                    className="p-6 bg-white dark:bg-card-dark rounded-xl border border-slate-100 dark:border-slate-800 hover:shadow-lg hover:border-primary/30 transition-all group"
                                >
                                    <div className="flex items-start gap-4">
                                        <span className="material-symbols-outlined text-primary text-2xl">{getIcon(result.type)}</span>
                                        <div className="flex-1">
                                            <h3 className="text-lg font-bold text-slate-900 dark:text-white group-hover:text-primary transition-colors mb-2">
                                                {result.title}
                                            </h3>
                                            {result.description && (
                                                <p className="text-sm text-slate-600 dark:text-slate-400 mb-3">{result.description}</p>
                                            )}
                                            <span className="text-[10px] text-primary font-bold uppercase tracking-widest">{result.category}</span>
                                        </div>
                                        <span className="material-symbols-outlined text-slate-400 group-hover:translate-x-1 transition-transform">arrow_forward</span>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-16">
                            <span className="material-symbols-outlined text-6xl text-slate-300 dark:text-slate-700 mb-4 block">search_off</span>
                            <h3 className="text-xl font-bold mb-2">Nenhum resultado encontrado</h3>
                            <p className="text-slate-500 dark:text-slate-400">Tente procurar por outros termos ou navegue pelos capítulos.</p>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};
