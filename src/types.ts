import type { ApiClient } from '@content-island/api-client';

// Nuxt plugin augmentation to add $contentIsland to the Nuxt app
declare module '#app' {
  interface NuxtApp {
    $contentIsland: ApiClient;
  }
}

declare module '@vue/runtime-core' {
  interface ComponentCustomProperties {
    $contentIsland: ApiClient;
  }
}

// Empty export is required to mark the file as a module
export {};
