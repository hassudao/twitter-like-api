import { supabase } from '../_supabase';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { user_id, text, image_urls } = req.body;

  const { error } = await supabase
    .from('posts')
    .insert([
      {
        user_id,
        text,
        image_urls
      }
    ]);

  if (error) {
    return res.status(500).json(error);
  }

  return res.status(200).json({ ok: true });
}
