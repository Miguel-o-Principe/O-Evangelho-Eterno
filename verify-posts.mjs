import { createClient } from '@supabase/supabase-js';
import * as fs from 'fs';

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

console.log('🔗 Verifying Supabase posts table...\n');
const supabase = createClient(projectUrl, serviceRoleKey);

try {
    // Fetch all posts
    const { data: allPosts, error } = await supabase
        .from('posts')
        .select('id,title,slug,published,date')
        .order('date', { ascending: false });

    if (error) {
        throw error;
    }

    if (!allPosts || allPosts.length === 0) {
        console.log('⚠️  No posts found in database');
        process.exit(1);
    }

    console.log(`✅ Found ${allPosts.length} post(s) in Supabase:\n`);
    allPosts.forEach((post, index) => {
        console.log(`${index + 1}. "${post.title}"`);
        console.log(`   Slug: ${post.slug}`);
        console.log(`   Status: ${post.published ? '📝 Published' : '📋 Draft'}`);
        console.log(`   Date: ${post.date}`);
        console.log('');
    });

    console.log('✨ Migration verified successfully!');
    process.exit(0);

} catch (err) {
    console.error('❌ Verification failed:', err.message);
    process.exit(1);
}
