import React from 'react';
import { Link } from 'react-router-dom';

export const MainFooter = () => {
    return (
        <footer className="mt-20 flex flex-col gap-8 px-8 sm:px-20 py-12 text-center border-t border-slate-200 dark:border-slate-800">
            <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-4">
                <Link className="text-slate-500 dark:text-slate-400 hover:text-primary transition-colors text-sm font-medium" to="/">Home</Link>
                <Link className="text-slate-500 dark:text-slate-400 hover:text-primary transition-colors text-sm font-medium" to="/sobre-a-obra">Sobre a Obra</Link>
                <Link className="text-slate-500 dark:text-slate-400 hover:text-primary transition-colors text-sm font-medium" to="/?action=register">Cadastro no Portal</Link>
            </div>
            <div className="flex flex-col gap-2">
                <p className="text-slate-400 dark:text-slate-500 text-xs font-medium uppercase tracking-widest">O Evangelho Eterno e a Arquitetura da Graça</p>
                <p className="text-slate-400 text-xs italic">© 2026. Escrito com propósito.</p>
            </div>
        </footer>
    );
};
