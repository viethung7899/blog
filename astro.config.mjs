import mdx from '@astrojs/mdx';
import react from '@astrojs/react';
import svelte from '@astrojs/svelte';
import tailwind from '@astrojs/tailwind';
import { defineConfig } from 'astro/config';
import rehypeKatex from 'rehype-katex';
import remarkMath from 'remark-math';

// https://astro.build/config
export default defineConfig({
  integrations: [
    mdx(),
    tailwind({
      applyBaseStyles: false,
    }),
    react(),
    svelte(),
  ],
  markdown: {
    remarkPlugins: [remarkMath],
    rehypePlugins: [rehypeKatex],
  },
});
