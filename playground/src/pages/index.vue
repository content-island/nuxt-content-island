<template>
  <section class="container">
    <div class="posts__header">
      <h1>CurioVerso Blog</h1>
      <p>All Posts</p>
    </div>
    <ul class="posts__list">
      <li v-for="post in posts" :key="post.id">
        <article class="post">
          <NuxtLink :to="`/posts/${post.slug}`">
            <img
              :src="post.image.url"
              :alt="post.image.name"
              class="post__image"
              width="250"
              height="100"
              loading="eager"
            />
          </NuxtLink>
          <div class="post__text">
            <div class="post__header">
              <p class="post__date">
                <time :datetime="post.date">{{
                  new Date(post.date).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  })
                }}</time>
              </p>
              <NuxtLink :to="`/posts/${post.slug}`" class="post__title">
                <h2>{{ post.title }}</h2>
              </NuxtLink>
            </div>
            <div>
              <p class="post__description">{{ post.summary }}</p>
            </div>
          </div>
        </article>
      </li>
    </ul>
  </section>
</template>

<script setup lang="ts">
import type { Post } from '~/api.models';

const nuxtApp = useNuxtApp();

const { data: posts } = await useAsyncData(
  'posts-index',
  () => nuxtApp.$contentIsland.getContentList<Post>({ contentType: 'post' }),
  {
    // Optional optimization
    getCachedData(key) {
      return nuxtApp.payload.data[key] || nuxtApp.static.data[key];
    },
  }
);
</script>

<style scoped>
.posts__header {
  text-align: center;
  margin-bottom: var(--space-lg);
  & > :deep(h1) {
    font-size: var(--fs-3xl);
    font-family: var(--ff-title);
  }
}
.posts__list {
  list-style: none;
  padding: 0;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  justify-items: center;
  gap: var(--space-lg);
}
.post {
  display: flex;
  flex-direction: column;
  gap: var(--space-xs);
}
.post__image {
  width: 100%;
  height: auto;
  object-fit: cover;
  object-position: top;
  aspect-ratio: 16/9;
  border-radius: var(--border-radius);
}
.post__text {
  display: flex;
  flex-direction: column;
  gap: var(--space-2xs);
}

.post__header {
  display: flex;
  flex-direction: column;
  gap: 2px;
}
.post__date {
  font-size: var(--fs-2xs);
  opacity: 0.7;
}

.post__title {
  text-decoration: none;
  color: var(--text-color);
  transition: color 0.3s ease-in-out;
  &:hover {
    color: var(--title-hover-color);
  }

  & > :deep(h2) {
    font-size: var(--fs-lg);
    font-family: var(--ff-title);
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
    overflow: hidden;
    line-height: 1.175;
  }
}

.post__description {
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 4;
  overflow: hidden;
}
</style>
