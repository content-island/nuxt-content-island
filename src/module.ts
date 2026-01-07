import { addPlugin, addServerHandler, createResolver, defineNuxtModule } from '@nuxt/kit';
import { SERVER_API_PATHS, SERVER_API_ROUTES } from './runtime/constants';
import type { ModuleOptions } from './runtime/models';

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
      route: SERVER_API_ROUTES.CONTENT,
      handler: resolve(SERVER_API_PATHS.CONTENT),
    });
    addServerHandler({
      route: SERVER_API_ROUTES.RAW_CONTENT,
      handler: resolve(SERVER_API_PATHS.RAW_CONTENT),
    });
    addServerHandler({
      route: SERVER_API_ROUTES.CONTENT_LIST,
      handler: resolve(SERVER_API_PATHS.CONTENT_LIST),
    });
    addServerHandler({
      route: SERVER_API_ROUTES.RAW_CONTENT_LIST,
      handler: resolve(SERVER_API_PATHS.RAW_CONTENT_LIST),
    });
    addServerHandler({
      route: SERVER_API_ROUTES.CONTENT_LIST_SIZE,
      handler: resolve(SERVER_API_PATHS.CONTENT_LIST_SIZE),
    });
    addServerHandler({
      route: SERVER_API_ROUTES.PROJECT,
      handler: resolve(SERVER_API_PATHS.PROJECT),
    });

    // Register plugin that adds the $contentIsland client to the Nuxt app
    // and calls the server endpoints
    addPlugin(resolve('./runtime/plugin'));
  },
});
