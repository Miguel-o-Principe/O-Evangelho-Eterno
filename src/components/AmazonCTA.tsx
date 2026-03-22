import React from 'react';

export const AmazonCTA = () => {
    return (
        <section className="my-16 flex flex-col items-center">
            <div className="w-full max-w-2xl bg-gradient-to-br from-slate-900 via-[#1A1A24] to-black rounded-[2rem] p-8 md:p-12 shadow-2xl relative overflow-hidden group">
                <div className="absolute inset-0 bg-primary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
                <div className="absolute -top-24 -right-24 w-48 h-48 bg-primary/20 blur-[80px] rounded-full"></div>

                <div className="relative z-10 flex flex-col md:flex-row items-center gap-8">
                    <div className="w-32 md:w-40 shrink-0">
                        <img
                            src="/images/capa.jpg"
                            alt="Capa do Livro O Evangelho Eterno"
                            className="w-full rounded-xl shadow-[0_10px_30px_rgba(0,0,0,0.5)] rotate-[-4deg] group-hover:rotate-0 transition-transform duration-500"
                        />
                    </div>

                    <div className="flex-1 text-center md:text-left flex flex-col justify-center">
                        <span className="text-primary font-bold uppercase tracking-[0.3em] text-[10px] mb-2 block">Obra Completa</span>
                        <h3 className="text-2xl md:text-3xl font-serif font-bold text-white mb-4 italic leading-tight">
                            Aprofunde-se na Arquitetura da Graça
                        </h3>
                        <p className="text-slate-400 text-sm md:text-base font-light mb-8 leading-relaxed">
                            Adquira a obra completa "O Evangelho Eterno e a Arquitetura da Graça" na Amazon e complete sua jornada teológica e espiritual.
                        </p>

                        <a
                            href="https://www.amazon.com.br/dp/B0GM8HTQF4"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center justify-center gap-3 px-8 py-4 bg-primary text-white font-bold rounded-xl shadow-lg shadow-primary/20 hover:brightness-110 hover:scale-[1.02] active:scale-[0.98] transition-all"
                        >
                            <span className="material-symbols-outlined text-xl">shopping_cart</span>
                            Adquirir na Amazon
                        </a>
                    </div>
                </div>
            </div>
        </section>
    );
};
