<template>
  <div v-if="post" class="container background" :style="{ '--postImage': `url(${post?.image.url})` }">
    <article class="article">
      <header class="article__header">
        <p>
          <time :datetime="post.date">{{
            new Date(post.date).toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            })
          }}</time>
        </p>
        <h1 class="article__title">{{ post.title }}</h1>
      </header>
      <div class="article__content" v-html="post.content"></div>
      <footer>
        <p>
          Written by <strong>{{ post.author }}</strong>
        </p>
      </footer>
    </article>
  </div>
</template>

<script setup lang="ts">
import hljs from 'highlight.js';
import 'highlight.js/styles/github-dark.css';
import { marked } from 'marked';
import type { Post } from '~/api.models';

const { $contentIsland } = useNuxtApp();
const route = useRoute();
const slug = route.params.slug as string;
const renderer = new marked.Renderer();
renderer.code = ({ text, lang }) => {
  const validLang = hljs.getLanguage(lang || 'plaintext') ? lang || 'plaintext' : 'plaintext';
  const highlighted = hljs.highlight(text, { language: validLang }).value;
  return `<pre><code class="hljs ${validLang}">${highlighted}</code></pre>`;
};
marked.setOptions({ renderer });

const { data: post } = await useAsyncData<Post>(`post-${slug}`, async () => {
  const foundPost = await $contentIsland.getContent<Post>({
    contentType: 'post',
    'fields.slug': slug,
  });

  if (!foundPost) {
    throw createError({
      statusCode: 404,
      message: `Post with slug "${slug}" not found`,
    });
  }

  return {
    ...foundPost,
    content: await marked(foundPost.content || ''),
  };
});
</script>

<style scoped>
.background::before {
  content: '';
  position: absolute;
  z-index: -1;
  top: 0;
  left: 0;
  width: 100%;
  height: 360px;
  background-image: var(--postImage);
  background-size: cover;
  background-repeat: no-repeat;
  background-position: top center;
}

.article {
  max-width: 800px;
  margin-right: auto;
  margin-left: auto;
  margin-top: var(--space-2xl);
  padding: var(--space-lg);
  background-color: var(--pure-white);
  display: flex;
  flex-direction: column;
  gap: var(--space-lg);
}

.article__header {
  text-align: center;
}
.article__title {
  font-size: var(--fs-3xl);
  font-family: var(--ff-title);
}

.article__content {
  display: flex;
  flex-direction: column;
  gap: var(--space-sm);

  & :deep(h2) {
    margin-top: var(--space-sm);
  }
  & :deep(ul) {
    padding-left: var(--space-md);
  }
  & :deep(img) {
    width: 100%;
    object-fit: cover;
    aspect-ratio: 21/9;
    border-radius: var(--border-radius);
  }

  & :deep(code) {
    font-size: var(--fs-xs);
    border-radius: var(--border-radius);
    padding: var(--space-xs);
  }
}
</style>
