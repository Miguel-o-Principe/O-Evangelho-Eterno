import React, { useState, useRef, useEffect } from 'react';
import { useTheme } from '../contexts/ThemeContext';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { supabase } from '../lib/supabase';

export const Settings = () => {
    const { theme, toggleTheme } = useTheme();
    const { user } = useAuth();
    const [activeSection, setActiveSection] = useState<'profile' | 'account' | 'preferences' | 'notifications'>('profile');
    const [saving, setSaving] = useState(false);
    const [success, setSuccess] = useState(false);
    const [errorMsg, setErrorMsg] = useState('');
    const navigate = useNavigate();
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [avatarUrl, setAvatarUrl] = useState<string | null>(null);

    // Notifications State
    const [notifications, setNotifications] = useState({
        newChapters: true,
        authorInteractions: true,
        weeklyNewsletter: false
    });

    useEffect(() => {
        if (user?.user_metadata?.avatar_url) {
            setAvatarUrl(user.user_metadata.avatar_url);
        }

        // Load notifications from metadata if they exist
        if (user?.user_metadata?.notifications) {
            setNotifications(user.user_metadata.notifications);
        }
    }, [user]);

    const handleAvatarUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
        try {
            setSaving(true);
            setErrorMsg('');
            if (!event.target.files || event.target.files.length === 0) {
                throw new Error('Você deve selecionar uma imagem para enviar.');
            }

            const file = event.target.files[0];
            const fileExt = file.name.split('.').pop();
            const filePath = `${user?.id}-${Math.random()}.${fileExt}`;

            const { error: uploadError } = await supabase.storage
                .from('OEE')
                .upload(filePath, file);

            if (uploadError) {
                throw uploadError;
            }

            const { data } = supabase.storage.from('OEE').getPublicUrl(filePath);

            const { error: updateError } = await supabase.auth.updateUser({
                data: { avatar_url: data.publicUrl }
            });

            if (updateError) {
                throw updateError;
            }

            setAvatarUrl(data.publicUrl);
            setSuccess(true);
            setTimeout(() => setSuccess(false), 2000);
        } catch (error: any) {
            setErrorMsg(error.message);
        } finally {
            setSaving(false);
        }
    };

    const handleSaveProfile = async (e: React.FormEvent) => {
        e.preventDefault();
        setSaving(true);
        setErrorMsg('');

        const formData = new FormData(e.target as HTMLFormElement);
        const fullName = (formData.get('fullName') as string).trim();
        const title = (formData.get('title') as string) || '';
        const shortBio = (formData.get('shortBio') as string) || '';

        if (!fullName) {
            setErrorMsg('Nome de exibição é obrigatório.');
            setSaving(false);
            return;
        }

        const { error } = await supabase.auth.updateUser({
            data: {
                full_name: fullName,
                title: title,
                short_bio: shortBio
            }
        });

        if (error) {
            setErrorMsg(error.message);
            setSaving(false);
        } else {
            setSaving(false);
            setSuccess(true);
            setTimeout(() => setSuccess(false), 2000);
        }
    };

    const handleLogout = async (e: React.MouseEvent) => {
        e.preventDefault();
        await supabase.auth.signOut();
        navigate('/');
    };

    const handleUpdatePassword = async (e: React.FormEvent) => {
        e.preventDefault();
        setSaving(true);
        setErrorMsg('');

        const formData = new FormData(e.target as HTMLFormElement);
        const newPassword = formData.get('newPassword') as string;
        const confirmPassword = formData.get('confirmPassword') as string;

        if (newPassword !== confirmPassword) {
            setErrorMsg('As senhas não coincidem.');
            setSaving(false);
            return;
        }

        if (newPassword.length < 6) {
            setErrorMsg('A nova senha deve ter no mínimo 6 caracteres.');
            setSaving(false);
            return;
        }

        const { error } = await supabase.auth.updateUser({ password: newPassword });

        if (error) {
            setErrorMsg(error.message);
            setSaving(false);
        } else {
            setSaving(false);
            setSuccess(true);
            (e.target as HTMLFormElement).reset();
            setTimeout(() => setSuccess(false), 2000);
        }
    };

    const handleNotificationChange = async (key: keyof typeof notifications) => {
        const newNotifications = {
            ...notifications,
            [key]: !notifications[key]
        };

        setNotifications(newNotifications);

        // Try to save to Supabase silently
        try {
            await supabase.auth.updateUser({
                data: { notifications: newNotifications }
            });
        } catch (error) {
            console.error('Failed to save notification preference', error);
            // Revert on fail
            setNotifications(notifications);
        }
    };

    return (
        <main className="max-w-4xl mx-auto px-6 py-12 lg:py-20 fade-up flex-1 w-full">
            <style>{`
                .fade-up { animation: fadeUp 0.8s ease-out forwards; }
                @keyframes fadeUp {
                    from { opacity: 0; transform: translateY(20px); }
                    to { opacity: 1; transform: translateY(0); }
                }
            `}</style>

            <div className="flex flex-col md:flex-row items-start gap-12 w-full">
                {/* Sidebar */}
                <aside className="w-full md:w-64 space-y-2 shrink-0">
                    <h1 className="text-3xl font-bold italic mb-8">Configurações</h1>

                    <button onClick={() => setActiveSection('profile')} className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm transition-all ${activeSection === 'profile' ? 'bg-primary text-white font-bold shadow-lg shadow-primary/20' : 'hover:bg-slate-200 dark:hover:bg-slate-800 font-medium'}`}>
                        <span className="material-symbols-outlined">person</span>
                        Perfil
                    </button>
                    <button onClick={() => setActiveSection('account')} className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm transition-all ${activeSection === 'account' ? 'bg-primary text-white font-bold shadow-lg shadow-primary/20' : 'hover:bg-slate-200 dark:hover:bg-slate-800 font-medium'}`}>
                        <span className="material-symbols-outlined">lock</span>
                        Conta e Segurança
                    </button>
                    <button onClick={() => setActiveSection('preferences')} className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm transition-all ${activeSection === 'preferences' ? 'bg-primary text-white font-bold shadow-lg shadow-primary/20' : 'hover:bg-slate-200 dark:hover:bg-slate-800 font-medium'}`}>
                        <span className="material-symbols-outlined">settings_brightness</span>
                        Preferências
                    </button>
                    <button onClick={() => setActiveSection('notifications')} className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm transition-all ${activeSection === 'notifications' ? 'bg-primary text-white font-bold shadow-lg shadow-primary/20' : 'hover:bg-slate-200 dark:hover:bg-slate-800 font-medium'}`}>
                        <span className="material-symbols-outlined">notifications</span>
                        Notificações
                    </button>

                    <div className="pt-8">
                        <button onClick={handleLogout} className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-primary font-bold text-sm hover:bg-primary/5 transition-all">
                            <span className="material-symbols-outlined">logout</span>
                            Sair do Portal
                        </button>
                    </div>
                </aside>

                {/* Content Area */}
                <div className="flex-1 w-full max-w-full">

                    {/* Profile Section */}
                    {activeSection === 'profile' && (
                        <section className="space-y-8 animate-in fade-in slide-in-from-bottom-2 duration-300">
                            <div className="bg-white dark:bg-card-dark p-8 rounded-3xl border border-slate-100 dark:border-slate-800 shadow-sm">
                                <h2 className="text-xl font-bold mb-6 italic">Informações do Perfil</h2>

                                <div className="flex items-center gap-6 mb-8">
                                    <div className="size-20 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center border-2 border-primary overflow-hidden shrink-0">
                                        <img src={avatarUrl || "https://ui-avatars.com/api/?name=" + (user?.user_metadata?.full_name || 'U') + "&background=random"} alt="Avatar" className="w-full h-full object-cover" />
                                    </div>
                                    <div>
                                        <input
                                            type="file"
                                            accept="image/png, image/jpeg"
                                            className="hidden"
                                            ref={fileInputRef}
                                            onChange={handleAvatarUpload}
                                            disabled={saving}
                                        />
                                        <button
                                            onClick={() => fileInputRef.current?.click()}
                                            disabled={saving}
                                            className="px-4 py-2 bg-slate-100 dark:bg-slate-800 rounded-lg text-xs font-bold hover:bg-primary hover:text-white transition-all disabled:opacity-50"
                                        >
                                            {saving ? 'Enviando...' : 'Alterar Foto'}
                                        </button>
                                        <p className="text-[10px] text-slate-500 mt-2">JPG ou PNG, máx 2MB.</p>
                                    </div>
                                </div>
                                {errorMsg && activeSection === 'profile' && <div className="p-3 mb-4 text-xs font-bold text-red-600 bg-red-100 rounded-lg">{errorMsg}</div>}

                                <form className="space-y-6" onSubmit={handleSaveProfile}>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div className="space-y-1.5">
                                            <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400 ml-1">Nome de Exibição</label>
                                            <input type="text" name="fullName" placeholder="Seu Nome" defaultValue={user?.user_metadata?.full_name || ''} className="w-full bg-slate-50 dark:bg-slate-900/40 border border-slate-100 dark:border-slate-800 rounded-xl py-3 px-4 focus:ring-2 focus:ring-primary/40 transition-all outline-none text-sm" />
                                        </div>
                                        <div className="space-y-1.5">
                                            <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400 ml-1">Título / Ocupação</label>
                                            <input type="text" name="title" defaultValue={user?.user_metadata?.title || 'Autor & Mensageiro'} className="w-full bg-slate-50 dark:bg-slate-900/40 border border-slate-100 dark:border-slate-800 rounded-xl py-3 px-4 focus:ring-2 focus:ring-primary/40 transition-all outline-none text-sm" />
                                        </div>
                                    </div>
                                    <div className="space-y-1.5">
                                        <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400 ml-1">Biografia Curta</label>
                                        <textarea rows={3} name="shortBio" defaultValue={user?.user_metadata?.short_bio || 'Eu sou...'} placeholder="Conte um pouco sobre você" className="w-full bg-slate-50 dark:bg-slate-900/40 border border-slate-100 dark:border-slate-800 rounded-xl py-3 px-4 focus:ring-2 focus:ring-primary/40 transition-all outline-none text-sm"></textarea>
                                    </div>
                                    <button type="submit" disabled={saving || success} className={`px-8 py-3 font-bold rounded-xl shadow-lg transition-all text-sm flex items-center gap-2 ${success ? 'bg-emerald-500 text-white shadow-emerald-500/20' : 'bg-primary text-white shadow-primary/20 hover:brightness-110'}`}>
                                        {saving && <span className="material-symbols-outlined animate-spin text-sm">sync</span>}
                                        {success && <span className="material-symbols-outlined text-sm">check</span>}
                                        {saving ? 'Salvando...' : success ? 'Salvo com Sucesso' : 'Salvar Alterações'}
                                    </button>
                                </form>
                            </div>
                        </section>
                    )}

                    {/* Account Section */}
                    {activeSection === 'account' && (
                        <section className="space-y-8 animate-in fade-in slide-in-from-bottom-2 duration-300">
                            <div className="bg-white dark:bg-card-dark p-8 rounded-3xl border border-slate-100 dark:border-slate-800 shadow-sm">
                                <h2 className="text-xl font-bold mb-6 italic">Segurança da Conta</h2>

                                <form className="space-y-6" onSubmit={handleUpdatePassword}>
                                    <div className="space-y-1.5">
                                        <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400 ml-1">E-mail da Conta</label>
                                        <input type="email" value={user?.email || ''} disabled className="w-full bg-slate-100 dark:bg-slate-800/40 border border-slate-100 dark:border-slate-800 rounded-xl py-3 px-4 text-slate-500 text-sm cursor-not-allowed" />
                                    </div>

                                    <div className="pt-4 border-t border-slate-100 dark:border-slate-800">
                                        <div className="flex items-center justify-between mb-4">
                                            <h3 className="text-sm font-bold">Alterar Senha</h3>
                                            <button type="button" onClick={() => alert(`Você pode alterar a senha pelos campos abaixo. Se esqueceu de fato, utilize a função Recupere Senha no Login.`)} className="text-[10px] font-bold text-primary hover:underline uppercase tracking-widest">Aviso</button>
                                        </div>

                                        {errorMsg && <div className="p-3 mb-4 text-xs font-bold text-red-600 bg-red-100 rounded-lg">{errorMsg}</div>}

                                        <div className="space-y-4">
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                <div className="space-y-1.5">
                                                    <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400 ml-1">Nova Senha</label>
                                                    <input type="password" name="newPassword" required className="w-full bg-slate-50 dark:bg-slate-900/40 border border-slate-100 dark:border-slate-800 rounded-xl py-3 px-4 focus:ring-2 focus:ring-primary/40 transition-all outline-none text-sm" />
                                                </div>
                                                <div className="space-y-1.5">
                                                    <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400 ml-1">Confirmar Nova Senha</label>
                                                    <input type="password" name="confirmPassword" required className="w-full bg-slate-50 dark:bg-slate-900/40 border border-slate-100 dark:border-slate-800 rounded-xl py-3 px-4 focus:ring-2 focus:ring-primary/40 transition-all outline-none text-sm" />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <button type="submit" disabled={saving || success} className={`px-8 py-3 font-bold rounded-xl shadow-lg transition-all text-sm flex items-center gap-2 ${success ? 'bg-emerald-500 text-white shadow-emerald-500/20' : 'bg-primary text-white shadow-primary/20 hover:brightness-110'}`}>
                                        {saving && <span className="material-symbols-outlined animate-spin text-sm">sync</span>}
                                        {success && <span className="material-symbols-outlined text-sm">check</span>}
                                        {saving ? 'Salvando...' : success ? 'Salvo com Sucesso' : 'Atualizar Senha'}
                                    </button>
                                </form>
                            </div>
                        </section>
                    )}

                    {/* Preferences Section */}
                    {activeSection === 'preferences' && (
                        <section className="space-y-8 animate-in fade-in slide-in-from-bottom-2 duration-300">
                            <div className="bg-white dark:bg-card-dark p-8 rounded-3xl border border-slate-100 dark:border-slate-800 shadow-sm">
                                <h2 className="text-xl font-bold mb-6 italic">Preferências do Leitor</h2>

                                <div className="space-y-8">
                                    <div className="space-y-4">
                                        <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Tema do Portal</label>
                                        <div className="grid grid-cols-2 max-w-sm gap-4">
                                            <button onClick={toggleTheme} className={`flex flex-col items-center gap-3 p-4 rounded-2xl border-2 transition-all group ${theme !== 'dark' ? 'border-primary' : 'border-slate-100 dark:border-slate-800'}`}>
                                                <div className="size-10 rounded-full bg-white border border-slate-200 flex items-center justify-center">
                                                    <span className={`material-symbols-outlined ${theme !== 'dark' ? 'text-primary' : 'text-slate-400'}`}>light_mode</span>
                                                </div>
                                                <span className="text-xs font-bold">Claro</span>
                                            </button>
                                            <button onClick={toggleTheme} className={`flex flex-col items-center gap-3 p-4 rounded-2xl border-2 transition-all group ${theme === 'dark' ? 'border-primary' : 'border-slate-100 dark:border-slate-800'}`}>
                                                <div className="size-10 rounded-full bg-slate-900 border border-slate-700 flex items-center justify-center">
                                                    <span className={`material-symbols-outlined ${theme === 'dark' ? 'text-primary' : 'text-slate-400'}`}>dark_mode</span>
                                                </div>
                                                <span className="text-xs font-bold">Escuro</span>
                                            </button>
                                        </div>
                                        <p className="text-xs text-slate-500 dark:text-slate-400 mt-2">Durante a leitura dos capítulos há configurações avançadas de Sépia e Tamanho da Fonte.</p>
                                    </div>
                                </div>
                            </div>
                        </section>
                    )}

                    {/* Notifications Section */}
                    {activeSection === 'notifications' && (
                        <section className="space-y-8 animate-in fade-in slide-in-from-bottom-2 duration-300">
                            <div className="bg-white dark:bg-card-dark p-8 rounded-3xl border border-slate-100 dark:border-slate-800 shadow-sm">
                                <h2 className="text-xl font-bold mb-6 italic">Notificações</h2>

                                <div className="space-y-6">
                                    <div className="flex items-center justify-between p-4 rounded-2xl bg-slate-50 dark:bg-slate-900/40">
                                        <div>
                                            <h3 className="text-sm font-bold">Novos Capítulos</h3>
                                            <p className="text-[10px] text-slate-500">Receba um aviso quando um novo capítulo for publicado.</p>
                                        </div>
                                        <label className="relative inline-flex items-center cursor-pointer">
                                            <input type="checkbox" checked={notifications.newChapters} onChange={() => handleNotificationChange('newChapters')} className="sr-only peer" />
                                            <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer dark:bg-slate-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-primary"></div>
                                        </label>
                                    </div>
                                    <div className="flex items-center justify-between p-4 rounded-2xl bg-slate-50 dark:bg-slate-900/40">
                                        <div>
                                            <h3 className="text-sm font-bold">Interações do Autor</h3>
                                            <p className="text-[10px] text-slate-500">Seja notificado quando o autor responder seus comentários.</p>
                                        </div>
                                        <label className="relative inline-flex items-center cursor-pointer">
                                            <input type="checkbox" checked={notifications.authorInteractions} onChange={() => handleNotificationChange('authorInteractions')} className="sr-only peer" />
                                            <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer dark:bg-slate-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-primary"></div>
                                        </label>
                                    </div>
                                    <div className="flex items-center justify-between p-4 rounded-2xl bg-slate-50 dark:bg-slate-900/40">
                                        <div>
                                            <h3 className="text-sm font-bold">Newsletter Semanal</h3>
                                            <p className="text-[10px] text-slate-500">Resumo das discussões teológicas da semana.</p>
                                        </div>
                                        <label className="relative inline-flex items-center cursor-pointer">
                                            <input type="checkbox" checked={notifications.weeklyNewsletter} onChange={() => handleNotificationChange('weeklyNewsletter')} className="sr-only peer" />
                                            <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer dark:bg-slate-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-primary"></div>
                                        </label>
                                    </div>
                                </div>
                            </div>
                        </section>
                    )}

                </div>
            </div>

        </main>
    );
};
