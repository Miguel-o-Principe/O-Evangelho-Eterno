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
                .select('id, order_num, title, subtitle, image_url, description, read_time, published')
                .order('order_num', { ascending: true });

            if (!includeUnpublished) {
                query = query.eq('published', true);
            }

            const { data, error } = await query;

            if (error) {
                setError(error.message);
            } else {
                setChapters(data || []);
            }
            setLoading(false);
        };

        fetchChapters();
    }, [includeUnpublished]);

    return { chapters, loading, error };
}
