# Nuxt Content Island Module

The Nuxt Content Island Module provides a seamless integration between your Nuxt application and the [Content Island API](https://contentisland.net/). This module simplifies fetching and managing content stored in Content Island, allowing you to focus on crafting rich and dynamic user experiences without the hassle of complex backend integrations.

## Description

This module is designed for Nuxt applications that require robust content management powered by Content Island. It abstracts the complexity of backend API integration, providing a simple and secure way to access, query, and display content. With automatic plugin injection and type-safe configuration, developers can quickly build dynamic sites and applications, leveraging Content Island’s flexible content models and API.

## Features

- **Easy Integration**: Quickly connect to the Content Island API with simple configuration.
- **Secure Configuration**: Manage your API credentials safely using Nuxt's runtime configuration.
- **Automatic Plugin Injection**: The module automatically injects a client instance as `$contentIsland` into your Nuxt context.
- **Type-Safe Options**: Built with TypeScript support, leveraging the Options type from `@content-island/api-client`.
- **Flexible Content Retrieval**: Fetch single items or lists easily using intuitive query parameters.
- **Customizable Data Processing**: Integrate with popular libraries for Markdown rendering, syntax highlighting, and rich text formatting.

## Installation

Install the module via npm:

```sh
npx nuxi@latest module add @content-island/nuxt

# or using

npm install @content-island/nuxt
```

Next, add the module to your Nuxt configuration:

```ts
export default defineNuxtConfig({
  modules: ['@content-island/nuxt'],
  contentIsland: {
    // Replace with your actual Content Island API token
    accessToken: process.env.CONTENT_ISLAND_ACCESS_TOKEN || 'YOUR_CONTENT_ISLAND_ACCESS_TOKEN',
    // Optional: see all available options below
  },
});
```

## Usage

After installation and configuration, the module injects a client instance into your Nuxt app, allowing you to easily fetch content. Here is an example of how to use it within a page component:

```vue
<script setup lang="ts">
import { marked } from 'marked';
import { useRoute, useNuxtApp, useAsyncData } from '#imports';
import type { Post } from '~/api.models';

const { $contentIsland } = useNuxtApp();
const route = useRoute();
const slug = route.params.slug as string;

const { data: post } = await useAsyncData(`post-${slug}`, async () => {
  const foundPost = await $contentIsland.getContent<Post>({
    contentType: 'post',
    'fields.slug': slug,
  });
  return {
    ...foundPost,
    content: await marked(foundPost.content || ''),
  };
});
</script>

<template>
  <article v-if="post">
    <h1>{{ post.title }}</h1>
    <div v-html="post.content" />
  </article>
</template>
```

This example demonstrates fetching a post by its slug and processing its Markdown content with `marked`.

## Module Options

The module accepts the following options (from `@content-island/api-client`):

| Option         | Type    | Required | Default | Description                                    |
| -------------- | ------- | -------- | ------- | ---------------------------------------------- |
| accessToken    | string  | Yes      | –       | Your Content Island API token.                 |
| domain         | string  | No       | –       | Custom API domain (if different from default). |
| secureProtocol | boolean | No       | true    | Use HTTPS for API requests.                    |
| apiVersion     | string  | No       | v1      | API version to use.                            |

> **Note:** It is recommended to use environment variables for sensitive data like `accessToken`.

## Example Project

A fully functional example is provided in the `playground` directory. The example includes:

- Pages that fetch and render content dynamically.
- Integration with Markdown rendering and syntax highlighting.
- A sample Nuxt configuration demonstrating module setup and usage.

To run the example:

```sh
npm install && cd playground && npm install
cd ..
npm start
```

## Contributors

Special thanks to [Paul Melero](https://github.com/paulmelero) for the original idea and his collaboration on this module. His contribution has been instrumental in shaping this project.

## License

MIT License. See the [LICENSE](LICENSE) file for details.
