import React from 'react';
import { Link } from 'react-router-dom';
import { AmazonCTA } from '../../components/AmazonCTA';
import { ChapterMeta } from '../../components/ChapterMeta';

export const Chapter4 = () => {
    return (
        <>
            <ChapterMeta
                title="Jesus: A Graça e a Árvore da Vida"
                description="Jesus Cristo, a tese central e cosmológica do livro. Mergulhe na 'Física da Graça', no nascimento de uma Nova Teologia."
                chapterNumber="04"
                image="/images/capitulo-4-bg.png"
            />
            <header className="relative h-[80vh] w-full overflow-hidden flex items-end">
                <div className="absolute inset-0 scale-105">
                    <img src="/images/capitulo-4-bg.png" alt="Jesus: A Graça e a Árvore da Vida" className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-gradient-to-t from-dark-bg via-dark-bg/40 to-transparent"></div>
                </div>

                <div className="relative w-full pb-20 px-6 fade-up">
                    <div className="max-w-5xl mx-auto">
                        <div className="flex flex-col items-center text-center">
                            <div className="w-12 h-[2px] bg-primary mb-8 text-white"></div>
                            <span className="text-primary font-bold tracking-[0.5em] uppercase text-[10px] mb-6 block">O Advento do Ser sobre o Fazer</span>
                            <h1 className="text-4xl md:text-6xl font-serif font-bold text-white mb-8 italic leading-tight max-w-5xl">
                                Jesus: A Graça e a Árvore da Vida
                            </h1>
                            <div className="flex items-center gap-8 text-white/50 text-[10px] font-bold uppercase tracking-widest">
                                <span className="flex items-center gap-2"><span className="material-symbols-outlined text-sm text-primary">menu_book</span> Cap. 04</span>
                                <span className="flex items-center gap-2"><span className="material-symbols-outlined text-sm text-primary">hourglass_empty</span> 40 min de leitura</span>
                            </div>
                        </div>
                    </div>
                </div>
            </header>

            <main className="max-w-3xl mx-auto px-6 py-24 md:py-32">
                <article className="prose-custom font-serif transition-all duration-300">
                    <p className="dropcap">
                        A obra <em>&quot;O Evangelho Eterno e a Arquitetura da Graça&quot;</em> propõe uma imersão disruptiva na teologia bíblica, utilizando a interseção entre a exegese clássica e a psicanálise lacaniana para desmantelar as estruturas da religiosidade performativa. No centro dessa investigação encontra-se o Capítulo 4, intitulado <strong>&quot;Jesus: A Graça e a Árvore da Vida&quot;</strong>, um segmento que serve como o eixo gravitacional de todo o tratado. Este relatório apresenta uma análise exaustiva e uma condução analítica das ideias contidas nesse capítulo, estendendo-se até o subtítulo &quot;O Evangelho, os Querubins e a Esfinge&quot;, com o objetivo de preparar o leitor para o impacto ontológico que a leitura integral da obra proporciona.
                    </p>

                    <p>
                        A premissa fundamental estabelecida por Miguel, o Príncipe, é que a história da humanidade não é uma busca linear por melhoramento moral, mas uma série de reencenações de um trauma primordial: a substituição do <strong>&quot;Ser&quot;</strong> pelo <strong>&quot;Fazer&quot;</strong>. Ao introduzir Jesus Cristo não apenas como um salvador religioso, mas como a &quot;Causa Primeira&quot; da criação, o autor convida o leitor a assistir ao funeral do &quot;Deus da Lei&quot; e a descobrir a Graça como uma força cosmológica fundamental e amoral, comparável à gravidade.
                    </p>

                    <h3 className="text-3xl font-serif font-bold text-slate-900 dark:text-white mt-24 mb-10 italic">A Reestruturação da Psique: De Adão a Cristo</h3>

                    <p>
                        A análise do Capítulo 4 inicia-se com a desconstrução da figura de Adão, lido tipologicamente como o &quot;negativo&quot; de Cristo. Para o autor, a Queda não foi um mero deslize ético, mas a inauguração de uma estrutura psíquica baseada na Falta. Ao incorporar o &quot;Não&quot; da Árvore do Conhecimento, Adão deixou de ser um com o Todo e tornou-se o <strong>&quot;Adão Performativo&quot;</strong>, um sujeito que tenta desesperadamente cobrir sua nudez existencial com &quot;folhas de figueira&quot; — metáforas para a moralidade e o esforço próprio.
                    </p>

                    <p>
                        Jesus é apresentado como o &quot;Anti-Adão&quot;. Enquanto o primeiro Adão buscou preencher sua Falta negando o limite e devorando o fruto proibido, Cristo assume plenamente a &quot;castração&quot; e o esvaziamento. A obra argumenta que toda a narrativa edênica funciona como um espelho invertido do Calvário. Onde Adão trouxe a morte por meio de uma árvore viva, Cristo traz a vida por meio de uma árvore morta: a Cruz. Esta inversão ontológica é o que o autor denomina <strong>&quot;Graça Estrutural&quot;</strong>, um sistema onde a identidade humana não é construída no tempo (Chronos) por meio de obras, mas revelada na eternidade (Kairós) por meio da filiação.
                    </p>

                    <div className="table-container shadow-2xl">
                        <table>
                            <thead>
                                <tr>
                                    <th>Categoria Analítica</th>
                                    <th>Adão (A Sombra)</th>
                                    <th>Jesus (O Real)</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td className="font-bold">Origem do Sujeito</td>
                                    <td>Baseada na Falta e no &quot;Não&quot;.</td>
                                    <td>Baseada na Plenitude e no &quot;Sim&quot;.</td>
                                </tr>
                                <tr>
                                    <td className="font-bold">Relação com o Limite</td>
                                    <td>Tentativa de negar a finitude.</td>
                                    <td>Assunção plena da finitude na Cruz.</td>
                                </tr>
                                <tr>
                                    <td className="font-bold">Vestimenta Simbólica</td>
                                    <td>Folhas de Figueira (Performance).</td>
                                    <td>Nudez Real (Vulnerabilidade/Verdade).</td>
                                </tr>
                                <tr>
                                    <td className="font-bold">Efeito no Tempo</td>
                                    <td>Inicia a tirania do Fazer.</td>
                                    <td>Restaura o descanso do Ser.</td>
                                </tr>
                                <tr>
                                    <td className="font-bold">Símbolo Central</td>
                                    <td>Árvore do Conhecimento (Morte).</td>
                                    <td>Árvore da Vida/Cruz (Ressurreição).</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                    <h3 className="text-3xl font-serif font-bold text-slate-900 dark:text-white mt-24 mb-10 italic">A Tipologia das Cinco Alianças e a Revelação Progressiva</h3>

                    <p>
                        O Capítulo 4 avança para uma investigação das cinco alianças fundamentais do Antigo Testamento, demonstrando como cada figura histórica — Abel, Noé, Abraão, Moisés e Davi — falhou em sua tentativa de restaurar o Jardim, servindo apenas para apontar para a necessidade de um &quot;Original&quot; superior.
                    </p>

                    <p><strong>O Sacerdócio de Abel e a Dialética do Sangue:</strong> Abel é descrito como o primeiro ser humano a perecer pela estrutura da religião. Sua história estabelece a distinção entre o Ser (pastor que oferece a vida) e o Fazer (Caim, o lavrador que oferece o suor da terra amaldiçoada). O autor argumenta que o sacrifício de Abel, embora aceito, ainda estava preso à lógica da retribuição; seu sangue clamava da terra por justiça e vingança. Jesus, por sua vez, é o &quot;Abel melhor&quot;, cujo sangue não clama por punição, mas por perdão, absorvendo a dívida em vez de exigi-la.</p>

                    <p><strong>Noé e a Insuficiência da Água:</strong> Noé personifica o repouso temporário e o consolo, mas sua aliança revela uma limitação trágica: o juízo externo (o Dilúvio) não removeu o pecado interno. O pecado &quot;entrou na Arca clandestinamente&quot;. Enquanto a água simboliza a Lei que varre a corrupção mas não redime a natureza, o sangue de Cristo simboliza o mergulho na morte real para ressurgir em uma nova criação. Jesus é o &quot;Noé definitivo&quot; que recebe o juízo em seu próprio corpo para fundar um mundo onde o pecador é declarado santo.</p>

                    <p><strong>Melquisedeque e Isaque: O Sacerdócio da Vida e o Cordeiro Substituto:</strong> A figura de Melquisedeque representa um sacerdócio que não depende da carne ou da lei, mas da &quot;Vida Indestrutível&quot;. Ele substitui o altar de morte pela mesa de comunhão (pão e vinho), deslocando o foco do pagamento de dívidas para o sustento gracioso. Em Isaque, identifica-se a manifestação suprema da &quot;voz sádica da Lei&quot;, que exige o sacrifício do mais precioso. Jesus é o cumprimento dessa sombra não porque é poupado como Isaque, mas porque Ele é o Cordeiro que efetivamente morre no topo do monte.</p>

                    <p><strong>Moisés e Josué: A Morte da Lei e o Advento de Yeshua:</strong> Moisés é a personificação da Impossibilidade. Ele traz a letra que mata e a glória passageira coberta por um véu. Quem lidera a entrada na Terra Prometida é Josué (Yeshua/Jesus), simbolizando que o descanso só é acessível quando o regime de Moisés morre. Jesus é o &quot;Moisés melhor&quot; porque não transforma água em sangue (juízo/morte), mas transforma água em vinho (festa/graça).</p>

                    <p><strong>Davi e o Trono da Misericórdia:</strong> Davi é o laboratório humano onde se revela a diferença entre a &quot;vara de homens&quot; (o castigo da Lei) e a fidelidade da Graça. Como o rei que pecou mas entendeu o arrependimento, ele prefigura o Rei que não pecou mas se fez pecado. Jesus efetivamente realizou o desejo de Davi, morrendo pela humanidade rebelde para estabelecer um Reino de amor.</p>

                    <h3 className="text-3xl font-serif font-bold text-slate-900 dark:text-white mt-24 mb-10 italic">O Sexto Marido: O Adultério Espiritual com a Lei</h3>

                    <p>
                        Ao transitar para o Novo Testamento, o capítulo 4 introduz uma das metáforas mais impactantes do livro: o adultério da humanidade com a Lei. Utilizando o episódio da mulher samaritana no poço de Jacó, o autor propõe que as cinco alianças anteriores (Adão, Noé, Abraão, Moisés e Davi) foram &quot;maridos&quot; legítimos, mas provisórios, que morreram na história.
                    </p>

                    <p>
                        O <strong>&quot;sexto marido&quot;</strong>, com quem a humanidade vive agora, representa a religião do sincretismo e do esforço humano. É uma união ilegítima que tenta extrair vida do cadáver da Lei. Jesus se apresenta como o <strong>&quot;Sétimo Homem&quot;</strong>, o Marido do Descanso Perfeito, que convida a alma a deixar o &quot;cântaro&quot; do esforço para beber da Água Viva.
                    </p>

                    <h3 className="text-3xl font-serif font-bold text-slate-900 dark:text-white mt-24 mb-10 italic">A Metáfora do Sr. Lei e a Neurose Religiosa</h3>

                    <p>
                        O autor descreve a vida sob a Lei como um casamento abusivo com o <strong>Sr. Lei</strong>. Este marido é vigilante, exaustivo e sádico, instalando câmeras até nos pensamentos do cônjuge. Sob o regime do Sr. Lei, a obediência não é uma virtude, mas uma contenção neurótica alimentada pelo medo.
                    </p>

                    <p>
                        O grande anúncio do Evangelho é que o Sr. Lei morreu. Com sua morte, o &quot;escrito de dívida&quot; evaporou-se. O sujeito é, então, &quot;condenado à liberdade&quot;, descobrindo que, sem a proibição para iluminar o pecado, a transgressão perde sua força erótica e torna-se banal.
                    </p>

                    <h3 className="text-3xl font-serif font-bold text-slate-900 dark:text-white mt-24 mb-10 italic">O Zumbi, a Espada e o Retorno ao Jardim</h3>

                    <p>
                        A expulsão do Éden é reinterpretada não como um ato de ira, mas de misericórdia salvaguardada. O autor utiliza a figura do <strong>Zumbi</strong> para explicar que, se Adão comesse da Árvore da Vida em seu estado caído, ele seria eternizado em sua corrupção, tornando-se um monstro imortal incapaz de redenção. A Morte física foi decretada como um &quot;reset&quot; misericordioso.
                    </p>

                    <p>
                        Para guardar o caminho, YHWH colocou Querubins e uma Espada de Fogo. A Espada é o protótipo da Lei, cuja função é matar o ser caído que tenta entrar no Jardim por mérito. Jesus cumpre a Lei não encontrando uma &quot;brecha legal&quot;, mas encostando seu peito nu na lâmina da espada. Ao morrer, Ele absorve o golpe fatal destinado à humanidade, apagando a espada e rasgando o véu.
                    </p>

                    <div className="table-container shadow-2xl">
                        <table>
                            <thead>
                                <tr>
                                    <th>Elemento do Jardim</th>
                                    <th>Função sob a Lei</th>
                                    <th>Resolução em Cristo (O Evangelho)</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td className="font-bold">Expulsão</td>
                                    <td>Punição pela desobediência.</td>
                                    <td>Misericórdia para evitar a imortalidade no pecado.</td>
                                </tr>
                                <tr>
                                    <td className="font-bold">Espada de Fogo</td>
                                    <td>Barreira mortal para o ser caído.</td>
                                    <td>Extinta no corpo de Cristo na Cruz.</td>
                                </tr>
                                <tr>
                                    <td className="font-bold">Querubins</td>
                                    <td>Guardiões burocráticos e letais.</td>
                                    <td>Arautos da Vida que anunciam a Ressurreição.</td>
                                </tr>
                                <tr>
                                    <td className="font-bold">Árvore da Vida</td>
                                    <td>Objeto proibido e inacessível.</td>
                                    <td>Jesus, o fruto que gera vida eterna para quem crê.</td>
                                </tr>
                                <tr>
                                    <td className="font-bold">Morte Física</td>
                                    <td>Sentença definitiva e aterrorizante.</td>
                                    <td>Horizonte de cura e fim do &quot;Adão Performativo&quot;.</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                    <h3 className="text-3xl font-serif font-bold text-slate-900 dark:text-white mt-24 mb-10 italic">O Evangelho, os Querubins e a Esfinge: O Deciframento do Real</h3>

                    <p>
                        O subtítulo <strong>&quot;O Evangelho, os Querubins e a Esfinge&quot;</strong> marca o ponto mais denso da investigação teológica do Capítulo 4. Aqui, funde-se a mitologia clássica com a revelação bíblica para explicar o fim do &quot;Ministério da Condenação&quot;. Os Querubins, com suas quatro faces, são relacionados à <strong>Esfinge</strong>: &quot;Decifra-me ou devoro-te&quot;.
                    </p>

                    <p>
                        A Lei de Moisés é a Esfinge que exige a obediência perfeita. Jesus resolve o enigma tornando-se o Homem Perfeito e assumindo a forma da &quot;cauda da serpente&quot; na Cruz — fazendo-se pecado — para anular o veneno da acusação por dentro do sistema. Ao engolir a &quot;Vida Indestrutível&quot; de Cristo, o estômago da Esfinge (a Morte) explodiu.
                    </p>

                    <div className="text-slate-600 dark:text-slate-400 font-light leading-relaxed mb-8 text-lg">
                        As quatro faces dos Querubins são reconfiguradas:
                        <ul className="list-disc pl-6 space-y-2 mt-4 ml-4">
                            <li><strong>O Leão:</strong> Autoridade real de Cristo que protege o filho.</li>
                            <li><strong>O Touro:</strong> O Servo Sofredor que carregou o peso por nós.</li>
                            <li><strong>O Homem:</strong> O Filho do Homem glorificado, a humanidade plena restaurada.</li>
                            <li><strong>A Águia:</strong> A visão celestial que eleva a humanidade acima da Lei.</li>
                        </ul>
                    </div>

                    <h3 className="text-3xl font-serif font-bold text-slate-900 dark:text-white mt-24 mb-10 italic">Conclusão: O Funeral da Performance</h3>

                    <p>
                        A apresentação deste capítulo revela que a identidade não é algo que o homem precisa conquistar, mas algo que já foi pago no Kairós. Se o &quot;Sr. Lei&quot; está morto e a Esfinge foi decifrada, o esforço humano é apenas um teatro de sombras. A obra convida a sair da &quot;neurose do Fazer&quot; e entrar no <strong>&quot;repouso do Ser&quot;</strong>.
                    </p>

                    <blockquote className="relative my-16 py-8 px-12 border-l-2 border-primary/30 italic text-2xl text-slate-900 dark:text-white font-light leading-relaxed">
                        <span className="absolute top-0 left-4 text-6xl text-primary/10 font-serif">&quot;</span>
                        O Capítulo 4 é o portal para uma realidade onde a Graça não é um sentimento, mas a infraestrutura do Universo. Prepare-se para assistir ao funeral do seu antigo eu.
                    </blockquote>
                </article>

                <AmazonCTA />

                <footer className="mt-32 pt-16 border-t border-slate-200 dark:border-white/5">
                    <div className="flex flex-col md:flex-row items-stretch gap-6">
                        <Link to="/capitulo/3" className="flex-1 p-8 rounded-3xl bg-slate-100/50 dark:bg-white/5 hover:bg-slate-200 dark:hover:bg-white/10 transition-all group">
                            <div className="flex items-start gap-4">
                                <span className="material-symbols-outlined text-slate-400 group-hover:-translate-x-1 transition-transform">arrow_back</span>
                                <div>
                                    <span className="text-[10px] uppercase tracking-widest text-slate-500 font-bold">Capítulo 03</span>
                                    <h4 className="font-serif italic text-xl mt-2 text-slate-600 dark:text-slate-400">As Folhas de Figueira</h4>
                                </div>
                            </div>
                        </Link>

                        <Link to="/capitulo/4.1" className="flex-1 p-8 rounded-3xl bg-primary text-white shadow-xl shadow-primary/20 hover:scale-[1.03] transition-all group">
                            <div className="flex justify-between items-start">
                                <div>
                                    <span className="text-[10px] uppercase tracking-widest text-white/70 font-bold">Próximo Capítulo</span>
                                    <h4 className="font-serif italic text-2xl mt-2">A Cosmologia da Vida</h4>
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
