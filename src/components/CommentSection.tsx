import React, { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { useAuth } from '../contexts/AuthContext';

interface Comment {
    id: string;
    chapter_id: string;
    user_name: string;
    content: string;
    created_at: string;
    user_id: string;
    likes?: string[];
    author_loved?: boolean;
    parent_id?: string | null;
}

interface CommentSectionProps {
    chapterId: string;
    title?: string;
    subtitle?: string;
    placeholder?: string;
    emptyMessage?: string;
    icon?: string;
}

export const CommentSection: React.FC<CommentSectionProps> = ({
    chapterId,
    title = "Comentários e Reflexões",
    subtitle = "Compartilhe sua visão sobre este capítulo com a comunidade.",
    placeholder = "Compartilhe sua reflexão sobre este capítulo...",
    emptyMessage = "Nenhum comentário ainda. Seja o primeiro a compartilhar sua reflexão!",
    icon = "forum"
}) => {
    const { user, session } = useAuth();
    const [comments, setComments] = useState<Comment[]>([]);
    const [newComment, setNewComment] = useState('');
    const [loading, setLoading] = useState(true);
    const [submitting, setSubmitting] = useState(false);
    const [errorMsg, setErrorMsg] = useState('');
    const [replyingTo, setReplyingTo] = useState<string | null>(null);
    const [replyContent, setReplyContent] = useState('');

    useEffect(() => {
        fetchComments();
        // Set up realtime subscriptions (inserts and updates)
        const channel = supabase
            .channel(`public:comentarios:chapter_id=eq.${chapterId}`)
            .on('postgres_changes', {
                event: 'INSERT',
                schema: 'public',
                table: 'comentarios',
                filter: `chapter_id=eq.${chapterId}`
            }, (payload) => {
                setComments(current => [payload.new as Comment, ...current]);
            })
            .on('postgres_changes', {
                event: 'UPDATE',
                schema: 'public',
                table: 'comentarios',
                filter: `chapter_id=eq.${chapterId}`
            }, (payload) => {
                setComments(current => current.map(comment => comment.id === payload.new.id ? payload.new as Comment : comment));
            })
            .subscribe();

        return () => {
            supabase.removeChannel(channel);
        };
    }, [chapterId]);

    const fetchComments = async () => {
        try {
            const { data, error } = await supabase
                .from('comentarios')
                .select('*')
                .eq('chapter_id', chapterId)
                .order('created_at', { ascending: false });

            if (error) throw error;
            setComments(data || []);
        } catch (error: any) {
            console.error('Erro ao buscar comentários:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!session || !user) {
            setErrorMsg('Você precisa estar logado para comentar.');
            return;
        }

        if (!newComment.trim()) return;

        setSubmitting(true);
        setErrorMsg('');

        try {
            const { error } = await supabase
                .from('comentarios')
                .insert([
                    {
                        chapter_id: chapterId,
                        user_id: user.id,
                        user_name: user.user_metadata?.full_name || 'Usuário do Portal',
                        content: newComment.trim(),
                        parent_id: null
                    }
                ]);

            if (error) throw error;

            setNewComment('');
            // Optional: fetchComments() here if not using realtime subscription
        } catch (error: any) {
            console.error('Erro ao postar comentário:', error);
            setErrorMsg('Erro ao publicar comentário: ' + error.message);
        } finally {
            setSubmitting(false);
        }
    };

    const handleReplySubmit = async (e: React.FormEvent, parentId: string) => {
        e.preventDefault();

        if (!session || !user) {
            setErrorMsg('Você precisa estar logado para responder.');
            return;
        }

        if (!replyContent.trim()) return;

        setSubmitting(true);
        setErrorMsg('');

        try {
            const { error } = await supabase
                .from('comentarios')
                .insert([
                    {
                        chapter_id: chapterId,
                        user_id: user.id,
                        user_name: user.user_metadata?.full_name || 'Usuário do Portal',
                        content: replyContent.trim(),
                        parent_id: parentId
                    }
                ]);

            if (error) throw error;

            setReplyContent('');
            setReplyingTo(null);
        } catch (error: any) {
            console.error('Erro ao postar resposta:', error);
            setErrorMsg('Erro ao publicar resposta: ' + error.message);
        } finally {
            setSubmitting(false);
        }
    };

    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return new Intl.DateTimeFormat('pt-BR', {
            day: 'numeric',
            month: 'short',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        }).format(date);
    };

    const isAuthor = user?.email === 'smashertx@gmail.com';

    const handleLike = async (commentId: string, currentLikes: string[]) => {
        if (!user) return;

        const hasLiked = currentLikes?.includes(user.id);
        const newLikes = hasLiked
            ? currentLikes.filter(id => id !== user.id)
            : [...(currentLikes || []), user.id];

        // Optimistic UI update
        setComments(current => current.map(c =>
            c.id === commentId ? { ...c, likes: newLikes } : c
        ));

        try {
            await supabase
                .from('comentarios')
                .update({ likes: newLikes })
                .eq('id', commentId);
        } catch (error) {
            console.error('Erro ao curtir:', error);
            // Revert on error
            setComments(current => current.map(c =>
                c.id === commentId ? { ...c, likes: currentLikes } : c
            ));
        }
    };

    const handleLove = async (commentId: string, currentLove: boolean) => {
        if (!isAuthor) return;

        const newLove = !currentLove;

        // Optimistic UI update
        setComments(current => current.map(c =>
            c.id === commentId ? { ...c, author_loved: newLove } : c
        ));

        try {
            await supabase
                .from('comentarios')
                .update({ author_loved: newLove })
                .eq('id', commentId);
        } catch (error) {
            console.error('Erro ao amar:', error);
            // Revert on error
            setComments(current => current.map(c =>
                c.id === commentId ? { ...c, author_loved: currentLove } : c
            ));
        }
    };

    return (
        <div className="w-full max-w-4xl mx-auto mt-16 pt-16 border-t border-slate-200 dark:border-slate-800">
            <div className="flex flex-col items-center gap-3 mb-8 text-center">
                <span className="material-symbols-outlined text-primary text-4xl mb-2">{icon}</span>
                <h2 className="text-2xl sm:text-3xl font-bold italic">{title}</h2>
                {subtitle && <p className="text-slate-500 dark:text-slate-400 text-sm mt-1">{subtitle}</p>}
            </div>

            {/* Form */}
            <div className="bg-white dark:bg-card-dark rounded-2xl p-6 shadow-sm border border-slate-100 dark:border-slate-800 mb-12">
                {!session ? (
                    <div className="text-center py-6">
                        <p className="text-slate-500 mb-4 text-sm">Cadastre-se ou faça login no Portal para participar das discussões da comunidade.</p>
                        <a href="/" className="inline-flex items-center gap-2 px-6 py-2 bg-primary text-white font-bold rounded-lg hover:brightness-110 transition-all text-xs uppercase tracking-widest">
                            <span className="material-symbols-outlined text-sm">login</span> Fazer Login
                        </a>
                    </div>
                ) : (
                    <form onSubmit={handleSubmit}>
                        <div className="flex items-start gap-4">
                            <div className="hidden sm:flex size-10 rounded-full bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 items-center justify-center shrink-0 overflow-hidden">
                                <img
                                    src={user.user_metadata?.avatar_url || `https://ui-avatars.com/api/?name=${user.user_metadata?.full_name || 'User'}&background=random`}
                                    alt="Avatar"
                                    className="w-full h-full object-cover"
                                />
                            </div>
                            <div className="flex-1 w-full">
                                {errorMsg && <div className="p-3 mb-3 text-xs font-bold text-red-600 bg-red-100 rounded-lg">{errorMsg}</div>}
                                <div className="mb-2">
                                    <span className="text-xs font-bold text-slate-700 dark:text-slate-300">Publicando como: </span>
                                    <span className="text-xs text-primary">{user.user_metadata?.full_name || 'Usuário'}</span>
                                </div>
                                <textarea
                                    required
                                    rows={4}
                                    placeholder={placeholder}
                                    className="w-full bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-700 rounded-xl p-4 focus:ring-2 focus:ring-primary/40 focus:border-primary/40 transition-all outline-none text-sm resize-none"
                                    value={newComment}
                                    onChange={(e) => setNewComment(e.target.value)}
                                    disabled={submitting}
                                ></textarea>
                                <div className="flex justify-end mt-3">
                                    <button
                                        type="submit"
                                        disabled={submitting || !newComment.trim()}
                                        className="flex items-center gap-2 px-6 py-2.5 bg-primary text-white font-bold rounded-xl hover:brightness-110 transition-all text-xs uppercase tracking-widest disabled:opacity-50 disabled:cursor-not-allowed shadow-md shadow-primary/20"
                                    >
                                        {submitting ? (
                                            <span className="material-symbols-outlined animate-spin text-sm">sync</span>
                                        ) : (
                                            <>
                                                <span className="material-symbols-outlined text-sm">send</span> Publicar
                                            </>
                                        )}
                                    </button>
                                </div>
                            </div>
                        </div>
                    </form>
                )}
            </div>

            {/* Comments List */}
            <div className="space-y-6">
                <h3 className="text-sm font-bold uppercase tracking-widest text-slate-400 mb-6">
                    {comments.length} {comments.length === 1 ? 'Comentário' : 'Comentários'}
                </h3>

                {loading ? (
                    <div className="flex justify-center py-12">
                        <span className="material-symbols-outlined animate-spin text-primary text-3xl">sync</span>
                    </div>
                ) : comments.length === 0 ? (
                    <div className="text-center py-12 px-6 bg-slate-50 dark:bg-slate-900/30 rounded-2xl border border-dashed border-slate-200 dark:border-slate-800">
                        <span className="material-symbols-outlined text-4xl text-slate-300 dark:text-slate-700 mb-2">speaker_notes_off</span>
                        <p className="text-slate-500 text-sm">{emptyMessage}</p>
                    </div>
                ) : (
                    <div className="space-y-6">
                        {comments.filter(c => !c.parent_id).map((comment) => (
                            <div key={comment.id} className="animate-in fade-in slide-in-from-bottom-2 duration-500">
                                <div className="flex gap-4">
                                    <div className="hidden sm:flex size-10 rounded-full bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 items-center justify-center shrink-0 overflow-hidden">
                                        <img
                                            src={`https://ui-avatars.com/api/?name=${comment.user_name}&background=random`}
                                            alt="Avatar"
                                            className="w-full h-full object-cover"
                                        />
                                    </div>
                                    <div className="flex-1 bg-white dark:bg-card-dark rounded-2xl p-5 shadow-sm border border-slate-100 dark:border-slate-800 relative group">
                                        <div className="flex items-baseline justify-between mb-3 border-b border-slate-50 dark:border-slate-800/50 pb-3">
                                            <div className="flex items-center gap-2">
                                                <h4 className="font-bold text-sm text-slate-900 dark:text-slate-100 flex items-center gap-1.5">
                                                    {comment.user_name}
                                                    {isAuthor && comment.user_id === user?.id && (
                                                        <span className="material-symbols-outlined text-primary text-[14px] leading-none" title="Autor">verified</span>
                                                    )}
                                                </h4>
                                            </div>
                                            <span className="text-[10px] text-slate-400 font-medium">{formatDate(comment.created_at)}</span>
                                        </div>
                                        <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed whitespace-pre-wrap mb-4">
                                            {comment.content}
                                        </p>

                                        {/* Interactions Footer */}
                                        <div className="flex items-center gap-4 mt-2 justify-between">
                                            <div className="flex items-center gap-4">
                                                <button
                                                    onClick={() => handleLike(comment.id, comment.likes || [])}
                                                    disabled={!user}
                                                    className={`flex items-center gap-1.5 text-xs font-bold transition-all ${comment.likes?.includes(user?.id || '') ? 'text-primary' : 'text-slate-400 hover:text-slate-600 dark:hover:text-slate-300'} ${!user && 'opacity-50 cursor-not-allowed'}`}
                                                >
                                                    <span className={`material-symbols-outlined text-[18px] ${comment.likes?.includes(user?.id || '') ? 'font-variation-fill' : ''}`}>thumb_up</span>
                                                    {comment.likes?.length || 0}
                                                </button>

                                                <button
                                                    onClick={() => {
                                                        setReplyingTo(replyingTo === comment.id ? null : comment.id);
                                                        setReplyContent('');
                                                    }}
                                                    className="flex items-center gap-1.5 text-xs font-bold text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 transition-all"
                                                >
                                                    <span className="material-symbols-outlined text-[18px]">reply</span>
                                                    Responder
                                                </button>

                                                {comment.author_loved && (
                                                    <div className="flex items-center gap-1.5 px-2 py-1 bg-primary/5 rounded-full border border-primary/10">
                                                        <span className="material-symbols-outlined text-[14px] font-variation-fill text-primary">favorite</span>
                                                        <span className="text-[9px] font-bold text-primary uppercase tracking-widest">O Autor Amou</span>
                                                    </div>
                                                )}
                                            </div>

                                            {isAuthor && (
                                                <button
                                                    onClick={() => handleLove(comment.id, !!comment.author_loved)}
                                                    className={`flex items-center gap-1.5 text-xs font-bold transition-all opacity-0 group-hover:opacity-100 ${comment.author_loved ? 'text-primary' : 'text-slate-300 hover:text-primary'}`}
                                                    title="Marcar com 'Amei'"
                                                >
                                                    <span className={`material-symbols-outlined text-[18px] ${comment.author_loved ? 'font-variation-fill' : ''}`}>favorite</span>
                                                </button>
                                            )}
                                        </div>
                                    </div>
                                </div>

                                {/* Respostas */}
                                {comments.filter(c => c.parent_id === comment.id).length > 0 && (
                                    <div className="mt-4 ml-8 sm:ml-14 space-y-4 relative before:absolute before:inset-y-0 before:-left-6 before:w-[2px] before:bg-slate-100 dark:before:bg-slate-800 before:rounded-full">
                                        {comments.filter(c => c.parent_id === comment.id).map(reply => (
                                            <div key={reply.id} className="flex gap-3 animate-in fade-in duration-500 relative">
                                                <div className="absolute top-5 -left-6 w-4 h-[2px] bg-slate-100 dark:bg-slate-800"></div>
                                                <div className="hidden sm:flex size-8 rounded-full bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 items-center justify-center shrink-0 overflow-hidden">
                                                    <img
                                                        src={`https://ui-avatars.com/api/?name=${reply.user_name}&background=random`}
                                                        alt="Avatar"
                                                        className="w-full h-full object-cover"
                                                    />
                                                </div>
                                                <div className="flex-1 bg-white dark:bg-card-dark rounded-xl p-4 shadow-sm border border-slate-100 dark:border-slate-800 relative group text-sm">
                                                    <div className="flex items-baseline justify-between mb-2">
                                                        <h4 className="font-bold text-xs text-slate-900 dark:text-slate-100 flex items-center gap-1.5">
                                                            {reply.user_name}
                                                            {isAuthor && reply.user_id === user?.id && (
                                                                <span className="material-symbols-outlined text-primary text-[12px] leading-none" title="Autor">verified</span>
                                                            )}
                                                        </h4>
                                                        <span className="text-[9px] text-slate-400 font-medium">{formatDate(reply.created_at)}</span>
                                                    </div>
                                                    <p className="text-slate-600 dark:text-slate-300 leading-relaxed whitespace-pre-wrap mb-3 text-xs">
                                                        {reply.content}
                                                    </p>
                                                    <div className="flex items-center gap-4 justify-between">
                                                        <div className="flex items-center gap-4">
                                                            <button
                                                                onClick={() => handleLike(reply.id, reply.likes || [])}
                                                                disabled={!user}
                                                                className={`flex items-center gap-1 text-[10px] font-bold transition-all ${reply.likes?.includes(user?.id || '') ? 'text-primary' : 'text-slate-400 hover:text-slate-600 dark:hover:text-slate-300'} ${!user && 'opacity-50 cursor-not-allowed'}`}
                                                            >
                                                                <span className={`material-symbols-outlined text-[14px] ${reply.likes?.includes(user?.id || '') ? 'font-variation-fill' : ''}`}>thumb_up</span>
                                                                {reply.likes?.length || 0}
                                                            </button>
                                                            {reply.author_loved && (
                                                                <div className="flex items-center gap-1 px-1.5 py-0.5 bg-primary/5 rounded-full border border-primary/10">
                                                                    <span className="material-symbols-outlined text-[10px] font-variation-fill text-primary">favorite</span>
                                                                </div>
                                                            )}
                                                        </div>
                                                        {isAuthor && (
                                                            <button
                                                                onClick={() => handleLove(reply.id, !!reply.author_loved)}
                                                                className={`flex items-center gap-1.5 text-xs font-bold transition-all opacity-0 group-hover:opacity-100 ${reply.author_loved ? 'text-primary' : 'text-slate-300 hover:text-primary'}`}
                                                                title="Marcar com 'Amei'"
                                                            >
                                                                <span className={`material-symbols-outlined text-[14px] ${reply.author_loved ? 'font-variation-fill' : ''}`}>favorite</span>
                                                            </button>
                                                        )}
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                )}

                                {/* Form de Resposta */}
                                {replyingTo === comment.id && (
                                    <div className="mt-4 ml-8 sm:ml-14 animate-in slide-in-from-top-2 fade-in duration-200">
                                        <form onSubmit={(e) => handleReplySubmit(e, comment.id)}>
                                            <div className="flex items-start gap-3">
                                                <div className="hidden sm:flex size-8 rounded-full bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 items-center justify-center shrink-0 overflow-hidden">
                                                    <img
                                                        src={user?.user_metadata?.avatar_url || `https://ui-avatars.com/api/?name=${user?.user_metadata?.full_name || 'User'}&background=random`}
                                                        alt="Avatar"
                                                        className="w-full h-full object-cover"
                                                    />
                                                </div>
                                                <div className="flex-1">
                                                    <textarea
                                                        required
                                                        rows={2}
                                                        placeholder="Escreva sua resposta..."
                                                        className="w-full bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-700 rounded-lg p-3 focus:ring-2 focus:ring-primary/40 focus:border-primary/40 transition-all outline-none text-xs resize-none"
                                                        value={replyContent}
                                                        onChange={(e) => setReplyContent(e.target.value)}
                                                        disabled={submitting}
                                                    ></textarea>
                                                    <div className="flex justify-end gap-2 mt-2">
                                                        <button
                                                            type="button"
                                                            onClick={() => {
                                                                setReplyingTo(null);
                                                                setReplyContent('');
                                                            }}
                                                            className="px-4 py-1.5 text-xs font-bold text-slate-500 hover:text-slate-700 dark:hover:text-slate-300 transition-all uppercase tracking-wider"
                                                            disabled={submitting}
                                                        >
                                                            Cancelar
                                                        </button>
                                                        <button
                                                            type="submit"
                                                            disabled={submitting || !replyContent.trim()}
                                                            className="flex items-center gap-1.5 px-4 py-1.5 bg-primary text-white font-bold rounded-lg hover:brightness-110 transition-all text-xs uppercase tracking-widest disabled:opacity-50 shadow-md shadow-primary/20"
                                                        >
                                                            {submitting ? (
                                                                <span className="material-symbols-outlined animate-spin text-[14px]">sync</span>
                                                            ) : (
                                                                <>
                                                                    <span className="material-symbols-outlined text-[14px]">send</span> Enviar
                                                                </>
                                                            )}
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        </form>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};
