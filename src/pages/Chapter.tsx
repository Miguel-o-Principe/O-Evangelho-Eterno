import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { chapters } from '../data/chapters';
import { CommentSection } from '../components/CommentSection';

// Para simplificar a demonstração e migração da estrutura de múltiplos arquivos HTML para uma SPA,
// vamos usar o Suspense e React.lazy para carregar os componentes de cada capítulo dinamicamente
// ou criar um mapa relacionando o ID ao componente correspondente.

const chapterComponents = {
    '1': React.lazy(() => import('./chapters/Chapter1').then(module => ({ default: module.Chapter1 }))),
    '2': React.lazy(() => import('./chapters/Chapter2').then(module => ({ default: module.Chapter2 }))),
    '3': React.lazy(() => import('./chapters/Chapter3').then(module => ({ default: module.Chapter3 }))),
    '4': React.lazy(() => import('./chapters/Chapter4').then(module => ({ default: module.Chapter4 }))),
    '4.1': React.lazy(() => import('./chapters/Chapter4_1').then(module => ({ default: module.Chapter4_1 }))),
    '5': React.lazy(() => import('./chapters/Chapter5').then(module => ({ default: module.Chapter5 }))),
    '6': React.lazy(() => import('./chapters/Chapter6').then(module => ({ default: module.Chapter6 }))),
};

export const Chapter = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();

    // Reset scroll at the top when changing chapters
    useEffect(() => {
        window.scrollTo(0, 0);
    }, [id]);

    if (!id || !chapterComponents[id as keyof typeof chapterComponents]) {
        return (
            <div className="flex flex-col items-center justify-center py-32 px-6 fade-up">
                <span className="material-symbols-outlined text-6xl text-slate-300 dark:text-slate-700 mb-6">menu_book</span>
                <h2 className="text-2xl font-bold mb-4">Capítulo não encontrado</h2>
                <p className="text-slate-500 mb-8 max-w-sm text-center">Este capítulo pode ainda não ter sido publicado ou o link está incorreto.</p>
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

    const ChapterComponent = chapterComponents[id as keyof typeof chapterComponents];

    return (
        <React.Suspense fallback={
            <div className="flex justify-center items-center py-32">
                <span className="material-symbols-outlined animate-spin text-4xl text-primary">sync</span>
            </div>
        }>
            <ChapterComponent />

            <section className="bg-white dark:bg-dark-bg pb-24 px-6 relative z-10 isolate pt-12">
                <CommentSection chapterId={id} />
            </section>
        </React.Suspense>
    );
};
