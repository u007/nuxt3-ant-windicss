import Components from 'unplugin-vue-components/vite';
import { AntDesignVueResolver } from 'unplugin-vue-components/resolvers';
import AutoImport from 'unplugin-auto-import/vite'

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
      noExternal: [
        'ant-design-vue', 'moment', 'compute-scroll-into-view'],
    },
    plugins: [
      Components({
        resolvers: [AntDesignVueResolver()],
      }),

      AutoImport({
      eslintrc: {
        enabled: true,
      },
      imports: [
          // 'vue',
          // 'vue-router',
          // 'vue-i18n',
          // 'vue/macros',
          // {
          //   '~/store/acl': ['useAclStore', 'UserSession'],
          //   '~/store/alert': ['useAlertStore'],
          //   '~/store/nav': ['useNavStore'],
          // },
        ],
        dirs: [
          'shared',
          'models',
          'node_modules/@ant-design/icons'
        ],
        dts: 'auto-imports.d.ts',
        vueTemplate: true,
      }),
    ],
  },
});
