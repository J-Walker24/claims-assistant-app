import { createClient } from '@supabase/supabase-js';
import { serve } from 'https://deno.land/std@0.168.0/http/server.ts';

const SUPABASE_URL = Deno.env.get('SUPABASE_URL');
const SUPABASE_ANON_KEY = Deno.env.get('SUPABASE_ANON_KEY');
const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

serve(async (req) => {
  try {
    const { latitude, longitude } = await req.json();

    const { data, error } = await supabase.rpc('get_nearest_clinics', {
      user_lat: latitude,
      user_lon: longitude,
      limit: 3,
    });

    if (error) {
      throw new Error(error.message);
    }

    return new Response(JSON.stringify({ clinics: data }), {
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (err) {
    return new Response(JSON.stringify({ error: err.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
});



