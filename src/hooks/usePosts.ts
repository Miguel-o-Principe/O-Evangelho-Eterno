import { useState, useEffect } from 'react';

export interface PostMeta {
    title: string;
    description: string;
    date: string;
    author: string;
    coverImage?: string;
    slug: string;
}

export function usePosts() {
    const [posts, setPosts] = useState<PostMeta[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // import.meta.glob importa os arquivos disponíveis na compilação.
        const mdxModules = import.meta.glob('../posts/*.mdx');

        const loadPosts = async () => {
            const loadedPosts = await Promise.all(
                Object.entries(mdxModules).map(async ([path, resolver]) => {
                    const module: any = await resolver();
                    const slug = path.replace('../posts/', '').replace('.mdx', '');
                    return {
                        ...module.meta,
                        slug,
                    };
                })
            );

            // Ordena do mais recente para o mais antigo (baseado em string ISO)
            loadedPosts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

            setPosts(loadedPosts);
            setLoading(false);
        };

        loadPosts();
    }, []);

    return { posts, loading };
}
