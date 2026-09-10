import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { fileURLToPath } from 'node:url';
export default defineConfig({base:'/funnelstudio-homepage/',plugins:[react()],resolve:{alias:{'react-router-dom':fileURLToPath(new URL('./src/router.jsx',import.meta.url))}},build:{outDir:'docs',emptyOutDir:true}});
