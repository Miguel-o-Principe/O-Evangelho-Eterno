import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import MDEditor from '@uiw/react-md-editor';
import { supabase } from '../lib/supabase';
import { useAuth } from '../contexts/AuthContext';
import { useChapters, ChapterSummary } from '../hooks/useChapters';

interface ChapterForm {
    order_num: number;
    title: string;
    subtitle: string;
    tag_line: string;
    image_url: string;
    description: string;
    content: string;
    read_time: number;
    published: boolean;
}

const emptyForm: ChapterForm = {
    order_num: 0,
    title: '',
    subtitle: '',
    tag_line: '',
    image_url: '',
    description: '',
    content: '',
    read_time: 30,
    published: false,
};

export const Admin = () => {
    const { user } = useAuth();
    const navigate = useNavigate();
    const { chapters, loading } = useChapters(true); // include unpublished
    const [editingId, setEditingId] = useState<string | null>(null);
    const [isCreating, setIsCreating] = useState(false);
    const [form, setForm] = useState<ChapterForm>(emptyForm);
    const [saving, setSaving] = useState(false);
    const [saveMsg, setSaveMsg] = useState('');
    const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);

    const isAdmin = user?.user_metadata?.is_admin === true;

    useEffect(() => {
        if (!isAdmin) {
            navigate('/');
        }
    }, [isAdmin, navigate]);

    const startEdit = (chap: ChapterSummary) => {
        setIsCreating(false);
        setEditingId(chap.id);
        // Fetch full chapter content
        supabase.from('chapters').select('*').eq('id', chap.id).single().then(({ data }) => {
            if (data) {
                setForm({
                    order_num: data.order_num,
                    title: data.title,
                    subtitle: data.subtitle,
                    tag_line: data.tag_line,
                    image_url: data.image_url,
                    description: data.description,
                    content: data.content,
                    read_time: data.read_time,
                    published: data.published,
                });
            }
        });
    };

    const startCreate = () => {
        setEditingId(null);
        setIsCreating(true);
        const nextOrder = chapters.length > 0 ? Math.max(...chapters.map(c => c.order_num)) + 1 : 1;
        setForm({ ...emptyForm, order_num: nextOrder });
    };

    const cancelEdit = () => {
        setEditingId(null);
        setIsCreating(false);
        setForm(emptyForm);
        setSaveMsg('');
    };

    const handleSave = async () => {
        setSaving(true);
        setSaveMsg('');

        if (editingId) {
            const { error } = await supabase.from('chapters').update(form).eq('id', editingId);
            if (error) setSaveMsg('❌ Erro: ' + error.message);
            else { setSaveMsg('✅ Capítulo salvo com sucesso!'); }
        } else {
            const { error } = await supabase.from('chapters').insert(form);
            if (error) setSaveMsg('❌ Erro: ' + error.message);
            else { setSaveMsg('✅ Capítulo criado com sucesso!'); cancelEdit(); }
        }

        setSaving(false);
        // refresh
        setTimeout(() => window.location.reload(), 1500);
    };

    const handleDelete = async (id: string) => {
        const { error } = await supabase.from('chapters').delete().eq('id', id);
        if (!error) {
            setDeleteConfirm(null);
            window.location.reload();
        }
    };

    const togglePublished = async (chap: ChapterSummary) => {
        await supabase.from('chapters').update({ published: !chap.published }).eq('id', chap.id);
        window.location.reload();
    };

    const showForm = editingId !== null || isCreating;

    return (
        <div className="min-h-screen bg-background-light dark:bg-dark-bg text-slate-800 dark:text-slate-100">
            {/* Header */}
            <header className="sticky top-0 z-40 glass-nav border-b border-slate-200 dark:border-white/10">
                <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <button onClick={() => navigate('/capitulos')} className="p-2 hover:bg-slate-100 dark:hover:bg-white/5 rounded-full transition-colors">
                            <span className="material-symbols-outlined">arrow_back</span>
                        </button>
                        <div>
                            <h1 className="font-bold text-lg leading-tight">Painel Admin</h1>
                            <p className="text-[10px] uppercase tracking-widest text-slate-500">Gerenciar Capítulos</p>
                        </div>
                    </div>
                    <button
                        onClick={startCreate}
                        className="flex items-center gap-2 px-5 py-2.5 bg-primary text-white font-bold rounded-xl shadow-lg shadow-primary/20 hover:brightness-110 transition-all text-sm"
                    >
                        <span className="material-symbols-outlined text-lg">add</span>
                        Novo Capítulo
                    </button>
                </div>
            </header>

            <div className="max-w-7xl mx-auto px-6 py-12">
                <div className={`grid ${showForm ? 'grid-cols-1 xl:grid-cols-2' : 'grid-cols-1'} gap-8`}>

                    {/* Chapter List */}
                    <div className="space-y-3">
                        <h2 className="text-sm font-bold uppercase tracking-widest text-slate-500 mb-6">
                            {chapters.length} Capítulos
                        </h2>

                        {loading ? (
                            <div className="flex justify-center py-12">
                                <span className="material-symbols-outlined animate-spin text-4xl text-primary">sync</span>
                            </div>
                        ) : chapters.map((chap) => (
                            <div key={chap.id} className={`flex items-center gap-4 p-4 rounded-2xl border transition-all ${editingId === chap.id ? 'border-primary bg-primary/5 dark:bg-primary/10' : 'border-slate-200 dark:border-white/5 bg-white dark:bg-card-dark hover:border-slate-300 dark:hover:border-white/10'}`}>
                                <div className="size-12 rounded-xl overflow-hidden shrink-0">
                                    <img src={chap.image_url} alt={chap.title} className="w-full h-full object-cover" />
                                </div>
                                <div className="flex-1 min-w-0">
                                    <div className="flex items-center gap-2">
                                        <span className="text-[10px] font-bold uppercase tracking-widest text-primary">Cap. {String(chap.order_num).padStart(2, '0')}</span>
                                        <span className={`text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full ${chap.published ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400' : 'bg-slate-100 text-slate-500 dark:bg-slate-800 dark:text-slate-400'}`}>
                                            {chap.published ? 'Publicado' : 'Rascunho'}
                                        </span>
                                    </div>
                                    <p className="font-bold text-sm truncate mt-0.5">{chap.title}</p>
                                </div>
                                <div className="flex items-center gap-1 shrink-0">
                                    <button
                                        onClick={() => togglePublished(chap)}
                                        title={chap.published ? 'Despublicar' : 'Publicar'}
                                        className="p-2 hover:bg-slate-100 dark:hover:bg-white/5 rounded-lg transition-colors"
                                    >
                                        <span className="material-symbols-outlined text-sm">{chap.published ? 'visibility_off' : 'visibility'}</span>
                                    </button>
                                    <button
                                        onClick={() => startEdit(chap)}
                                        title="Editar"
                                        className="p-2 hover:bg-primary/10 text-primary rounded-lg transition-colors"
                                    >
                                        <span className="material-symbols-outlined text-sm">edit</span>
                                    </button>
                                    <button
                                        onClick={() => navigate(`/capitulo/${chap.order_num}`)}
                                        title="Visualizar"
                                        className="p-2 hover:bg-slate-100 dark:hover:bg-white/5 rounded-lg transition-colors"
                                    >
                                        <span className="material-symbols-outlined text-sm">open_in_new</span>
                                    </button>
                                    {deleteConfirm === chap.id ? (
                                        <>
                                            <button onClick={() => handleDelete(chap.id)} className="px-3 py-1.5 bg-red-500 text-white text-[10px] font-bold rounded-lg hover:bg-red-600 transition-colors">Confirmar</button>
                                            <button onClick={() => setDeleteConfirm(null)} className="px-3 py-1.5 text-[10px] font-bold rounded-lg hover:bg-slate-100 dark:hover:bg-white/5 transition-colors">Cancelar</button>
                                        </>
                                    ) : (
                                        <button onClick={() => setDeleteConfirm(chap.id)} title="Excluir" className="p-2 hover:bg-red-50 dark:hover:bg-red-500/10 text-slate-400 hover:text-red-500 rounded-lg transition-colors">
                                            <span className="material-symbols-outlined text-sm">delete</span>
                                        </button>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Edit Form */}
                    {showForm && (
                        <div className="bg-white dark:bg-card-dark rounded-3xl border border-slate-200 dark:border-white/5 p-8 h-fit sticky top-24">
                            <div className="flex items-center justify-between mb-8">
                                <h2 className="font-bold text-lg">{isCreating ? 'Novo Capítulo' : 'Editar Capítulo'}</h2>
                                <button onClick={cancelEdit} className="p-2 hover:bg-slate-100 dark:hover:bg-white/5 rounded-full transition-colors">
                                    <span className="material-symbols-outlined">close</span>
                                </button>
                            </div>

                            <div className="space-y-5">
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-[10px] uppercase tracking-widest font-bold text-slate-500 mb-2">Número</label>
                                        <input
                                            type="number"
                                            value={form.order_num}
                                            onChange={e => setForm({ ...form, order_num: parseInt(e.target.value) })}
                                            className="w-full px-4 py-2.5 text-sm bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl outline-none focus:ring-2 focus:ring-primary/30 transition-all"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-[10px] uppercase tracking-widest font-bold text-slate-500 mb-2">Tempo (min)</label>
                                        <input
                                            type="number"
                                            value={form.read_time}
                                            onChange={e => setForm({ ...form, read_time: parseInt(e.target.value) })}
                                            className="w-full px-4 py-2.5 text-sm bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl outline-none focus:ring-2 focus:ring-primary/30 transition-all"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-[10px] uppercase tracking-widest font-bold text-slate-500 mb-2">Título (índice)</label>
                                    <input
                                        type="text"
                                        value={form.title}
                                        onChange={e => setForm({ ...form, title: e.target.value })}
                                        className="w-full px-4 py-2.5 text-sm bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl outline-none focus:ring-2 focus:ring-primary/30 transition-all"
                                        placeholder="Ex: A Árvore do Conhecimento"
                                    />
                                </div>

                                <div>
                                    <label className="block text-[10px] uppercase tracking-widest font-bold text-slate-500 mb-2">Subtítulo (header do capítulo)</label>
                                    <input
                                        type="text"
                                        value={form.subtitle}
                                        onChange={e => setForm({ ...form, subtitle: e.target.value })}
                                        className="w-full px-4 py-2.5 text-sm bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl outline-none focus:ring-2 focus:ring-primary/30 transition-all"
                                        placeholder="Ex: A Topografia do Desejo e a Desconstrução..."
                                    />
                                </div>

                                <div>
                                    <label className="block text-[10px] uppercase tracking-widest font-bold text-slate-500 mb-2">Tag / Linha Descritiva</label>
                                    <input
                                        type="text"
                                        value={form.tag_line}
                                        onChange={e => setForm({ ...form, tag_line: e.target.value })}
                                        className="w-full px-4 py-2.5 text-sm bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl outline-none focus:ring-2 focus:ring-primary/30 transition-all"
                                        placeholder="Ex: Relatório de Análise Psicanalítica"
                                    />
                                </div>

                                <div>
                                    <label className="block text-[10px] uppercase tracking-widest font-bold text-slate-500 mb-2">URL da Imagem de Capa</label>
                                    <input
                                        type="text"
                                        value={form.image_url}
                                        onChange={e => setForm({ ...form, image_url: e.target.value })}
                                        className="w-full px-4 py-2.5 text-sm bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl outline-none focus:ring-2 focus:ring-primary/30 transition-all"
                                        placeholder="/images/capitulo-1-bg.png"
                                    />
                                    {form.image_url && (
                                        <img src={form.image_url} alt="Preview" className="mt-2 h-24 w-full object-cover rounded-xl" />
                                    )}
                                </div>

                                <div>
                                    <label className="block text-[10px] uppercase tracking-widest font-bold text-slate-500 mb-2">Descrição (índice)</label>
                                    <textarea
                                        value={form.description}
                                        onChange={e => setForm({ ...form, description: e.target.value })}
                                        rows={2}
                                        className="w-full px-4 py-2.5 text-sm bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl outline-none focus:ring-2 focus:ring-primary/30 transition-all resize-none"
                                        placeholder="Breve descrição para o card do índice..."
                                    />
                                </div>

                                <div>
                                    <label className="block text-[10px] uppercase tracking-widest font-bold text-slate-500 mb-2">Conteúdo (Markdown)</label>
                                    <div data-color-mode="auto" className="rounded-xl overflow-hidden border border-slate-200 dark:border-slate-700">
                                        <MDEditor
                                            value={form.content}
                                            onChange={(val) => setForm({ ...form, content: val || '' })}
                                            height={500}
                                            preview="edit"
                                        />
                                    </div>
                                </div>

                                <div className="flex items-center justify-between p-4 bg-slate-50 dark:bg-slate-800/50 rounded-xl">
                                    <div>
                                        <p className="font-bold text-sm">Publicado</p>
                                        <p className="text-[11px] text-slate-500">Visível publicamente no site</p>
                                    </div>
                                    <button
                                        onClick={() => setForm({ ...form, published: !form.published })}
                                        className={`relative w-12 h-6 rounded-full transition-colors ${form.published ? 'bg-primary' : 'bg-slate-300 dark:bg-slate-600'}`}
                                    >
                                        <span className={`absolute top-0.5 left-0.5 size-5 bg-white rounded-full shadow transition-transform ${form.published ? 'translate-x-6' : ''}`} />
                                    </button>
                                </div>

                                {saveMsg && (
                                    <p className={`text-sm text-center font-bold py-2 rounded-xl ${saveMsg.startsWith('✅') ? 'text-green-600 bg-green-50 dark:bg-green-900/20' : 'text-red-500 bg-red-50 dark:bg-red-900/20'}`}>
                                        {saveMsg}
                                    </p>
                                )}

                                <div className="flex gap-3 pt-2">
                                    <button onClick={cancelEdit} className="flex-1 py-3 rounded-xl border border-slate-200 dark:border-slate-700 font-bold text-sm hover:bg-slate-50 dark:hover:bg-white/5 transition-colors">
                                        Cancelar
                                    </button>
                                    <button
                                        onClick={handleSave}
                                        disabled={saving}
                                        className="flex-1 py-3 rounded-xl bg-primary text-white font-bold text-sm hover:brightness-110 transition-all disabled:opacity-50 flex items-center justify-center gap-2"
                                    >
                                        {saving ? <span className="material-symbols-outlined animate-spin text-lg">sync</span> : <span className="material-symbols-outlined text-lg">save</span>}
                                        {saving ? 'Salvando...' : 'Salvar Capítulo'}
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};
