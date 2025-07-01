import { defineEventHandler } from 'h3';
import { getContentIslandClient } from '../plugins/client';

export default defineEventHandler(async () => {
  const client = getContentIslandClient();

  return await client.getProject();
});
