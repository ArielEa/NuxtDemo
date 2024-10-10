// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-10-10',
  devtools: { enabled: false },
  css: [
    'ant-design-vue/dist/reset.css',  // Ant Design Vue 的重置样式
  ],
  plugins: [
    { src: '/Users/ariel/Public/CODES/Pages/NuxtjsDemo/nuxtdemo/plugins/ant-design-vue.js', ssr: false }
  ]
})
