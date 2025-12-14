import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_ANON_KEY
);

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { user_id, text, image_urls } = req.body;

  if (!user_id) {
    return res.status(401).json({ error: 'Not logged in' });
  }

  if (!text || text.length > 140) {
    return res.status(400).json({ error: 'Text must be 1〜140 chars' });
  }

  const { error } = await supabase
    .from('posts')
    .insert([
      {
        user_id,
        text,
        image_urls: image_urls || []
      }
    ]);

  if (error) {
    return res.status(500).json({ error: error.message });
  }

  return res.status(200).json({ success: true });
}
