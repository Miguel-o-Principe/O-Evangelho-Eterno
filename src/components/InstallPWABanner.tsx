import React, { useEffect, useState } from 'react';

interface BeforeInstallPromptEvent extends Event {
    prompt: () => Promise<void>;
    userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>;
}

export const InstallPWABanner = () => {
    const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
    const [visible, setVisible] = useState(false);
    const [isIOS, setIsIOS] = useState(false);

    useEffect(() => {
        if (localStorage.getItem('pwa-banner-dismissed')) return;

        const ios = /iphone|ipad|ipod/i.test(navigator.userAgent) && !(window as any).MSStream;
        const standalone = (window.navigator as any).standalone === true ||
            window.matchMedia('(display-mode: standalone)').matches;

        if (standalone) return; // already installed

        if (ios) {
            setIsIOS(true);
            setVisible(true);
            return;
        }

        // Check if prompt was already captured before React mounted
        const existing = (window as any).__pwaInstallPrompt as BeforeInstallPromptEvent | undefined;
        if (existing) {
            setDeferredPrompt(existing);
            setVisible(true);
            return;
        }

        // Listen for future prompt
        const handler = (e: Event) => {
            (window as any).__pwaInstallPrompt = e;
            setDeferredPrompt(e as BeforeInstallPromptEvent);
            setVisible(true);
        };
        window.addEventListener('beforeinstallprompt', handler);

        // Fallback: show manual instructions after 4s if no prompt fired
        const timer = setTimeout(() => {
            if (!deferredPrompt && !localStorage.getItem('pwa-banner-dismissed')) {
                setVisible(true);
            }
        }, 4000);

        return () => {
            window.removeEventListener('beforeinstallprompt', handler);
            clearTimeout(timer);
        };
    }, []);

    const handleInstall = async () => {
        if (!deferredPrompt) return;
        await deferredPrompt.prompt();
        const { outcome } = await deferredPrompt.userChoice;
        if (outcome === 'accepted') dismiss();
        else setDeferredPrompt(null);
    };

    const dismiss = () => {
        localStorage.setItem('pwa-banner-dismissed', '1');
        setVisible(false);
    };

    if (!visible) return null;

    return (
        <div className="fixed bottom-0 left-0 right-0 z-50 p-4 flex justify-center">
            <div className="w-full max-w-lg bg-slate-900 dark:bg-slate-800 border border-slate-700 rounded-2xl shadow-2xl shadow-black/40 flex items-center gap-4 px-5 py-4">
                <img src="/images/icon-192.png" alt="App icon" className="w-12 h-12 rounded-xl shrink-0" />
                <div className="flex-1 min-w-0">
                    <p className="text-white font-semibold text-sm leading-tight">Instalar o app</p>
                    {isIOS ? (
                        <p className="text-slate-400 text-xs mt-0.5">
                            Toque em <span className="inline-block align-middle">
                                <span className="material-symbols-outlined text-base leading-none">ios_share</span>
                            </span> e depois <strong>Adicionar à Tela de Início</strong>
                        </p>
                    ) : deferredPrompt ? (
                        <p className="text-slate-400 text-xs mt-0.5">Acesse rapidamente como um app nativo</p>
                    ) : (
                        <p className="text-slate-400 text-xs mt-0.5">
                            No menu do navegador, toque em <strong>Adicionar à tela inicial</strong>
                        </p>
                    )}
                </div>
                {!isIOS && deferredPrompt && (
                    <button
                        onClick={handleInstall}
                        className="shrink-0 bg-primary text-white text-xs font-bold px-4 py-2 rounded-lg hover:opacity-90 transition-opacity"
                    >
                        Instalar
                    </button>
                )}
                <button onClick={dismiss} className="shrink-0 text-slate-500 hover:text-slate-300 transition-colors">
                    <span className="material-symbols-outlined text-xl">close</span>
                </button>
            </div>
        </div>
    );
};
