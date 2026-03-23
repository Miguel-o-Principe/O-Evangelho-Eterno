import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import MDEditor from '@uiw/react-md-editor';
import { useAuth } from '../contexts/AuthContext';
import { useChapters, ChapterSummary } from '../hooks/useChapters';
import { useAllSectionsGrouped, SectionSummary } from '../hooks/useChapterSections';
import { usePosts, PostMeta } from '../hooks/usePosts';
import { supabase } from '../lib/supabase';
import { TagInput } from '../components/TagInput';

// ─── Form types ────────────────────────────────────────────────────────────────
interface ChapterForm {
    order_num: number; title: string; subtitle: string; tag_line: string;
    image_url: string; description: string; content: string; read_time: number; published: boolean; tags: string[];
}
interface SectionForm {
    chapter_id: string; order_num: number; title: string; subtitle: string; tag_line: string;
    description: string; content: string; read_time: number; published: boolean; tags: string[];
}
interface PostForm {
    title: string; description: string; author: string; slug: string;
    content: string; cover_image: string; read_time: number; published: boolean; tags: string[];
}

const emptyChapterForm: ChapterForm = { order_num: 0, title: '', subtitle: '', tag_line: '', image_url: '', description: '', content: '', read_time: 30, published: false, tags: [] };
const emptySectionForm: SectionForm = { chapter_id: '', order_num: 1, title: '', subtitle: '', tag_line: '', description: '', content: '', read_time: 15, published: false, tags: [] };
const emptyPostForm: PostForm = { title: '', description: '', author: '', slug: '', content: '', cover_image: '', read_time: 15, published: true, tags: [] };

type EditMode = 'chapter' | 'section' | 'post' | null;

// ─── Shared Form Panel ─────────────────────────────────────────────────────────
const FormPanel = ({ title, onClose, onSave, saving, saveMsg, children }: { title: string; onClose: () => void; onSave: () => void; saving: boolean; saveMsg: string; children: React.ReactNode; }) => (
    <div className="bg-white dark:bg-card-dark rounded-3xl border border-slate-200 dark:border-white/5 p-8 h-fit sticky top-24 overflow-y-auto max-h-[calc(100vh-7rem)]">
        <div className="flex items-center justify-between mb-8">
            <h2 className="font-bold text-lg">{title}</h2>
            <button onClick={onClose} className="p-2 hover:bg-slate-100 dark:hover:bg-white/5 rounded-full transition-colors">
                <span className="material-symbols-outlined">close</span>
            </button>
        </div>
        <div className="space-y-5">
            {children}
            {saveMsg && (
                <p className={`text-sm text-center font-bold py-2 rounded-xl ${saveMsg.startsWith('✅') ? 'text-green-600 bg-green-50 dark:bg-green-900/20' : 'text-red-500 bg-red-50 dark:bg-red-900/20'}`}>{saveMsg}</p>
            )}
            <div className="flex gap-3 pt-2">
                <button onClick={onClose} className="flex-1 py-3 rounded-xl border border-slate-200 dark:border-slate-700 font-bold text-sm hover:bg-slate-50 dark:hover:bg-white/5 transition-colors">Cancelar</button>
                <button onClick={onSave} disabled={saving} className="flex-1 py-3 rounded-xl bg-primary text-white font-bold text-sm hover:brightness-110 transition-all disabled:opacity-50 flex items-center justify-center gap-2">
                    {saving ? <span className="material-symbols-outlined animate-spin text-lg">sync</span> : <span className="material-symbols-outlined text-lg">save</span>}
                    {saving ? 'Salvando...' : 'Salvar'}
                </button>
            </div>
        </div>
    </div>
);

// ─── Toggle component ──────────────────────────────────────────────────────────
const Toggle = ({ value, onChange }: { value: boolean; onChange: (v: boolean) => void }) => (
    <button onClick={() => onChange(!value)} className={`relative w-12 h-6 rounded-full transition-colors ${value ? 'bg-primary' : 'bg-slate-300 dark:bg-slate-600'}`}>
        <span className={`absolute top-0.5 left-0.5 size-5 bg-white rounded-full shadow transition-transform ${value ? 'translate-x-6' : ''}`} />
    </button>
);

// ─── Text field ────────────────────────────────────────────────────────────────
const Field = ({ label, value, onChange, placeholder, type = 'text' }: { label: string; value: string | number; onChange: (v: string) => void; placeholder?: string; type?: string }) => (
    <div>
        <label className="block text-[10px] uppercase tracking-widest font-bold text-slate-500 mb-2">{label}</label>
        <input type={type} value={value} onChange={e => onChange(e.target.value)} placeholder={placeholder}
            className="w-full px-4 py-2.5 text-sm bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl outline-none focus:ring-2 focus:ring-primary/30 transition-all" />
    </div>
);

// ─── Main Admin Component ──────────────────────────────────────────────────────
export const Admin = () => {
    const { user } = useAuth();
    const navigate = useNavigate();
    const { chapters, loading: chapLoading } = useChapters(true);
    const { sectionsMap, loading: secLoading } = useAllSectionsGrouped(true);
    const { posts, loading: postsLoading } = usePosts(true);

    const [expandedChapter, setExpandedChapter] = useState<string | null>(null);
    const [activeTab, setActiveTab] = useState<'chapters' | 'posts'>('chapters');
    const [editMode, setEditMode] = useState<EditMode>(null);
    const [editingChapterId, setEditingChapterId] = useState<string | null>(null);
    const [editingSectionId, setEditingSectionId] = useState<string | null>(null);
    const [editingPostId, setEditingPostId] = useState<string | null>(null);
    const [chapterForm, setChapterForm] = useState<ChapterForm>(emptyChapterForm);
    const [sectionForm, setSectionForm] = useState<SectionForm>(emptySectionForm);
    const [postForm, setPostForm] = useState<PostForm>(emptyPostForm);
    const [saving, setSaving] = useState(false);
    const [saveMsg, setSaveMsg] = useState('');
    const [deleteConfirm, setDeleteConfirm] = useState<{ id: string; type: 'chapter' | 'section' | 'post' } | null>(null);
    const [inlineEdit, setInlineEdit] = useState<{ id: string; field: string; value: string } | null>(null);

    const isAdmin = user?.user_metadata?.is_admin === true;
    useEffect(() => { if (!isAdmin) navigate('/'); }, [isAdmin, navigate]);

    // ── Edit chapter ──
    const startEditChapter = async (chap: ChapterSummary) => {
        setActiveTab('chapters');
        setEditMode('chapter');
        setEditingChapterId(chap.id);
        setEditingSectionId(null);
        const { data } = await supabase.from('chapters').select('*').eq('id', chap.id).single();
        if (data) setChapterForm({ order_num: data.order_num, title: data.title, subtitle: data.subtitle, tag_line: data.tag_line, image_url: data.image_url, description: data.description, content: data.content, read_time: data.read_time, published: data.published, tags: data.tags || [] });
    };

    const startCreateChapter = () => {
        setActiveTab('chapters');
        setEditMode('chapter');
        setEditingChapterId(null);
        setEditingSectionId(null);
        const nextOrder = chapters.length > 0 ? Math.max(...chapters.map(c => c.order_num)) + 1 : 1;
        setChapterForm({ ...emptyChapterForm, order_num: nextOrder });
        setSaveMsg('');
    };

    const saveChapter = async () => {
        setSaving(true); setSaveMsg('');
        if (editingChapterId) {
            const { error } = await supabase.from('chapters').update(chapterForm).eq('id', editingChapterId);
            setSaveMsg(error ? '❌ ' + error.message : '✅ Salvo!');
        } else {
            const { error } = await supabase.from('chapters').insert(chapterForm);
            setSaveMsg(error ? '❌ ' + error.message : '✅ Capítulo criado!');
            if (!error) { cancelEdit(); }
        }
        setSaving(false);
        if (!saving) setTimeout(() => window.location.reload(), 1200);
    };

    // ── Edit section ──
    const startEditSection = async (sec: SectionSummary) => {
        setActiveTab('chapters');
        setEditMode('section');
        setEditingSectionId(sec.id);
        setEditingChapterId(null);
        const { data } = await supabase.from('chapter_sections').select('*').eq('id', sec.id).single();
        if (data) setSectionForm({ chapter_id: data.chapter_id, order_num: data.order_num, title: data.title, subtitle: data.subtitle, tag_line: data.tag_line, description: data.description, content: data.content, read_time: data.read_time, published: data.published, tags: data.tags || [] });
    };

    const startCreateSection = (chap: ChapterSummary) => {
        setActiveTab('chapters');
        setEditMode('section');
        setEditingSectionId(null);
        setEditingChapterId(null);
        setExpandedChapter(chap.id);
        const existing = sectionsMap[chap.id] || [];
        const nextOrder = existing.length > 0 ? Math.max(...existing.map(s => s.order_num)) + 1 : 1;
        setSectionForm({ ...emptySectionForm, chapter_id: chap.id, order_num: nextOrder });
        setSaveMsg('');
    };

    const saveSection = async () => {
        setSaving(true); setSaveMsg('');
        if (editingSectionId) {
            const { error } = await supabase.from('chapter_sections').update(sectionForm).eq('id', editingSectionId);
            setSaveMsg(error ? '❌ ' + error.message : '✅ Salvo!');
        } else {
            const { error } = await supabase.from('chapter_sections').insert(sectionForm);
            setSaveMsg(error ? '❌ ' + error.message : '✅ Seção criada!');
            if (!error) { cancelEdit(); }
        }
        setSaving(false);
        if (!saving) setTimeout(() => window.location.reload(), 1200);
    };

    const cancelEdit = () => { setEditMode(null); setEditingChapterId(null); setEditingSectionId(null); setEditingPostId(null); setSaveMsg(''); };

    // ── Edit post ──
    const startEditPost = async (post: PostMeta) => {
        setActiveTab('posts');
        setEditMode('post');
        setEditingPostId(post.id);
        setEditingChapterId(null);
        setEditingSectionId(null);
        const { data } = await supabase.from('posts').select('*').eq('id', post.id).single();
        if (data) {
            setPostForm({
                title: data.title,
                description: data.description,
                author: data.author,
                slug: data.slug,
                content: data.content,
                cover_image: data.cover_image,
                read_time: data.read_time,
                published: data.published,
                tags: data.tags || [],
            });
        }
    };

    const startCreatePost = () => {
        setActiveTab('posts');
        setEditMode('post');
        setEditingPostId(null);
        setEditingChapterId(null);
        setEditingSectionId(null);
        setPostForm(emptyPostForm);
        setSaveMsg('');
    };

    const savePost = async () => {
        setSaving(true);
        setSaveMsg('');
        if (editingPostId) {
            const { error } = await supabase.from('posts').update({
                title: postForm.title,
                description: postForm.description,
                author: postForm.author,
                slug: postForm.slug,
                content: postForm.content,
                cover_image: postForm.cover_image,
                read_time: postForm.read_time,
                published: postForm.published,
                tags: postForm.tags,
            }).eq('id', editingPostId);
            setSaveMsg(error ? '❌ ' + error.message : '✅ Salvo!');
        } else {
            const { error } = await supabase.from('posts').insert({
                title: postForm.title,
                description: postForm.description,
                author: postForm.author,
                slug: postForm.slug,
                content: postForm.content,
                cover_image: postForm.cover_image,
                read_time: postForm.read_time,
                published: postForm.published,
                tags: postForm.tags,
                date: new Date().toISOString(),
            });
            setSaveMsg(error ? '❌ ' + error.message : '✅ Artigo criado!');
            if (!error) { cancelEdit(); }
        }
        setSaving(false);
        if (!saving) setTimeout(() => window.location.reload(), 1200);
    };

    const saveInlineEdit = async (id: string, table: 'chapters' | 'chapter_sections' | 'posts', field: string, value: string) => {
        const parsed: any = field === 'read_time' ? (parseInt(value) || 0) : value;
        await supabase.from(table).update({ [field]: parsed }).eq('id', id);
        setInlineEdit(null);
        window.location.reload();
    };

    const togglePublished = async (id: string, table: 'chapters' | 'chapter_sections' | 'posts', current: boolean) => {
        await supabase.from(table).update({ published: !current }).eq('id', id);
        window.location.reload();
    };

    const handleDelete = async () => {
        if (!deleteConfirm) return;
        const table = deleteConfirm.type === 'chapter' ? 'chapters' : deleteConfirm.type === 'section' ? 'chapter_sections' : 'posts';
        await supabase.from(table).delete().eq('id', deleteConfirm.id);
        setDeleteConfirm(null);
        window.location.reload();
    };

    const showForm = editMode !== null;
    const currentTab = activeTab;

    const normalizeSlug = (value: string) => {
        return value.toLowerCase().replace(/[^a-z0-9-]/g, '-');
    };

    return (
        <div className="min-h-screen bg-background-light dark:bg-dark-bg text-slate-800 dark:text-slate-100">
            {/* Tabs */}
            <div className="border-b border-slate-200 dark:border-white/5 sticky top-16 z-30 bg-background-light dark:bg-dark-bg">
                <div className="max-w-7xl mx-auto px-6 flex gap-8">
                    <button
                        onClick={() => { setActiveTab('chapters'); setEditMode(null); setEditingChapterId(null); setEditingSectionId(null); setEditingPostId(null); }}
                        className={`py-4 px-2 font-bold text-sm uppercase tracking-widest border-b-2 transition-all ${activeTab === 'chapters' ? 'border-primary text-primary' : 'border-transparent text-slate-500 hover:text-slate-700 dark:hover:text-slate-300'}`}
                    >
                        <span className="material-symbols-outlined inline mr-2 text-base align-middle">menu_book</span>
                        Capítulos & Seções ({chapters.length})
                    </button>
                    <button
                        onClick={() => { setActiveTab('posts'); setEditMode(null); setEditingChapterId(null); setEditingSectionId(null); setEditingPostId(null); }}
                        className={`py-4 px-2 font-bold text-sm uppercase tracking-widest border-b-2 transition-all ${activeTab === 'posts' ? 'border-primary text-primary' : 'border-transparent text-slate-500 hover:text-slate-700 dark:hover:text-slate-300'}`}
                    >
                        <span className="material-symbols-outlined inline mr-2 text-base align-middle">article</span>
                        Artigos ({posts.length})
                    </button>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-6 py-8">
                <div className={`grid ${showForm ? 'grid-cols-1 xl:grid-cols-2' : 'grid-cols-1'} gap-8`}>
                    {activeTab === 'chapters' && (
                    <div className="space-y-2">
                        <div className="mb-8 pb-8 border-b-2 border-slate-100 dark:border-slate-800">
                            <h2 className="text-sm font-bold uppercase tracking-widest text-slate-500 mb-2 flex items-center gap-2">
                                <span className="material-symbols-outlined text-base">menu_book</span>
                                {chapters.length} Capítulos
                            </h2>
                            <p className="text-xs text-slate-400">Organize e edite todos os capítulos e suas respectivas seções.</p>
                        </div>

                        {(chapLoading || secLoading) ? (
                            <div className="flex justify-center py-12">
                                <span className="material-symbols-outlined animate-spin text-4xl text-primary">sync</span>
                            </div>
                        ) : chapters.map((chap) => {
                            const isExpanded = expandedChapter === chap.id;
                            const sections = sectionsMap[chap.id] || [];
                            const isEditingThis = editingChapterId === chap.id;

                            return (
                                <div key={chap.id}>
                                    {/* Chapter row */}
                                    <div className={`flex items-center gap-3 p-4 rounded-2xl border transition-all ${isEditingThis ? 'border-primary bg-primary/5 dark:bg-primary/10' : 'border-slate-200 dark:border-white/5 bg-white dark:bg-card-dark'}`}>
                                        <div className="size-11 rounded-xl overflow-hidden shrink-0">
                                            <img src={chap.image_url} alt="" className="w-full h-full object-cover" />
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <div className="flex items-center gap-2 flex-wrap">
                                                <span className="text-[9px] font-bold uppercase tracking-widest text-primary">Cap. {String(chap.order_num).padStart(2, '0')}</span>
                                                <span className={`text-[9px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded-full ${chap.published ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400' : 'bg-slate-100 text-slate-500 dark:bg-slate-800 dark:text-slate-400'}`}>
                                                    {chap.published ? 'Publicado' : 'Rascunho'}
                                                </span>
                                                {sections.length > 0 && (
                                                    <span className="text-[9px] font-bold text-slate-400 bg-slate-100 dark:bg-slate-800 dark:text-slate-500 px-1.5 py-0.5 rounded-full">{sections.length} seç.</span>
                                                )}
                                                {inlineEdit?.id === chap.id && inlineEdit.field === 'read_time' ? (
                                                    <input type="number" autoFocus
                                                        className="w-16 px-1.5 py-0.5 text-[10px] rounded-full border border-primary outline-none bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200"
                                                        value={inlineEdit.value}
                                                        onChange={e => setInlineEdit({ ...inlineEdit, value: e.target.value })}
                                                        onBlur={() => saveInlineEdit(chap.id, 'chapters', 'read_time', inlineEdit.value)}
                                                        onKeyDown={e => { if (e.key === 'Enter') saveInlineEdit(chap.id, 'chapters', 'read_time', inlineEdit.value); if (e.key === 'Escape') setInlineEdit(null); }}
                                                    />
                                                ) : (
                                                    <span onClick={() => setInlineEdit({ id: chap.id, field: 'read_time', value: String(chap.read_time) })} title="Clique para editar tempo de leitura" className="text-[9px] text-slate-400 bg-slate-100 dark:bg-slate-800 dark:text-slate-500 px-1.5 py-0.5 rounded-full cursor-pointer hover:bg-primary/10 hover:text-primary transition-colors">⏱ {chap.read_time} min</span>
                                                )}
                                            </div>
                                            <p className="font-bold text-sm truncate mt-0.5">{chap.title}</p>
                                        </div>
                                        <div className="flex items-center gap-1 shrink-0">
                                            {/* Expand sections */}
                                            <button onClick={() => setExpandedChapter(isExpanded ? null : chap.id)} title="Ver seções" className="p-2 hover:bg-slate-100 dark:hover:bg-white/5 rounded-lg transition-colors">
                                                <span className={`material-symbols-outlined text-sm transition-transform ${isExpanded ? 'rotate-180' : ''}`}>expand_more</span>
                                            </button>
                                            {/* Add section */}
                                            <button onClick={() => startCreateSection(chap)} title="Adicionar seção" className="p-2 hover:bg-primary/10 text-primary rounded-lg transition-colors">
                                                <span className="material-symbols-outlined text-sm">bookmark_add</span>
                                            </button>
                                            <button onClick={() => togglePublished(chap.id, 'chapters', chap.published)} title={chap.published ? 'Despublicar' : 'Publicar'} className="p-2 hover:bg-slate-100 dark:hover:bg-white/5 rounded-lg transition-colors">
                                                <span className="material-symbols-outlined text-sm">{chap.published ? 'visibility_off' : 'visibility'}</span>
                                            </button>
                                            <button onClick={() => startEditChapter(chap)} title="Editar" className="p-2 hover:bg-primary/10 text-primary rounded-lg transition-colors">
                                                <span className="material-symbols-outlined text-sm">edit</span>
                                            </button>
                                            <button onClick={() => navigate(`/capitulo/${chap.order_num}`)} title="Visualizar" className="p-2 hover:bg-slate-100 dark:hover:bg-white/5 rounded-lg transition-colors">
                                                <span className="material-symbols-outlined text-sm">open_in_new</span>
                                            </button>
                                            {deleteConfirm?.id === chap.id ? (
                                                <>
                                                    <button onClick={handleDelete} className="px-2 py-1 bg-red-500 text-white text-[9px] font-bold rounded-lg hover:bg-red-600 transition-colors">Confirmar</button>
                                                    <button onClick={() => setDeleteConfirm(null)} className="px-2 py-1 text-[9px] font-bold rounded-lg hover:bg-slate-100 dark:hover:bg-white/5 transition-colors">✕</button>
                                                </>
                                            ) : (
                                                <button onClick={() => setDeleteConfirm({ id: chap.id, type: 'chapter' })} title="Excluir" className="p-2 hover:bg-red-50 dark:hover:bg-red-500/10 text-slate-400 hover:text-red-500 rounded-lg transition-colors">
                                                    <span className="material-symbols-outlined text-sm">delete</span>
                                                </button>
                                            )}
                                        </div>
                                    </div>

                                    {/* Sections (nested, expanded) */}
                                    {isExpanded && (
                                        <div className="ml-8 mt-1.5 space-y-1.5">
                                            {sections.length === 0 ? (
                                                <div className="p-4 rounded-xl border border-dashed border-slate-200 dark:border-white/5 text-center">
                                                    <p className="text-xs text-slate-400">Nenhuma seção ainda.</p>
                                                    <button onClick={() => startCreateSection(chap)} className="mt-2 text-xs text-primary font-bold hover:underline flex items-center gap-1 mx-auto">
                                                        <span className="material-symbols-outlined text-sm">add</span> Adicionar primeira seção
                                                    </button>
                                                </div>
                                            ) : sections.map((sec) => {
                                                const isEditingSec = editingSectionId === sec.id;
                                                return (
                                                    <div key={sec.id} className={`flex items-center gap-3 p-3 rounded-xl border transition-all ${isEditingSec ? 'border-primary bg-primary/5 dark:bg-primary/10' : 'border-slate-200 dark:border-white/5 bg-slate-50 dark:bg-dark-bg/50'}`}>
                                                        {/* Section thumbnail (chapter image) */}
                                                        <div className="size-8 rounded-lg overflow-hidden shrink-0">
                                                            <img src={chap.image_url} alt="" className="w-full h-full object-cover opacity-70" />
                                                        </div>
                                                        <div className="flex-1 min-w-0">
                                                            <div className="flex items-center gap-1.5 flex-wrap">
                                                                <span className="text-[8px] font-bold uppercase tracking-widest text-primary/80">Seç. {String(sec.order_num).padStart(2, '0')}</span>
                                                                <span className={`text-[8px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded-full ${sec.published ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400' : 'bg-slate-100 text-slate-500 dark:bg-slate-700 dark:text-slate-400'}`}>
                                                                    {sec.published ? 'Publicado' : 'Rascunho'}
                                                                </span>
                                                                {inlineEdit?.id === sec.id && inlineEdit.field === 'read_time' ? (
                                                                    <input type="number" autoFocus
                                                                        className="w-14 px-1 py-0.5 text-[9px] rounded-full border border-primary outline-none bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200"
                                                                        value={inlineEdit.value}
                                                                        onChange={e => setInlineEdit({ ...inlineEdit, value: e.target.value })}
                                                                        onBlur={() => saveInlineEdit(sec.id, 'chapter_sections', 'read_time', inlineEdit.value)}
                                                                        onKeyDown={e => { if (e.key === 'Enter') saveInlineEdit(sec.id, 'chapter_sections', 'read_time', inlineEdit.value); if (e.key === 'Escape') setInlineEdit(null); }}
                                                                    />
                                                                ) : (
                                                                    <span onClick={() => setInlineEdit({ id: sec.id, field: 'read_time', value: String(sec.read_time) })} title="Clique para editar tempo de leitura" className="text-[8px] text-slate-400 bg-slate-100 dark:bg-slate-800 dark:text-slate-500 px-1.5 py-0.5 rounded-full cursor-pointer hover:bg-primary/10 hover:text-primary transition-colors">⏱ {sec.read_time} min</span>
                                                                )}
                                                            </div>
                                                            <p className="font-semibold text-xs truncate mt-0.5">{sec.title}</p>
                                                        </div>
                                                        <div className="flex items-center gap-0.5 shrink-0">
                                                            <button onClick={() => togglePublished(sec.id, 'chapter_sections', sec.published)} title={sec.published ? 'Despublicar' : 'Publicar'} className="p-1.5 hover:bg-slate-100 dark:hover:bg-white/5 rounded-lg transition-colors">
                                                                <span className="material-symbols-outlined text-xs">{sec.published ? 'visibility_off' : 'visibility'}</span>
                                                            </button>
                                                            <button onClick={() => startEditSection(sec)} title="Editar" className="p-1.5 hover:bg-primary/10 text-primary rounded-lg transition-colors">
                                                                <span className="material-symbols-outlined text-xs">edit</span>
                                                            </button>
                                                            <button onClick={() => navigate(`/capitulo/${chap.order_num}/secao/${sec.id}`)} title="Visualizar" className="p-1.5 hover:bg-slate-100 dark:hover:bg-white/5 rounded-lg transition-colors">
                                                                <span className="material-symbols-outlined text-xs">open_in_new</span>
                                                            </button>
                                                            {deleteConfirm?.id === sec.id ? (
                                                                <>
                                                                    <button onClick={handleDelete} className="px-2 py-1 bg-red-500 text-white text-[8px] font-bold rounded-lg">Confirmar</button>
                                                                    <button onClick={() => setDeleteConfirm(null)} className="px-1.5 py-1 text-[8px] font-bold rounded-lg hover:bg-slate-100 dark:hover:bg-white/5">✕</button>
                                                                </>
                                                            ) : (
                                                                <button onClick={() => setDeleteConfirm({ id: sec.id, type: 'section' })} title="Excluir" className="p-1.5 hover:bg-red-50 dark:hover:bg-red-500/10 text-slate-400 hover:text-red-500 rounded-lg transition-colors">
                                                                    <span className="material-symbols-outlined text-xs">delete</span>
                                                                </button>
                                                            )}
                                                        </div>
                                                    </div>
                                                );
                                            })}
                                            {/* Add more section button */}
                                            {sections.length > 0 && (
                                                <button onClick={() => startCreateSection(chap)} className="w-full flex items-center justify-center gap-1.5 py-2 text-[10px] font-bold uppercase tracking-widest text-slate-400 hover:text-primary border border-dashed border-slate-200 dark:border-white/5 rounded-xl hover:border-primary/30 transition-all">
                                                    <span className="material-symbols-outlined text-sm">add</span> Nova seção
                                                </button>
                                            )}
                                        </div>
                                    )}
                                </div>
                            );
                        })}
                    </div>
                    )}


                    {activeTab === 'posts' && (
                    <div className="space-y-2">
                        <div className="mb-8">
                            <h2 className="text-sm font-bold uppercase tracking-widest text-slate-500 mb-2 flex items-center gap-2">
                                <span className="material-symbols-outlined text-base">article</span>
                                {posts.length} Artigos & Reflexões
                            </h2>
                            <p className="text-xs text-slate-400">Gerencie artigos e reflexões que aparecem na seção dedicada de artigos.</p>
                        </div>
                        <div className="flex items-center justify-end mb-6">
                            <button onClick={startCreatePost} className="flex items-center gap-2 px-4 py-2.5 bg-primary text-white font-bold rounded-lg text-xs hover:brightness-110 transition-all shadow-md">
                                <span className="material-symbols-outlined text-base">add</span>
                                Novo Artigo
                            </button>
                        </div>

                        {postsLoading ? (
                            <div className="flex justify-center py-12">
                                <span className="material-symbols-outlined animate-spin text-4xl text-primary">sync</span>
                            </div>
                        ) : posts.length === 0 ? (
                            <div className="p-8 text-center rounded-2xl border border-dashed border-slate-200 dark:border-white/5 bg-slate-50 dark:bg-slate-800/20">
                                <span className="material-symbols-outlined text-4xl text-slate-300 dark:text-slate-600 mb-3 block">article</span>
                                <p className="text-slate-500 font-medium">Nenhum artigo ainda.</p>
                                <p className="text-xs text-slate-400 mt-1">Clique em "Novo Artigo" para criar seu primeiro artigo.</p>
                            </div>
                        ) : posts.map((post) => {
                            const isEditingThis = editingPostId === post.id;
                            return (
                                <div
                                    key={post.id}
                                    className={`flex items-center gap-4 p-4 rounded-2xl border transition-all ${isEditingThis ? 'border-primary bg-primary/5 dark:bg-primary/10' : 'border-slate-200 dark:border-white/5 bg-white dark:bg-card-dark'}`}
                                >
                                    {post.coverImage && (
                                        <div className="size-16 rounded-xl overflow-hidden shrink-0">
                                            <img src={post.coverImage} alt="" className="w-full h-full object-cover" />
                                        </div>
                                    )}
                                    <div className="flex-1 min-w-0">
                                        <div className="flex items-center gap-2 flex-wrap mb-2">
                                            <span className={`text-[9px] font-bold uppercase tracking-wider px-2 py-1 rounded-full ${post.published ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400' : 'bg-slate-100 text-slate-500 dark:bg-slate-800 dark:text-slate-400'}`}>
                                                {post.published ? '✓ Publicado' : '⊘ Rascunho'}
                                            </span>
                                                {inlineEdit?.id === post.id && inlineEdit.field === 'read_time' ? (
                                                <input type="number" autoFocus
                                                    className="w-16 px-1.5 py-0.5 text-[10px] rounded border border-primary outline-none bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200"
                                                    value={inlineEdit.value}
                                                    onChange={e => setInlineEdit({ ...inlineEdit, value: e.target.value })}
                                                    onBlur={() => saveInlineEdit(post.id, 'posts', 'read_time', inlineEdit.value)}
                                                    onKeyDown={e => { if (e.key === 'Enter') saveInlineEdit(post.id, 'posts', 'read_time', inlineEdit.value); if (e.key === 'Escape') setInlineEdit(null); }}
                                                />
                                            ) : (
                                                <span onClick={() => setInlineEdit({ id: post.id, field: 'read_time', value: String(post.readTime) })} title="Clique para editar tempo de leitura" className="text-[9px] text-slate-400 bg-slate-100 dark:bg-slate-800 dark:text-slate-500 px-2 py-1 rounded cursor-pointer hover:bg-primary/10 hover:text-primary transition-colors">⏱ {post.readTime} min</span>
                                            )}
                                            {post.date && (
                                                inlineEdit?.id === post.id && inlineEdit.field === 'date' ? (
                                                    <input type="date" autoFocus
                                                        className="px-1.5 py-0.5 text-[10px] rounded border border-primary outline-none bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200"
                                                        value={inlineEdit.value}
                                                        onChange={e => setInlineEdit({ ...inlineEdit, value: e.target.value })}
                                                        onBlur={() => saveInlineEdit(post.id, 'posts', 'date', inlineEdit.value)}
                                                        onKeyDown={e => { if (e.key === 'Enter') saveInlineEdit(post.id, 'posts', 'date', inlineEdit.value); if (e.key === 'Escape') setInlineEdit(null); }}
                                                    />
                                                ) : (
                                                    <span onClick={() => setInlineEdit({ id: post.id, field: 'date', value: post.date })} title="Clique para editar data" className="text-[9px] text-slate-400 cursor-pointer hover:text-primary transition-colors">📅 {new Date(post.date).toLocaleDateString('pt-BR')}</span>
                                                )
                                            )}
                                        </div>
                                        <p className="font-bold text-sm truncate mb-0.5">{post.title}</p>
                                        <p className="text-xs text-slate-500 dark:text-slate-400 truncate">por <span className="font-medium">{post.author}</span></p>
                                    </div>
                                    <div className="flex items-center gap-1 shrink-0">
                                        <button onClick={() => togglePublished(post.id, 'posts', post.published)} title={post.published ? 'Despublicar' : 'Publicar'} className="p-2 hover:bg-slate-100 dark:hover:bg-white/5 rounded-lg transition-colors">
                                            <span className="material-symbols-outlined text-sm">{post.published ? 'visibility_off' : 'visibility'}</span>
                                        </button>
                                        <button onClick={() => startEditPost(post)} title="Editar" className="p-2 hover:bg-primary/10 text-primary rounded-lg transition-colors">
                                            <span className="material-symbols-outlined text-sm">edit</span>
                                        </button>
                                        <button onClick={() => navigate(`/post/${post.slug}`)} title="Visualizar" className="p-2 hover:bg-slate-100 dark:hover:bg-white/5 rounded-lg transition-colors">
                                            <span className="material-symbols-outlined text-sm">open_in_new</span>
                                        </button>
                                        {deleteConfirm?.id === post.id ? (
                                            <>
                                                <button onClick={handleDelete} className="px-2 py-1 bg-red-500 text-white text-[9px] font-bold rounded-lg hover:bg-red-600 transition-colors">Confirmar</button>
                                                <button onClick={() => setDeleteConfirm(null)} className="px-2 py-1 text-[9px] font-bold rounded-lg hover:bg-slate-100 dark:hover:bg-white/5 transition-colors">✕</button>
                                            </>
                                        ) : (
                                            <button onClick={() => setDeleteConfirm({ id: post.id, type: 'post' })} title="Excluir" className="p-2 hover:bg-red-50 dark:hover:bg-red-500/10 text-slate-400 hover:text-red-500 rounded-lg transition-colors">
                                                <span className="material-symbols-outlined text-sm">delete</span>
                                            </button>
                                        )}
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                    )}

                    {/* ── Edit Form Panel ── */}
                    {showForm && editMode === 'chapter' && (
                        <FormPanel title={editingChapterId ? 'Editar Capítulo' : 'Novo Capítulo'} onClose={cancelEdit} onSave={saveChapter} saving={saving} saveMsg={saveMsg}>
                            <div className="grid grid-cols-2 gap-4">
                                <Field label="Número" value={chapterForm.order_num} onChange={v => setChapterForm({ ...chapterForm, order_num: parseInt(v) || 0 })} type="number" />
                                <Field label="Tempo (min)" value={chapterForm.read_time} onChange={v => setChapterForm({ ...chapterForm, read_time: parseInt(v) || 30 })} type="number" />
                            </div>
                            <Field label="Título (índice)" value={chapterForm.title} onChange={v => setChapterForm({ ...chapterForm, title: v })} placeholder="A Árvore do Conhecimento" />
                            <Field label="Subtítulo (header)" value={chapterForm.subtitle} onChange={v => setChapterForm({ ...chapterForm, subtitle: v })} placeholder="A Topografia do Desejo..." />
                            <Field label="Tag / Linha descritiva" value={chapterForm.tag_line} onChange={v => setChapterForm({ ...chapterForm, tag_line: v })} placeholder="Análise Psicanalítica" />
                            <Field label="URL da Imagem de Capa" value={chapterForm.image_url} onChange={v => setChapterForm({ ...chapterForm, image_url: v })} placeholder="/images/capitulo-1-bg.png" />
                            {chapterForm.image_url && <img src={chapterForm.image_url} alt="Preview" className="h-20 w-full object-cover rounded-xl" />}
                            <div>
                                <label className="block text-[10px] uppercase tracking-widest font-bold text-slate-500 mb-2">Descrição (índice)</label>
                                <textarea value={chapterForm.description} onChange={e => setChapterForm({ ...chapterForm, description: e.target.value })} rows={2}
                                    className="w-full px-4 py-2.5 text-sm bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl outline-none focus:ring-2 focus:ring-primary/30 resize-none" />
                            </div>
                            <div>
                                <label className="block text-[10px] uppercase tracking-widest font-bold text-slate-500 mb-2">Conteúdo (Markdown)</label>
                                <div data-color-mode="auto" className="rounded-xl overflow-hidden border border-slate-200 dark:border-slate-700">
                                    <MDEditor value={chapterForm.content} onChange={val => setChapterForm({ ...chapterForm, content: val || '' })} height={400} preview="edit" />
                                </div>
                            </div>
                            <div>
                                <label className="block text-[10px] uppercase tracking-widest font-bold text-slate-500 mb-2">Tags</label>
                                <TagInput tags={chapterForm.tags} onChange={v => setChapterForm({ ...chapterForm, tags: v })} />
                            </div>
                            <div className="flex items-center justify-between p-4 bg-slate-50 dark:bg-slate-800/50 rounded-xl">
                                <div><p className="font-bold text-sm">Publicado</p><p className="text-[11px] text-slate-500">Visível publicamente</p></div>
                                <Toggle value={chapterForm.published} onChange={v => setChapterForm({ ...chapterForm, published: v })} />
                            </div>
                        </FormPanel>
                    )}

                    {showForm && editMode === 'section' && (
                        <FormPanel title={editingSectionId ? 'Editar Seção' : 'Nova Seção'} onClose={cancelEdit} onSave={saveSection} saving={saving} saveMsg={saveMsg}>
                            <div className="p-3 rounded-xl bg-primary/5 border border-primary/20 text-xs text-primary font-bold flex items-center gap-2">
                                <span className="material-symbols-outlined text-sm">bookmark</span>
                                Subseção do Capítulo
                                <span className="ml-auto font-normal text-slate-500">Imagem = a do capítulo pai</span>
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <Field label="Ordem" value={sectionForm.order_num} onChange={v => setSectionForm({ ...sectionForm, order_num: parseInt(v) || 1 })} type="number" />
                                <Field label="Tempo (min)" value={sectionForm.read_time} onChange={v => setSectionForm({ ...sectionForm, read_time: parseInt(v) || 15 })} type="number" />
                            </div>
                            <Field label="Título" value={sectionForm.title} onChange={v => setSectionForm({ ...sectionForm, title: v })} placeholder="Nome da subseção" />
                            <Field label="Subtítulo" value={sectionForm.subtitle} onChange={v => setSectionForm({ ...sectionForm, subtitle: v })} placeholder="Descrição longa do header" />
                            <Field label="Tag / Linha descritiva" value={sectionForm.tag_line} onChange={v => setSectionForm({ ...sectionForm, tag_line: v })} placeholder="Análise / Exegese..." />
                            <div>
                                <label className="block text-[10px] uppercase tracking-widest font-bold text-slate-500 mb-2">Descrição (card)</label>
                                <textarea value={sectionForm.description} onChange={e => setSectionForm({ ...sectionForm, description: e.target.value })} rows={2}
                                    className="w-full px-4 py-2.5 text-sm bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl outline-none focus:ring-2 focus:ring-primary/30 resize-none" />
                            </div>
                            <div>
                                <label className="block text-[10px] uppercase tracking-widest font-bold text-slate-500 mb-2">Conteúdo (Markdown)</label>
                                <div data-color-mode="auto" className="rounded-xl overflow-hidden border border-slate-200 dark:border-slate-700">
                                    <MDEditor value={sectionForm.content} onChange={val => setSectionForm({ ...sectionForm, content: val || '' })} height={400} preview="edit" />
                                </div>
                            </div>
                            <div>
                                <label className="block text-[10px] uppercase tracking-widest font-bold text-slate-500 mb-2">Tags</label>
                                <TagInput tags={sectionForm.tags} onChange={v => setSectionForm({ ...sectionForm, tags: v })} />
                            </div>
                            <div className="flex items-center justify-between p-4 bg-slate-50 dark:bg-slate-800/50 rounded-xl">
                                <div><p className="font-bold text-sm">Publicado</p><p className="text-[11px] text-slate-500">Visível publicamente</p></div>
                                <Toggle value={sectionForm.published} onChange={v => setSectionForm({ ...sectionForm, published: v })} />
                            </div>
                        </FormPanel>
                    )}

                    {showForm && editMode === 'post' && (
                        <FormPanel title={editingPostId ? 'Editar Artigo' : 'Novo Artigo'} onClose={cancelEdit} onSave={savePost} saving={saving} saveMsg={saveMsg}>
                            <Field label="Título" value={postForm.title} onChange={v => setPostForm({ ...postForm, title: v })} placeholder="Título do artigo" />
                            <Field label="Slug (URL amigável)" value={postForm.slug} onChange={v => setPostForm({ ...postForm, slug: normalizeSlug(v) })} placeholder="titulo-do-artigo" />
                            <Field label="Autor" value={postForm.author} onChange={v => setPostForm({ ...postForm, author: v })} placeholder="Miguel, o Príncipe" />
                            <Field label="URL da Imagem de Capa" value={postForm.cover_image} onChange={v => setPostForm({ ...postForm, cover_image: v })} placeholder="/images/capitulo-1-bg.png" />
                            {postForm.cover_image && <img src={postForm.cover_image} alt="Preview" className="h-20 w-full object-cover rounded-xl" />}
                            <div className="grid grid-cols-2 gap-4">
                                <Field label="Tempo de leitura (min)" value={postForm.read_time} onChange={v => setPostForm({ ...postForm, read_time: parseInt(v) || 15 })} type="number" />
                            </div>
                            <div>
                                <label className="block text-[10px] uppercase tracking-widest font-bold text-slate-500 mb-2">Descrição (resumo)</label>
                                <textarea value={postForm.description} onChange={e => setPostForm({ ...postForm, description: e.target.value })} rows={2}
                                    className="w-full px-4 py-2.5 text-sm bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl outline-none focus:ring-2 focus:ring-primary/30 resize-none" />
                            </div>
                            <div>
                                <label className="block text-[10px] uppercase tracking-widest font-bold text-slate-500 mb-2">Conteúdo (Markdown)</label>
                                <div data-color-mode="auto" className="rounded-xl overflow-hidden border border-slate-200 dark:border-slate-700">
                                    <MDEditor value={postForm.content} onChange={val => setPostForm({ ...postForm, content: val || '' })} height={400} preview="edit" />
                                </div>
                            </div>
                            <div>
                                <label className="block text-[10px] uppercase tracking-widest font-bold text-slate-500 mb-2">Tags</label>
                                <TagInput tags={postForm.tags} onChange={v => setPostForm({ ...postForm, tags: v })} />
                            </div>
                            <div className="flex items-center justify-between p-4 bg-slate-50 dark:bg-slate-800/50 rounded-xl">
                                <div><p className="font-bold text-sm">Publicado</p><p className="text-[11px] text-slate-500">Visível na página de artigos</p></div>
                                <Toggle value={postForm.published} onChange={v => setPostForm({ ...postForm, published: v })} />
                            </div>
                        </FormPanel>
                    )}
                </div>
            </div>
        </div>
    );
};

