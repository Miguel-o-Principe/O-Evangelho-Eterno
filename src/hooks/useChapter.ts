import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';

export interface Chapter {
    id: string;
    order_num: number;
    title: string;
    subtitle: string;
    tag_line: string;
    image_url: string;
    description: string;
    content: string;
    read_time: number;
    published: boolean;
    created_at: string;
    updated_at: string;
}

export function useChapter(orderNum: number) {
    const [chapter, setChapter] = useState<Chapter | null>(null);
    const [prevChapter, setPrevChapter] = useState<{ order_num: number; title: string } | null>(null);
    const [nextChapter, setNextChapter] = useState<{ order_num: number; title: string } | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (!orderNum || isNaN(orderNum)) return;

        const fetchChapter = async () => {
            setLoading(true);
            setError(null);

            const { data, error } = await supabase
                .from('chapters')
                .select('*')
                .eq('order_num', orderNum)
                .single();

            if (error) {
                setError(error.message);
                setLoading(false);
                return;
            }

            setChapter(data);

            // Fetch prev/next chapters
            const { data: neighbors } = await supabase
                .from('chapters')
                .select('order_num, title')
                .eq('published', true)
                .or(`order_num.eq.${orderNum - 1},order_num.eq.${orderNum + 1}`)
                .order('order_num', { ascending: true });

            if (neighbors) {
                const prev = neighbors.find(c => c.order_num === orderNum - 1) || null;
                const next = neighbors.find(c => c.order_num === orderNum + 1) || null;
                setPrevChapter(prev);
                setNextChapter(next);
            }

            setLoading(false);
        };

        fetchChapter();
    }, [orderNum]);

    return { chapter, prevChapter, nextChapter, loading, error };
}
