import type { ApiClient as ContentIslandApiClient, Options } from '@content-island/api-client';

export type ModuleOptions = Options;

export type $FetchOptions = Parameters<typeof $fetch>[1];

export type ApiClient = Omit<ContentIslandApiClient, 'updateContentFieldValue'>;
