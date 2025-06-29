import { defineNuxtPlugin } from '#app';
import type { ApiClient } from '@content-island/api-client';

export default defineNuxtPlugin(() => {
  const createApiMethod = (endpoint: 'content' | 'contentlist', raw: boolean = false) => {
    return async (
      args: Parameters<ApiClient[typeof endpoint extends 'content' ? 'getContent' : 'getContentList']>[0]
    ) => {
      const query = raw ? { raw: 'true', ...args } : { raw: 'false', ...args };
      return await $fetch(`/api/__content_island/${endpoint}`, { query });
    };
  };

  const proxyClient = {
    getContent: createApiMethod('content' as const, false),
    getContentList: createApiMethod('contentlist' as const, false),
    getRawContent: createApiMethod('content' as const, true),
    getRawContentList: createApiMethod('contentlist' as const, true),
    getProject: async () => {
      return await $fetch('/api/__content_island/project');
    },
  };

  return {
    provide: {
      contentIsland: proxyClient,
    },
  };
});
