import { defineNuxtPlugin, useRuntimeConfig } from '#app';
import { createClient } from '@content-island/api-client';
import type { ModuleOptions } from '../models';

export default defineNuxtPlugin(() => {
  const config = useRuntimeConfig();
  const options = config.contentIsland as ModuleOptions;
  if (!options?.accessToken) {
    console.error(
      'Content Island token is not provided. Please set the' +
        ' CONTENT_ISLAND_ACCESS_TOKEN environment variable in a `.env` file' +
        ' in the root of your project OR add it in the' +
        ' nuxt.config file under the `contentIsland.accessToken` option.'
    );
  }
  const client = createClient(options);

  return {
    provide: {
      contentIsland: client,
    },
  };
});
