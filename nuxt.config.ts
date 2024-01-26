// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  css: [
    "@/assets/css/reset.css",
    "@/assets/css/main.css",
    "@/assets/font/stylesheet.css", 
  ],
  modules: [
    [ '@pinia/nuxt', 
    {
      autoImports: [
        'defineStore',
        // 'acceptHMRUpdate'
      ],
    },
  ],  
],
  imports: {
    dirs: ['./stores']
  }
})
