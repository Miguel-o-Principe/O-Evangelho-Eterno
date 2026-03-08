import React from 'react';
import { useTheme } from '../contexts/ThemeContext';
import { useReader } from '../contexts/ReaderContext';
import { Link } from 'react-router-dom';

interface ReaderSettingsProps {
    isOpen: boolean;
    onClose: () => void;
}

export const ReaderSettings: React.FC<ReaderSettingsProps> = ({ isOpen, onClose }) => {
    const { setTheme } = useTheme();
    const { fontSize, setFontSize } = useReader();

    if (!isOpen) return null;

    return (
        <>
            <div className="fixed inset-0 z-[55]" onClick={onClose} />
            <div
                id="reader-settings"
                className="absolute right-6 top-20 w-64 bg-white dark:bg-dark-card border border-slate-200 dark:border-white/10 rounded-2xl shadow-2xl p-6 z-[60] animate-slideIn"
            >
                <h4 className="text-[10px] uppercase tracking-widest font-bold mb-4 opacity-50 text-slate-900 dark:text-white">
                    Definições de Leitura
                </h4>
                <div className="space-y-6">
                    <div>
                        <div className="flex justify-between text-xs mb-3 text-slate-900 dark:text-white">
                            <span>Tamanho do Texto</span>
                            <span id="font-size-label">{Math.round((fontSize / 18) * 100)}%</span>
                        </div>
                        <input
                            type="range"
                            min="14" max="24" step="1"
                            value={fontSize}
                            onChange={(e) => setFontSize(parseInt(e.target.value, 10))}
                            className="w-full h-1.5 bg-slate-200 dark:bg-slate-800 rounded-lg appearance-none cursor-pointer accent-primary"
                        />
                    </div>
                    <div className="grid grid-cols-3 gap-2">
                        <button onClick={() => setTheme('light')} className="h-8 rounded border border-slate-200 bg-white" title="Claro"></button>
                        <button onClick={() => setTheme('sepia')} className="h-8 rounded border border-amber-200 bg-[#f4ecd8]" title="Sépia"></button>
                        <button onClick={() => setTheme('dark')} className="h-8 rounded border border-slate-800 bg-dark-bg" title="Escuro"></button>
                    </div>
                    <div className="pt-4 border-t border-slate-100 dark:border-white/5">
                        <Link to="/configuracoes" className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-primary hover:opacity-80 transition-opacity">
                            <span className="material-symbols-outlined text-sm">settings</span>
                            Configurações do Portal
                        </Link>
                    </div>
                </div>
            </div>
        </>
    );
};
