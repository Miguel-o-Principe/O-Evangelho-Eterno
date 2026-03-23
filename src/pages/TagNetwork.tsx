import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChapterMeta } from '../components/ChapterMeta';
import { useTheme } from '../contexts/ThemeContext';
import { useChapters } from '../hooks/useChapters';
import { usePosts } from '../hooks/usePosts';
import { supabase } from '../lib/supabase';
import type { SectionSummary } from '../hooks/useChapterSections';

// ── Brand palette (5 project colors) ────────────────────────────────────────
const PALETTE = {
    coral:  { fill: '#F1E1B9', stroke: '#402A1C', text: '#402A1C' },
    amber:  { fill: '#FFE9A5', stroke: '#BF8339', text: '#402A1C' },
    teal:   { fill: '#BF8339', stroke: '#402A1C', text: '#F1E1B9' },
    blue:   { fill: '#402A1C', stroke: '#BF8339', text: '#FFE9A5' },
    purple: { fill: '#181C21', stroke: '#BF8339', text: '#F1E1B9' },
    gray:   { fill: '#F1E1B9', stroke: '#BF8339', text: '#402A1C' },
} as const;

type PaletteKey = keyof typeof PALETTE;

const LEGEND_ITEMS: { cat: PaletteKey; label: string }[] = [
    { cat: 'coral',  label: 'Lei / Condenação' },
    { cat: 'amber',  label: 'Desejo / Psique' },
    { cat: 'teal',   label: 'Graça / Liberdade' },
    { cat: 'blue',   label: 'Teologia / Tempo' },
    { cat: 'purple', label: 'Identidade / Narrativa' },
];

const CAT_MAP: Record<string, PaletteKey> = {
    lei: 'coral', morte: 'coral', satanás: 'coral', acusação: 'coral', transgressão: 'coral', proibição: 'coral',
    desejo: 'amber', fantasia: 'amber', falta: 'amber', 'voz-obscena': 'amber', 'adão-perf.': 'amber',
    vergonha: 'amber', hipocrisia: 'amber', 'ordem-simb.': 'amber',
    graça: 'teal', indiferença: 'teal', 'sábado-eterno': 'teal', liberdade: 'teal', consumado: 'teal', silêncio: 'teal',
    chronos: 'blue', kairós: 'blue', retroatividade: 'blue', eternidade: 'blue', cristologia: 'blue',
    salvação: 'blue', 'corpo-de-cristo': 'blue', 'ateísmo-cristão': 'blue', cosmologia: 'blue',
    identidade: 'purple', 'adão-real': 'purple', teatro: 'purple', moralismo: 'purple',
    aliança: 'purple', tipologia: 'purple', sacrifício: 'purple', cruz: 'purple',
};

const FULL_NAMES: Record<string, string> = {
    'adão-perf.': 'adão-performativo', 'ordem-simb.': 'ordem-simbólica',
    teatro: 'teatro-da-moralidade', 'corpo-de-cristo': 'corpo-de-cristo',
    'ateísmo-cristão': 'ateísmo-cristão', indiferença: 'indiferença-santa',
    'sábado-eterno': 'sábado-eterno', 'voz-obscena': 'voz-obscena',
};

const STATIC_CHAPTERS = [
    { id: 1, tags: ['lei', 'desejo', 'falta', 'adão-perf.', 'ordem-simb.', 'proibição', 'morte'] },
    { id: 2, tags: ['lei', 'satanás', 'acusação', 'transgressão', 'moralismo', 'voz-obscena', 'morte'] },
    { id: 3, tags: ['vergonha', 'teatro', 'moralismo', 'adão-perf.', 'lei', 'graça', 'hipocrisia'] },
    { id: 4, tags: ['tipologia', 'cristologia', 'aliança', 'graça', 'cruz', 'sacrifício', 'lei'] },
    { id: 5, tags: ['chronos', 'kairós', 'retroatividade', 'cristologia', 'graça', 'salvação', 'eternidade'] },
    { id: 6, tags: ['cosmologia', 'cruz', 'graça', 'kairós', 'corpo-de-cristo', 'ateísmo-cristão', 'indiferença'] },
    { id: 7, tags: ['fantasia', 'desejo', 'adão-real', 'indiferença', 'identidade', 'graça', 'adão-perf.'] },
    { id: 8, tags: ['sábado-eterno', 'graça', 'identidade', 'salvação', 'liberdade', 'silêncio', 'consumado'] },
];

const SVG_BG: Record<string, string> = {
    light: '#FFFDF7',
    sepia: '#F1E1B9',
    dark:  '#0E1115',
};

function getInitialBg() {
    if (document.documentElement.classList.contains('dark')) return SVG_BG.dark;
    if (document.body.classList.contains('sepia')) return SVG_BG.sepia;
    return SVG_BG.light;
}

export const TagNetwork: React.FC = () => {
    const navigate = useNavigate();
    const { theme } = useTheme();
    const { chapters } = useChapters();
    const { posts } = usePosts();

    const [selectedTag, setSelectedTag] = useState<string | null>(null);
    const [sections, setSections] = useState<SectionSummary[]>([]);
    const [relatedSections, setRelatedSections] = useState<SectionSummary[]>([]);
    const [relatedSectionsLoading, setRelatedSectionsLoading] = useState(false);
    const [sectionsLoading, setSectionsLoading] = useState(false);

    const onNodeClickRef = useRef<(tagId: string) => void>(() => {});
    const selectedTagRef = useRef<string | null>(null);
    const bgRectRef = useRef<any>(null);
    const d3Ready = useRef(false);

    onNodeClickRef.current = (tagId: string) => {
        const next = selectedTagRef.current === tagId ? null : tagId;
        selectedTagRef.current = next;
        setSelectedTag(next);
    };

    // Update SVG background on theme change (no D3 re-init)
    useEffect(() => {
        bgRectRef.current?.attr('fill', SVG_BG[theme] ?? SVG_BG.light);
    }, [theme]);

    // Fetch sections for selected tag
    useEffect(() => {
        if (!selectedTag) { setSections([]); return; }
        setSectionsLoading(true);
        supabase
            .from('chapter_sections')
            .select('id, chapter_id, order_num, title, subtitle, tag_line, description, read_time, published, tags, created_at, updated_at')
            .contains('tags', [selectedTag])
            .eq('published', true)
            .then(({ data, error }) => {
                setSections(!error && data ? (data as SectionSummary[]) : []);
                setSectionsLoading(false);
            });
    }, [selectedTag]);

    // Fetch sections for correlated tags (Assuntos Relacionados)
    useEffect(() => {
        if (!selectedTag) { setRelatedSections([]); return; }
        const corTags = Array.from(
            STATIC_CHAPTERS
                .filter(ch => ch.tags.includes(selectedTag))
                .reduce((acc, ch) => {
                    ch.tags.forEach(t => { if (t !== selectedTag) acc.add(t); });
                    return acc;
                }, new Set<string>())
        );
        if (corTags.length === 0) { setRelatedSections([]); return; }
        setRelatedSectionsLoading(true);
        supabase
            .from('chapter_sections')
            .select('id, chapter_id, order_num, title, subtitle, tag_line, description, read_time, published, tags, created_at, updated_at')
            .overlaps('tags', corTags)
            .eq('published', true)
            .then(({ data, error }) => {
                setRelatedSections(!error && data ? (data as SectionSummary[]) : []);
                setRelatedSectionsLoading(false);
            });
    }, [selectedTag]);

    // Init D3 once
    useEffect(() => {
        if (d3Ready.current) return;
        d3Ready.current = true;

        const run = (d3: any) => {
            d3.select('#net-svg').selectAll('*').remove();

            const tagMap: Record<string, any> = {};
            STATIC_CHAPTERS.forEach(ch =>
                ch.tags.forEach(t => {
                    if (!tagMap[t]) tagMap[t] = { id: t, chapters: [], count: 0, category: CAT_MAP[t] ?? 'gray' };
                    tagMap[t].chapters.push(ch.id);
                    tagMap[t].count++;
                })
            );
            const nodes = Object.values(tagMap);

            const edgeMap: Record<string, any> = {};
            STATIC_CHAPTERS.forEach(ch => {
                for (let i = 0; i < ch.tags.length; i++)
                    for (let j = i + 1; j < ch.tags.length; j++) {
                        const k = [ch.tags[i], ch.tags[j]].sort().join('|||');
                        if (!edgeMap[k]) edgeMap[k] = { source: ch.tags[i], target: ch.tags[j], weight: 0, chapters: [] };
                        edgeMap[k].weight++;
                        edgeMap[k].chapters.push(ch.id);
                    }
            });
            const links = Object.values(edgeMap);

            const W = 720, H = 580;
            const svg = d3.select('#net-svg').attr('viewBox', `0 0 ${W} ${H}`);

            // Theme-aware background rect
            const bgRect = svg.append('rect')
                .attr('width', W).attr('height', H)
                .attr('fill', getInitialBg());
            bgRectRef.current = bgRect;

            const sim = d3.forceSimulation(nodes)
                .force('link', d3.forceLink(links).id((d: any) => d.id)
                    .distance((d: any) => Math.max(32, 90 - d.weight * 14)).strength(0.35))
                .force('charge', d3.forceManyBody().strength((d: any) => -90 - d.count * 30))
                .force('center', d3.forceCenter(W / 2, H / 2).strength(0.08))
                .force('collide', d3.forceCollide().radius((d: any) => 16 + d.count * 5).strength(0.75))
                .force('x', d3.forceX(W / 2).strength(0.04))
                .force('y', d3.forceY(H / 2).strength(0.04));

            const linkEl = svg.append('g').selectAll('line').data(links).join('line')
                .attr('stroke', '#BF8339')
                .attr('stroke-opacity', (d: any) => 0.10 + d.weight * 0.06)
                .attr('stroke-width', (d: any) => 0.5 + d.weight * 0.35);

            const nodeEl = svg.append('g').selectAll('g').data(nodes).join('g')
                .attr('cursor', 'pointer')
                .call(
                    d3.drag()
                        .on('start', (ev: any, d: any) => { if (!ev.active) sim.alphaTarget(0.3).restart(); d.fx = d.x; d.fy = d.y; })
                        .on('drag', (ev: any, d: any) => { d.fx = ev.x; d.fy = ev.y; })
                        .on('end', (ev: any, d: any) => { if (!ev.active) sim.alphaTarget(0); d.fx = null; d.fy = null; })
                );

            const pal = (d: any) => PALETTE[(d.category as PaletteKey)] ?? PALETTE.gray;

            // Fill circle
            nodeEl.append('circle')
                .attr('class', 'fill-circle')
                .attr('r', (d: any) => 7 + d.count * 4)
                .attr('fill', (d: any) => pal(d).fill)
                .attr('stroke', (d: any) => pal(d).stroke)
                .attr('stroke-width', (d: any) => d.count > 3 ? 1.5 : 0.8);

            // Selection ring (hidden by default, shown on click)
            nodeEl.append('circle')
                .attr('class', 'sel-ring')
                .attr('r', (d: any) => 7 + d.count * 4 + 5)
                .attr('fill', 'none')
                .attr('stroke', '#FFE9A5')
                .attr('stroke-width', 2.5)
                .attr('opacity', 0)
                .attr('pointer-events', 'none');

            // Label
            nodeEl.append('text')
                .attr('text-anchor', 'middle')
                .attr('dy', (d: any) => 12 + d.count * 4)
                .attr('font-family', '"Noto Serif", serif')
                .attr('font-size', '9')
                .attr('fill', (d: any) => pal(d).text)
                .attr('font-weight', (d: any) => d.count >= 3 ? '600' : '400')
                .attr('pointer-events', 'none')
                .text((d: any) => d.id);

            const tip = d3.select('#net-tip');

            const setSelectionRing = (tagId: string | null) => {
                nodeEl.select('.sel-ring').attr('opacity', (n: any) => n.id === tagId ? 1 : 0);
            };

            const applyHover = (active: any | null) => {
                if (!active) {
                    linkEl
                        .attr('stroke', '#BF8339')
                        .attr('stroke-opacity', (d: any) => 0.10 + d.weight * 0.06)
                        .attr('stroke-width', (d: any) => 0.5 + d.weight * 0.35);
                    nodeEl.select('.fill-circle').attr('opacity', 1);
                    nodeEl.select('text').attr('opacity', 1);
                    return;
                }
                const connectedIds = new Set<string>();
                links.forEach((l: any) => {
                    if (l.source.id === active.id) connectedIds.add(l.target.id);
                    if (l.target.id === active.id) connectedIds.add(l.source.id);
                });
                linkEl
                    .attr('stroke', (l: any) => (l.source.id === active.id || l.target.id === active.id) ? pal(active).stroke : '#BF8339')
                    .attr('stroke-opacity', (l: any) => (l.source.id === active.id || l.target.id === active.id) ? 0.85 : 0.04)
                    .attr('stroke-width', (l: any) => (l.source.id === active.id || l.target.id === active.id) ? 1.5 + l.weight * 0.3 : 0.3);
                nodeEl.select('.fill-circle').attr('opacity', (n: any) =>
                    n.id === active.id || connectedIds.has(n.id) ? 1 : 0.2);
                nodeEl.select('text').attr('opacity', (n: any) =>
                    n.id === active.id || connectedIds.has(n.id) ? 1 : 0.15);
            };

            nodeEl
                .on('mouseenter', (ev: any, d: any) => {
                    const full = FULL_NAMES[d.id] || d.id;
                    const capLabel = d.chapters.length > 1 ? `Caps. ${d.chapters.join(', ')}` : `Cap. ${d.chapters[0]}`;
                    tip.style('opacity', 1)
                        .html(`<b>#${full}</b><br><span>${capLabel}</span><br><span>Conexões: ${links.filter((l: any) => l.source.id === d.id || l.target.id === d.id).length}</span>`)
                        .style('left', ev.offsetX + 14 + 'px')
                        .style('top', ev.offsetY - 14 + 'px');
                    applyHover(d);
                })
                .on('mousemove', (ev: any) => tip.style('left', ev.offsetX + 14 + 'px').style('top', ev.offsetY - 14 + 'px'))
                .on('mouseleave', () => { tip.style('opacity', 0); applyHover(null); })
                .on('click', (_ev: any, d: any) => {
                    onNodeClickRef.current(d.id);
                    setSelectionRing(selectedTagRef.current);
                });

            sim.on('tick', () => {
                nodes.forEach((d: any) => {
                    d.x = Math.max(30, Math.min(W - 30, d.x));
                    d.y = Math.max(30, Math.min(H - 30, d.y));
                });
                linkEl
                    .attr('x1', (d: any) => d.source.x).attr('y1', (d: any) => d.source.y)
                    .attr('x2', (d: any) => d.target.x).attr('y2', (d: any) => d.target.y);
                nodeEl.attr('transform', (d: any) => `translate(${d.x},${d.y})`);
            });
        };

        if ((window as any).d3) {
            run((window as any).d3);
        } else {
            const script = document.createElement('script');
            script.src = 'https://cdnjs.cloudflare.com/ajax/libs/d3/7.8.5/d3.min.js';
            script.onload = () => run((window as any).d3);
            document.head.appendChild(script);
        }
    }, []);

    // Derived panel data
    const filteredChapters = selectedTag ? chapters.filter(c => (c.tags ?? []).includes(selectedTag)) : [];
    const filteredPosts    = selectedTag ? posts.filter(p => (p.tags ?? []).includes(selectedTag))    : [];
    const chapterOrderMap  = Object.fromEntries(chapters.map(c => [c.id, c.order_num]));

    // Tags that co-occur with the selected tag in the same chapter
    const correlatedTags: string[] = selectedTag
        ? Array.from(
            STATIC_CHAPTERS
                .filter(ch => ch.tags.includes(selectedTag))
                .reduce((acc, ch) => {
                    ch.tags.forEach(t => { if (t !== selectedTag) acc.add(t); });
                    return acc;
                }, new Set<string>())
          )
        : [];

    // Posts with at least one correlated tag (case-insensitive), excluding already shown posts
    const filteredPostIds = new Set(filteredPosts.map(p => p.id));
    const correlatedTagsLower = correlatedTags.map(t => t.toLowerCase());
    const relatedPosts = selectedTag
        ? posts.filter(p => !filteredPostIds.has(p.id) && (p.tags ?? []).some(t => correlatedTagsLower.includes(t.toLowerCase())))
        : [];

    // Chapters with any correlated tag, excluding already shown chapters
    const filteredChapterIds = new Set(filteredChapters.map(c => c.id));
    const relatedChapters = selectedTag
        ? chapters.filter(ch => !filteredChapterIds.has(ch.id) && (ch.tags ?? []).some(t => correlatedTagsLower.includes(t.toLowerCase())))
        : [];

    // Related sections excluding those already shown in primary sections
    const filteredSectionIds = new Set(sections.map(s => s.id));
    const filteredRelatedSections = relatedSections.filter(s => !filteredSectionIds.has(s.id));

    const totalRelated = relatedChapters.length + relatedPosts.length + filteredRelatedSections.length;


    const containerBg =
        theme === 'dark'  ? 'bg-[#0E1115] border-[#BF8339]/20' :
        theme === 'sepia' ? 'bg-[#F1E1B9] border-[#BF8339]/30' :
                            'bg-[#FFFDF7] border-slate-200';

    return (
        <main className="flex-1 px-8 sm:px-20 py-4">
            <ChapterMeta
                title="Rede de Tags — O Evangelho Eterno"
                description="Visualização interativa das conexões temáticas entre os capítulos de O Evangelho Eterno e a Ciência da Graça."
            />

            <div className="flex flex-col gap-3 mb-8">
                <h1 className="text-4xl sm:text-5xl font-bold leading-tight tracking-tight">Rede de Tags</h1>
                <p className="text-slate-600 dark:text-slate-400 text-lg max-w-3xl font-light">
                    Visualização interativa das conexões temáticas entre os capítulos. Clique num nó para ver os conteúdos associados.
                </p>
            </div>

            {/* Diagram card */}
            <div className={`rounded-2xl border shadow-sm overflow-hidden ${containerBg}`}>
                <div id="wrap" style={{ position: 'relative', width: '100%' }}>
                    <svg id="net-svg" width="100%" style={{ display: 'block' }} />
                    <div
                        id="net-tip"
                        style={{
                            position: 'absolute', pointerEvents: 'none', opacity: 0,
                            borderRadius: 8, padding: '8px 12px', fontSize: 12,
                            lineHeight: 1.6, maxWidth: 210, zIndex: 10, transition: 'opacity .12s',
                        }}
                        className="bg-white dark:bg-card-dark border border-[#BF8339]/30 text-[#402A1C] dark:text-[#F1E1B9]"
                    />
                </div>

                {/* Legend */}
                <div className="flex flex-wrap items-center gap-x-5 gap-y-2 px-5 py-3 border-t border-[#BF8339]/15">
                    {LEGEND_ITEMS.map(it => (
                        <span key={it.cat} className="flex items-center gap-1.5 text-xs text-[#402A1C] dark:text-[#F1E1B9]">
                            <span style={{
                                width: 9, height: 9, borderRadius: '50%',
                                background: PALETTE[it.cat].fill,
                                border: `1px solid ${PALETTE[it.cat].stroke}`,
                                display: 'inline-block', flexShrink: 0,
                            }} />
                            {it.label}
                        </span>
                    ))}
                    <span className="text-xs italic text-[#BF8339]/70">Clique num nó para explorar</span>
                </div>
            </div>

            {/* ── Selected Tag Panel ───────────────────────────────────── */}
            {selectedTag && (
                <div className="mt-10">
                    <div className="flex items-center justify-between mb-6 pb-4 border-b border-slate-100 dark:border-slate-800">
                        <div>
                            <p className="text-xs font-bold uppercase tracking-widest text-[#BF8339] mb-1">Tag selecionada</p>
                            <h2 className="text-2xl sm:text-3xl font-bold">
                                <span className="text-[#BF8339]">#</span>{FULL_NAMES[selectedTag] ?? selectedTag}
                            </h2>
                        </div>
                        <button
                            onClick={() => { selectedTagRef.current = null; setSelectedTag(null); }}
                            className="p-2 rounded-full hover:bg-slate-100 dark:hover:bg-white/10 transition-colors text-slate-500"
                            title="Fechar"
                        >
                            <span className="material-symbols-outlined">close</span>
                        </button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {/* Capítulos */}
                        <div>
                            <h3 className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#BF8339] mb-4">
                                <span className="material-symbols-outlined text-base">menu_book</span>
                                Capítulos
                                <span className="ml-auto text-[10px] text-slate-400 normal-case tracking-normal font-normal">
                                    {filteredChapters.length} resultado{filteredChapters.length !== 1 ? 's' : ''}
                                </span>
                            </h3>
                            {filteredChapters.length === 0
                                ? <p className="text-sm text-slate-400 italic">Nenhum capítulo encontrado.</p>
                                : filteredChapters.map(ch => (
                                    <button key={ch.id} onClick={() => navigate(`/capitulo/${ch.order_num}`)}
                                        className="w-full text-left mb-3 p-4 rounded-xl border border-slate-100 dark:border-slate-800 bg-white dark:bg-card-dark hover:border-[#BF8339]/50 hover:shadow-md transition-all group">
                                        <p className="text-[10px] font-bold uppercase tracking-widest text-[#BF8339] mb-1">
                                            Capítulo {String(ch.order_num).padStart(2, '0')}
                                        </p>
                                        <p className="text-sm font-semibold leading-snug group-hover:text-[#BF8339] transition-colors">{ch.title}</p>
                                        {ch.subtitle && <p className="text-xs text-slate-500 mt-1 line-clamp-2">{ch.subtitle}</p>}
                                    </button>
                                ))}
                        </div>

                        {/* Artigos */}
                        <div>
                            <h3 className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#BF8339] mb-4">
                                <span className="material-symbols-outlined text-base">article</span>
                                Artigos
                                <span className="ml-auto text-[10px] text-slate-400 normal-case tracking-normal font-normal">
                                    {filteredPosts.length} resultado{filteredPosts.length !== 1 ? 's' : ''}
                                </span>
                            </h3>
                            {filteredPosts.length === 0
                                ? <p className="text-sm text-slate-400 italic">Nenhum artigo encontrado.</p>
                                : filteredPosts.map(p => (
                                    <button key={p.id} onClick={() => navigate(`/post/${p.slug}`)}
                                        className="w-full text-left mb-3 p-4 rounded-xl border border-slate-100 dark:border-slate-800 bg-white dark:bg-card-dark hover:border-[#BF8339]/50 hover:shadow-md transition-all group">
                                        <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-1">{p.date}</p>
                                        <p className="text-sm font-semibold leading-snug group-hover:text-[#BF8339] transition-colors">{p.title}</p>
                                        {p.description && <p className="text-xs text-slate-500 mt-1 line-clamp-2">{p.description}</p>}
                                    </button>
                                ))}
                        </div>

                        {/* Subseções */}
                        <div>
                            <h3 className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#BF8339] mb-4">
                                <span className="material-symbols-outlined text-base">bookmark</span>
                                Subseções
                                {!sectionsLoading && (
                                    <span className="ml-auto text-[10px] text-slate-400 normal-case tracking-normal font-normal">
                                        {sections.length} resultado{sections.length !== 1 ? 's' : ''}
                                    </span>
                                )}
                            </h3>
                            {sectionsLoading
                                ? <span className="material-symbols-outlined animate-spin text-[#BF8339] text-2xl">sync</span>
                                : sections.length === 0
                                    ? <p className="text-sm text-slate-400 italic">Nenhuma subseção encontrada.</p>
                                    : sections.map(s => {
                                        const chapNum = chapterOrderMap[s.chapter_id];
                                        return (
                                            <button key={s.id}
                                                onClick={() => chapNum != null && navigate(`/capitulo/${chapNum}/secao/${s.id}`)}
                                                className="w-full text-left mb-3 p-4 rounded-xl border border-slate-100 dark:border-slate-800 bg-white dark:bg-card-dark hover:border-[#BF8339]/50 hover:shadow-md transition-all group">
                                                {chapNum != null && (
                                                    <p className="text-[10px] font-bold uppercase tracking-widest text-[#BF8339] mb-1">
                                                        Cap. {String(chapNum).padStart(2, '0')}
                                                    </p>
                                                )}
                                                <p className="text-sm font-semibold leading-snug group-hover:text-[#BF8339] transition-colors">{s.title}</p>
                                                {s.subtitle && <p className="text-xs text-slate-500 mt-1 line-clamp-2">{s.subtitle}</p>}
                                            </button>
                                        );
                                    })}
                        </div>
                    </div>

                    {/* Assuntos Relacionados */}
                    <div className="mt-10 pt-8 border-t border-slate-100 dark:border-slate-800">
                        <h3 className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#BF8339] mb-1">
                            <span className="material-symbols-outlined text-base">hub</span>
                            Assuntos Relacionados
                            <span className="ml-auto text-[10px] text-slate-400 normal-case tracking-normal font-normal">
                                {totalRelated} resultado{totalRelated !== 1 ? 's' : ''}
                            </span>
                        </h3>
                        <p className="text-xs text-slate-400 mb-3 italic">
                            Conteúdos com tags conectadas a <span className="font-semibold not-italic text-[#BF8339]">#{FULL_NAMES[selectedTag!] ?? selectedTag}</span> no diagrama
                        </p>
                        {correlatedTags.length > 0 && (
                            <div className="flex flex-wrap gap-1.5 mb-6">
                                {correlatedTags.map(t => (
                                    <span key={t} className="text-[10px] px-2 py-0.5 rounded-full border border-[#BF8339]/40 text-[#BF8339]">
                                        #{t}
                                    </span>
                                ))}
                            </div>
                        )}

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            {/* Capítulos relacionados */}
                            <div>
                                <h4 className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-slate-500 dark:text-slate-400 mb-4">
                                    <span className="material-symbols-outlined text-base">menu_book</span>
                                    Capítulos
                                    <span className="ml-auto text-[10px] normal-case tracking-normal font-normal">{relatedChapters.length}</span>
                                </h4>
                                {relatedChapters.length === 0
                                    ? <p className="text-sm text-slate-400 italic">Nenhum capítulo encontrado.</p>
                                    : relatedChapters.map(ch => (
                                        <button key={ch.id} onClick={() => navigate(`/capitulo/${ch.order_num}`)}
                                            className="w-full text-left mb-3 p-4 rounded-xl border border-slate-100 dark:border-slate-800 bg-white dark:bg-card-dark hover:border-[#BF8339]/50 hover:shadow-md transition-all group">
                                            <p className="text-[10px] font-bold uppercase tracking-widest text-[#BF8339] mb-1">
                                                Capítulo {String(ch.order_num).padStart(2, '0')}
                                            </p>
                                            <p className="text-sm font-semibold leading-snug group-hover:text-[#BF8339] transition-colors">{ch.title}</p>
                                            {ch.subtitle && <p className="text-xs text-slate-500 mt-1 line-clamp-2">{ch.subtitle}</p>}
                                            <div className="flex flex-wrap gap-1 mt-2">
                                                {(ch.tags ?? []).filter(t => correlatedTagsLower.includes(t.toLowerCase())).slice(0, 3).map(t => (
                                                    <span key={t} className="text-[10px] px-1.5 py-0.5 rounded-full bg-[#BF8339]/10 text-[#BF8339] border border-[#BF8339]/20">#{t}</span>
                                                ))}
                                            </div>
                                        </button>
                                    ))
                                }
                            </div>

                            {/* Artigos relacionados */}
                            <div>
                                <h4 className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-slate-500 dark:text-slate-400 mb-4">
                                    <span className="material-symbols-outlined text-base">article</span>
                                    Artigos
                                    <span className="ml-auto text-[10px] normal-case tracking-normal font-normal">{relatedPosts.length}</span>
                                </h4>
                                {relatedPosts.length === 0
                                    ? <p className="text-sm text-slate-400 italic">Nenhum artigo encontrado.</p>
                                    : relatedPosts.map(p => {
                                        const matchingTags = (p.tags ?? []).filter(t => correlatedTagsLower.includes(t.toLowerCase()));
                                        return (
                                            <button key={p.id} onClick={() => navigate(`/post/${p.slug}`)}
                                                className="w-full text-left mb-3 p-4 rounded-xl border border-slate-100 dark:border-slate-800 bg-white dark:bg-card-dark hover:border-[#BF8339]/50 hover:shadow-md transition-all group">
                                                <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-1">{p.date}</p>
                                                <p className="text-sm font-semibold leading-snug mb-2 group-hover:text-[#BF8339] transition-colors">{p.title}</p>
                                                {p.description && <p className="text-xs text-slate-500 mb-2 line-clamp-2">{p.description}</p>}
                                                <div className="flex flex-wrap gap-1">
                                                    {matchingTags.slice(0, 3).map(t => (
                                                        <span key={t} className="text-[10px] px-1.5 py-0.5 rounded-full bg-[#BF8339]/10 text-[#BF8339] border border-[#BF8339]/20">#{t}</span>
                                                    ))}
                                                </div>
                                            </button>
                                        );
                                    })
                                }
                            </div>

                            {/* Subseções relacionadas */}
                            <div>
                                <h4 className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-slate-500 dark:text-slate-400 mb-4">
                                    <span className="material-symbols-outlined text-base">bookmark</span>
                                    Subseções
                                    {!relatedSectionsLoading && (
                                        <span className="ml-auto text-[10px] normal-case tracking-normal font-normal">{filteredRelatedSections.length}</span>
                                    )}
                                </h4>
                                {relatedSectionsLoading
                                    ? <span className="material-symbols-outlined animate-spin text-[#BF8339] text-2xl">sync</span>
                                    : filteredRelatedSections.length === 0
                                        ? <p className="text-sm text-slate-400 italic">Nenhuma subseção encontrada.</p>
                                        : filteredRelatedSections.map(s => {
                                            const chapNum = chapterOrderMap[s.chapter_id];
                                            return (
                                                <button key={s.id}
                                                    onClick={() => chapNum != null && navigate(`/capitulo/${chapNum}/secao/${s.id}`)}
                                                    className="w-full text-left mb-3 p-4 rounded-xl border border-slate-100 dark:border-slate-800 bg-white dark:bg-card-dark hover:border-[#BF8339]/50 hover:shadow-md transition-all group">
                                                    {chapNum != null && (
                                                        <p className="text-[10px] font-bold uppercase tracking-widest text-[#BF8339] mb-1">
                                                            Cap. {String(chapNum).padStart(2, '0')}
                                                        </p>
                                                    )}
                                                    <p className="text-sm font-semibold leading-snug group-hover:text-[#BF8339] transition-colors">{s.title}</p>
                                                    {s.subtitle && <p className="text-xs text-slate-500 mt-1 line-clamp-2">{s.subtitle}</p>}
                                                    <div className="flex flex-wrap gap-1 mt-2">
                                                        {(s.tags ?? []).filter(t => correlatedTagsLower.includes(t.toLowerCase())).slice(0, 3).map(t => (
                                                            <span key={t} className="text-[10px] px-1.5 py-0.5 rounded-full bg-[#BF8339]/10 text-[#BF8339] border border-[#BF8339]/20">#{t}</span>
                                                        ))}
                                                    </div>
                                                </button>
                                            );
                                        })
                                }
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </main>
    );
};
