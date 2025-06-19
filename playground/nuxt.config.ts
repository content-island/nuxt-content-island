export default defineNuxtConfig({
  compatibilityDate: '2025-06-18',
  srcDir: 'src/',
  css: ['~/global.css'],
  devtools: { enabled: true },
  modules: ['../src/module', '@nuxtjs/google-fonts'],
  // contentIsland: {
  //   accessToken: 'your value here', // or set it in the .env file as CONTENT_ISLAND_ACCESS_TOKEN
  // },
  googleFonts: {
    families: {
      'IBM Plex Sans Condensed': {
        normal: [100, 200, 300, 400, 500, 600, 700],
        italic: [100, 200, 300, 400, 500, 600, 700],
      },
      'IBM Plex Sans': {
        normal: [100, 200, 300, 400, 500, 600, 700],
        italic: [100, 200, 300, 400, 500, 600, 700],
      },
    },
  },
  nitro: {
    prerender: {
      crawlLinks: true,
    },
  },
});
