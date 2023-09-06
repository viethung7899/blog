import mdx from '@astrojs/mdx';
import react from '@astrojs/react';
import svelte from '@astrojs/svelte';
import tailwind from '@astrojs/tailwind';
import { defineConfig } from 'astro/config';
import rehypeKatex from 'rehype-katex';
import remarkMath from 'remark-math';
import { visit } from "unist-util-visit"


// https://astro.build/config
export default defineConfig({
  site: "https://blog.vhng.dev",
  integrations: [
    mdx(),
    tailwind({
      applyBaseStyles: false,
    }),
    react(),
    svelte(),
  ],
  markdown: {
    extendDefaultPlugins: true,
    syntaxHighlight: false,
    remarkPlugins: [remarkMath],
    rehypePlugins: [
      rehypeKatex,
      () => (tree) => {
        visit(tree, (node) => {
          if (node?.type === "element" && node?.tagName === "pre") {
            const [codeEl] = node.children
            if (codeEl.tagName !== "code") return
            node.properties["raw"] = codeEl.children?.[0].value
            node.properties["lang"] = codeEl.properties?.className?.[0]?.replace("language-", "")
            node.properties["meta"] = codeEl.properties?.metastring
          }
        })
      },
    ],
  },
  vite: {
    optimizeDeps: {
      exclude: ["@resvg/resvg-js"],
    },
  },
});
