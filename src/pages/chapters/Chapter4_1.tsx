import React from 'react';
import { Link } from 'react-router-dom';
import { AmazonCTA } from '../../components/AmazonCTA';

export const Chapter4_1 = () => {
    return (
        <>
            <header className="relative h-[80vh] w-full overflow-hidden flex items-end">
                <div className="absolute inset-0 scale-105">
                    <img src="/images/capitulo-4-bg.png" alt="Cosmologia da Vida" className="w-full h-full object-cover object-center" />
                    <div className="absolute inset-0 bg-gradient-to-t from-dark-bg via-dark-bg/40 to-transparent"></div>
                </div>

                <div className="relative w-full pb-20 px-6 fade-up">
                    <div className="max-w-5xl mx-auto">
                        <div className="flex flex-col items-center text-center">
                            <div className="w-12 h-[2px] bg-primary mb-8 text-white"></div>
                            <span className="text-primary font-bold tracking-[0.5em] uppercase text-[10px] mb-6 block">A Nova Física Espiritual</span>
                            <h1 className="text-4xl md:text-6xl font-serif font-bold text-white mb-8 italic leading-tight max-w-5xl">
                                A Cosmologia da Vida e o Fim da Neurose Religiosa
                            </h1>
                            <div className="flex items-center gap-8 text-white/50 text-[10px] font-bold uppercase tracking-widest">
                                <span className="flex items-center gap-2"><span className="material-symbols-outlined text-sm text-primary">public</span> Cap. 04.1</span>
                                <span className="flex items-center gap-2"><span className="material-symbols-outlined text-sm text-primary">hourglass_empty</span> 45 min de leitura</span>
                            </div>
                        </div>
                    </div>
                </div>
            </header>

            <main className="max-w-3xl mx-auto px-6 py-24 md:py-32">
                <article className="prose-custom font-serif transition-all duration-300">
                    <p className="dropcap">
                        A jornada intelectual e espiritual proposta em <em>&quot;O Evangelho Eterno e a Arquitetura da Graça&quot;</em> adentra territórios inexplorados na subseção <strong>4.1 - A Cosmologia da Vida e o Fim da Neurose Religiosa</strong>. Este texto não é uma mera continuação temática, mas uma elevação da exegese a uma matriz cosmológica. Miguel, o Príncipe, desafia os limites da teologia sistemática ao utilizar conceitos da física teórica, da psicanálise de matriz lacaniana e da mística cristã primitiva para propor que a ressurreição de Cristo não foi um evento biológico isolado, mas a inauguração de uma &quot;Nova Física Espiritual&quot;. O objetivo deste documento é analisar as estruturas lógicas deste capítulo vertiginoso, oferecendo uma bússola hermenêutica para a compreensão da aniquilação definitiva da Lei.
                    </p>

                    <h3 className="text-3xl font-serif font-bold text-slate-900 dark:text-white mt-24 mb-10 italic">O Paradoxo do Tempo: Chronos, Kairós e a Retrocausalidade da Graça</h3>

                    <p>
                        A fundação do argumento de 4.1 reside na desconstrução da percepção linear do tempo (Chronos). A religiosidade tradicional opera estritamente na linearidade: o homem peca (passado), tenta compensar através da obediência (presente) para escapar do juízo e alcançar o céu (futuro). O autor desmantela essa estrutura ao introduzir a precedência absoluta do <strong>Kairós</strong> (A Eternidade).
                    </p>

                    <p>
                        Utilizando o conceito de <em>Retrocausalidade</em>, o texto propõe que o Cordeiro &quot;morto desde a fundação do mundo&quot; (Apocalipse 13:8) não é uma linguagem poética, mas uma descrição física. A Cruz é a Causa Primeira. A existência só pôde iniciar-se no &quot;Princípio&quot; (Gênesis 1) porque, na eternidade, a dívida gerada pela liberdade já estava quitada.
                    </p>

                    <p>
                        Isso significa que o pecado não pegou Deus de surpresa, exigindo um &quot;Plano B&quot;. A Graça é o Plano A. A Queda (Chronos) ocorre dentro de um ambiente já redimido (Kairós). Todo o tempo histórico é apanhado na rede do amor incondicional que já estava resolvido antes do Big Bang. O universo é descrito como tendo &quot;tomado existência emprestada&quot; do evento futuro da Cruz.
                    </p>

                    <h3 className="text-3xl font-serif font-bold text-slate-900 dark:text-white mt-24 mb-10 italic">A Morte do "Deus Moral" e o Nascimento do "Pai Ontológico"</h3>

                    <p>
                        O capítulo apresenta uma das teses mais radicais da obra: a distinção ontológica entre a Divindade do Antigo Testamento, mediada por anjos e baseada na lei de retribuição, e o &quot;Pai&quot; revelado por Jesus. O autor argumenta que o &quot;Deus Moral&quot; — a figura burocrática e ressentida que exige sangue para perdoar — é uma projeção da neurose humana e da gestão angélica da Lei.
                    </p>

                    <p>
                        Jesus, ao gritar &quot;Deus meu, por que me desamparaste?&quot;, não apenas sofre a angústia humana, mas destitui o &quot;Deus Moral&quot;. Naquele instante, no escuro do Calvário, o Juiz exige o pagamento e mata o ser caído. O resultado, no entanto, é o esgotamento total da penalidade. O tribunal é fechado por falta de dívida. O que emerge da tumba aberta não é uma relação judicial, mas o &quot;Pai Ontológico&quot; — O Ser que é Amor incondicional, sem mediações punitivas.
                    </p>

                    <div className="table-container shadow-2xl">
                        <table>
                            <thead>
                                <tr>
                                    <th>Característica</th>
                                    <th>O "Deus Moral" (Figura da Lei)</th>
                                    <th>O "Pai Ontológico" (Revelado na Graça)</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td className="font-bold">Natureza da Relação</td>
                                    <td>Condicional, Contratual, Burocrática.</td>
                                    <td>Incondicional, Orgânica, Familiar.</td>
                                </tr>
                                <tr>
                                    <td className="font-bold">Resposta ao Erro</td>
                                    <td>Punição, Ira, Retribuição.</td>
                                    <td>Absorção, Perdão, Reintegração.</td>
                                </tr>
                                <tr>
                                    <td className="font-bold">Mediação</td>
                                    <td>Anjos, Sacerdotes, Sistema Sacrificial.</td>
                                    <td>Direta através da filiação em Cristo.</td>
                                </tr>
                                <tr>
                                    <td className="font-bold">Foco do Desejo</td>
                                    <td>Obediência externa e contenção.</td>
                                    <td>O Coração, a Verdade na inwardness.</td>
                                </tr>
                                <tr>
                                    <td className="font-bold">Status Atual</td>
                                    <td>Morto na Cruz (Fim do Ministério da Condenação).</td>
                                    <td>Vivo e Presente (O Único Soberano Real).</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                    <h3 className="text-3xl font-serif font-bold text-slate-900 dark:text-white mt-24 mb-10 italic">O Conceito de "Justificação por Ressonância"</h3>

                    <p>
                        A análise psicanalítica da justificação no trecho 4.1 afasta-se das categorizações forenses tradicionais (onde um juiz declara o réu inocente através de uma ficção legal). A justificação é descrita como <strong>Ressonância Ontológica</strong>.
                    </p>

                    <p>
                        Se o Sujeito (nós) originou-se no Fazer e na Falta (Morte Psíquica), como ele recebe a Vida? A resposta não é uma troca de méritos, mas uma união orgânica. Jesus absorve o Sujeito da Falta na cruz e o arrasta para a morte. O "Eu" que precisava de perdão morre. O que ressuscita é um "Novo Eu", indissociavelmente unido à Vida Indestrutível de Cristo. A justificação é, portanto, estar "em Cristo". Onde Ele está, a morte não pode entrar. A sanidade psíquica surge da aceitação dessa ressonância. O cristão pára de tentar imitar Cristo e começa a descansar no fato de que ele já possui a Sua vida ressoando em si.
                    </p>

                    <h3 className="text-3xl font-serif font-bold text-slate-900 dark:text-white mt-24 mb-10 italic">O Colapso da Neurose Religiosa: A Indiferença Santa</h3>

                    <p>
                        A implicação prática desta cosmologia é o fim da neurose religiosa. A religião opera no espectro da Obsessão: o medo do inferno e a cobiça pelo céu geram uma vida de vigília histérica. A psique gasta rios de energia tentando esconder o desejo reprimido e produzir "folhas de figueira" sociais.
                    </p>

                    <p>
                        Com a destituição do "Deus Moral" e o estabelecimento da Justificação Ontológica, o que ocorre no espírito é o surgimento da <strong>Indiferença Santa</strong>. Esta indiferença não é apatia em relação ao sofrimento, mas apatia em relação ao poder da Lei e do pecado.
                    </p>

                    <p>
                        O autor afirma: "Quando o holofote da proibição é desligado, o pecado perde o seu fascínio". A neurose entra em colapso porque não há mais um Juiz Sádico exigindo a perfeição performática. O indivíduo sob a Graça não evita o erro primariamente por medo, mas porque o pecado tornou-se tedioso, redundante e incompatível com a Nova Física que agora habita (a Ressonância da Vida).
                    </p>

                    <h3 className="text-3xl font-serif font-bold text-slate-900 dark:text-white mt-24 mb-10 italic">A Desconstrução do "Escândalo" e a Implosão do Ego Religioso</h3>

                    <p>
                        Uma das facetas mais instigantes do capítulo é a leitura sociológica da fé. O "Religioso" precisa que o mundo seja "mau" e cheio de "transgressores" para que o seu avatar de pureza faça sentido. O "Ego Religioso" nutre-se do escândalo e da condenação do outro.
                    </p>

                    <p>
                        O Evangelho, como apresentado em 4.1, destrói a base desse ego. Se "Deus em Cristo reconciliou o mundo consigo mesmo, não imputando aos homens as suas transgressões" (2 Co 5:19), então o universo é um lugar redimido. Aqueles que vivem praticando o mal não são inimigos de um Deus irado, mas mortos-vivos (Zumbis) ignorantes da realidade.
                    </p>

                    <p>
                        O verdadeiro cristão, portanto, é aquele que abdicou do papel de acusador. Ele vê a humanidade não através do filtro da Lei, mas através da vitória consumada. O "Escândalo" cessa de existir, sendo substituído por uma compaixão cósmica por seres que ainda batalham, exaustos, contra correntes que já foram abertas.
                    </p>

                    <h3 className="text-3xl font-serif font-bold text-slate-900 dark:text-white mt-24 mb-10 italic">Uma Conclusão Cosmológica: O "Shabat" (Descanso) Interminável</h3>

                    <p>
                        A seção 4.1 conclui que todo ato de esforço humano para conquistar mérito espiritual não é apenas pecado; é atraso. É agir como se a física da ressurreição ainda não tivesse alterado a estrutura do mundo. O apelo final do autor não é moral, mas ontológico: "Entre no Descanso".
                    </p>

                    <p>
                        O "Shabat" (Sábado) que o autor defende não é um dia da semana guardado judaicamente, mas um estado de permanência na consciência de que <em>Tetelestai</em> (Está Consumado). A "Cosmologia da Vida" convida a alma humana a retirar a armadura, a despir-se da perfomance e a ousar acreditar na boa notícia brutal: você já está salvo, o universo é um lugar seguro, e o Pai estava sorrindo antes mesmo de você nascer.
                    </p>

                    <blockquote className="relative my-16 py-8 px-12 border-l-2 border-primary/30 italic text-2xl text-slate-900 dark:text-white font-light leading-relaxed">
                        <span className="absolute top-0 left-4 text-6xl text-primary/10 font-serif">&quot;</span>
                        A Graça não é uma teoria da clemência divina para um mundo doente. A Graça é a gravidade do novo universo. Resistir a ela é como tentar flutuar jogando pedras para baixo; render-se a ela é a única física que permite o voo.
                    </blockquote>
                </article>

                <AmazonCTA />

                <footer className="mt-32 pt-16 border-t border-slate-200 dark:border-white/5">
                    <div className="flex flex-col md:flex-row items-stretch gap-6">
                        <Link to="/capitulo/4" className="flex-1 p-8 rounded-3xl bg-slate-100/50 dark:bg-white/5 hover:bg-slate-200 dark:hover:bg-white/10 transition-all group">
                            <div className="flex items-start gap-4">
                                <span className="material-symbols-outlined text-slate-400 group-hover:-translate-x-1 transition-transform">arrow_back</span>
                                <div>
                                    <span className="text-[10px] uppercase tracking-widest text-slate-500 font-bold">Capítulo 04</span>
                                    <h4 className="font-serif italic text-xl mt-2 text-slate-600 dark:text-slate-400">A Árvore da Vida</h4>
                                </div>
                            </div>
                        </Link>

                        <Link to="/capitulo/5" className="flex-1 p-8 rounded-3xl bg-primary text-white shadow-xl shadow-primary/20 hover:scale-[1.03] transition-all group">
                            <div className="flex justify-between items-start">
                                <div>
                                    <span className="text-[10px] uppercase tracking-widest text-white/70 font-bold">Próximo Capítulo</span>
                                    <h4 className="font-serif italic text-2xl mt-2">O Retorno ao Jardim</h4>
                                </div>
                                <span className="material-symbols-outlined text-3xl group-hover:translate-x-2 transition-transform">arrow_forward</span>
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
