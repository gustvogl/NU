import { createClient } from '@supabase/supabase-js';
import { readConfig } from './config.js';
export const config = readConfig({ VITE_SUPABASE_URL:import.meta.env.VITE_SUPABASE_URL, VITE_SUPABASE_PUBLISHABLE_KEY:import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY });
export async function timedFetch(input, init = {}) {
 const controller = new AbortController();
 const abort = () => controller.abort();
 const timer = setTimeout(abort, 15000);
 if(init.signal?.aborted) abort(); else init.signal?.addEventListener('abort',abort,{once:true});
 try { return await fetch(input,{...init,signal:controller.signal}); }
 finally {clearTimeout(timer);init.signal?.removeEventListener('abort',abort);}
}
export const supabase = config.ready ? createClient(config.url,config.key,{auth:{persistSession:false,autoRefreshToken:true,detectSessionInUrl:false},global:{fetch:timedFetch}}) : null;
