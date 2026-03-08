import React from 'react';
import { Link } from 'react-router-dom';
import { AmazonCTA } from '../../components/AmazonCTA';

export const Chapter3 = () => {
    return (
        <>
            <header className="relative h-[80vh] w-full overflow-hidden flex items-end">
                <div className="absolute inset-0 scale-105">
                    <img src="/images/capitulo-3-bg.png" alt="Folhas de Figueira" className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-gradient-to-t from-dark-bg via-dark-bg/40 to-transparent"></div>
                </div>

                <div className="relative w-full pb-20 px-6 fade-up">
                    <div className="max-w-5xl mx-auto">
                        <div className="flex flex-col items-center text-center">
                            <div className="w-12 h-[2px] bg-primary mb-8 text-white"></div>
                            <span className="text-primary font-bold tracking-[0.5em] uppercase text-[10px] mb-6 block">Uma Análise do Capítulo 3 de O Evangelho Eterno</span>
                            <h1 className="text-4xl md:text-6xl font-serif font-bold text-white mb-8 italic leading-tight max-w-5xl">
                                Anatomia da Vergonha e a Arquitetura do Esconderijo
                            </h1>
                            <div className="flex items-center gap-8 text-white/50 text-[10px] font-bold uppercase tracking-widest">
                                <span className="flex items-center gap-2"><span className="material-symbols-outlined text-sm text-primary">menu_book</span> Cap. 03</span>
                                <span className="flex items-center gap-2"><span className="material-symbols-outlined text-sm text-primary">hourglass_empty</span> 30 min de leitura</span>
                            </div>
                        </div>
                    </div>
                </div>
            </header>

            <main className="max-w-3xl mx-auto px-6 py-24 md:py-32">
                <article className="prose-custom font-serif transition-all duration-300">
                    <p className="dropcap">
                        O fenômeno da religiosidade humana, conforme delineado na obra <em>O Evangelho Eterno e a Arquitetura da Graça</em>, não é apresentado como uma busca lúdica pelo sagrado, mas como uma estrutura neurotizante de defesa contra o desamparo ontológico. No centro dessa investigação reside o Capítulo 3, intitulado <strong>"As Folhas da Figueira: A Ilusão da Obediência"</strong>. Este capítulo funciona como a peça de resistência de todo o tratado teológico-psicanalítico, pois é nele que o autor, Miguel, o Príncipe, disseca a transição do "Ser" para o "Fazer". A análise a seguir apresenta as ideias fundamentais deste capítulo, servindo como um guia exaustivo para o leitor que se prepara para enfrentar a implosão do teatro religioso proposta pela obra.
                    </p>

                    <p>
                        O autor estabelece, logo de início, que a queda de Adão no Éden não deve ser lida meramente como um deslize moral de caráter histórico, mas como a descrição da estrutura fundamental da psique humana. O Capítulo 3 foca no momento exato em que os olhos do homem se abrem e ele percebe sua nudez. Esse despertar é o nascimento da vergonha, e a resposta imediata de Adão — costurar folhas de figueira — é identificada como a primeira tecnologia simbólica de gestão do abismo psíquico. O que se apresenta não é uma solução, mas a inauguração de uma economia psíquica baseada na performance e no disfarce.
                    </p>

                    <h3 className="text-3xl font-serif font-bold text-slate-900 dark:text-white mt-24 mb-10 italic">A Ruptura Ontológica e o Nascimento do Sujeito Dividido</h3>

                    <p>
                        No Jardim do Éden, antes da transgressão, o ser e o fazer eram uma unidade indivisível. Adão existia em um estado pré-simbólico, anterior à linguagem e à consciência moral, onde não havia a "Falta" e, consequentemente, não existia o Desejo. O sujeito não existia de forma autônoma, pois era um com o Todo. A introdução da Árvore do Conhecimento do Bem e do Mal por YHWH estabelece o limite primordial, o primeiro "Não", que atua como o significante mestre que cria a separação entre o permitido e o proibido.
                    </p>

                    <p>
                        A análise do Capítulo 3 demonstra que o "Não" da Lei precede o desejo. Diferente da percepção comum de que a Lei reprime um desejo natural preexistente, o autor argumenta que a Lei inaugura o desejo ao demarcar o território do proibido. Ao morder o fruto, Adão e Eva não adquirem apenas informação, mas sofrem uma reestruturação subjetiva. Eles tornam-se o que a psicanálise lacaniana define como o <strong>sujeito dividido</strong>, aquele que não é idêntico a si mesmo e que é marcado por uma falta constitutiva.
                    </p>

                    <h3 className="text-3xl font-serif font-bold text-slate-900 dark:text-white mt-24 mb-10 italic">O Estádio do Espelho e a Nudez como Trauma</h3>

                    <p>
                        O capítulo explora a nudez como o trauma original. No estado de inocência, a nudez era transparente. Após a queda, ela torna-se insuportável sob o olhar do Outro. Esse "olhar" não é apenas a visão física, mas a instância simbólica que julga e define o sujeito. Lacan ilustra que o reconhecimento do eu ocorre de maneira alienada e artificial. Adão, ao se ver nu, percebe-se incompleto e vulnerável ao julgamento de YHWH.
                    </p>

                    <p>
                        A vergonha é a reação inevitável a essa percepção de falta. Ela garante a não-harmonia entre o Eu e o Outro. O autor de <em>O Evangelho Eterno</em> propõe que as folhas de figueira são a tentativa de Adão de restaurar a unidade perdida por meio de uma imagem idealizada de si mesmo: o <strong>"Adão Performativo"</strong>.
                    </p>

                    <div className="table-container shadow-2xl">
                        <table>
                            <thead>
                                <tr>
                                    <th>Estado do Homem</th>
                                    <th>Característica Ontológica</th>
                                    <th>Relação com a Realidade</th>
                                    <th>Representação Simbólica</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td className="font-bold">Adão Real</td>
                                    <td>Unidade pré-simbólica.</td>
                                    <td>Transparência e Nudez.</td>
                                    <td>Sem necessidade de vestes.</td>
                                </tr>
                                <tr>
                                    <td className="font-bold">Adão Performativo</td>
                                    <td>Divisão Subjetiva.</td>
                                    <td>Disfarce e Vergonha.</td>
                                    <td>Folhas de Figueira (Ego/Persona).</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                    <p>
                        Essa tabela, derivada das premissas do capítulo, sintetiza a mudança de regime psíquico que a obra explora. O leitor é convidado a perceber que todos nós habitamos a pele desse Adão Performativo, tentando desesperadamente responder à pergunta: "O que devo fazer para que Deus me ame?".
                    </p>

                    <h3 className="text-3xl font-serif font-bold text-slate-900 dark:text-white mt-24 mb-10 italic">A Metáfora das Folhas: A Religião como Tecnologia de Esconderijo</h3>

                    <p>
                        O ato de costurar folhas de figueira é identificado no Capítulo 3 como o nascimento da Religião. O autor argumenta que a religião primordial tenta dar a YHWH algo que Ele nunca pediu. A nudez torna-se o campo onde o real é coberto pelo idealizado. As folhas são descritas como a primeira tecnologia simbólica de gestão do abismo psíquico; elas não curam a ferida, apenas a encobrem, produzindo a ilusão de que o problema foi resolvido.
                    </p>

                    <p>
                        Um dos insights mais profundos do capítulo é a ideia de que a folha de figueira, ao tentar esconder a nudez, acaba por denunciar que há algo de errado. O esforço religioso para parecer "justo" ou "santo" é a prova cabal da consciência da própria falha. O autor denomina isso de <strong>"Aparência de Glória"</strong>, comparando-a ao véu de Moisés, que servia para esconder que a glória em seu rosto estava se desvanecendo.
                    </p>

                    <h3 className="text-3xl font-serif font-bold text-slate-900 dark:text-white mt-24 mb-10 italic">Obediência como Contenção vs. Virtude</h3>

                    <p>
                        O Capítulo 3 desafia frontalmente o conceito tradicional de obediência. Na filosofia moral aristotélico-tomista, a virtude é vista como um habitó de agir corretamente. Contudo, o autor propõe uma tese radical: <strong>"Obediência não é virtude, é contenção"</strong>.
                    </p>

                    <p>
                        A lógica é devastadora: se um sujeito precisa se esforçar para não fazer algo, é porque o desejo de fazer está vivo dentro dele. O homem que não trai a esposa apenas por medo do castigo não é fiel; ele é um adúltero contido pela Lei. Sob o regime da Lei, a obediência é apenas o disfarce de um desejo que continua gritando "Sim" por dentro. O autor utiliza o exemplo de Adolf Eichmann para ilustrar como a obediência cega pode ser uma renúncia à reflexão ética e uma ferramenta de morte.
                    </p>

                    <h3 className="text-3xl font-serif font-bold text-slate-900 dark:text-white mt-24 mb-10 italic">O Teatro da Moralidade: A Simbiose entre Moralista e Transgressor</h3>

                    <p>
                        O conceito de "Teatro da Moralidade" é uma das imagens mais poderosas do Capítulo 3. Nele, a humanidade é dividida em dois papéis que, embora pareçam opostos, são faces da mesma moeda: o Moralista e o Transgressor. Ambos gravitam em torno do mesmo "Não".
                    </p>

                    <p>
                        <strong>O Transgressor:</strong> É o ator que atua a fantasia no palco. Ele exibe o que a Lei proíbe, muitas vezes acreditando estar desafiando o sistema. No entanto, sua performance depende totalmente do roteiro da Lei; sem a proibição, o ato perde o seu "brilho" erótico.
                    </p>

                    <p>
                        <strong>O Moralista:</strong> É o espectador na plateia que assiste ao pecado do outro com uma mistura de choque e fascínio. Ele reprime seu próprio desejo e delega ao transgressor a função de agir em seu lugar. O moralista "goza" através do réu, utilizando o julgamento para sustentar sua própria fantasia de pureza.
                    </p>

                    <p>
                        Esta relação revela uma simbiose doentia. O moralista precisa do pecador para se sentir justo. O autor afirma que "o juiz goza através do réu", assim como a pornografia faz sexo no lugar do espectador. Essa hipocrisia é o que Jesus denunciava como "sepulcros caiados": bonitos por fora (as folhas de figueira), mas cheios de morte por dentro (o fruto digerido).
                    </p>

                    <h3 className="text-3xl font-serif font-bold text-slate-900 dark:text-white mt-24 mb-10 italic">A Ética do Espelho: "Eu sou aquilo que aponto"</h3>

                    <p>
                        A investigação sobre o julgamento leva a um insight psicológico profundo: o julgamento que fazemos do outro é a confissão do nosso próprio mundo interior. O capítulo explora a frase de Romanos 2:1 — "és indesculpável quando julgas" — como uma descrição da estrutura psíquica. O que o moralista odeia e condena no transgressor é a concretização escancarada do desejo que ele mesmo carrega, mas não tem coragem de realizar.
                    </p>

                    <p>
                        O julgamento funciona como um mecanismo de defesa; o moralista prefere "matar" o transgressor (seja fisicamente ou por meio da reputação) do que admitir que possui o mesmo desejo. O leitor é desafiado a olhar para onde seu dedo aponta para descobrir sua própria fantasia reprimida.
                    </p>

                    <div className="table-container shadow-2xl">
                        <table>
                            <thead>
                                <tr>
                                    <th>Personagem</th>
                                    <th>Posição no Teatro</th>
                                    <th>Relação com o Desejo</th>
                                    <th>Função Social</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td className="font-bold">Transgressor</td>
                                    <td>Palco (Ação)</td>
                                    <td>Atua a fantasia proibida.</td>
                                    <td>Prover o objeto de gozo.</td>
                                </tr>
                                <tr>
                                    <td className="font-bold">Moralista</td>
                                    <td>Plateia (Julgamento)</td>
                                    <td>Reprime a fantasia.</td>
                                    <td>Vigiar e punir para manter o Ego.</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                    <h3 className="text-3xl font-serif font-bold text-slate-900 dark:text-white mt-24 mb-10 italic">A Lei como Mãe do Desejo e a Armadilha do "Não"</h3>

                    <p>
                        Um dos pontos mais contra intuitivos do Capítulo 3 é a afirmação de que a Lei é a mãe do pecado. O autor utiliza a teologia paulina — "a força do pecado é a Lei" — para demonstrar o mecanismo da transgressão. A Lei não apenas revela o pecado; ela o fabrica ao nomeá-lo e descrevê-lo.
                    </p>

                    <p>
                        O capítulo utiliza o paradoxo do <strong>"elefante rosa"</strong> para explicar como o comando "Não" gera a imagem do que se quer proibir. Quando a Lei diz "Não cobiçarás", ela apresenta a cobiça ao sujeito que até então era indiferente ao objeto. O desejo nasce da tentativa do homem de acabar com a falta, e a Lei erotiza o proibido ao colocá-lo em destaque.
                    </p>

                    <h3 className="text-3xl font-serif font-bold text-slate-900 dark:text-white mt-24 mb-10 italic">O Papel Sadista da Consciência Moral</h3>

                    <p>
                        A Árvore do Conhecimento, uma vez engolida, torna-se a consciência moral interna — o "segundo sujeito" dentro do sujeito. Esta instância é descrita como uma voz obscena e tirânica que exige do homem algo que ele não pode dar: a perfeição absoluta em um estado de queda. A consciência torna-se o agente da Lei que bombardeia o sujeito com exigências impossíveis, garantindo o fracasso estrutural para que possa, em seguida, punir com a culpa.
                    </p>

                    <p>
                        O autor argumenta que a base da moral humana é a vergonha. Ao proibir a nudez, a consciência introduz um corte na continuidade do real. O homem veste-se para suportar o olhar de YHWH, mas essa veste é a própria marca da sua alienação.
                    </p>

                    <h3 className="text-3xl font-serif font-bold text-slate-900 dark:text-white mt-24 mb-10 italic">O Deus da Lei e a Mediação dos Anjos</h3>

                    <p>
                        Uma revelação perturbadora do Capítulo 3 é que a interação de Israel com a divindade no Antigo Testamento foi mediada por anjos, seres que operam pela lógica da funcionalidade e da justiça retributiva (olho por olho), e não necessariamente pela natureza intrínseca de YHWH, que é Graça e Vida Incondicional.
                    </p>

                    <p>
                        O autor propõe uma <strong>"terceirização divina"</strong>: a Lei foi entregue por anjos. Isso explica por que o "Deus da Lei" parece sádico e burocrático, matando três mil pessoas no Sinai por desobediência. Moisés, ao trazer as tábuas, é a personificação da própria Lei e da morte que ela gera. O capítulo prepara o leitor para o funeral desse "Deus da Lei", permitindo que o verdadeiro Pai seja revelado na Cruz.
                    </p>

                    <h3 className="text-3xl font-serif font-bold text-slate-900 dark:text-white mt-24 mb-10 italic">A Travessia do Deserto: Do Fazer ao Ser</h3>

                    <p>
                        O Capítulo 3 conclui preparando o terreno para a cura, que não virá pelo esforço performativo, mas pelo <strong>"Descanso"</strong>. O retorno ao Jardim não é uma regressão à inocência infantil, mas uma ascensão à maturidade de quem sabe que a dívida foi paga.
                    </p>

                    <p>
                        O autor utiliza a "Filosofia do Deserto" para descrever o processo de desconstrução da fantasia. Viver sob a Graça significa desativar o holofote da Lei que dava "brilho" ao pecado. Quando a Lei morre como fator de excitação, o pecado torna-se banal e tedioso. O sujeito da Graça é aquele que olha para o fruto proibido e boceja, pois já está saciado pela Árvore da Vida.
                    </p>

                    <h3 className="text-3xl font-serif font-bold text-slate-900 dark:text-white mt-24 mb-10 italic">O Convite ao Leitor: Saia do Teatro</h3>

                    <p>
                        O Capítulo 3 de <em>O Evangelho Eterno</em> é um espelho implacável. Ele demonstra que a nossa obediência é frequentemente apenas uma folha de figueira tecida com fios de hipocrisia e medo. O leitor sentirá a necessidade de continuar a leitura do livro para descobrir como escapar desse teatro de sombras.
                    </p>

                    <p>
                        O autor não oferece uma nova lista de regras para costurar aventais melhores; ele oferece o fim da costura. Ele nos apresenta a realidade de que Jesus não veio para reformar o Adão Performativo, mas para matá-lo na Cruz, abrindo o caminho para que possamos simplesmente "Ser" na eternidade. A transição do "Fazer" para o "Ser" é a promessa final de quem descobre que "Está Consumado".
                    </p>

                    <h3 className="text-2xl font-serif font-bold text-slate-900 dark:text-white mt-16 mb-8 italic">Síntese dos Conceitos Fundamentais do Capítulo 3</h3>
                    <ul className="space-y-4 mb-12">
                        <li><strong>Folhas de Figueira:</strong> A primeira tecnologia religiosa; esforço humano para esconder a vergonha ontológica através da moralidade.</li>
                        <li><strong>Adão Performativo:</strong> O homem que vive para o olhar do Outro, tentando garantir seu valor através de atos e performances.</li>
                        <li><strong>Obediência como Contenção:</strong> A submissão à Lei movida pelo medo, que mantém o desejo pecaminoso vivo, porém reprimido.</li>
                        <li><strong>Teatro da Moralidade:</strong> O palco onde o moralista e o transgressor encenam uma simbiose de gozo através da Lei.</li>
                        <li><strong>Olhar do Outro:</strong> A instância simbólica julgadora que torna a nudez traumática e exige o esconderijo.</li>
                        <li><strong>A Voz Obscena:</strong> O superego que utiliza a Lei para exigir o impossível e punir com a culpa.</li>
                    </ul>

                    <blockquote className="relative my-16 py-8 px-12 border-l-2 border-primary/30 italic text-2xl text-slate-900 dark:text-white font-light leading-relaxed">
                        <span className="absolute top-0 left-4 text-6xl text-primary/10 font-serif">"</span>
                        O teatro acabou. As folhas de figueira caíram. Prepare-se para encontrar a Árvore da Vida.
                    </blockquote>
                </article>

                <AmazonCTA />

                <footer className="mt-32 pt-16 border-t border-slate-200 dark:border-white/5">
                    <div className="flex flex-col md:flex-row items-stretch gap-6">
                        <Link to="/capitulo/2" className="flex-1 p-8 rounded-3xl bg-slate-100/50 dark:bg-white/5 hover:bg-slate-200 dark:hover:bg-white/10 transition-all group">
                            <div className="flex items-start gap-4">
                                <span className="material-symbols-outlined text-slate-400 group-hover:-translate-x-1 transition-transform">arrow_back</span>
                                <div>
                                    <span className="text-[10px] uppercase tracking-widest text-slate-500 font-bold">Capítulo 02</span>
                                    <h4 className="font-serif italic text-xl mt-2 text-slate-600 dark:text-slate-400">A Antiga Serpente</h4>
                                </div>
                            </div>
                        </Link>

                        <Link to="/capitulo/4" className="flex-1 p-8 rounded-3xl bg-primary text-white shadow-xl shadow-primary/20 hover:scale-[1.03] transition-all group">
                            <div className="flex justify-between items-start">
                                <div>
                                    <span className="text-[10px] uppercase tracking-widest text-white/70 font-bold">Próximo Capítulo</span>
                                    <h4 className="font-serif italic text-2xl mt-2">A Árvore da Vida</h4>
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
