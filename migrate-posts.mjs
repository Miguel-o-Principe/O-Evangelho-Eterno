import { createClient } from '@supabase/supabase-js';
import * as fs from 'fs';
import * as path from 'path';

// Load environment variables manually
const envPath = '.env.local';
const envContent = fs.readFileSync(envPath, 'utf-8');
const env = {};

envContent.split('\n').forEach(line => {
    const [key, ...valueParts] = line.split('=');
    if (key && key.trim() && !key.startsWith('#')) {
        env[key.trim()] = valueParts.join('=').trim().replace(/^"(.*)"$/, '$1');
    }
});

const projectUrl = env.SUPABASE_PROJECT_URL;
const serviceRoleKey = env.SUPABASE_SERVICE_ROLE_KEY;

if (!projectUrl || !serviceRoleKey) {
    console.error('❌ Missing SUPABASE_PROJECT_URL or SUPABASE_SERVICE_ROLE_KEY in .env.local');
    process.exit(1);
}

console.log('🔗 Connecting to Supabase...');
const supabase = createClient(projectUrl, serviceRoleKey);

const posts = [
    {
        title: 'Morte e Ressurreição: A Física da Graça',
        description: 'Como entender a Cruz como a Causa Primeira que precedeu toda a realidade linear.',
        author: 'Miguel, o Príncipe',
        slug: 'morte-ressurreicao-fisica-graca',
        cover_image: '/images/capitulo-4-bg.png',
        read_time: 15,
        date: '2026-03-10T00:00:00Z',
        content: '<p className="dropcap">Quando estudamos a Cruz através da lente da Física, descartamos a noção tradicional de um evento histórico isolado. A morte de Cristo não foi um acidente temporal que Deus precisou remediar; foi, ao contrário, a base estrutural da realidade. Apocalipse 13:8 descreve Jesus como "o Cordeiro que foi morto desde a fundação do mundo".</p><h3 className="text-2xl font-serif font-bold text-slate-900 dark:text-white mt-12 mb-6 italic">O Conceito de Retrocausalidade</h3><p>A física quântica nos oferece um conceito revolucionário: retrocausalidade. Um evento no futuro pode afetar o passado. Transposto para a teologia, a Cruz — como o evento eterno — não apenas redimiu o que viria, mas tornou possível o próprio passado. O Universo "toma emprestado" sua existência de um Evento Redentor que transcende o tempo linear.</p><p>Isso significa que a Queda encontrou-se, desde antes de ocorrer, dentro de um Universo já redimido. O pecado não pegou Deus de surpresa. A graça é o Plano A, não o Plano B gerado por uma Contingência Divina.</p><h3 className="text-2xl font-serif font-bold text-slate-900 dark:text-white mt-12 mb-6 italic">Implicações para a Vida Espiritual</h3><p>Se a Cruz é o fundamento do Cosmos, então toda a história humana é envolvida por um Amor que antecede a própria Criação. Você não existe em um Universo julgador donde sua salvação é incerta; você existe dentro de um Universo salvado, dentro do qual sua filiação já foi estabelecida.</p><p>Essa mudança de perspectiva — de um Universo condicional para um Universo integralmente redimido — transforma a experiência viva da fé.</p>',
        published: true,
    },
    {
        title: 'A Lei Como Força Generadora do Desejo',
        description: 'Uma exploração profunda sobre como a proibição, paradoxalmente, cria o próprio desejo que pretende eliminar.',
        author: 'Miguel, o Príncipe',
        slug: 'lei-forca-desejo',
        cover_image: '/images/capitulo-1-bg.png',
        read_time: 12,
        date: '2026-03-15T00:00:00Z',
        content: '<p className="dropcap">A trajetória histórica da religiosidade ocidental revela uma contradição glaring: quanto mais a Lei proíbe, mais ela acende a chama do desejo. Paulo testemunha dessa realidade em Romanos quando afirma que "a Lei produziu em mim toda espécie de concupiscência" (Rm 7:8). Essa não é uma falha do sistema moral, mas sua estrutura intrínseca.</p><h3 className="text-2xl font-serif font-bold text-slate-900 dark:text-white mt-12 mb-6 italic">O Paradoxo da Proibição</h3><p>A psicologia acompanha a teologia neste ponto. Para Lacan, a Lei não represento nosso desejo; ao contrário, ela o inaugurou. O "Não" é a marca fundadora. Quando a Lei diz "Não farás", ela cria, simultaneamente, o campo onde o fazer torna-se objeto de fascínio. O proibido nunca é tão desejável quanto quando é proibido.</p><p>Considere a religião popular: os crentes cuja vida é estruturada em torno do "Não peques" vivem em estado permanente de vigilância sobre o pecado. Paradoxalmente, sua consciência fica permanentemente fixada naquilo que deveriam evitar. A tentação não decresce; intensifica-se justamente porque está cercada de sentido moral.</p><h3 className="text-2xl font-serif font-bold text-slate-900 dark:text-white mt-12 mb-6 italic">O Evangelho Como Disrupção</h3><p>O Evangelho Eterno oferece não uma Lei melhor, mas a suspensão da Lei. Quando Cristo morre, o "escrito de dívida" é rasgado. O crente é libertado não pela obediência mais rigorosa, mas pela eliminação do próprio sistema de vigilância e penalidade. Sem a Lei, o desejo perde seu combustível. Sem o "Não", o pecado torna-se banal.</p><p>Essa é a novidade cristã que frequentemente passa despercebida: liberdade não é licença; é indiferença santa.</p>',
        published: true,
    },
    {
        title: 'beyond Performance: O Fim do Adão Performativo',
        description: 'Explorando como a performance religiosa criou o sujeito neurotizado moderno e como a Graça oferece libertação.',
        author: 'Miguel, o Príncipe',
        slug: 'alem-performance-ady-performativo',
        cover_image: '/images/capitulo-3-bg.png',
        read_time: 18,
        date: '2026-03-05T00:00:00Z',
        content: '<p className="dropcap">A história do Adão Performativo é a história da modernidade ocidental. Desde que Adão comeu da árvore, a humanidade viveu obsecada por uma pergunta que jamais foi feita pelo Criador: "O que devo fazer para que Deus me ame?". Essa interrogação fundamental criou a estrutura neurotizante que define o sujeito moderno — o indivíduo que constantemente trabalha para se tornar digno.</p><h3 className="text-2xl font-serif font-bold text-slate-900 dark:text-white mt-12 mb-6 italic">As Folhas de Figueira: A Primeira Tecnologia Religiosa</h3><p>Adão e Eva costuraram folhas de figueira para cobrir sua nudez. Ez é o protótipo de todas as estratégias religiosas subsequentes. A moralidade, a virtude, a conduta correta — tudo são "folhas de figueira" tecidas para esconder a vergonha ontológica. O sistema religioso inteiro é uma engenharia de coberturas costuradas pela ansiedade.</p><p>O problema não são as folhas em si, mas o fato de que costurá-las perpetua a ilusão de que a nudez é um defeito. Enquanto a religião continuar oferecendo novas folhas — melhoradas, mais virtuosas, mais espirituais — a alma nunca descansará.</p><h3 className="text-2xl font-serif font-bold text-slate-900 dark:text-white mt-12 mb-6 italic">A Morte do Sujeito Neurotizado</h3><p>O Evangelho Eterno não oferece folhas mais bonitas. Oferece o fim da costura. Propõe a morte do Adão que quer cobrir-se, a morte do sujeito que trabalha incessantemente para ser algo. Não uma "melhoria" do Adão Performativo, mas sua implosão ontológica.</p><p>Aquele que internaliza essa morte descobre uma novidade perturbadora: já não precisa fazer. Já não precisa provar-se. Já não existe a necessidade de cobrir-se porque a nudez nunca foi o problema. O problema era — e sempre foi — a ilusão de que cobrir-se renderia paz.</p><p>O Evangelho oferece paz não através de mais empenho, mas através do cessar da obra.</p>',
        published: true,
    },
];

async function migrate() {
    try {
        // First, try to clear existing posts with same slugs
        console.log('🗑️  Clearing existing posts...');
        const slugs = posts.map(p => p.slug);
        const { error: deleteError } = await supabase
            .from('posts')
            .delete()
            .in('slug', slugs);

        // Ignore errors - table might be empty or posts don't exist

        // Insert posts
        console.log('➕ Inserting posts...');
        const { error: insertError, data: insertedData } = await supabase
            .from('posts')
            .insert(posts)
            .select();

        if (insertError) {
            throw new Error(`Insert failed: ${insertError.message} (Code: ${insertError.code})`);
        }

        console.log('✅ Migration completed successfully!');
        console.log(`📊 Inserted ${insertedData?.length || posts.length} posts`);
        
        // Verify
        const { data: allPosts, error: countError } = await supabase
            .from('posts')
            .select('id,title,slug');

        if (countError) {
            console.error('⚠️  Could not verify post count:', countError.message);
        } else {
            console.log(`✨ Total posts in database: ${allPosts?.length || 0}`);
            allPosts?.forEach(p => {
                console.log(`   - ${p.title} (${p.slug})`);
            });
        }

    } catch (error) {
        console.error('❌ Migration failed:', error.message);
        process.exit(1);
    }
}

migrate();
