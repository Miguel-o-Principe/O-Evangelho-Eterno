import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { CommentSection } from '../components/CommentSection';

export const AboutAuthor = () => {
    const { session } = useAuth();
    return (
        <main className="max-w-6xl mx-auto px-6 py-12 lg:py-24 fade-up flex-1 w-full text-slate-800 dark:text-slate-200">
            <style>{`
                .profile-mask {
                    mask-image: linear-gradient(to bottom, black 80%, transparent 100%);
                    -webkit-mask-image: linear-gradient(to bottom, black 80%, transparent 100%);
                }
                .text-reveal {
                    background: linear-gradient(to right, #ec1337, #ff4d6d);
                    -webkit-background-clip: text;
                    -webkit-text-fill-color: transparent;
                }
                .stat-card {
                    border-bottom: 2px solid transparent;
                    transition: all 0.3s ease;
                }
                .stat-card:hover {
                    border-bottom-color: #ec1337;
                    background: rgba(236, 19, 55, 0.03);
                }
                .fade-up { animation: fadeUp 1s ease-out forwards; }
                @keyframes fadeUp {
                    from { opacity: 0; transform: translateY(20px); }
                    to { opacity: 1; transform: translateY(0); }
                }
            `}</style>

            {/* Hero Section: Autor */}
            <section className="flex flex-col lg:flex-row items-center gap-12 lg:gap-24 mb-24">
                {/* Imagem do Autor */}
                <div className="w-full lg:w-1/2 relative group flex justify-center lg:justify-start">
                    <div className="absolute -inset-4 bg-primary/10 blur-3xl rounded-full opacity-50 group-hover:opacity-80 transition-opacity"></div>
                    <div className="relative w-full max-w-md aspect-square lg:max-w-lg shrink-0 select-none">
                        <img
                            src="/images/foto-autor.png"
                            alt="Miguel, o Príncipe"
                            className="w-full h-full object-cover profile-mask grayscale hover:grayscale-0 transition-all duration-1000"
                            onError={(e) => { e.currentTarget.src = 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=800'; }}
                        />
                        <div className="absolute bottom-0 left-0 w-full p-8 bg-gradient-to-t from-background-dark/80 to-transparent">
                            <p className="text-white text-sm font-bold uppercase tracking-[0.4em] mb-1">Autor & Mensageiro</p>
                            <h2 className="text-white text-3xl font-bold italic">Miguel, o Príncipe</h2>
                        </div>
                    </div>
                </div>

                {/* Bio Introdução */}
                <div className="w-full lg:w-1/2 space-y-8">
                    <div className="space-y-4">
                        <h6 className="text-primary font-bold uppercase tracking-[0.3em] text-[10px]">A Mensagem</h6>
                        <h1 className="text-3xl sm:text-4xl xl:text-5xl font-bold leading-tight italic">
                            O Autor: Entre a <span className="text-reveal">Glória da Mensagem</span> e a Realidade da Jornada.
                        </h1>
                    </div>

                    <div className="text-lg font-light leading-relaxed text-slate-600 dark:text-slate-400 space-y-4">
                        <p>
                            Muitos conhecem a voz por trás de <strong>O Evangelho Eterno e a Arquitetura da Graça</strong> pelo nome de Miguel, o Príncipe. Esse nome não é apenas um pseudônimo, mas um símbolo da missão que recebi: anunciar uma mensagem que transcende o tempo e aponta para a estrutura perfeita do amor divino.
                        </p>
                        <p>
                            No entanto, por trás das palavras que exploram a eternidade, existe um homem que conhece profundamente o peso da finitude.
                        </p>
                    </div>

                    <div className="grid grid-cols-2 gap-6 pt-4">
                        <div className="stat-card p-6 rounded-2xl bg-white dark:bg-card-dark border border-slate-100 dark:border-slate-800">
                            <p className="text-primary font-bold text-2xl mb-1">Luz</p>
                            <p className="text-[10px] uppercase font-bold tracking-widest opacity-60">Na Mensagem</p>
                        </div>
                        <div className="stat-card p-6 rounded-2xl bg-white dark:bg-card-dark border border-slate-100 dark:border-slate-800">
                            <p className="text-primary font-bold text-2xl mb-1">Barro</p>
                            <p className="text-[10px] uppercase font-bold tracking-widest opacity-60">No Mensageiro</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* A Força que nasce da Fraqueza */}
            <section className="grid grid-cols-1 lg:grid-cols-3 gap-12 mb-32 border-t border-slate-200 dark:border-slate-800 pt-20">
                <div className="lg:col-span-1">
                    <h3 className="text-2xl font-bold italic sticky top-32">A Força que nasce <br />da Fraqueza</h3>
                </div>
                <div className="lg:col-span-2 space-y-12 text-lg font-light leading-relaxed text-slate-600 dark:text-slate-400">
                    <div className="space-y-6">
                        <p>
                            Diferente do que muitos podem imaginar, este livro não nasceu em jardins de facilidade. Ele foi forjado no fogo. Minha escrita é o resultado de um diálogo constante entre as minhas maiores dores e a graça que insiste em me sustentar.
                        </p>
                        <p>
                            Eu sei, com toda a clareza, que não sou a melhor pessoa para falar sobre o Evangelho. Não sou um exemplo de perfeição, nem alguém isento de cicatrizes ou dúvidas. Se a escolha dependesse de méritos humanos, eu certamente estaria no fim da fila.
                        </p>
                    </div>
                    <div className="p-10 bg-white dark:bg-card-dark rounded-[2rem] border border-slate-100 dark:border-slate-800 italic text-slate-800 dark:text-slate-100 shadow-sm relative">
                        <span className="material-symbols-outlined absolute top-6 right-8 text-primary/20 text-6xl">format_quote</span>
                        &quot;Mas eu sou a pessoa que disse 'sim' à missão. Foi na minha fragilidade que ouvi o chamado, e foi no reconhecimento da minha própria necessidade que aceitei a tarefa de arquitetar em palavras o que Deus imprimiu no meu espírito.&quot;
                    </div>
                </div>
            </section>

            {/* Por que Miguel, o Príncipe? */}
            <section className="mb-32 max-w-4xl mx-auto space-y-8 bg-white dark:bg-card-dark p-12 rounded-[2.5rem] border border-slate-100 dark:border-slate-800 shadow-sm">
                <div className="text-center">
                    <h2 className="text-3xl font-bold mb-4 italic">Por que Miguel, o Príncipe?</h2>
                    <div className="h-1 w-16 bg-primary mx-auto rounded-full"></div>
                </div>
                <p className="text-xl font-light leading-relaxed text-slate-600 dark:text-slate-400 text-center">
                    Este nome representa a luta espiritual e a proteção da verdade. É o guardião de uma mensagem que não me pertence, mas que flui através de mim. Enquanto &quot;Miguel&quot; se posiciona na linha de frente da batalha teológica e espiritual, o homem por trás do nome caminha com humildade, sabendo que o mensageiro é apenas um barro nas mãos do Oleiro.
                </p>
            </section>

            {/* O que busco compartilhar */}
            <section className="space-y-12 mb-32">
                <div className="text-center space-y-4">
                    <h2 className="text-3xl font-bold italic">O que busco compartilhar</h2>
                    <p className="text-slate-500 italic font-light">Minha missão é simples, embora profunda:</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <div className="p-10 rounded-2xl bg-white dark:bg-card-dark border border-slate-100 dark:border-slate-800 hover:shadow-xl transition-all group text-center">
                        <div className="size-16 rounded-2xl bg-primary/10 flex items-center justify-center mb-6 mx-auto group-hover:scale-110 transition-transform">
                            <span className="material-symbols-outlined text-primary text-4xl">architecture</span>
                        </div>
                        <p className="text-base font-medium leading-relaxed">Revelar a estrutura invisível que sustenta o universo e a nossa vida.</p>
                    </div>
                    <div className="p-10 rounded-2xl bg-white dark:bg-card-dark border border-slate-100 dark:border-slate-800 hover:shadow-xl transition-all group text-center">
                        <div className="size-16 rounded-2xl bg-primary/10 flex items-center justify-center mb-6 mx-auto group-hover:scale-110 transition-transform">
                            <span className="material-symbols-outlined text-primary text-4xl">favorite</span>
                        </div>
                        <p className="text-base font-medium leading-relaxed">Acolher aqueles que, como eu, conhecem a dor, mas buscam a esperança.</p>
                    </div>
                    <div className="p-10 rounded-2xl bg-white dark:bg-card-dark border border-slate-100 dark:border-slate-800 hover:shadow-xl transition-all group text-center">
                        <div className="size-16 rounded-2xl bg-primary/10 flex items-center justify-center mb-6 mx-auto group-hover:scale-110 transition-transform">
                            <span className="material-symbols-outlined text-primary text-4xl">foundation</span>
                        </div>
                        <p className="text-base font-medium leading-relaxed">Anunciar que a Graça é o fundamento onde podemos reconstruir nossas ruínas.</p>
                    </div>
                </div>
            </section>

            {/* CTA Final ou Área de Mensagens */}
            {!session ? (
                <section className="text-center space-y-10 bg-primary/5 dark:bg-primary/10 p-12 lg:p-24 rounded-[3rem] border border-primary/10 shadow-inner">
                    <div className="space-y-4">
                        <h2 className="text-3xl sm:text-4xl font-bold italic">Deseja interagir com o autor?</h2>
                        <p className="text-slate-500 max-w-2xl mx-auto italic font-light">&quot;Aqui, não ofereço apenas teorias, mas a partilha de alguém que, apesar de todas as limitações, escolheu obedecer e entregar o que recebeu.&quot;</p>
                    </div>
                    <div className="flex flex-col sm:flex-row justify-center gap-6">
                        <Link to="/?action=register" className="px-10 py-5 bg-primary text-white rounded-xl font-bold shadow-xl shadow-primary/20 hover:brightness-110 transition-all flex items-center justify-center gap-3 text-base">
                            <span className="material-symbols-outlined">forum</span>
                            Cadastrar para Interações
                        </Link>
                    </div>
                </section>
            ) : (
                <div className="mt-12 bg-white dark:bg-card-dark rounded-[3rem] border border-slate-100 dark:border-slate-800 shadow-sm relative overflow-hidden pb-12">
                    <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-primary via-primary/50 to-primary"></div>
                    <CommentSection
                        chapterId="author_messages"
                        title="Mensagens ao Autor"
                        subtitle="Envie suas dúvidas, reflexões ou simplesmente compartilhe como a mensagem tem te tocado."
                        placeholder="Escreva sua mensagem diretamente para Miguel..."
                        emptyMessage="Ainda não há mensagens. Seja o primeiro a escrever para o autor!"
                        icon="mail"
                    />
                </div>
            )}
        </main>
    );
};
