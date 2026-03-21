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
                        O quarto capítulo da obra <em>&quot;O Evangelho Eterno e a Arquitetura da Graça&quot;</em>, intitulado <strong>&quot;Jesus: A Graça e a Árvore da Vida&quot;</strong>, representa o ápice da transição teológica e antropológica proposta pelo autor, Miguel, o Príncipe. Se os capítulos iniciais dedicam-se a uma descida vertiginosa à topografia do desejo e ao diagnóstico da falência do &quot;Adão Performativo&quot; sob o regime da Lei, este segmento específico constitui a revelação da cura estrutural. O texto não se limita a uma exposição soteriológica convencional; ele propõe uma ressignificação ontológica do ser humano, deslocando-o da exaustão do &quot;fazer&quot; para o repouso do &quot;ser&quot; em Cristo. A análise que se segue explora as camadas de significado deste capítulo, conduzindo o leitor através de uma jornada que vai da poeira do Gênesis à glória do Kairós, demonstrando por que esta seção é considerada o coração pulsante da obra.
                    </p>

                    <h3 className="text-3xl font-serif font-bold text-slate-900 dark:text-white mt-24 mb-10 italic">A Tipologia das Alianças e a Prefiguração de Cristo</h3>

                    <p>
                        A estrutura narrativa do capítulo quatro repousa sobre uma exaustiva comparação tipológica entre as alianças do Antigo Testamento e a realidade inaugurada por Jesus. O autor estabelece que as figuras de Adão, Abel, Noé, Melquisedeque, Isaque, Moisés, Josué e Davi não são apenas personagens históricos, mas &quot;negativos&quot; fotográficos que apontam para uma imagem positiva e absoluta: o Messias. Esta abordagem tipológica permite compreender que a história de Israel não foi um fim em si mesma, mas uma gestação laboriosa do &quot;corpo preparado&quot; para a encarnação do Verbo.
                    </p>

                    <p>
                        A análise inicia-se com o contraste entre o primeiro Adão e o Cristo. Adão é lido como a &quot;cópia&quot; que falhou ao tentar preencher sua falta constitutiva através do consumo do proibido, inaugurando a era da performance e da vergonha. Jesus, por sua vez, é apresentado como o &quot;Adão Real&quot;, aquele que não foge da nudez, mas a assume na cruz para vestir a humanidade com a &quot;pele do Cordeiro&quot;. A transição da Árvore do Conhecimento para a Árvore da Vida (a Cruz) é o movimento central que desativa a economia da culpa e introduz a economia da herança.
                    </p>

                    <div className="table-container shadow-2xl">
                        <table>
                            <thead>
                                <tr>
                                    <th>Figura do Antigo Testamento</th>
                                    <th>Função Tipológica (Sombra)</th>
                                    <th>Realidade em Cristo (Substância)</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td className="font-bold">Adão</td>
                                    <td>O homem da queda, da vergonha e da performance.</td>
                                    <td>O homem da ressurreição, da nudez gloriosa e do ser.</td>
                                </tr>
                                <tr>
                                    <td className="font-bold">Abel</td>
                                    <td>O sangue inocente que clama por vingança e justiça retributiva da terra.</td>
                                    <td>O sangue imaculado que clama por perdão e redenção eterna.</td>
                                </tr>
                                <tr>
                                    <td className="font-bold">Noé</td>
                                    <td>A arca como refúgio temporário contra o juízo da água sobre a carne.</td>
                                    <td>A cruz como refúgio definitivo que atravessa a morte para a vida.</td>
                                </tr>
                                <tr>
                                    <td className="font-bold">Melquisedeque</td>
                                    <td>Sacerdócio sem genealogia humana, baseado na vida indestrutível.</td>
                                    <td>O Sumo Sacerdote eterno que serve o pão e o vinho da comunhão.</td>
                                </tr>
                                <tr>
                                    <td className="font-bold">Isaque</td>
                                    <td>O filho da promessa que carrega a lenha para o seu próprio sacrifício.</td>
                                    <td>O Filho de Deus que carrega a cruz para o sacrifício que encerra a Lei.</td>
                                </tr>
                                <tr>
                                    <td className="font-bold">Moisés</td>
                                    <td>O mediador da Lei que traz a letra que mata e a glória que se desvanece.</td>
                                    <td>O Mediador da Graça que traz o Espírito que vivifica e a glória crescente.</td>
                                </tr>
                                <tr>
                                    <td className="font-bold">Davi</td>
                                    <td>O rei guerreiro que busca o coração de Deus através do arrependimento.</td>
                                    <td>O Rei da Paz que governa através da justiça e do amor incondicional.</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                    <p>
                        Esta tabela de correspondências, discutida detalhadamente no capítulo quatro, serve para demonstrar que a Graça não é um &quot;Plano B&quot; de Deus para consertar o erro humano, mas a causa primeira que sustenta toda a história. O autor argumenta que o universo só pôde ser criado porque, na eternidade de Deus (Kairós), o Cordeiro já havia sido imolado. Portanto, todas as alianças anteriores operavam sob um &quot;crédito ontológico&quot; sacado contra o futuro pagamento de Cristo no Calvário.
                    </p>

                    <h3 className="text-3xl font-serif font-bold text-slate-900 dark:text-white mt-24 mb-10 italic">O Fim do Casamento Adúltero com o Sr. Lei</h3>

                    <p>
                        Um dos conceitos mais potentes introduzidos neste capítulo é a metáfora do <strong>&quot;Sr. Lei&quot;</strong>, utilizada para descrever a relação opressiva da humanidade com o sistema legalista e moralista. O autor propõe que o ser humano, em seu estado de queda, está &quot;casado&quot; com a Lei. Este marido é descrito como um tirano vigilante e exaustivo, que não aceita falhas e exige uma performance perfeita que a esposa (a alma humana) jamais conseguirá entregar.
                    </p>

                    <p>
                        O capítulo quatro detalha como esse casamento gera um círculo vicioso de culpa e desejo. Como a Lei é a &quot;mãe do pecado&quot;, o &quot;Não&quot; do Sr. Lei acaba erotizando o objeto proibido, fazendo com que a transgressão seja a única forma de o sujeito sentir-se vivo. O resultado é uma vida dividida entre a hipocrisia pública e o desejo secreto. A libertação desse regime não ocorre por um esforço de &quot;ser uma esposa melhor&quot;, mas pela morte do marido. Na cruz de Cristo, o &quot;Sr. Lei&quot; é legalmente desativado para o crente, permitindo um novo casamento com a Graça.
                    </p>

                    <p>
                        A transição do regime do Sr. Lei para o regime da Graça é explorada através do encontro de Jesus com a mulher samaritana no poço de Jacó. O autor identifica os &quot;cinco maridos&quot; da mulher como as cinco alianças anteriores que, embora legítimas em seu tempo, eram finitas e deixaram a alma insatisfeita. O &quot;sexto marido&quot; atual representa a religião humana e o sincretismo — uma relação sem aliança real que tenta extrair vida do esforço próprio. Jesus apresenta-se como o <strong>&quot;Sétimo Homem&quot;</strong>, o marido do descanso eterno, que não exige água do poço, mas oferece a fonte de água viva que jorra de dentro do sujeito.
                    </p>

                    <p>
                        Esta análise profunda do adultério espiritual ressoa com a ideia de que a religião legalista é, na verdade, uma forma de infidelidade à Graça. O capítulo quatro convoca o leitor a abandonar o &quot;cântaro&quot; do esforço humano e a reconhecer que a sede ontológica só pode ser saciada pelo Marido Definitivo, aquele que não anota falhas, mas que cobriu todas as transgressões com a sua própria vida.
                    </p>

                    <h3 className="text-3xl font-serif font-bold text-slate-900 dark:text-white mt-24 mb-10 italic">A Espada de Fogo e a Burocracia Angélica</h3>

                    <p>
                        Outro ponto de virada radical no capítulo quatro é a reinterpretação da expulsão do Éden e do papel dos querubins. O autor desafia a percepção de que Deus expulsou o homem do paraíso por vingança. Em vez disso, a expulsão é apresentada como um ato de misericórdia estrutural: impedir que o homem comesse da Árvore da Vida em seu estado de pecado significava impedir a eternização do erro. Se o homem se tornasse imortal na queda, ele seria um &quot;zumbi eterno&quot;, uma carne corrupta que nunca morre, mas que também nunca vive verdadeiramente.
                    </p>

                    <p>
                        A <strong>&quot;Espada de Fogo&quot;</strong> que guarda o caminho da Árvore da Vida é identificada como o protótipo da Lei, o Ministério da Morte administrado pelos anjos. O capítulo quatro introduz a tese de que YHWH &quot;terceirizou&quot; a administração da Lei aos anjos, seres funcionais e amorais que operam pela lógica da retribuição e da finalidade. Esses &quot;guardas de fronteira&quot; cósmicos tinham a missão de matar qualquer um que tentasse entrar no jardim pela força do mérito ou da performance.
                    </p>

                    <p>
                        Jesus é apresentado como o único que teve a coragem de encostar o peito nu na lâmina dessa espada. Na cruz, a Lei (a Espada) desceu sobre o corpo de Cristo e, ao matar o Inocente que se fez pecado, ela gastou toda a sua munição e faliu juridicamente. A Ressurreição de Jesus é, portanto, o fim do ministério dos querubins armados. O caminho para a Árvore da Vida está agora aberto, não porque aprendemos a pular o muro, mas porque o muro (a Lei) foi derrubado pelo corpo ferido do Messias.
                    </p>

                    <p>
                        Esta seção do livro é particularmente impactante ao descrever os Querubins como a &quot;Esfinge&quot; da Lei, que propõe o enigma &quot;decifra-me ou devoro-te&quot;. Como a humanidade não conseguiu decifrar a obediência perfeita, foi devorada pela morte. Mas Cristo deu a resposta certa. Ele assumiu a forma da serpente (o pecado) na cruz para que, ao engoli-lo, a Morte explodisse por dentro. O leitor é convidado a ver que o pavor da condenação angélica foi substituído pelo canto de &quot;Santo, Santo, Santo&quot;, convidando o homem a entrar no descanso do Pai.
                    </p>

                    <h3 className="text-3xl font-serif font-bold text-slate-900 dark:text-white mt-24 mb-10 italic">A Física da Graça: Kairós, Chronos e Retrocausalidade</h3>

                    <p>
                        O capítulo quatro atinge um nível de complexidade metafísica ao discutir a relação de Cristo com o tempo. O autor utiliza os conceitos gregos de <strong>Chronos</strong> (tempo linear e entrópico) e <strong>Kairós</strong> (o tempo eterno e oportuno de Deus) para explicar a segurança da salvação. A tese defendida é que Jesus habita o Kairós e, a partir dessa dimensão, Ele sustenta toda a realidade material.
                    </p>

                    <p>
                        A obra propõe que o sacrifício de Jesus não aconteceu apenas no ano 30 d.C., mas que o Cordeiro foi imolado &quot;antes da fundação do mundo&quot;. Isso implica que a Graça é a infraestrutura do universo. O autor recorre a analogias da física quântica para explicar que a criação &quot;tomou emprestada&quot; sua existência do futuro pagamento de Cristo. Se a Cruz não fosse uma garantia no Kairós, o Big Bang não poderia ter ocorrido no Chronos.
                    </p>

                    <div className="table-container shadow-2xl">
                        <table>
                            <thead>
                                <tr>
                                    <th>Dimensão Temporal</th>
                                    <th>Natureza e Atribuições</th>
                                    <th>Relação com a Salvação</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td className="font-bold">Chronos</td>
                                    <td>Tempo linear, entropia, degradação, performance, incerteza.</td>
                                    <td>O palco onde o &quot;Adão Performativo&quot; tenta, sem sucesso, construir sua justiça.</td>
                                </tr>
                                <tr>
                                    <td className="font-bold">Kairós</td>
                                    <td>Tempo de Deus, atemporalidade, realidade consumada, &quot;Já e Ainda Não&quot;.</td>
                                    <td>A dimensão onde o crente já está ressuscitado e assentado nas regiões celestiais.</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                    <p>
                        Essa &quot;superposição ontológica&quot; significa que o crente vive no Chronos lidando com falhas e dores, mas sua realidade substancial já está garantida no Kairós. O capítulo quatro argumenta que a salvação é uma certeza imutável porque ela não depende do desempenho linear do sujeito no tempo, mas do contrato eterno assinado por Jesus. Perder a salvação exigiria que Deus &quot;des-soubesse&quot; o futuro que Ele já viu consumado no Kairós. O autor utiliza essa lógica para libertar o leitor da ansiedade religiosa, convidando-o a viver no tempo verbal do &quot;terá sido&quot;: eu serei no tempo aquilo que eu já sou na eternidade.
                    </p>

                    <h3 className="text-3xl font-serif font-bold text-slate-900 dark:text-white mt-24 mb-10 italic">O Desaparecimento do &quot;Brilho&quot; do Pecado e a Indiferença Santa</h3>

                    <p>
                        Uma das contribuições mais originais do capítulo quatro para a espiritualidade prática é a análise do desbotamento do pecado diante da Graça. O autor explica que, sob o regime da Lei, o pecado possui um &quot;brilho&quot; excessivo porque é iluminado pelo holofote do &quot;Não&quot;. A proibição erotiza o objeto e cria a fantasia de que a transgressão trará a completude.
                    </p>

                    <p>
                        No entanto, quando a Lei morre (o fim do casamento com o Sr. Lei), o holofote é desligado. O objeto proibido volta a ser apenas um objeto comum. O autor exemplifica isso através da cena de exposição pública do pecado: sob a Lei, ela causa choque, inveja ou ira; sob a Graça, ela causa tédio ou compaixão. O sujeito da Graça percebe que o transgressor não é um &quot;rei da liberdade&quot;, mas um mendigo de atenção que precisa do olhar da Lei para validar seu prazer.
                    </p>

                    <p>
                        A Graça produz o que o autor chama de <strong>&quot;Indiferença Santa&quot;</strong>. Não se trata de uma apatia depressiva, mas do fim da reatividade. O crente maduro não precisa lutar heroicamente contra o desejo de pecar; ele simplesmente perde o interesse no pecado porque a Lei que dava sabor a ele foi removida. O pecado deixa de ser &quot;pecado sabor pecado&quot; (cheio de frisson e perigo) e torna-se &quot;pecado sabor chocolate&quot; (insosso e artificial). Esta mudança de percepção é apresentada como a verdadeira libertação do vício e da compulsão.
                    </p>

                    <h3 className="text-3xl font-serif font-bold text-slate-900 dark:text-white mt-24 mb-10 italic">Do Fazer ao Ser: A Ressurreição do Sujeito</h3>

                    <p>
                        O clímax do capítulo quatro é a exortação para que o leitor abandone o palco do &quot;fazer&quot; e entre no repouso do &quot;ser&quot;. O autor argumenta que toda a religiosidade baseada na performance é uma tentativa de sustentar o &quot;Adão Performativo&quot;, aquele que vive para o olhar de um Deus que ele imagina ser um juiz burocrata.
                    </p>

                    <p>
                        A obra propõe que a cruz de Cristo foi o funeral deste ator religioso. O &quot;Ateísmo Cristão&quot; mencionado no texto refere-se à morte do &quot;Deus da Lei&quot; na consciência do crente. Quando esse juiz morre, o sujeito fica &quot;sozinho&quot; com sua liberdade e com o Pai. Esta liberdade não é anarquia, mas a maturidade da filiação. O sujeito deixa de perguntar &quot;o que devo fazer para ser amado?&quot; e passa a agir a partir da afirmação &quot;eu já sou amado&quot;.
                    </p>

                    <p>
                        O capítulo quatro detalha que o verdadeiro &quot;Ato Ético&quot; ou &quot;Ato Puro&quot; é aquele realizado sem a necessidade de plateia, sem a barganha por recompensas e sem o medo de punições. É a vida no Espírito, onde a vontade de Deus deixa de ser uma ordem externa e torna-se uma pulsão interna. O autor encerra este capítulo entregando o leitor ao seu Pai, sem roteiros, sem mapas e sem muletas religiosas, afirmando que a Graça é o fim das instruções e o início da vida real.
                    </p>

                    <h3 className="text-3xl font-serif font-bold text-slate-900 dark:text-white mt-24 mb-10 italic">Implicações Cosmológicas: A Cruz e o Big Bang</h3>

                    <p>
                        A integração entre ciência e teologia no capítulo quatro oferece uma visão audaciosa da criação. O autor sustenta que o universo material, regido pela entropia e pela morte (o Chronos), necessita de uma âncora de vida indestrutível para não se desintegrar. Esta âncora é o corpo físico de Jesus. Através da tese da retrocausalidade, o autor propõe que o &quot;Haja Luz&quot; do Gênesis foi o eco, no passado, do grito de vitória de Cristo na cruz no futuro.
                    </p>

                    <div className="table-container shadow-2xl">
                        <table>
                            <thead>
                                <tr>
                                    <th>Conceito Físico-Teológico</th>
                                    <th>Descrição e Mecanismo</th>
                                    <th>Implicação para a Realidade</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td className="font-bold">Entropia (Seta do Tempo)</td>
                                    <td>A tendência da matéria de ir da ordem para a desordem e morte.</td>
                                    <td>O estado natural do universo físico sob o domínio da queda e da Lei.</td>
                                </tr>
                                <tr>
                                    <td className="font-bold">Empréstimo Ontológico</td>
                                    <td>A existência do passado garantida por um evento real no futuro.</td>
                                    <td>O universo só existe porque Jesus pagou a dívida da existência na Cruz.</td>
                                </tr>
                                <tr>
                                    <td className="font-bold">Corpo de Cristo como Nó</td>
                                    <td>A biologia de Jesus amarrando o Real, o Simbólico e o Imaginário.</td>
                                    <td>Jesus é aquele em quem todas as coisas subsistem e são mantidas coesas.</td>
                                </tr>
                                <tr>
                                    <td className="font-bold">Retrocausalidade</td>
                                    <td>O efeito (Criação) precedendo a causa (Cruz) na lógica eterna.</td>
                                    <td>A Graça é a fundação do mundo, não um remédio posterior ao pecado.</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                    <p>
                        Esta visão desautoriza qualquer tentativa de espiritualizar excessivamente a fé ou de tratar a matéria como má. Pelo contrário, a biologia de Jesus é a infraestrutura que impede a desintegração atômica do cosmos. O autor argumenta que a preservação de Israel no Antigo Testamento foi uma missão de segurança cósmica para garantir o nascimento do corpo que sustentaria a realidade. Quando Jesus morre e ressuscita, Ele não apenas salva almas; Ele estabiliza o universo para que a Nova Criação possa emergir.
                    </p>

                    <h3 className="text-3xl font-serif font-bold text-slate-900 dark:text-white mt-24 mb-10 italic">O &quot;Alien&quot; Interior e a Aceitação da Humanidade</h3>

                    <p>
                        No posfácio e nas conclusões do capítulo quatro, o autor aborda a questão das sombras internas e dos desejos não domesticados, utilizando a metáfora do <strong>&quot;Alien&quot;</strong>. Ele descreve o medo que o ser humano tem de sua própria &quot;animalidade&quot; ou &quot;nudez&quot; — os desejos e pulsões que a Lei tenta enjaular. O &quot;Adão Performativo&quot; vive aterrorizado por esse monstro interior, tentando sufocá-lo com moralismo.
                    </p>

                    <p>
                        A Graça, contudo, ensina a perder o medo do monstro. O autor argumenta que o cristianismo da Graça não é a domesticação do animal, mas a integração dele através da aceitação da própria falibilidade. O sangue de Cristo é apresentado como sendo mais forte que o &quot;ácido do Alien&quot;. A cura ocorre quando o sujeito desiste de ser um anjo e aceita ser um humano limitado, mas redimido.
                    </p>

                    <p>
                        Esta seção do livro é um convite à honestidade radical. O leitor é incentivado a cessar a &quot;guerra civil&quot; interior e a reconhecer que o fundamento de sua existência não é a sua coerência moral, mas a fidelidade Daquele que o sustenta. A paz que excede o entendimento é descrita como a paz de quem não precisa mais esconder o seu &quot;eu&quot; disforme debaixo de folhas de figueira, porque sabe que o Pai ama a realidade nu e crua de Seus filhos.
                    </p>

                    <h3 className="text-3xl font-serif font-bold text-slate-900 dark:text-white mt-24 mb-10 italic">Conclusão: O Convite à Verdadeira Liberdade</h3>

                    <p>
                        O capítulo quatro de <em>&quot;O Evangelho Eterno e a Arquitetura da Graça&quot;</em> constitui um dos documentos teológicos mais desafiadores e libertadores da contemporaneidade. Ao ler esta apresentação, o indivíduo é confrontado com o fim de suas pretensões meritocráticas e com a vastidão de uma Graça que precede a própria existência do tempo. O autor não oferece um novo conjunto de regras para substituir as antigas, mas o desmantelamento total do palco onde o drama da religião era encenado.
                    </p>

                    <p>
                        A necessidade de mergulhar na obra completa torna-se evidente para qualquer um que deseje sair da exaustão do &quot;fazer&quot;. Através de uma síntese brilhante entre tipologia bíblica, psicanálise estrutural e cosmologia, o capítulo quatro demonstra que Jesus não é apenas o salvador de indivíduos, mas o arquiteto de uma nova realidade onde a vida é recebida como herança e não conquistada como prêmio.
                    </p>

                    <blockquote className="relative my-16 py-8 px-12 border-l-2 border-primary/30 italic text-2xl text-slate-900 dark:text-white font-light leading-relaxed">
                        <span className="absolute top-0 left-4 text-6xl text-primary/10 font-serif">&quot;</span>
                        O leitor que se permitir conduzir pelas ideias de Miguel, o Príncipe, descobrirá que o &quot;Sábado Eterno&quot; não é um destino distante, mas uma realidade presente para aqueles que aprenderam a descansar no &quot;Está Consumado&quot;. O véu está rasgado, as câmeras do Sr. Lei foram desligadas e o caminho para o Jardim está livre de espadas. O que resta é o convite para simplesmente ser, em toda a plenitude e nudez que a Graça permite. Bem-vindo à realidade da Graça Estrutural.
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

                        <Link to="/capitulo/5" className="flex-1 p-8 rounded-3xl bg-primary text-white shadow-xl shadow-primary/20 hover:scale-[1.03] transition-all group">
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
