import Components from 'unplugin-vue-components/vite';
import { AntDesignVueResolver } from 'unplugin-vue-components/resolvers';
import AutoImport from 'unplugin-auto-import/vite';
// import { createStyleImportPlugin, AntdResolve } from 'vite-plugin-style-import'

// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
  modules: ['nuxt-windicss'],
  buildModules: [],
  build: {
    transpile: [
    ],
  },
  css: [
    // windi preflight
    'virtual:windi-base.css',
    // your stylesheets which overrides the preflight
    '@/assets/main.css',
    // windi extras
    'virtual:windi-components.css',
    'virtual:windi-utilities.css',
  ],
  vite: {
    ssr: {
      noExternal: [
        'ant-design-vue/es',
        /vue-i18n/,
      ],
    },
    plugins: [
      Components({
        resolvers: [
          AntDesignVueResolver({ cjs: false, importStyle: false }),
        ],
        dirs: [
          "node_modules/@ant-design/icons-vue/es",
        ],
        extensions: ['vue', 'js'],
        dts: 'components.d.ts',
      }),

      // createStyleImportPlugin({
      //   resolves: [AntdResolve()],
      //   libs: [
      //     // If you don’t have the resolve you need, you can write it directly in the lib, or you can provide us with PR
      //     {
      //       libraryName: 'ant-design-vue',
      //       esModule: true,
      //       resolveStyle: (name) => {
      //         console.log('ant css');
      //         if (['notification', 'tab-pane', 'list-item'].indexOf(name) >= 0) {
      //           return ''
      //         }
      //         const mappedName: any = {
      //           'input-search': { path: 'input', name: 'search-input' },
      //         }
      //         const pathName = mappedName[name]?.path || name
      //         const fileName = mappedName[name]?.name || 'index.less'
      //         const jsFileName = 'index.js'
      //         const path = `ant-design-vue/es/${pathName}/style/${fileName}`
      //         const jsPath = `ant-design-vue/es/${pathName}/style/${jsFileName}`
      //         let exists = fs.existsSync('node_modules/'+path) || fs.existsSync('node_modules/'+jsPath)
      //         // console.log('importcss', name, path, exists, jsPath)
      //         if (fs.existsSync('node_modules/'+path)) {
      //           //file exists
      //           return path
      //         }
      //         if (fs.existsSync('node_modules/'+jsPath)) {
      //           return jsPath
      //         }
      //         console.log('importcss missing', name, path, jsPath)
      //         return ''
      //       },
      //     },
      //   ],
      // }),

      AutoImport({
        eslintrc: {
          enabled: true,
        },
        imports: [
          'vue',
          'vue-router',
          'vue-i18n',
          'vue/macros',
          // {
          //   '~/store/acl': ['useAclStore', 'UserSession'],
          //   '~/store/alert': ['useAlertStore'],
          //   '~/store/nav': ['useNavStore'],
          // },
        ],
        dirs: [
          "models",
        ],
        dts: 'auto-imports.d.ts',
        vueTemplate: true,
      }),
    ],
  },
});
