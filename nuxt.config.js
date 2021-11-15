const path = require('path')

const srcDir = path.resolve(__dirname, 'client/')

const config = {
  srcDir,
  telemetry: false,
  // Environment Variable
  env: {
    API_URL: process.env.API_URL,
  },

  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'nuxt-base',

    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' },
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: ['~/plugins/utils', '~/plugins/axios'],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: false,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    // https://go.nuxtjs.dev/pwa
    '@nuxtjs/pwa',
    //https://i18n.nuxtjs.org/
  ],

  buildModules: [
    //https://github.com/nuxt-community/router-module
    '@nuxtjs/router',
  ],
  //router moduel config for routing
  routerModule: {
    path: path.resolve(srcDir, 'router'),
    fileName: 'router.js',
    keepDefaultRouter: true,
  },

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {
    baseURL: process.env.API_URL,
  },

  // PWA module configuration: https://go.nuxtjs.dev/pwa
  pwa: {
    manifest: {
      lang: 'en',
    },
  },

  alias: {
    '@data': path.join(__dirname, 'client/assets/data'),
    '@helpers': path.join(__dirname, 'client/assets/helpers'),
    '@mixins': path.join(__dirname, 'client/assets/mixins'),
    '@pages': path.join(__dirname, 'client/pages'),
    '@kits': path.join(__dirname, 'client/components/kits'),
    '@shared': path.join(__dirname, 'client/components/shared'),
    '@includes': path.join(__dirname, 'client/components/includes'),
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    // extend config
  },
}

module.exports = config
