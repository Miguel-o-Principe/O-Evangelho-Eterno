import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';

export interface ChapterSummary {
    id: string;
    order_num: number;
    title: string;
    subtitle: string;
    image_url: string;
    description: string;
    read_time: number;
    published: boolean;
    tags: string[];
}

export function useChapters(includeUnpublished = false) {
    const [chapters, setChapters] = useState<ChapterSummary[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchChapters = async () => {
            setLoading(true);
            let query = supabase
                .from('chapters')
                .select('id, order_num, title, subtitle, image_url, description, read_time, published, tags')
                .order('order_num', { ascending: true });

            if (!includeUnpublished) {
                query = query.eq('published', true);
            }

            let { data, error } = await query;

            if (error?.code === '42703') {
                // coluna tags ainda não existe — busca sem ela
                let fallback = supabase
                    .from('chapters')
                    .select('id, order_num, title, subtitle, image_url, description, read_time, published')
                    .order('order_num', { ascending: true });
                if (!includeUnpublished) fallback = fallback.eq('published', true);
                const { data: fd, error: fe } = await fallback;
                error = fe;
                data = (fd || []).map((c: any) => ({ ...c, tags: [] })) as any;
            }

            if (error) {
                setError(error.message);
            } else {
                setChapters((data || []).map((c: any) => ({ ...c, tags: c.tags || [] })));
            }
            setLoading(false);
        };

        fetchChapters();
    }, [includeUnpublished]);

    return { chapters, loading, error };
}
