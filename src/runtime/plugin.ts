import { defineNuxtPlugin } from '#app';
import { SERVER_API_ROUTES } from './constants';
import { mapQueryParamsToString } from './mappers';
import type { $FetchOptions, ApiClient } from './models';

const fetchContentIsland = async <QueryParams>(path: string, queryParams?: QueryParams): Promise<any> => {
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
    getContentListSize: async queryParams => await fetchContentIsland(SERVER_API_ROUTES.CONTENT_LIST_SIZE, queryParams),
    getProject: async () => await fetchContentIsland(SERVER_API_ROUTES.PROJECT),
  };

  return {
    provide: {
      contentIsland: proxyClient,
    },
  };
});
