import { addPlugin, addServerHandler, createResolver, defineNuxtModule } from '@nuxt/kit';
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

    // Register server handlers
    addServerHandler({
      route: '/api/__content_island/content',
      handler: resolve('./runtime/server/api/content.get.ts'),
    });
    addServerHandler({
      route: '/api/__content_island/contentlist',
      handler: resolve('./runtime/server/api/contentlist.get.ts'),
    });
    addServerHandler({
      route: '/api/__content_island/project',
      handler: resolve('./runtime/server/api/project.get.ts'),
    });

    // Register plugin that adds the $contentIsland client to the Nuxt app
    // and calls the server endpoints
    addPlugin(resolve('./runtime/plugin'));
  },
});
