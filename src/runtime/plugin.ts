import { defineNuxtPlugin } from '#app';
import type { ApiClient, QueryParams } from '@content-island/api-client';
import { SERVER_API_ROUTES } from './constants';
import { mapQueryParamsToString } from './mappers';
import type { $FetchOptions } from './models';

const fetchContentIsland = async (path: string, queryParams?: QueryParams): Promise<any> => {
  const options: $FetchOptions = queryParams
    ? { query: { queryParams: mapQueryParamsToString(queryParams) } }
    : undefined;
  return await $fetch(path, options);
};

export default defineNuxtPlugin(() => {
  const proxyClient: ApiClient = {
    getContent: async queryParams => await fetchContentIsland(SERVER_API_ROUTES.CONTENT, queryParams),
    getRawContent: async queryParams => await fetchContentIsland(SERVER_API_ROUTES.RAW_CONTENT, queryParams),
    getContentList: async queryParams => await fetchContentIsland(SERVER_API_ROUTES.CONTENT_LIST, queryParams),
    getRawContentList: async queryParams => await fetchContentIsland(SERVER_API_ROUTES.RAW_CONTENT_LIST, queryParams),
    getProject: async () => await fetchContentIsland(SERVER_API_ROUTES.PROJECT),
  };

  return {
    provide: {
      contentIsland: proxyClient,
    },
  };
});
