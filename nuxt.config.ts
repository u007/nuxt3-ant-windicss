import Components from 'unplugin-vue-components/vite';
import { AntDesignVueResolver } from 'unplugin-vue-components/resolvers';

// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
  build: {
    transpile: ['lodash-es'],
  },
  modules: ['nuxt-windicss'],
  css: [
    // windi preflight
    'virtual:windi-base.css',
    // your stylesheets which overrides the preflight
    '@/css/main.css',
    // windi extras
    'virtual:windi-components.css',
    'virtual:windi-utilities.css',
  ],
  vite: {
    ssr: {
      noExternal: ['ant-design-vue', 'moment', 'compute-scroll-into-view'],
    },
    plugins: [
      Components({
        resolvers: [AntDesignVueResolver()],
      }),
    ],
  },
});
