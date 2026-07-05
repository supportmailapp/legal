// @ts-check
import { defineConfig } from "astro/config";

import tailwindcss from "@tailwindcss/vite";

import sitemap from "@astrojs/sitemap";

// https://astro.build/config
export default defineConfig({
  output: "static",
  site: "https://legal.supportmail.dev",
  trailingSlash: "ignore",

  vite: {
    plugins: [tailwindcss()],
  },

  markdown: {
    shikiConfig: {
      theme: "github-dark",
    },
  },

  integrations: [
    sitemap({
      changefreq: "weekly",
      priority: 0.5,
      
    }),
  ],
});
