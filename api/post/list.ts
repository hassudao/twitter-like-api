import { supabase } from '../_supabase';

export default async function handler(req, res) {
  // 🌍 CORS 許可
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  // preflight 対応
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  const { data, error } = await supabase
    .from('posts')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    return res.status(500).json(error);
  }

  res.status(200).json(data);
}
