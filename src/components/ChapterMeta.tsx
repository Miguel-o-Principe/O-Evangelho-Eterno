import { useEffect } from 'react';

interface ChapterMetaProps {
    title: string;
    description: string;
    chapterNumber: string;
    image?: string;
}

const BASE_TITLE = 'O Evangelho Eterno e a Ciência da Graça';
const BASE_URL = 'https://oevangelhoeterno.vercel.app';

/**
 * Dynamically sets document.title and <meta> tags for SEO per chapter.
 * Cleans up on unmount (restores defaults).
 */
export const ChapterMeta = ({ title, description, chapterNumber, image }: ChapterMetaProps) => {
    useEffect(() => {
        const pageTitle = `Cap. ${chapterNumber} — ${title} | ${BASE_TITLE}`;
        const ogImage = image ? `${BASE_URL}${image}` : `${BASE_URL}/images/livro-3d.png`;

        // Title
        document.title = pageTitle;

        // Helper: set or create a <meta> tag
        const setMeta = (attr: string, key: string, content: string) => {
            let el = document.querySelector(`meta[${attr}="${key}"]`) as HTMLMetaElement | null;
            if (!el) {
                el = document.createElement('meta');
                el.setAttribute(attr, key);
                document.head.appendChild(el);
            }
            el.setAttribute('content', content);
        };

        setMeta('name', 'description', description);
        setMeta('property', 'og:title', pageTitle);
        setMeta('property', 'og:description', description);
        setMeta('property', 'og:image', ogImage);
        setMeta('property', 'og:type', 'article');
        setMeta('name', 'twitter:title', pageTitle);
        setMeta('name', 'twitter:description', description);
        setMeta('name', 'twitter:image', ogImage);

        // Cleanup: restore defaults on unmount
        return () => {
            document.title = BASE_TITLE;
            setMeta('name', 'description', 'A Topografia do Desejo e a Desconstrução do Sujeito Performativo.');
            setMeta('property', 'og:title', BASE_TITLE);
            setMeta('property', 'og:description', 'A Topografia do Desejo e a Desconstrução do Sujeito Performativo. Leia os primeiros capítulos gratuitamente e descubra a Arquitetura da Graça.');
            setMeta('property', 'og:image', `${BASE_URL}/images/livro-3d.png`);
            setMeta('name', 'twitter:title', BASE_TITLE);
            setMeta('name', 'twitter:description', 'A Topografia do Desejo e a Desconstrução do Sujeito Performativo. Leia os primeiros capítulos gratuitamente e descubra a Arquitetura da Graça.');
            setMeta('name', 'twitter:image', `${BASE_URL}/images/livro-3d.png`);
        };
    }, [title, description, chapterNumber, image]);

    return null; // Renderless component
};
