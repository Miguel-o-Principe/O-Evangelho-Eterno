import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';

export interface ChapterSection {
    id: string;
    chapter_id: string;
    order_num: number;
    title: string;
    subtitle: string;
    tag_line: string;
    description: string;
    content: string;
    read_time: number;
    published: boolean;
    tags: string[];
    created_at: string;
    updated_at: string;
}

export type SectionSummary = Omit<ChapterSection, 'content'>;

/** Busca subseções de um capítulo específico (apenas publicadas por padrão) */
export function useChapterSections(chapterId: string | null, includeUnpublished = false) {
    const [sections, setSections] = useState<SectionSummary[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (!chapterId) return;
        setLoading(true);
        let query = supabase
            .from('chapter_sections')
            .select('id, chapter_id, order_num, title, subtitle, tag_line, description, read_time, published, tags, created_at, updated_at')
            .eq('chapter_id', chapterId)
            .order('order_num', { ascending: true });

        if (!includeUnpublished) {
            query = query.eq('published', true);
        }

        query.then(async ({ data, error }) => {
            if (error?.code === '42703') {
                let fb = supabase
                    .from('chapter_sections')
                    .select('id, chapter_id, order_num, title, subtitle, tag_line, description, read_time, published, created_at, updated_at')
                    .eq('chapter_id', chapterId!)
                    .order('order_num', { ascending: true });
                if (!includeUnpublished) fb = fb.eq('published', true);
                const { data: fd } = await fb;
                setSections((fd || []).map((s: any) => ({ ...s, tags: [] })));
            } else if (error) {
                setError(error.message);
            } else {
                setSections((data || []).map(s => ({ ...s, tags: s.tags || [] })));
            }
            setLoading(false);
        });
    }, [chapterId, includeUnpublished]);

    return { sections, loading, error };
}

/** Busca todas as seções agrupadas por chapter_id (para o admin) */
export function useAllSectionsGrouped(includeUnpublished = true) {
    const [sectionsMap, setSectionsMap] = useState<Record<string, SectionSummary[]>>({});
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        let query = supabase
            .from('chapter_sections')
            .select('id, chapter_id, order_num, title, subtitle, tag_line, description, read_time, published, tags, created_at, updated_at')
            .order('chapter_id')
            .order('order_num', { ascending: true });

        if (!includeUnpublished) {
            query = query.eq('published', true);
        }

        query.then(async ({ data, error: qErr }) => {
            let rows: any[] = data || [];
            if (qErr?.code === '42703') {
                let fb = supabase
                    .from('chapter_sections')
                    .select('id, chapter_id, order_num, title, subtitle, tag_line, description, read_time, published, created_at, updated_at')
                    .order('chapter_id')
                    .order('order_num', { ascending: true });
                if (!includeUnpublished) fb = fb.eq('published', true);
                const { data: fd } = await fb;
                rows = (fd || []).map((s: any) => ({ ...s, tags: [] }));
            } else {
                rows = rows.map(s => ({ ...s, tags: s.tags || [] }));
            }
            const map: Record<string, SectionSummary[]> = {};
            rows.forEach(s => {
                if (!map[s.chapter_id]) map[s.chapter_id] = [];
                map[s.chapter_id].push(s);
            });
            setSectionsMap(map);
            setLoading(false);
        });
    }, [includeUnpublished]);

    return { sectionsMap, loading };
}

/** Busca uma seção completa pelo ID, com prev/next dentro do mesmo capítulo */
export function useSection(sectionId: string | null) {
    const [section, setSection] = useState<ChapterSection | null>(null);
    const [chapterImageUrl, setChapterImageUrl] = useState<string>('');
    const [chapterOrderNum, setChapterOrderNum] = useState<number>(1);
    const [prevSection, setPrevSection] = useState<{ id: string; title: string } | null>(null);
    const [nextSection, setNextSection] = useState<{ id: string; title: string } | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (!sectionId) return;
        setLoading(true);

        supabase
            .from('chapter_sections')
            .select('*')
            .eq('id', sectionId)
            .single()
            .then(async ({ data, error }) => {
                if (error || !data) {
                    setError(error?.message || 'Seção não encontrada');
                    setLoading(false);
                    return;
                }
                setSection(data);

                // Fetch parent chapter image
                const { data: chap } = await supabase
                    .from('chapters')
                    .select('image_url, order_num')
                    .eq('id', data.chapter_id)
                    .single();
                if (chap) {
                    setChapterImageUrl(chap.image_url);
                    setChapterOrderNum(chap.order_num);
                }

                // Fetch prev/next within same chapter
                const { data: siblings } = await supabase
                    .from('chapter_sections')
                    .select('id, order_num, title')
                    .eq('chapter_id', data.chapter_id)
                    .eq('published', true)
                    .or(`order_num.eq.${data.order_num - 1},order_num.eq.${data.order_num + 1}`)
                    .order('order_num', { ascending: true });

                if (siblings) {
                    setPrevSection(siblings.find(s => s.order_num === data.order_num - 1) || null);
                    setNextSection(siblings.find(s => s.order_num === data.order_num + 1) || null);
                }

                setLoading(false);
            });
    }, [sectionId]);

    return { section, chapterImageUrl, chapterOrderNum, prevSection, nextSection, loading, error };
}
