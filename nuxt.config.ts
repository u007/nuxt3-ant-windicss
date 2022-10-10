// import Components from 'unplugin-vue-components/vite';
// import { AntDesignVueResolver } from 'unplugin-vue-components/resolvers';
// import AutoImport from 'unplugin-auto-import/vite';
// import { createStyleImportPlugin, AntdResolve } from 'vite-plugin-style-import'
// const isDev = process.env.NODE_ENV === 'development';

import fs from 'fs'
import path from 'path'

// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
  buildModules: [],
  build: {
    transpile: ['@babel/runtime', 'lodash-es']
  },
  modules: [
    'nuxt-windicss',
    [
      '@pinia/nuxt',
      {
        autoImports: [
          'defineStore'// import { defineStore } from 'pinia'
          // ['defineStore', 'definePiniaStore'], // import { defineStore as definePiniaStore } from 'pinia'
        ]
      }
    ]
  ],
  css: [
    // windi preflight
    'virtual:windi-base.css',
    // your stylesheets which overrides the preflight
    '@/assets/main.css',
    // windi extras
    'virtual:windi-components.css',
    'virtual:windi-utilities.css'
  ],

  components: {
    dirs: [
      '~/components',
      { prefix: 'a', extensions: ['vue', 'ts', 'js'], path: '~/node_modules/ant-design-vue/es' },
      // icons is now prefixed with Icons / icons-
      'node_modules/@ant-design/icons-vue/es'
    ]
  },
  plugins: [
    // not needed anymore - temp work around since all attempt to make auto import failed
    // '@/plugins/antd',
  ],
  imports: {
    dirs: [
      // Scan composables from nested directories
      'composables/**',
      'models/**'
    ]
  },
  hooks: {
    'imports:extend': (imports) => {
      console.log('imports', imports)
      const eslintConfig: { globals: { [key: string]: string } } = {
        globals: {}
      }
      imports.forEach((preset) => {
        // console.log('preset', preset)
        eslintConfig.globals[preset.name] = 'readonly'
      })

      fs.writeFileSync(
        path.join(__dirname, '.nuxt', 'eslint-extend-globals.json'),
        JSON.stringify(eslintConfig, null, 2)
      )
    },
    // Output all auto-imports to a json file. Extend in eslint config with .nuxt/eslint-globals.json
    'autoImports:sources': (presets) => {
      const eslintConfig: { globals: { [key: string]: string } } = {
        globals: {}
      }

      presets.forEach((preset) => {
        // console.log('preset', preset)
        preset.imports.forEach((presetImport) => {
          eslintConfig.globals[presetImport.toString()] = 'readonly'
        })
      })

      fs.writeFileSync(
        path.join(__dirname, '.nuxt', 'eslint-globals.json'),
        JSON.stringify(eslintConfig, null, 2)
      )
    }
  },
  vite: {
    ssr: {
      noExternal: ['ant-design-vue/es', 'lodash-es', /vue-i18n/]
    },
    plugins: [
      // no longer need this as components.d.ts is generated in .nuxt/
      // Components({
      //   resolvers: [
      //     // has issue where AButton works, but some component like ACard does not on pnpm run build
      //     //  so falling back to nuxt plugins
      //     // AntDesignVueResolver({ cjs: false, importStyle: false }),
      //   ],
      //   dirs: [
      //     "node_modules/@ant-design/icons-vue/es",
      //   ],
      //   extensions: ['vue', 'js'],
      //   dts: 'components.d.ts',
      // }),
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
    ]
  },
  typescript: {
    strict: true // required to make input/output types work
  }
})
