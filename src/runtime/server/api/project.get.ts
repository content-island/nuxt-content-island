import { defineEventHandler } from 'h3';
import { getContentIslandClient } from '../plugins/client';

export default defineEventHandler(async () => {
  const client = getContentIslandClient();
  const project = await client.getProject();

  return project;
});
