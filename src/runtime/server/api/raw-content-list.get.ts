import type { ContentListQueryParams } from '@content-island/api-client';
import { defineEventHandler, getQuery, type H3Event } from 'h3';
import { mapStringToQueryParams } from '../../mappers';
import { getContentIslandClient } from '../plugins/client';

export default defineEventHandler(async (event: H3Event) => {
  const client = getContentIslandClient();
  const { queryParams } = getQuery(event);
  return await client.getRawContentList(mapStringToQueryParams<ContentListQueryParams>(queryParams as string));
});
