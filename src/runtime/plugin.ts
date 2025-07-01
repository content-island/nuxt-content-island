import { defineNuxtPlugin } from '#app';
import type { ApiClient, Project, QueryParams } from '@content-island/api-client';

// Local Model type for generics (not exported)
type Model<Language = string> = {
  id: string;
  language?: Language;
};

export default defineNuxtPlugin(() => {
  const proxyClient: ApiClient = {
    getContent: async <M extends Model = Model & Record<string, any>>(query: QueryParams<M>) => {
      return $fetch<M>(`/api/__content_island/content`, {
        query: { ...query, raw: 'false' },
      }) satisfies ReturnType<ApiClient['getContent']>;
    },
    getContentList: async <M extends Model = Model & Record<string, any>>(query?: QueryParams<M>) => {
      return $fetch<M[]>(`/api/__content_island/contentlist`, {
        query: { ...query, raw: 'false' },
      }) satisfies ReturnType<ApiClient['getContentList']>;
    },
    getRawContent: async <M extends Model = Model & Record<string, any>>(query: QueryParams<M>) => {
      return $fetch(`/api/__content_island/content`, {
        query: { ...query, raw: 'true' },
      }) satisfies ReturnType<ApiClient['getRawContent']>;
    },
    getRawContentList: async <M extends Model = Model & Record<string, any>>(query?: QueryParams<M>) => {
      return $fetch(`/api/__content_island/contentlist`, {
        query: { ...query, raw: 'true' },
      }) satisfies ReturnType<ApiClient['getRawContentList']>;
    },
    getProject: async (): Promise<Project> => {
      return $fetch('/api/__content_island/project');
    },
  };

  return {
    provide: {
      contentIsland: proxyClient,
    },
  };
});
