import React from 'react';

export const mdxComponents = {
    h3: (props: any) => <h3 className="text-2xl font-serif font-bold text-slate-900 dark:text-white mt-16 mb-8 italic" {...props} />,
    h4: (props: any) => <h4 className="text-xl font-serif font-bold text-slate-800 dark:text-slate-200 mt-12 mb-6 italic" {...props} />,
    p: (props: any) => {
        // Verifica se "Dropcap" está na primeira palavra para aplicar o estilo de capítulo
        if (typeof props.children === 'string' && props.children.startsWith('[Dropcap]')) {
            return <p className="dropcap mt-6 mb-8 text-lg font-light leading-relaxed text-slate-800 dark:text-slate-300 antialiased" {...props}>{props.children.replace('[Dropcap] ', '')}</p>;
        }
        return <p className="mt-6 mb-8 text-lg font-light leading-relaxed text-slate-800 dark:text-slate-300 antialiased" {...props} />;
    },
    strong: (props: any) => <strong className="font-bold text-slate-900 dark:text-white" {...props} />,
    a: (props: any) => <a className="text-primary hover:text-primary-dark underline underline-offset-4 decoration-primary/30 hover:decoration-primary transition-colors" {...props} />,
    blockquote: (props: any) => (
        <blockquote className="relative my-16 py-8 px-12 border-l-2 border-primary/30 italic text-2xl text-slate-900 dark:text-white font-light leading-relaxed shadow-sm bg-slate-50/50 dark:bg-slate-900/50 rounded-r-3xl">
            <span className="absolute top-0 left-4 text-6xl text-primary/10 font-serif">"</span>
            {props.children}
        </blockquote>
    ),
    ul: (props: any) => <ul className="list-disc list-inside my-6 space-y-2 text-slate-800 dark:text-slate-300 ml-4" {...props} />,
    ol: (props: any) => <ol className="list-decimal list-inside my-6 space-y-2 text-slate-800 dark:text-slate-300 ml-4" {...props} />,
    li: (props: any) => <li className="leading-relaxed" {...props} />,
    // Tabelas
    table: (props: any) => (
        <div className="table-container shadow-2xl my-16 overflow-x-auto rounded-xl">
            <table className="w-full text-left border-collapse" {...props} />
        </div>
    ),
    thead: (props: any) => <thead className="bg-slate-100 dark:bg-slate-800/50" {...props} />,
    th: (props: any) => <th className="py-4 px-6 font-bold text-slate-900 dark:text-white border-b border-slate-200 dark:border-slate-700" {...props} />,
    tbody: (props: any) => <tbody className="divide-y divide-slate-100 dark:divide-slate-800/50" {...props} />,
    tr: (props: any) => <tr className="hover:bg-slate-50 dark:hover:bg-slate-900/20 transition-colors" {...props} />,
    td: (props: any) => <td className="py-4 px-6 text-slate-700 dark:text-slate-300" {...props} />,
};
