// @ts-check
import { defineConfig } from 'astro/config';
import '@fortawesome/fontawesome-free/css/all.min.css';


import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
export default defineConfig({
  vite: {
    plugins: [tailwindcss()]
  }
});