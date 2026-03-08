import React from 'react';
import { Link } from 'react-router-dom';
import { AmazonCTA } from '../../components/AmazonCTA';

export const Chapter5 = () => {
    return (
        <>
            <header className="relative h-[80vh] w-full overflow-hidden flex items-end">
                <div className="absolute inset-0 scale-105">
                    <img src="/images/capitulo-5-bg.png" alt="O Jardim: Do Personagem à Presença" className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-gradient-to-t from-dark-bg via-dark-bg/40 to-transparent"></div>
                </div>

                <div className="relative w-full pb-20 px-6 fade-up">
                    <div className="max-w-5xl mx-auto">
                        <div className="flex flex-col items-center text-center">
                            <div className="w-12 h-[2px] bg-primary mb-8 text-white"></div>
                            <span className="text-primary font-bold tracking-[0.5em] uppercase text-[10px] mb-6 block">Arquitetura da Existência</span>
                            <h1 className="text-4xl md:text-6xl font-serif font-bold text-white mb-8 italic leading-tight max-w-5xl">
                                A Transição do Fazer ao Ser no Retorno ao Jardim
                            </h1>
                            <div className="flex items-center gap-8 text-white/50 text-[10px] font-bold uppercase tracking-widest">
                                <span className="flex items-center gap-2"><span className="material-symbols-outlined text-sm text-primary">park</span> Cap. 05</span>
                                <span className="flex items-center gap-2"><span className="material-symbols-outlined text-sm text-primary">hourglass_empty</span> 40 min de leitura</span>
                            </div>
                        </div>
                    </div>
                </div>
            </header>

            <main className="max-w-3xl mx-auto px-6 py-24 md:py-32">
                <article className="prose-custom font-serif transition-all duration-300">
                    <p className="dropcap">
                        A obra fundamental que estrutura a reflexão sobre a espiritualidade contemporânea e a psique humana, apresentada no manuscrito de Miguel, o Príncipe, propõe uma ruptura definitiva com os paradigmas da performance religiosa. O capítulo 5, intitulado <strong>&quot;O Retorno ao Jardim: do Fazer ao Ser&quot;</strong>, funciona como o eixo gravitacional de toda a tese da Graça Estrutural, conduzindo o leitor por um processo de destituição subjetiva que visa não a melhoria do indivíduo, mas a implosão do teatro da moralidade. Este relatório analisa as densas camadas teológicas e psicanalíticas deste capítulo, servindo como um guia analítico para aqueles que buscam compreender a profundidade da transição ontológica proposta pelo autor.
                    </p>

                    <h3 className="text-3xl font-serif font-bold text-slate-900 dark:text-white mt-24 mb-10 italic">A Inversão da Perspectiva: O Sepultamento do Adão Performativo</h3>

                    <p>
                        A análise inicia-se com a premissa de que a espiritualidade humana, ao longo dos séculos, foi sequestrada por uma pergunta que jamais foi feita pelo Criador, mas que nasceu na ansiedade da consciência pós-queda: &quot;O que devo fazer para que Deus me ame?&quot;. Esta interrogação fundamental é o motor da estrutura neurotizante que o autor denomina <strong>&quot;Adão Performativo&quot;</strong>. O capítulo 5 estabelece que este sujeito dividido vive sob a tirania do esforço, tentando desesperadamente costurar &quot;folhas de figueira&quot; — metáforas para a conduta moral e a performance religiosa — para esconder uma nudez que ele percebe como falha.
                    </p>

                    <p>
                        A tese central é que a Lei não atua como o remédio para a transgressão, mas como a sua força motriz. Utilizando a topografia do desejo de inspiração lacaniana, o texto demonstra que o &quot;Não&quot; da Lei é o que inaugura o Desejo, ao demarcar o território do proibido. O moralista e o transgressor são identificados como irmãos gêmeos, ambos escravos do mesmo fascínio pelo limite. O Retorno ao Jardim, portanto, não é um retorno à ingenuidade, mas uma travessia do deserto da fantasia para atingir o repouso do Ser.
                    </p>

                    <div className="table-container shadow-2xl">
                        <table>
                            <thead>
                                <tr>
                                    <th>Dimensão</th>
                                    <th>Regime do Fazer (Lei/Performance)</th>
                                    <th>Regime do Ser (Graça/Ontologia)</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td className="font-bold">Origem da Identidade</td>
                                    <td>Construída pelo esforço e validação externa.</td>
                                    <td>Revelada na eternidade e recebida passivamente.</td>
                                </tr>
                                <tr>
                                    <td className="font-bold">Motivação Primária</td>
                                    <td>Medo da punição ou desejo de aprovação (Ansiedade).</td>
                                    <td>Descanso na aceitação incondicional (Paz).</td>
                                </tr>
                                <tr>
                                    <td className="font-bold">Relação com o Erro</td>
                                    <td>Culpa e ocultamento (Folhas de Figueira).</td>
                                    <td>Reconhecimento da falha e integração da sombra.</td>
                                </tr>
                                <tr>
                                    <td className="font-bold">Percepção de Deus</td>
                                    <td>Um Juiz burocrático mediado por anjos.</td>
                                    <td>O Pai que sustenta a existência por puro amor.</td>
                                </tr>
                                <tr>
                                    <td className="font-bold">Estado Psíquico</td>
                                    <td>Neurose obsessiva e divisão subjetiva.</td>
                                    <td>Unidade pré-simbólica e espontaneidade.</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                    <h3 className="text-3xl font-serif font-bold text-slate-900 dark:text-white mt-24 mb-10 italic">A Topografia do Desejo: A Árvore como Significante Mestre</h3>

                    <p>
                        A ruptura do estado de inocência no Éden é descrita não apenas como um evento histórico, mas como a estrutura fundamental da psique. YHWH, ao introduzir a Árvore do Conhecimento do Bem e do Mal, estabelece o limite primordial. Onde não há limite, não há falta; e sem a falta, não há desejo. A Árvore funciona como o primeiro &quot;Não&quot;, o significante mestre que cria a separação entre o Eu e o Todo.
                    </p>

                    <p>
                        A análise profunda do capítulo 5 revela que o desejo pelo fruto não era uma fome biológica, mas uma voracidade pelo significado atribuído à proibição. O fruto tornou-se o objeto sublime que prometia a &quot;Não-Falta&quot;, a divindade e a completude. Eva, ao olhar para a árvore, não viu um objeto natural, mas uma projeção carregada de fantasia: &quot;agradável aos olhos e desejável para dar entendimento&quot;. Este é o protótipo da Lei de Moisés: ela descreve a proibição e, ao fazê-lo, erotiza o objeto proibido. A Lei, portanto, fabrica o pecado ao nomear a cobiça.
                    </p>

                    <h3 className="text-3xl font-serif font-bold text-slate-900 dark:text-white mt-24 mb-10 italic">A Dialética da Serpente e a Manipulação do Limite</h3>

                    <p>
                        A figura da Serpente no Éden é analisada como a lógica perversa que opera por meio do &quot;Não&quot;. Ela não cria a proibição, mas manipula a relação do sujeito com ela, focando o holofote exatamente no limite. Ao perguntar &quot;É certo que YHWH disse...?&quot;, a Serpente transforma o limite estruturante em uma obsessão. O Acusador (Ha-Satan) surge aqui como um título funcional: ele é o promotor que utiliza o código penal della Lei para exigir a morte do sujeito.
                    </p>

                    <p>
                        Sem a Lei, o Acusador não tem função, pois &quot;onde não há lei, não há transgressão&quot;. O capítulo 5 explora a simbiose entre a Lei e o Acusador, demonstrando que a transgressão é, paradoxalmente, uma homenagem à Lei, pois sem o transgressor, a Lei não teria a quem condenar. O sujeito que busca ser &quot;livre&quot; através da quebra da regra está tão preso ao &quot;Não&quot; quanto o moralista obsessivo. Ambos gravitam em torno do proibido, apenas em direções opostas.
                    </p>

                    <h3 className="text-3xl font-serif font-bold text-slate-900 dark:text-white mt-24 mb-10 italic">A Estrutura do Círculo Vicioso em Torno do Não</h3>

                    <p>
                        A força do pecado é a Lei, pois esta estabelece uma régua impossível que gera o fracasso estrutural. Onde há fracasso inevitável, a Lei produz culpa. A culpa, por sua vez, é uma mortificação psíquica que obriga o sujeito a esconder-se, transformando-o em um &quot;ator de si mesmo&quot;. O Adão Performativo surge nesse momento de vergonha, vestindo-se de folhas para simular uma pureza que ele sabe ser inexistente. A obediência, sob este regime, não é virtude, mas apenas contenção de um desejo que continua vivo e pulsante no interior.
                    </p>

                    <h3 className="text-3xl font-serif font-bold text-slate-900 dark:text-white mt-24 mb-10 italic">A Mediação Angélica e a Burocracia da Morte</h3>

                    <p>
                        Uma das revelações mais contraintuitivas do manuscrito é a natureza da interação de Israel com YHWH no Antigo Testamento. O texto afirma que a Lei foi &quot;ordenada pelos anjos por meio de um mediador&quot; e que &quot;ninguém jamais viu a YHWH&quot;. Esta &quot;terceirização divina&quot; explica por que a divindade no Antigo Testamento opera sob a lógica da retribuição e da morte, o que parece contradizer a essência de YHWH como Vida Incondicional.
                    </p>

                    <p>
                        Os anjos são descritos como seres funcionais e amorais, administradores de um dispositivo legal provisório. Quando Israel declarou &quot;faremos tudo o que o Senhor mandou&quot;, firmou um pacto não com o Deus da Graça, mas com os mediadores da Justiça. Esta distinção é vital para compreender o capítulo 5: a religião hebraica é vista como uma reencenação da Árvore do Conhecimento, um sistema fadado ao fracasso cujo objetivo é revelar a morte ontológica do homem. Moisés, ao cobrir o rosto, personifica esta glória passageira e a hipocrisia necessária para manter a aparência de uma glória que já se desvanece.
                    </p>

                    <h3 className="text-3xl font-serif font-bold text-slate-900 dark:text-white mt-24 mb-10 italic">A Física da Graça: Retroatividade e o Ponto Zero</h3>

                    <p>
                        O conceito de Graça Estrutural é apresentado não como um sentimento divino, mas como uma lei cosmológica. Pela lógica da retroatividade, a Cruz de Cristo é a Causa Primeira de toda a Criação. O texto utiliza a analogia da física quântica para explicar que o universo só pôde &quot;tomar existência emprestada&quot; do nada porque o pagamento da dívida — a morte do Cordeiro — já era um fato consumado na eternidade (Kairós).
                    </p>

                    <p>
                        Desta forma, Jesus não é uma reação ao erro de Adão; Adão é uma prefiguração de Jesus. A Graça é a infraestrutura do universo, enquanto o pecado é um acidente de percurso na história linear. Viver sob a Graça significa aceitar que o &quot;filme&quot; da existência já foi assistido e aprovado pelo Pai no Kairós. Esta compreensão aniquila a ansiedade religiosa, pois a salvação deixa de ser uma meta a alcançar para tornar-se a origem da caminhada. O sujeito não faz para ser salvo; ele age porque já foi glorificado na mente de Deus antes da fundação do mundo.
                    </p>

                    <div className="table-container shadow-2xl">
                        <table>
                            <thead>
                                <tr>
                                    <th>Aliança</th>
                                    <th>Figura Central</th>
                                    <th>Significado Tipológico</th>
                                    <th>A Superação em Cristo</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td className="font-bold">Adâmica</td>
                                    <td>Adão</td>
                                    <td>O homem da performance e da vergonha.</td>
                                    <td>Cristo como o Adão Real, sem véus ou folhas.</td>
                                </tr>
                                <tr>
                                    <td className="font-bold">Abeliana</td>
                                    <td>Abel</td>
                                    <td>O sangue que clama por vingança/justiça.</td>
                                    <td>O sangue de Cristo que clama por perdão.</td>
                                </tr>
                                <tr>
                                    <td className="font-bold">Noética</td>
                                    <td>Noé</td>
                                    <td>O recomeço imperfeito por meio da água.</td>
                                    <td>O recomeço definitivo por meio do Espírito.</td>
                                </tr>
                                <tr>
                                    <td className="font-bold">Abraâmica</td>
                                    <td>Isaque</td>
                                    <td>O objeto do sacrifício passivo da religião.</td>
                                    <td>O Filho que se entrega voluntariamente.</td>
                                </tr>
                                <tr>
                                    <td className="font-bold">Mosaica</td>
                                    <td>Moisés</td>
                                    <td>A Lei que mata para manter a ordem.</td>
                                    <td>A Graça que morre para dar a vida.</td>
                                </tr>
                                <tr>
                                    <td className="font-bold">Davídica</td>
                                    <td>Davi</td>
                                    <td>O rei que falha e chora pelo filho rebelde.</td>
                                    <td>O Rei perfeito que morre no lugar do rebelde.</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                    <h3 className="text-3xl font-serif font-bold text-slate-900 dark:text-white mt-24 mb-10 italic">A Mulher Samaritana e o Sexto Marido: O Adultério Religioso</h3>

                    <p>
                        A análise do encontro de Jesus com a mulher samaritana no poço de Jacó é um dos pontos altos da aplicação prática do capítulo 5. A mulher representa a história espiritual da humanidade, que teve cinco &quot;maridos&quot; (as alianças legítimas, mas provisórias, de Adão a Davi) e vivia com um sexto que não era seu (o sincretismo religioso ou o esforço humano).
                    </p>

                    <p>
                        O <strong>&quot;Sexto Marido&quot;</strong> é a religião da performance, uma união baseada no medo e na vigilância constante. O texto personifica a Lei como o &quot;Sr. Lei&quot;, um marido obsessivo que instala câmeras na mente da esposa e exige intenções puras que ela jamais poderá ter. A Graça entra em cena não como um divórcio, mas como a notícia de que o &quot;Sr. Lei&quot; morreu. Sem o credor sádico, a dívida evapora e a traição perde o seu &quot;brilho&quot;. O Sétimo Homem, Jesus, é o Marido do Descanso, que propõe uma troca de águas: do esforço diário do poço para a fonte que jorra internamente.
                    </p>

                    <h3 className="text-3xl font-serif font-bold text-slate-900 dark:text-white mt-24 mb-10 italic">O Deserto e a Travessia da Fantasia Fundamental</h3>

                    <p>
                        A &quot;Filosofia do Deserto&quot; discutida no capítulo 5 é o processo de destituição subjetiva em que o homem supera suas fantasias fundamentais. A fantasia é o filtro que torna a realidade suportável, escondendo o abismo do desejo do Outro. O religioso fantasia que Deus quer dele um sacrifício específico para ser amado. A cura ocorre quando o sujeito percebe que esta demanda é uma invenção de sua própria neurose.
                    </p>

                    <p>
                        Nesta travessia, o autor introduz a metáfora do <strong>&quot;Alien&quot;</strong>. O Alienígena representa a libido, o desejo animal e a nudez real que a Lei tenta reprimir. O Adão Performativo morre de medo desse &quot;monstro&quot; interior. No entanto, o Retorno ao Jardim exige perder o medo do Animal. Descobre-se que o &quot;monstro&quot; no escuro do quarto é o próprio sujeito em sua verdade instintiva. A Graça não domestica o animal, mas o integra, cessando a guerra civil interna. Aceitar a própria &quot;monstruosidade&quot; é o primeiro passo para a sanidade de quem não precisa mais de anjos para se proteger de si mesmo.
                    </p>

                    <h3 className="text-3xl font-serif font-bold text-slate-900 dark:text-white mt-24 mb-10 italic">O Ateísmo Cristão e o Funeral do Deus da Lei</h3>

                    <p>
                        Uma das proposições mais radicais do texto é o conceito de <strong>&quot;Ateísmo Cristão&quot;</strong>. O autor afirma que o grito de Jesus na cruz — &quot;Deus meu, por que me desamparaste?&quot; — foi o momento em que o Deus Verdadeiro (o Filho) confrontou o &quot;Deus da Lei&quot; e revelou o seu vazio. Na cruz, o Juiz burocrático morreu, deixando o trono vazio para que apenas o Pai permanecesse.
                    </p>

                    <p>
                        Ser um &quot;Ateu Cristão&quot; significa negar a existência do Deus da Religião, aquele que vigia e pune para garantir a ordem social. O cristão autêntico é aquele que reconhece que a Lei está morta e, portanto, não age mais por reatividade ao &quot;Não&quot;. Ele não é mais o detentor da moralidade, mas o portador da Vida. A morte da Lei é a sua ressurreição como ferramenta pragmática e não mais como ídolo sádico.
                    </p>

                    <h3 className="text-3xl font-serif font-bold text-slate-900 dark:text-white mt-24 mb-10 italic">O Fim da Reatividade e a Identidade de Filho</h3>

                    <p>
                        A vida no Espírito é marcada pelo fim da reatividade. No regime da Lei, o sujeito define-se pela reação: ou ele é o obediente (submisso) ou o transgressor (rebelde). Ambos são servos da Lei. O Sujeito da Graça, por outro lado, é Ativo. Ele não pergunta &quot;posso?&quot;, mas &quot;convém?&quot;. Ele é indiferente ao brilho do pecado porque o holofote della Lei foi apagado. O pecado torna-se &quot;tedioso&quot; e &quot;banal&quot;, uma tentativa triste de preencher com sensações o que já foi preenchido pela presença ontológica de Cristo.
                    </p>

                    <h3 className="text-3xl font-serif font-bold text-slate-900 dark:text-white mt-24 mb-10 italic">Conclusão: O Convite ao Sábado Eterno</h3>

                    <p>
                        O Capítulo 5 de &quot;O Evangelho Eterno e a Arquitetura da Graça&quot; não é um convite para ser uma pessoa melhor, mas para ser uma pessoa real. Ao desmascarar o teatro da moralidade, o autor conduz o leitor para fora das folhas de figueira e de volta à Árvore da Vida. O Retorno ao Jardim é o reconhecimento de que a espada de fogo dos anjos desceu sobre o peito de Cristo e se apagou.
                    </p>

                    <p>
                        O leitor é convidado a assistir ao funeral do seu &quot;eu religioso&quot; e a entrar no descanso do Sábado Eterno. Não há mais nada a fazer, pois tudo está pago. A identidade não é mais uma construção do tempo, mas uma revelação da eternidade. Este capítulo é o portal para uma realidade onde a nudez não gera vergonha e a liberdade não gera medo. Bem-vindo à realidade: a obra de Cristo não foi uma reforma, foi um novo mundo.
                    </p>

                    <blockquote className="relative my-16 py-8 px-12 border-l-2 border-primary/30 italic text-2xl text-slate-900 dark:text-white font-light leading-relaxed">
                        <span className="absolute top-0 left-4 text-6xl text-primary/10 font-serif">&quot;</span>
                        O teatro acabou. O sol está brilhando lá fora. Bem-vindo à Realidade.
                    </blockquote>
                </article>

                <AmazonCTA />

                <footer className="mt-32 pt-16 border-t border-slate-200 dark:border-white/5">
                    <div className="flex flex-col md:flex-row items-stretch gap-6">
                        <Link to="/capitulo/4.1" className="flex-1 p-8 rounded-3xl bg-slate-100/50 dark:bg-white/5 hover:bg-slate-200 dark:hover:bg-white/10 transition-all group">
                            <div className="flex items-start gap-4">
                                <span className="material-symbols-outlined text-slate-400 group-hover:-translate-x-1 transition-transform">arrow_back</span>
                                <div>
                                    <span className="text-[10px] uppercase tracking-widest text-slate-500 font-bold">Capítulo 04.1</span>
                                    <h4 className="font-serif italic text-xl mt-2 text-slate-600 dark:text-slate-400">A Cosmologia da Vida</h4>
                                </div>
                            </div>
                        </Link>

                        <Link to="/capitulo/6" className="flex-1 p-8 rounded-3xl bg-primary text-white shadow-xl shadow-primary/20 hover:scale-[1.03] transition-all group">
                            <div className="flex justify-between items-start">
                                <div>
                                    <span className="text-[10px] uppercase tracking-widest text-white/70 font-bold">Próximo Capítulo</span>
                                    <h4 className="font-serif italic text-2xl mt-2">O Evangelho Eterno</h4>
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
