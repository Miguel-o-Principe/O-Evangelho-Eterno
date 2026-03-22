import React, { useState } from 'react';
import { useNotifications } from '../hooks/useNotifications';
import { Link } from 'react-router-dom';

export const NotificationsCenter: React.FC<{ isOpen: boolean; onClose: () => void }> = ({ isOpen, onClose }) => {
    const { notifications, unreadCount, markAsRead, markAllAsRead, deleteNotification, clearAllNotifications } = useNotifications();

    if (!isOpen) return null;

    const getIcon = (type: string) => {
        switch (type) {
            case 'chapter':
                return 'menu_book';
            case 'comment':
                return 'comment';
            case 'author':
                return 'person';
            case 'system':
            default:
                return 'info';
        }
    };

    const getColor = (type: string) => {
        switch (type) {
            case 'chapter':
                return 'bg-blue-50 dark:bg-blue-500/10 border-blue-200 dark:border-blue-500/30 text-blue-700 dark:text-blue-400';
            case 'comment':
                return 'bg-purple-50 dark:bg-purple-500/10 border-purple-200 dark:border-purple-500/30 text-purple-700 dark:text-purple-400';
            case 'author':
                return 'bg-amber-50 dark:bg-amber-500/10 border-amber-200 dark:border-amber-500/30 text-amber-700 dark:text-amber-400';
            case 'system':
            default:
                return 'bg-slate-50 dark:bg-slate-500/10 border-slate-200 dark:border-slate-500/30 text-slate-700 dark:text-slate-400';
        }
    };

    return (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-start justify-end pt-20 pr-4 sm:pr-6 md:pr-8">
            <div className="bg-white dark:bg-card-dark rounded-2xl shadow-2xl border border-slate-100 dark:border-slate-800 w-full max-w-md max-h-[90vh] flex flex-col overflow-hidden animate-slideIn">
                {/* Header */}
                <div className="flex items-center justify-between p-6 border-b border-slate-100 dark:border-slate-800">
                    <div>
                        <h2 className="text-xl font-bold">Notificações</h2>
                        {unreadCount > 0 && (
                            <p className="text-xs text-slate-500">{unreadCount} {unreadCount === 1 ? 'nova' : 'novas'}</p>
                        )}
                    </div>
                    <button
                        onClick={onClose}
                        className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full transition-colors"
                    >
                        <span className="material-symbols-outlined">close</span>
                    </button>
                </div>

                {/* Toolbar */}
                {notifications.length > 0 && (
                    <div className="flex items-center gap-2 px-6 py-3 border-b border-slate-100 dark:border-slate-800 text-xs">
                        <button
                            onClick={markAllAsRead}
                            className="flex-1 px-3 py-2 rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors font-medium"
                        >
                            Marcar como lido
                        </button>
                        <button
                            onClick={clearAllNotifications}
                            className="flex-1 px-3 py-2 rounded-lg text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-500/10 transition-colors font-medium"
                        >
                            Limpar
                        </button>
                    </div>
                )}

                {/* Notifications List */}
                <div className="flex-1 overflow-y-auto">
                    {notifications.length === 0 ? (
                        <div className="flex flex-col items-center justify-center h-64 text-center px-6">
                            <span className="material-symbols-outlined text-4xl text-slate-300 dark:text-slate-700 mb-4">notifications_none</span>
                            <p className="text-slate-500 dark:text-slate-400 text-sm">
                                Nenhuma notificação no momento
                            </p>
                        </div>
                    ) : (
                        <div className="divide-y divide-slate-100 dark:divide-slate-800">
                            {notifications.map((notif) => (
                                <div
                                    key={notif.id}
                                    className={`p-4 border-l-4 transition-colors ${
                                        notif.read
                                            ? 'bg-slate-50/50 dark:bg-slate-900/20 border-l-slate-300 dark:border-l-slate-700'
                                            : 'bg-primary/5 border-l-primary'
                                    }`}
                                >
                                    <div className="flex items-start gap-3 group">
                                        <span className={`material-symbols-outlined text-lg shrink-0 mt-0.5 ${getColor(notif.type).split(' ')[0]}`}>
                                            {getIcon(notif.type)}
                                        </span>
                                        <div className="flex-1">
                                            <h3 className="font-bold text-sm text-slate-900 dark:text-white">
                                                {notif.title}
                                            </h3>
                                            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed mt-1">
                                                {notif.message}
                                            </p>
                                            <div className="flex items-center gap-2 mt-2">
                                                {notif.link && (
                                                    <Link
                                                        to={notif.link}
                                                        onClick={() => markAsRead(notif.id)}
                                                        className="text-xs text-primary font-bold hover:underline"
                                                    >
                                                        Ver mais
                                                    </Link>
                                                )}
                                                {!notif.read && (
                                                    <button
                                                        onClick={() => markAsRead(notif.id)}
                                                        className="text-xs text-slate-500 hover:text-primary transition-colors"
                                                    >
                                                        Marcar lido
                                                    </button>
                                                )}
                                                <button
                                                    onClick={() => deleteNotification(notif.id)}
                                                    className="text-xs text-red-500 hover:text-red-700 transition-colors ml-auto"
                                                >
                                                    Remover
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};
