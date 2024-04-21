import { defineConfig } from "astro/config";
import vue from "@astrojs/vue";
import cloudflare from "@astrojs/cloudflare";
import db from "@astrojs/db";

import tailwind from "@astrojs/tailwind";

// https://astro.build/config
export default defineConfig({
  integrations: [vue(), db(), tailwind()],
  output: "server",
  adapter: cloudflare(),
});
