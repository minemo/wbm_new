// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: ["@tresjs/nuxt","@nuxtjs/tailwindcss", "@nuxtjs/sitemap", "@nuxtjs/robots"],
  app: {
    head: {
      htmlAttrs: {
        lang: 'en'
      }
    },
    pageTransition: { name: 'page', mode: 'out-in' },
  },
  nitro: {
    minify: true,
    compressPublicAssets: true,
  },
  vue: {
    propsDestructure: true
  }
})
