import React from 'react';
import { Link } from 'react-router-dom';
import { AmazonCTA } from '../../components/AmazonCTA';

export const Chapter6 = () => {
    return (
        <>
            <header className="relative h-[80vh] w-full overflow-hidden flex items-end">
                <div className="absolute inset-0 scale-105">
                    {/* Imagem com object-center para corrigir a exposição da imagem */}
                    <img src="/images/capitulo-6-bg.png" alt="O Evangelho Eterno" className="w-full h-full object-cover object-center" />
                    <div className="absolute inset-0 bg-gradient-to-t from-dark-bg via-dark-bg/60 to-transparent"></div>
                </div>

                <div className="relative w-full pb-20 px-6 fade-up">
                    <div className="max-w-5xl mx-auto">
                        <div className="flex flex-col items-center text-center">
                            <div className="w-12 h-[2px] bg-primary mb-8 text-white"></div>
                            <span className="text-primary font-bold tracking-[0.5em] uppercase text-[10px] mb-6 block">A Revelação Final</span>
                            <h1 className="text-4xl md:text-6xl font-serif font-bold text-white mb-8 italic leading-tight max-w-5xl">
                                O Evangelho Eterno: A Morte da Lei e o Advento do Ser
                            </h1>
                            <div className="flex items-center gap-8 text-white/50 text-[10px] font-bold uppercase tracking-widest">
                                <span className="flex items-center gap-2"><span className="material-symbols-outlined text-sm text-primary">auto_awesome</span> Cap. 06</span>
                                <span className="flex items-center gap-2"><span className="material-symbols-outlined text-sm text-primary">hourglass_empty</span> 30 min de leitura</span>
                            </div>
                        </div>
                    </div>
                </div>
            </header>

            <main className="max-w-3xl mx-auto px-6 py-24 md:py-32">
                <article id="article-body" className="prose-custom font-serif transition-all duration-300">

                    <p className="dropcap">
                        A obra disruptiva de Miguel, o Príncipe, intitulada <em>&quot;O Evangelho Eterno e a Arquitetura da Graça&quot;</em>, atinge seu ápice argumentativo no capítulo 6. Este segmento não é apenas uma conclusão teológica, mas uma implosão ontológica que visa libertar o sujeito da &quot;neurose do fazer&quot; e conduzi-lo ao &quot;repouso do ser&quot;. Ao longo deste capítulo, o autor utiliza a interseção entre a exegese bíblica, a psicanálise lacaniana e a física quântica para demonstrar que o Evangelho não é uma religião, mas a infraestrutura da realidade. Este relatório apresenta uma análise exaustiva das teses centrais do capítulo 6, preparando o leitor para o impacto transformador da leitura integral.
                    </p>

                    <h3 className="text-3xl font-serif font-bold text-slate-900 dark:text-white mt-24 mb-10 italic">O Funeral da Performance: A Morte do Sr. Lei</h3>

                    <p>
                        A premissa fundamental do capítulo 6 é o anúncio do funeral da performance religiosa. O autor utiliza a metáfora do <strong>&quot;Sr. Lei&quot;</strong> para descrever a estrutura psíquica sob a qual a humanidade viveu por milênios. O Sr. Lei é o marido vigilante, sádico e exaustivo que exige uma pureza impossível e instala câmeras até nos pensamentos do cônjuge. Sob este regime, a obediência não é uma virtude, mas uma contenção neurótica alimentada pelo medo da punição.
                    </p>

                    <p>
                        A grande notícia do Evangelho Eterno é que o Sr. Lei morreu. Com a sua morte, o &quot;escrito de dívida&quot; que pesava sobre a humanidade evaporou-se. O sujeito é, então, &quot;condenado à liberdade&quot;, descobrindo que, sem a proibição para iluminar o pecado, a transgressão perde sua força erótica e torna-se banal. O capítulo 6 convida o leitor a sair do &quot;teatro da moralidade&quot; e a descobrir que a sua identidade não é algo a ser conquistado pelo esforço, mas algo que já foi pago e revelado na eternidade (Kairós).
                    </p>

                    <div className="table-container shadow-2xl">
                        <table>
                            <thead>
                                <tr>
                                    <th>Dimensão</th>
                                    <th>Regime da Lei (O Fazer)</th>
                                    <th>Regime da Graça (O Ser)</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td className="font-bold">Motor Psíquico</td>
                                    <td>Ansiedade e Medo da Punição.</td>
                                    <td>Descanso e Aceitação Incondicional.</td>
                                </tr>
                                <tr>
                                    <td className="font-bold">Identidade</td>
                                    <td>Construída pela performance (Obras).</td>
                                    <td>Recebida pela filiação (Ontologia).</td>
                                </tr>
                                <tr>
                                    <td className="font-bold">Relação com Deus</td>
                                    <td>Contábil e Burocrática (Crédito/Débito).</td>
                                    <td>Familiar e Orgânica (Pai/Filho).</td>
                                </tr>
                                <tr>
                                    <td className="font-bold">O Pecado</td>
                                    <td>Uma dívida a ser paga com suor.</td>
                                    <td>Uma ilusão sensorial já resolvida na Cruz.</td>
                                </tr>
                                <tr>
                                    <td className="font-bold">O Tempo</td>
                                    <td>Chronos (Espera pelo Juízo).</td>
                                    <td>Kairós (Vivência da Eternidade Agora).</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                    <h3 className="text-3xl font-serif font-bold text-slate-900 dark:text-white mt-24 mb-10 italic">A Cosmologia da Graça: A Cruz como Causa Primeira</h3>

                    <p>
                        O capítulo 6 avança para uma investigação da cosmologia da Graça, utilizando o conceito de retrocausalidade. O autor argumenta que a Cruz de Cristo não foi uma resposta histórica à Queda de Adão, mas a <strong>Causa Primeira</strong> de toda a criação. Pela lógica da eternidade, o universo só pôde vir à existência porque o sacrifício do Cordeiro já era um fato consumado no registro do Real.
                    </p>

                    <p>
                        Esta visão subverte a causalidade linear (Passado &rarr; Futuro) e introduz a <strong>Graça Estrutural</strong>: o universo tomou &quot;vida emprestada&quot; do evento futuro da Cruz para poder ser criado no passado. Para o autor, a Graça não é uma exceção à regra, mas a própria regra da física universal. A existência humana é sustentada por um amor que não retrocedeu diante da morte, tornando a vida uma dívida já quitada antes mesmo de ser contraída.
                    </p>

                    <h3 className="text-3xl font-serif font-bold text-slate-900 dark:text-white mt-24 mb-10 italic">O Ateísmo Cristão: O Fim do Deus da Religião</h3>

                    <p>
                        Uma das teses mais provocativas do capítulo é o conceito de <strong>&quot;Ateísmo Cristão&quot;</strong>. O autor afirma que a Cruz é o momento em que o &quot;Deus da Lei&quot; morre. O grito de Jesus — &quot;Deus meu, por que me desamparaste?&quot; — é a prova de que o Deus que garante a ordem moral através da punição não interveio para salvar o justo. Jesus experimenta a ausência desse Deus burocrático para provar que ele não existe.
                    </p>

                    <p>
                        O cristianismo autêntico é descrito como a descrença total no Deus da religião, o juiz vingativo que anota pecados. O cristão sabe que esse trono está vazio. O véu se rasgou e não havia um monstro exigindo sangue lá atrás; havia apenas o vazio que foi preenchido pelo amor do Pai. A morte da Lei na Cruz é o que permite ao homem ser livre da vigilância neurótica e do medo do inferno.
                    </p>

                    <h3 className="text-3xl font-serif font-bold text-slate-900 dark:text-white mt-24 mb-10 italic">A Ética da Indiferença: Viver no &quot;Como Se Não&quot;</h3>

                    <p>
                        A conclusão do capítulo 6 nos leva a uma aplicação prática dessa cosmologia: a ética da indiferença santa. Baseando-se no imperativo paulino de viver as coisas do mundo &quot;como se não&quot; as usássemos, o autor propõe que a Graça nos retira do fascínio pelo pecado e da obsessão pela obediência.
                    </p>

                    <p>
                        O pecado só era excitante porque era proibido. Uma vez que a Lei morreu, o pecado perde sua &quot;mais-valia&quot; de prazer. O cristão não luta contra o pecado com força de vontade; ele simplesmente perde o interesse por ele, pois descobriu um prazer superior na Árvore da Vida. A obediência deixa de ser um peso e torna-se uma pulsão interna de vida. O sujeito da Graça não segue regras para ser aceito, mas vive a partir de uma identidade que já é plena.
                    </p>

                    <div className="table-container shadow-2xl">
                        <table>
                            <thead>
                                <tr>
                                    <th>Elemento</th>
                                    <th>Função sob a Lei</th>
                                    <th>Resolução no Evangelho Eterno</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td className="font-bold">A Espada de Fogo</td>
                                    <td>Barreira mortal para o ser caído.</td>
                                    <td>Extinta no corpo de Cristo na Cruz.</td>
                                </tr>
                                <tr>
                                    <td className="font-bold">Os Querubins</td>
                                    <td>Guardiões burocráticos e letais.</td>
                                    <td>Arautos da Vida que anunciam a Graça.</td>
                                </tr>
                                <tr>
                                    <td className="font-bold">A Árvore da Vida</td>
                                    <td>Objeto proibido e inacessível.</td>
                                    <td>Jesus, o fruto que gera vida eterna agora.</td>
                                </tr>
                                <tr>
                                    <td className="font-bold">A Morte</td>
                                    <td>Sentença definitiva e aterrorizante.</td>
                                    <td>Horizonte de cura e fim do &quot;Adão Performativo&quot;.</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                    <h3 className="text-3xl font-serif font-bold text-slate-900 dark:text-white mt-24 mb-10 italic">Conclusão: O Convite ao Sábado Eterno</h3>

                    <p>
                        O capítulo 6 de &quot;O Evangelho Eterno&quot; não busca reformar a vida do leitor, mas implodir as estruturas que o mantêm prisioneiro. A obra revela que o universo é um lugar seguro, sustentado por um amor brutal que já venceu a morte. O convite final é para que o leitor saia do &quot;teatro da moralidade&quot; e entre no repouso do &quot;Está Consumado&quot;. A Árvore da Vida está acessível, a Espada de Fogo apagou-se, e o Pai aguarda com o abraço que não pede explicações.
                    </p>

                    <blockquote className="relative my-16 py-8 px-12 border-l-2 border-primary/30 italic text-2xl text-slate-900 dark:text-white font-light leading-relaxed">
                        <span className="absolute top-0 left-4 text-6xl text-primary/10 font-serif">&quot;</span>
                        O teatro acabou. O sol está brilhando lá fora. Seja bem-vindo à Realidade. O Evangelho Eterno é a notícia de que você já é livre.
                    </blockquote>

                </article>

                <AmazonCTA />

                <footer className="mt-32 pt-16 border-t border-slate-200 dark:border-white/5">
                    <div className="flex flex-col md:flex-row items-stretch gap-6">
                        <Link to="/capitulo/5" className="flex-1 p-8 rounded-3xl bg-slate-100/50 dark:bg-white/5 hover:bg-slate-200 dark:hover:bg-white/10 transition-all group">
                            <div className="flex items-start gap-4">
                                <span className="material-symbols-outlined text-slate-400 group-hover:-translate-x-1 transition-transform">arrow_back</span>
                                <div>
                                    <span className="text-[10px] uppercase tracking-widest text-slate-500 font-bold">Capítulo 05</span>
                                    <h4 className="font-serif italic text-xl mt-2 text-slate-600 dark:text-slate-400">O Retorno ao Jardim</h4>
                                </div>
                            </div>
                        </Link>

                        <Link to="/capitulos" className="flex-1 p-8 rounded-3xl bg-primary text-white shadow-xl shadow-primary/20 hover:scale-[1.03] transition-all group">
                            <div className="flex justify-between items-start">
                                <div>
                                    <span className="text-[10px] uppercase tracking-widest text-white/70 font-bold">Fim da Jornada</span>
                                    <h4 className="font-serif italic text-2xl mt-2">Índice de Capítulos</h4>
                                </div>
                                <span className="material-symbols-outlined text-3xl group-hover:translate-x-2 transition-transform">home</span>
                            </div>
                        </Link>
                    </div>

                    <div className="mt-20 text-center">
                        <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="text-[10px] uppercase tracking-[0.4em] font-bold text-slate-400 hover:text-primary transition-colors">Voltar ao topo</button>
                    </div>
                </footer>
            </main>
        </>
    );
};
