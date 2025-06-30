import { useRuntimeConfig } from '#imports';
import { createClient, type ApiClient, type Options } from '@content-island/api-client';

let client: ApiClient;
export const getContentIslandClient = () => {
  if (client) return client;

  const config = useRuntimeConfig();
  const options = config.contentIsland as Options;

  if (!options?.accessToken) {
    console.error(
      'Content Island token is not provided. Please set the' +
        ' CONTENT_ISLAND_ACCESS_TOKEN environment variable in a `.env` file' +
        ' in the root of your project OR add it in the' +
        ' nuxt.config file under the `contentIsland.accessToken` option.'
    );
  }

  client = createClient(options);
  return client;
};
