<template>
  <div v-if="about" class="container about">
    <div class="about__header">
      <img class="about__image" :src="about.picture.url" :alt="about.fullname" width="100" height="200" />
      <div class="about__intro">
        <h1>I'm, <br />{{ about.fullname }}</h1>
        <p>{{ about.shortBio }}</p>
      </div>
    </div>
    <div class="about__bio" v-html="about.extendedBio"></div>
  </div>
</template>

<script setup lang="ts">
import { marked } from 'marked';
import type { About } from '~/api.models';

const { $contentIsland } = useNuxtApp();

const { data: about } = await useAsyncData(async () => {
  const about = await $contentIsland.getContent<About>({
    contentType: 'about',
    'fields.fullname': 'John Doe',
  });
  return {
    ...about,
    extendedBio: marked(about.extendedBio || ''),
  };
});
</script>

<style scoped>
.about {
  display: flex;
  flex-direction: column;
  gap: var(--space-lg);
}

.about__header {
  display: flex;
  flex-direction: column;
  gap: var(--space-md);
}

@media screen and (min-width: 768px) {
  .about__header {
    flex-direction: row;
    align-items: flex-end;
  }
}

.about__intro {
  display: flex;
  flex-direction: column;
  gap: var(--space-xs);

  & > :deep(h1) {
    font-size: var(--fs-4xl);
    font-family: var(--ff-title);
    width: 10ch;
    line-height: 1.1;
  }
  & > :deep(p) {
    max-width: 30ch;
    font-size: var(--fs-md);
  }
}
@media screen and (min-width: 768px) {
  .about__intro {
    padding-bottom: var(--space-md);
  }
}

.about__image {
  width: 100%;
  height: auto;
  object-fit: cover;
  aspect-ratio: 16/9;
  border-radius: var(--border-radius);
}
@media screen and (min-width: 768px) {
  .about__image {
    width: 50%;
    aspect-ratio: 10/16;
  }
}
@media screen and (min-width: 1024px) {
  .about__image {
    width: 30%;
  }
}
.about__bio {
  max-width: 800px;
  margin-right: auto;
  margin-left: auto;
  display: flex;
  flex-direction: column;
  gap: var(--space-lg);

  & :deep(img) {
    width: 100%;
    object-fit: cover;
    aspect-ratio: 21/9;
    border-radius: var(--border-radius);
  }
}
</style>
