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
    // Module options only available in the server side config to keep the accessToken private
    // nuxt.options.runtimeConfig -> private runtime config
    // nuxt.options.runtimeConfig.public -> public runtime config
    nuxt.options.runtimeConfig.contentIsland = options;
    addPlugin(resolve('./runtime/plugin'));
  },
});
