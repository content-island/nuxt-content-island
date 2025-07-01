import { defineNuxtPlugin } from '#app';
import type { ApiClient } from '@content-island/api-client';
import { SERVER_API_ROUTES } from '../constants';

export default defineNuxtPlugin(() => {
  const proxyClient: ApiClient = {
    getContent: async queryParams =>
      $fetch(SERVER_API_ROUTES.CONTENT, {
        query: {
          queryParams: encodeURIComponent(JSON.stringify(queryParams)),
        },
      }),
    getRawContent: async query =>
      $fetch(SERVER_API_ROUTES.RAW_CONTENT, {
        query,
      }),
    getContentList: async query =>
      $fetch(SERVER_API_ROUTES.CONTENT_LIST, {
        query,
      }),
    getRawContentList: async query =>
      $fetch(SERVER_API_ROUTES.RAW_CONTENT_LIST, {
        query,
      }),
    getProject: async () => $fetch(SERVER_API_ROUTES.PROJECT),
  };

  return {
    provide: {
      contentIsland: proxyClient,
    },
  };
});
