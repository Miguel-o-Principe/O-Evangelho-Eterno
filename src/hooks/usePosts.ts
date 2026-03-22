import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';

export interface PostMeta {
    id: string;
    title: string;
    description: string;
    date: string;
    author: string;
    coverImage?: string;
    slug: string;
    readTime: number;
    content: string;
    published: boolean;
}

export function usePosts(includeUnpublished: boolean = false) {
    const [posts, setPosts] = useState<PostMeta[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadPosts = async () => {
            try {
                let query = supabase
                    .from('posts')
                    .select('*')
                    .order('date', { ascending: false });

                if (!includeUnpublished) {
                    query = query.eq('published', true);
                }

                const { data, error } = await query;

                if (error) throw error;

                const formattedPosts: PostMeta[] = (data || []).map(post => ({
                    id: post.id,
                    title: post.title,
                    description: post.description,
                    date: new Date(post.date).toISOString().split('T')[0],
                    author: post.author,
                    coverImage: post.cover_image,
                    slug: post.slug,
                    readTime: post.read_time,
                    content: post.content,
                    published: post.published,
                }));

                setPosts(formattedPosts);
            } catch (error) {
                console.error('Error loading posts:', error);
            } finally {
                setLoading(false);
            }
        };

        loadPosts();
    }, [includeUnpublished]);

    return { posts, loading };
}
