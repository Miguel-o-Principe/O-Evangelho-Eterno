import React, { useState } from 'react';
import { Link, Outlet } from 'react-router-dom';
import { MainNavbar } from '../components/MainNavbar';
import { MainFooter } from '../components/MainFooter';
import { NotificationsCenter } from '../components/NotificationsCenter';

export const MainLayout = () => {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [notificationsOpen, setNotificationsOpen] = useState(false);

    return (
        <div className="bg-background-light dark:bg-background-dark text-slate-900 dark:text-slate-100 font-display min-h-screen antialiased transition-colors duration-300">
            <div className="relative flex min-h-screen w-full flex-col overflow-x-hidden">

                {/* Mobile Menu Overlay */}
                <div className={`fixed inset-0 z-50 bg-background-dark/95 flex flex-col items-center justify-center gap-8 transition-transform duration-300 md:hidden ${mobileMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}>
                    <button onClick={() => setMobileMenuOpen(false)} className="absolute top-6 right-6 p-2 text-white">
                        <span className="material-symbols-outlined text-3xl">close</span>
                    </button>
                    <Link onClick={() => setMobileMenuOpen(false)} to="/sobre-a-obra" className="text-2xl font-bold hover:text-primary transition-colors text-white">Sobre a Obra</Link>
                    <Link onClick={() => setMobileMenuOpen(false)} to="/artigos" className="text-2xl font-bold hover:text-primary transition-colors text-white">Artigos</Link>
                    <Link onClick={() => setMobileMenuOpen(false)} to="/sobre-o-autor" className="text-2xl font-bold hover:text-primary transition-colors text-white">Sobre o Autor</Link>
                </div>

                <div className="layout-container flex h-full grow flex-col">
                    <div className="flex flex-1 justify-center py-5">
                        <div className="layout-content-container flex flex-col w-full flex-1">
                            <MainNavbar 
                                onMenuToggle={() => setMobileMenuOpen(true)} 
                                onNotificationsToggle={() => setNotificationsOpen(!notificationsOpen)}
                            />
                            <Outlet />
                            <MainFooter />
                        </div>
                    </div>
                </div>

                {/* Notifications Center */}
                <NotificationsCenter isOpen={notificationsOpen} onClose={() => setNotificationsOpen(false)} />
            </div>
        </div>
    );
};
