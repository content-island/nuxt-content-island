export const mapQueryParamsToString = <QueryParams>(queryParams: QueryParams | null | undefined): string =>
  Boolean(queryParams) && Object.keys(queryParams!).length > 0 ? encodeURIComponent(JSON.stringify(queryParams)) : '';

export const mapStringToQueryParams = <QueryParams>(queryString: string | undefined | null): QueryParams => {
  try {
    return Boolean(queryString) ? JSON.parse(decodeURIComponent(queryString!)) : ({} as QueryParams);
  } catch (error) {
    console.error(`Failed to parse query string: ${queryString}`, error);
    return {} as QueryParams;
  }
};
