import type { QueryParams } from '@content-island/api-client';
import { defineEventHandler, getQuery, type H3Event } from 'h3';
import { getContentIslandClient } from '../plugins/client';

export default defineEventHandler(async (event: H3Event) => {
  const client = getContentIslandClient();
  const queryParams = getQuery(event);

  return await client.getRawContent(queryParams as QueryParams);
});
