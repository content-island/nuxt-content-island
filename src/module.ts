import { addPlugin, createResolver, defineNuxtModule } from '@nuxt/kit';
import type { ModuleOptions } from './models';

export default defineNuxtModule<ModuleOptions>({
  meta: {
    name: '@content-island/nuxt',
    configKey: 'contentIsland',
  },
  defaults: {
    accessToken: process.env.CONTENT_ISLAND_ACCESS_TOKEN,
  },
  setup(options, nuxt) {
    const { resolve } = createResolver(import.meta.url);
    if (!options.accessToken) {
      throw new Error(
        'Content Island token is not provided. Please set the' +
          ' CONTENT_ISLAND_ACCESS_TOKEN environment variable in a `.env` file' +
          ' in the root of your project OR add it in the' +
          ' nuxt.config file under the `contentIsland.accessToken` option.'
      );
    }
    nuxt.options.runtimeConfig.public.contentIsland = options;
    addPlugin(resolve('./runtime/plugin'));
  },
});
