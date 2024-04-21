/// <reference path="../.astro/db-types.d.ts" />
/// <reference path="../.astro/types.d.ts" />
/// <reference types="astro/client" />

interface ImportMetaEnv {
    readonly LLOGIC_API_KEY: string;
    readonly LLOGIC_URL: string;
    // más variables de entorno...
  }
  
  interface ImportMeta {
    readonly env: ImportMetaEnv;
  }