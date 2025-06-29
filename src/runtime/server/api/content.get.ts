import { defineEventHandler, getQuery, type H3Event } from 'h3';
import { getContentIslandClient } from '../plugins/client';

export default defineEventHandler(async (event: H3Event) => {
  const client = getContentIslandClient();
  const { raw = 'false', contentType, ...filters } = getQuery(event);

  const queryParams = {
    contentType: contentType as string,
    ...filters,
  };

  if (raw === 'true') {
    const content = await client.getRawContent(queryParams);

    return content;
  }
  const content = await client.getContent(queryParams);

  return content;
});
