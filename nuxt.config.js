const path = require('path')

const srcDir = path.resolve(__dirname, 'client/')
module.exports = {
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
  plugins: [],

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
  axios: {},

  // PWA module configuration: https://go.nuxtjs.dev/pwa
  pwa: {
    manifest: {
      lang: 'en',
    },
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    // extend config
    extend(config, { loaders: { vue } }) {
      config.resolve.alias['@@'] = path.join(
        __dirname,
        'client/components/includes'
      )
      config.resolve.alias['@data'] = path.join(__dirname, 'client/assets/data')
      config.resolve.alias['@helpers'] = path.join(
        __dirname,
        'client/assets/helpers'
      )
      config.resolve.alias['@pages'] = path.join(__dirname, 'client/pages')
      config.resolve.alias['@mixins'] = path.join(
        __dirname,
        'client/assets/mixins'
      )
      config.resolve.alias['@kits'] = path.join(
        __dirname,
        'client/components/kit'
      )
    },
  },
}
