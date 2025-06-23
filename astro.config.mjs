// @ts-check
import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
export default defineConfig({
  site: 'https://distribuidorkenda.com', // Configure with actual domain
  integrations: [
    react(),
    sitemap({
      changefreq: 'weekly',
      priority: 0.7,
      lastmod: new Date(),
      // Exclude admin or internal pages if any
      filter: (page) => !page.includes('/admin')
    })
  ],
  vite: {
    plugins: [tailwindcss()],
  },
});