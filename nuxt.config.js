const path = require('path')
const webpack = require('webpack')

const srcDir = path.resolve(__dirname, 'client/')
const DEVELOPMENT_PAGES = ['pages/UIKIT/index.vue', '**/*.dev*']

const config = {
  srcDir,
  telemetry: false,
  // Environment Variable
  env: {
    API_URL: process.env.API_URL
  },

  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'nuxt-base',

    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' }
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }]
  },

  ignore: [],

  css: ['~/assets/styles/main.scss'],

  // https://nuxtjs.org/docs/features/loading/
  loading: {
    color: 'blue',
    height: '5px',
    continuous: true,
    rtl: true
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  // css: ['~/assets/styles/main.scss'],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    '~/plugins/global',
    '~/plugins/utils',
    '~/plugins/api',
    '~/plugins/auth',
    '~/plugins/axios',
    '~/plugins/validate',
    {
      src: '~/plugins/datepicker',
      mode: 'client'
    },
    {
      src: '~/plugins/snackbar',
      mode: 'client'
    },
    {
      src: '~/plugins/loading',
      mode: 'client'
    }
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: false,

  // middleware https://nuxtjs.org/docs/configuration-glossary/configuration-servermiddleware
  serverMiddleware: ['~~/server/middleware/userAgent'],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    // https://go.nuxtjs.dev/pwa
    '@nuxtjs/pwa',
    // https://i18n.nuxtjs.org/
    '@nuxtjs/i18n',
    // https://github.com/nuxt-community/gtm-module
    '@nuxtjs/gtm',
    // https://www.npmjs.com/package/cookie-universal-nuxt
    'cookie-universal-nuxt'
  ],

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://github.com/nuxt-community/router-module
    '@nuxtjs/router',
    // https://github.com/nuxt-community/style-resources-module
    '@nuxtjs/style-resources',
    // https://github.com/nuxt-community/google-analytics-module
    '@nuxtjs/google-analytics'
  ],

  //router moduel config for routing
  routerModule: {
    path: path.resolve(srcDir, 'router'),
    fileName: 'router.js'
  },

  styleResources: {
    hoistUseStatements: true,
    scss: [
      '~/assets/styles/resources/variables/*.scss',
      '~/assets/styles/resources/mixins/*.scss',
      '~/assets/styles/resources/extend/*.scss',
      '~/assets/styles/resources/generic/*.scss',
      '~/assets/styles/resources/layout/*.scss',
      '~/assets/styles/resources/elements/*.scss'
    ]
  },

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {
    baseURL: process.env.API_URL
  },

  i18n: {
    lazy: true,
    langDir: 'locales/',
    defaultLocale: 'fa',
    vueI18n: {
      fallbackLocale: 'fa'
    },
    detectBrowserLanguage: {
      useCookie: true,
      cookieKey: 'appname.lang',
      alwaysRedirect: false,
      fallbackLocale: 'fa'
    },
    locales: [
      {
        name: 'فارسی',
        code: 'fa',
        iso: 'fa-IR',
        file: 'fa.js',
        rtl: true
      }
    ]
  },

  // PWA module configuration: https://go.nuxtjs.dev/pwa
  pwa: {
    manifest: {
      lang: 'en'
    }
  },

  publicRuntimeConfig: {
    gtm: {
      id: process.env.GOOGLE_TAG_MANAGER_ID
    },
    googleAnalytics: {
      id: process.env.GOOGLE_ANALYTICS_ID
    }
  },

  alias: {
    '@data': path.join(__dirname, 'client/assets/data'),
    '@directives': path.join(__dirname, 'client/assets/directives'),
    '@helpers': path.join(__dirname, 'client/assets/helpers'),
    '@mixins': path.join(__dirname, 'client/assets/mixins'),
    '@pages': path.join(__dirname, 'client/pages'),
    '@kits': path.join(__dirname, 'client/components/kits'),
    '@shared': path.join(__dirname, 'client/components/shared'),
    '@includes': path.join(__dirname, 'client/components/includes'),
    '@api': path.join(__dirname, 'client/api'),
    '@locales': path.join(__dirname, 'client/locales')
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    // enable external css
    extractCSS: true,

    // auto-prefixer
    postcss: [
      require('autoprefixer')({
        overrideBrowserslist: ['> 1%', 'last 2 versions', 'IE 10']
      })
    ],
    // transpile from common-js
    transpile: ['vee-validate'],

    // exclude datepicker locales
    plugins: [new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/)]
  }
}

if (process.env.NODE_ENV == 'production') {
  config.ignore.push(...DEVELOPMENT_PAGES)
}

module.exports = config
