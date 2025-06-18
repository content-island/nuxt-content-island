export default defineNuxtConfig({
  srcDir: 'src/',
  css: ['~/global.css'],
  devtools: { enabled: true },
  modules: ['../src/module', '@nuxtjs/google-fonts'],
  contentIsland: {
    accessToken: process.env.CONTENT_ISLAND_ACCESS_TOKEN,
  },
});
