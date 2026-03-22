import React from 'react';
import { Link } from 'react-router-dom';
import { SearchBar } from '../components/SearchBar';

export const Search = () => {
    return (
        <>
            {/* Header */}
            <header className="relative py-24 md:py-32 px-6">
                <div className="max-w-5xl mx-auto">
                    <div className="flex items-center gap-4 mb-6">
                        <Link to="/capitulos" className="flex items-center gap-2 text-slate-500 hover:text-primary transition-colors text-sm">
                            <span className="material-symbols-outlined text-lg">arrow_back</span>
                            Voltar
                        </Link>
                    </div>
                    <div className="text-center">
                        <div className="w-12 h-[2px] bg-primary rounded-full mx-auto mb-8"></div>
                        <h1 className="text-4xl md:text-6xl font-serif font-bold text-slate-900 dark:text-white mb-6 italic">
                            Buscar
                        </h1>
                        <p className="text-slate-600 dark:text-slate-400 text-lg max-w-2xl mx-auto font-light">
                            Encontre capítulos, artigos e conteúdo de seu interesse.
                        </p>
                    </div>
                </div>
            </header>

            {/* Search Component */}
            <main className="max-w-5xl mx-auto px-6 pb-24">
                <SearchBar />
            </main>
        </>
    );
};
