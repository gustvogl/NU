import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import { readConfig } from './src/config.js';
export default defineConfig(({ mode }) => {
 const config = readConfig(loadEnv(mode, process.cwd(), 'VITE_'));
 if (config.unsafe) throw new Error('Use somente a chave pública publishable/anon do Supabase. Nunca use secret/service_role.');
 return { plugins: [react()], build: { target: 'es2022' } };
});