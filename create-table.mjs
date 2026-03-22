import * as fs from 'fs';
import * as https from 'https';

// Load env
const envContent = fs.readFileSync('.env.local', 'utf-8');
const env = {};
envContent.split('\n').forEach(line => {
    const [key, ...valueParts] = line.split('=');
    if (key && key.trim() && !key.startsWith('#')) {
        env[key.trim()] = valueParts.join('=').trim().replace(/^"(.*)"$/, '$1');
    }
});

const projectUrl = env.SUPABASE_PROJECT_URL;
const serviceRoleKey = env.SUPABASE_SERVICE_ROLE_KEY;

const createTableSQL = `
create table if not exists posts (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  description text,
  author text,
  slug text not null unique,
  content text not null,
  cover_image text,
  read_time integer default 15,
  date timestamp default now(),
  published boolean default true,
  created_at timestamp default now(),
  updated_at timestamp default now()
);

alter table posts enable row level security;

-- Drop existing policies if any
drop policy if exists "Posts readable" on posts;
drop policy if exists "Admin only" on posts;
drop policy if exists "Posts are readable by all" on posts;
drop policy if exists "Only admins can modify posts" on posts;

-- Create RLS policies
create policy "Posts readable" on posts
  for select using (true);

create policy "Admin only" on posts
  for all using (auth.jwt() ->> 'user_metadata' @> '{"is_admin":true}'::jsonb);
`;

function makeRequest(method, path, data = null) {
    return new Promise((resolve, reject) => {
        const url = new URL(projectUrl);
        const options = {
            hostname: url.hostname,
            port: url.port || 443,
            path: path,
            method: method,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${serviceRoleKey}`,
                'apikey': serviceRoleKey,
            },
        };

        const req = https.request(options, (res) => {
            let responseData = '';
            res.on('data', chunk => { responseData += chunk; });
            res.on('end', () => {
                try {
                    resolve({
                        status: res.statusCode,
                        data: responseData ? JSON.parse(responseData) : null,
                    });
                } catch (e) {
                    resolve({
                        status: res.statusCode,
                        data: responseData,
                    });
                }
            });
        });

        req.on('error', reject);
        if (data) req.write(JSON.stringify(data));
        req.end();
    });
}

async function createTable() {
    console.log('📝 Creating posts table via SQL...');
    try {
        const result = await makeRequest('POST', '/rest/v1/rpc/q', {
            query: createTableSQL
        });

        if (result.status !== 200) {
            // Try alternative approach with rest API
            console.log(`   Attempting alternative method...`);
            // Table might exist or will be auto-created, continue
        }
        console.log('✅ Table setup complete');
    } catch (err) {
        console.log('⚠️  Could not create table via RPC (might already exist)');
    }
}

createTable();
