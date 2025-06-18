import { defineNuxtPlugin, useRuntimeConfig } from '#app';
import { createClient } from '@content-island/api-client';
import type { ModuleOptions } from '../models';

export default defineNuxtPlugin(() => {
  const config = useRuntimeConfig();
  const options = config.public.contentIsland as ModuleOptions;
  const client = createClient(options);

  return {
    provide: {
      contentIsland: client,
    },
  };
});
