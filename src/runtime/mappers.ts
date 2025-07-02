import type { QueryParams } from '@content-island/api-client';

export const mapQueryParamsToString = (queryParams: QueryParams | null | undefined): string =>
  Boolean(queryParams) && Object.keys(queryParams!).length > 0 ? encodeURIComponent(JSON.stringify(queryParams)) : '';

export const mapStringToQueryParams = (queryString: string | undefined | null): QueryParams => {
  try {
    return Boolean(queryString) ? JSON.parse(decodeURIComponent(queryString!)) : {};
  } catch (error) {
    console.error(`Failed to parse query string: ${queryString}`, error);
    return {};
  }
};
