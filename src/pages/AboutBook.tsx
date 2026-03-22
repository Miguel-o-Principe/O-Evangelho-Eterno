import React from 'react';
import { AmazonCTA } from '../components/AmazonCTA';
import { ChapterMeta } from '../components/ChapterMeta';

export const AboutBook = () => {
    return (
        <main className="w-full max-w-4xl mx-auto px-4 sm:px-6 py-12 lg:py-24 fade-up overflow-hidden">
            <ChapterMeta
                title="Sobre a Obra"
                description="Uma análise interdisciplinar de O Evangelho Eterno e a Ciência da Graça — Psicanálise Lacaniana, Teologia Bíblica, Cosmologia Quântica e Filosofia Existencialista."
                image="/images/capa.jpg"
            />
            <style>{`
                .text-gradient {
                    background: linear-gradient(to right, #ec1337, #ff4d6d);
                    -webkit-background-clip: text;
                    -webkit-text-fill-color: transparent;
                }
                .fade-up { animation: fadeUp 1s ease-out forwards; }
                @keyframes fadeUp {
                    from { opacity: 0; transform: translateY(20px); }
                    to { opacity: 1; transform: translateY(0); }
                }
            `}</style>

            {/* Header da Análise */}
            <header className="mb-20 text-center lg:text-left">
                <h6 className="text-primary font-bold uppercase tracking-[0.3em] text-[10px] mb-4">Análise Interdisciplinar</h6>
                <h1 className="text-3xl sm:text-5xl font-bold leading-tight mb-8 italic">
                    O Evangelho Eterno e a Ciência da Graça: <span className="text-gradient">Uma Análise da Obra de Miguel, o Príncipe</span>
                </h1>

                <div className="flex flex-col lg:flex-row gap-10 items-center lg:items-start mt-12 text-left">
                    <div className="w-full lg:w-2/3 space-y-6 text-lg font-light leading-relaxed">
                        <p>
                            A obra intitulada <strong>O Evangelho Eterno e a Arquitetura da Graça</strong>, de autoria de <strong>Miguel, o Príncipe</strong>, representa um esforço intelectual singular na literatura teológica e filosófica contemporânea.
                        </p>
                        <p>
                            Longe de ser um manual de conduta moral ou uma exegese bíblica tradicional, o texto propõe uma desconstrução radical do fenômeno religioso através de uma síntese rigorosa entre quatro pilares do conhecimento humano: a <strong>Psicanálise Lacaniana</strong>, a <strong>Teologia Bíblica</strong>, a <strong>Cosmologia Quântica</strong> e a <strong>Filosofia Existencialista</strong>.
                        </p>
                    </div>
                    <div className="w-48 lg:w-1/3 shrink-0">
                        <img src="/images/capa.jpg" alt="Capa do Livro" className="w-full rounded-xl shadow-2xl rotate-2 hover:rotate-0 transition-transform duration-500" />
                    </div>
                </div>

                <div className="mt-8 p-8 bg-primary/5 dark:bg-primary/10 rounded-2xl border border-primary/10 italic text-slate-600 dark:text-slate-400 text-lg">
                    &quot;A tese central do autor é a de que a Graça não é um sentimento divino benevolente, mas uma 'Graça Estrutural', uma lei fundamental da realidade, comparável em sua solidez e amoralidade às leis da física, como a gravidade.&quot;
                </div>
            </header>

            {/* Seção I */}
            <section className="mb-12 pl-6 border-l border-primary/10 dark:border-primary/20">
                <h2 className="text-2xl font-bold mb-6 italic text-primary">I. A Fundação Psicanalítica: A Topografia do Desejo</h2>
                <div className="space-y-6 font-light leading-relaxed">
                    <p>O autor utiliza a psicanálise, especialmente a vertente lacaniana, como a ferramenta diagnóstica primária para mapear a constituição do sujeito humano a partir do evento simbólico da Queda. O Jardim do Éden é apresentado como o estado de unidade pré-simbólica, onde o ser e o fazer eram indivisíveis.</p>

                    <h3 className="text-xl font-bold mt-8">O Significado do &quot;Não&quot; e a Invenção do Pecado</h3>
                    <p>Na visão do autor, o desejo humano não precede a proibição; ao contrário, a Lei inaugura o Desejo ao demarcar o território do proibido. O desejo de Eva pelo fruto não nasce de uma fome biológica, mas de uma voracidade simbólica gerada pela interdição.</p>

                    <div className="w-full max-w-full overflow-x-auto rounded-2xl border border-slate-100 dark:border-white/5 bg-white dark:bg-card-dark my-8 shadow-lg">
                        <table className="w-full text-left border-collapse min-w-[600px] whitespace-nowrap">
                            <thead>
                                <tr>
                                    <th className="p-4 text-xs uppercase tracking-widest border-b border-slate-100 dark:border-white/10 dark:text-primary">Conceito Lacaniano</th>
                                    <th className="p-4 text-xs uppercase tracking-widest border-b border-slate-100 dark:border-white/10 dark:text-primary">Aplicação na Obra</th>
                                    <th className="p-4 text-xs uppercase tracking-widest border-b border-slate-100 dark:border-white/10 dark:text-primary">Implicação no Sujeito</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td className="p-4 border-b border-slate-50 dark:border-white/5 font-bold text-sm">A Falta (Manque)</td>
                                    <td className="p-4 border-b border-slate-50 dark:border-white/5 text-sm">O estado do homem após a Queda.</td>
                                    <td className="p-4 border-b border-slate-50 dark:border-white/5 text-sm">O desejo busca preencher o vazio da unidade perdida.</td>
                                </tr>
                                <tr>
                                    <td className="p-4 border-b border-slate-50 dark:border-white/5 font-bold text-sm">Ordem Simbólica</td>
                                    <td className="p-4 border-b border-slate-50 dark:border-white/5 text-sm">A Lei e a Linguagem no Éden.</td>
                                    <td className="p-4 border-b border-slate-50 dark:border-white/5 text-sm">O sujeito passa a ser mediado pela cultura e moral.</td>
                                </tr>
                                <tr>
                                    <td className="p-4 border-b border-slate-50 dark:border-white/5 font-bold text-sm">Grande Outro</td>
                                    <td className="p-4 border-b border-slate-50 dark:border-white/5 text-sm">O &quot;Deus da Lei&quot; (Mediador Angélico).</td>
                                    <td className="p-4 border-b border-slate-50 dark:border-white/5 text-sm">A instância que observa e julga a performance.</td>
                                </tr>
                                <tr>
                                    <td className="p-4 font-bold text-sm">Objeto Pequeno a</td>
                                    <td className="p-4 text-sm">O Fruto Proibido / O Pecado.</td>
                                    <td className="p-4 text-sm">O objeto que causa desejo mas nunca satisfaz.</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                    <p>O autor argumenta que incorporar o Conhecimento do Bem e do Mal faz com que Adão deixe de ser um sujeito autêntico para se tornar um <strong>&quot;Ator de si mesmo&quot;</strong> (Adão Performativo), cobrindo seu abismo interior com &quot;folhas de figueira&quot; — a metáfora para a moralidade religiosa.</p>
                </div>
            </section>

            {/* Seção II */}
            <section className="mb-12 pl-6 border-l border-primary/10 dark:border-primary/20">
                <h2 className="text-2xl font-bold mb-6 italic text-primary">II. O Edifício Teológico: Desconstrução da Lei</h2>
                <div className="space-y-6 font-light leading-relaxed">
                    <p>O autor propõe uma separação cirúrgica entre o &quot;Deus da Lei&quot; e o &quot;Pai da Graça&quot;. Uma das teses mais provocativas é que a interação de Israel foi mediada exclusivamente por anjos, seres funcionais e amorais que operam pela lógica da retribuição estrita.</p>

                    <div className="w-full max-w-full overflow-x-auto rounded-2xl border border-slate-100 dark:border-white/5 bg-white dark:bg-card-dark my-8 shadow-lg">
                        <table className="w-full text-left border-collapse min-w-[600px] whitespace-nowrap">
                            <thead>
                                <tr>
                                    <th className="p-4 text-xs uppercase tracking-widest border-b border-slate-100 dark:border-white/10 dark:text-primary">Personagem</th>
                                    <th className="p-4 text-xs uppercase tracking-widest border-b border-slate-100 dark:border-white/10 dark:text-primary">A Sombra (Antigo Testamento)</th>
                                    <th className="p-4 text-xs uppercase tracking-widest border-b border-slate-100 dark:border-white/10 dark:text-primary">A Realidade (Cristo)</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td className="p-4 border-b border-slate-50 dark:border-white/5 font-bold text-sm">Abel</td>
                                    <td className="p-4 border-b border-slate-50 dark:border-white/5 text-sm">Sangue que clama por vingança.</td>
                                    <td className="p-4 border-b border-slate-50 dark:border-white/5 text-sm">Sangue que fala melhor e oferece perdão.</td>
                                </tr>
                                <tr>
                                    <td className="p-4 border-b border-slate-50 dark:border-white/5 font-bold text-sm">Noé</td>
                                    <td className="p-4 border-b border-slate-50 dark:border-white/5 text-sm">Salvação que exige a destruição.</td>
                                    <td className="p-4 border-b border-slate-50 dark:border-white/5 text-sm">A Arca que atravessa a ira no próprio corpo.</td>
                                </tr>
                                <tr>
                                    <td className="p-4 border-b border-slate-50 dark:border-white/5 font-bold text-sm">Isaque</td>
                                    <td className="p-4 border-b border-slate-50 dark:border-white/5 text-sm">O filho que carrega a lenha.</td>
                                    <td className="p-4 border-b border-slate-50 dark:border-white/5 text-sm">O Filho que morre para que a humanidade viva.</td>
                                </tr>
                                <tr>
                                    <td className="p-4 font-bold text-sm">Moisés</td>
                                    <td className="p-4 text-sm">O véu que esconde a glória.</td>
                                    <td className="p-4 text-sm">A nudez da Cruz que revela a glória eterna.</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                    <p>Jesus apresenta-se como o <strong>&quot;Sétimo Homem&quot;</strong> no poço de Samaria, o Marido do Descanso Perfeito, em contraste com as cinco alianças anteriores (os cinco maridos) que ofereceram estrutura, mas não a vida plena.</p>
                </div>
            </section>

            {/* Seção III */}
            <section className="mb-12 pl-6 border-l border-primary/10 dark:border-primary/20">
                <h2 className="text-2xl font-bold mb-6 italic text-primary">III. Infraestrutura Cosmológica: Física Quântica</h2>
                <div className="space-y-6 font-light leading-relaxed">
                    <p>A premissa cosmológica mais radical da obra é a de que a Cruz de Cristo é a &quot;Causa Primeira&quot; da criação. O universo tomou &quot;vida emprestada&quot; da morte futura de Cristo através do princípio da <strong>retrocausalidade</strong>.</p>

                    <div className="w-full max-w-full overflow-x-auto rounded-2xl border border-slate-100 dark:border-white/5 bg-white dark:bg-card-dark my-8 shadow-lg">
                        <table className="w-full text-left border-collapse min-w-[600px] whitespace-nowrap">
                            <thead>
                                <tr>
                                    <th className="p-4 text-xs uppercase tracking-widest border-b border-slate-100 dark:border-white/10 dark:text-primary">Dimensão Temporal</th>
                                    <th className="p-4 text-xs uppercase tracking-widest border-b border-slate-100 dark:border-white/10 dark:text-primary">Conceito Cosmológico</th>
                                    <th className="p-4 text-xs uppercase tracking-widest border-b border-slate-100 dark:border-white/10 dark:text-primary">Função Teológica</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td className="p-4 border-b border-slate-50 dark:border-white/5 font-bold text-sm">Chronos</td>
                                    <td className="p-4 border-b border-slate-50 dark:border-white/5 text-sm">Tempo Linear / Entropia.</td>
                                    <td className="p-4 border-b border-slate-50 dark:border-white/5 text-sm">Onde o homem vive o pecado e a morte.</td>
                                </tr>
                                <tr>
                                    <td className="p-4 border-b border-slate-50 dark:border-white/5 font-bold text-sm">Kairos</td>
                                    <td className="p-4 border-b border-slate-50 dark:border-white/5 text-sm">Tempo do Real / Eternidade.</td>
                                    <td className="p-4 border-b border-slate-50 dark:border-white/5 text-sm">Onde a obra de Cristo já está concluída.</td>
                                </tr>
                                <tr>
                                    <td className="p-4 border-b border-slate-50 dark:border-white/5 font-bold text-sm">Retrocausalidade</td>
                                    <td className="p-4 border-b border-slate-50 dark:border-white/5 text-sm">O efeito precede a causa.</td>
                                    <td className="p-4 border-b border-slate-50 dark:border-white/5 text-sm">A Cruz sustenta a criação do Gênesis.</td>
                                </tr>
                                <tr>
                                    <td className="p-4 font-bold text-sm">Superposição</td>
                                    <td className="p-4 text-sm">Dois estados simultâneos.</td>
                                    <td className="p-4 text-sm">O crente está na terra e assentado no céu.</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </section>

            {/* Seção IV */}
            <section className="mb-12 pl-6 border-l border-primary/10 dark:border-primary/20">
                <h2 className="text-2xl font-bold mb-6 italic text-primary">IV. Horizonte Filosófico: Ateísmo Cristão</h2>
                <div className="space-y-6 font-light leading-relaxed">
                    <p>O autor propõe um <strong>&quot;Ateísmo Cristão&quot;</strong> em relação ao Deus da Lei como o único caminho para a fé autêntica. A Cruz é o funeral da religião burocrática, onde o Juiz morreu para salvar o réu.</p>

                    <div className="w-full max-w-full overflow-x-auto rounded-2xl border border-slate-100 dark:border-white/5 bg-white dark:bg-card-dark my-8 shadow-lg">
                        <table className="w-full text-left border-collapse min-w-[600px] whitespace-nowrap">
                            <thead>
                                <tr>
                                    <th className="p-4 text-xs uppercase tracking-widest border-b border-slate-100 dark:border-white/10 dark:text-primary">Conceito Filosófico</th>
                                    <th className="p-4 text-xs uppercase tracking-widest border-b border-slate-100 dark:border-white/10 dark:text-primary">Definição na Obra</th>
                                    <th className="p-4 text-xs uppercase tracking-widest border-b border-slate-100 dark:border-white/10 dark:text-primary">Impacto na Fé</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td className="p-4 border-b border-slate-50 dark:border-white/5 font-bold text-sm">Ateísmo Cristão</td>
                                    <td className="p-4 border-b border-slate-50 dark:border-white/5 text-sm">Negação do Deus que pune por mérito.</td>
                                    <td className="p-4 border-b border-slate-50 dark:border-white/5 text-sm">Liberta para amar sem medo do inferno.</td>
                                </tr>
                                <tr>
                                    <td className="p-4 border-b border-slate-50 dark:border-white/5 font-bold text-sm">Como Se Não</td>
                                    <td className="p-4 border-b border-slate-50 dark:border-white/5 text-sm">Distanciamento dos papéis sociais.</td>
                                    <td className="p-4 border-b border-slate-50 dark:border-white/5 text-sm">Permite usar o mundo sem ser possuído.</td>
                                </tr>
                                <tr>
                                    <td className="p-4 font-bold text-sm">Indiferença Santa</td>
                                    <td className="p-4 text-sm">Perda do interesse no pecado.</td>
                                    <td className="p-4 text-sm">O pecado torna-se banal e sem sabor.</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </section>

            {/* Conclusão */}
            <section className="mt-20 p-10 bg-white dark:bg-card-dark rounded-[2.5rem] border border-slate-200 dark:border-slate-800 shadow-2xl relative overflow-hidden text-center lg:text-left">
                <div className="absolute top-0 left-0 w-full h-2 bg-primary"></div>
                <h2 className="text-3xl font-bold mb-8 italic">V. Conclusão: O Fim do Teatro Religioso</h2>
                <div className="space-y-6 font-light leading-relaxed text-lg text-slate-600 dark:text-slate-400">
                    <p>
                        O livro convida o leitor a abandonar o papel de &quot;Adão Performativo&quot; e aceitar a nudez da filiação. A arquitetura da obra revela que o universo não é um palco de testes morais, mas um cenário construído ao redor da Cruz.
                    </p>
                    <p>
                        A vida no tempo é apenas o processo de despertar para essa realidade consumada. O convite de <strong>Miguel, o Príncipe</strong>, é para que o homem saia da neurose e entre no descanso de quem descobriu que a &quot;Espada de Fogo&quot; já se apagou no peito de Jesus.
                    </p>
                    <p className="font-bold text-slate-900 dark:text-white mt-10 text-xl">
                        O Evangelho não é uma nova religião, mas o fim de todas elas.
                    </p>
                </div>
            </section>

            {/* Amazon CTA Banner */}
            <AmazonCTA />
        </main>
    );
};
