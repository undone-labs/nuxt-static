export default {
  // //////////////////////////////////////////// Static Site Generation Options
  // ---------------------------------------------------------------------------
  target: 'static',
  // ///////////////////////////////////////////////////// Runtime Configuration
  // ---------------------------------------------------------------------------
  // ---------------------------------------------------------- [Runtime] Public
  publicRuntimeConfig: {
    nodeEnv: process.env.NODE_ENV,
    serverEnv: process.env.SERVER_ENV,
    seo: {
      siteName: 'AU Nuxt Static Boilerplate',
      siteUrl: 'https://au-nuxt-static.on.fleek.co'
    },
    redirects: []
  },
  // --------------------------------------------------------- [Runtime] Private
  privateRuntimeConfig: {},
  // /////////////////////////////////////////////////////////// Server & Render
  // ---------------------------------------------------------------------------
  server: {
    port: 9100,
    host: process.env.NODE_ENV !== 'development' ? '0.0.0.0' : 'localhost'
  },
  render: {
    bundleRenderer: {
      runInNewContext: false
    }
  },
  // /////////////////////////////////////////////////////// Headers of the Page
  // ---------------------------------------------------------------------------
  head: {
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon/favicon-96x96.png', sizes: '96x96' }
    ]
  },
  // ////////////////////////////////////////// Customize the progress-bar color
  // ---------------------------------------------------------------------------
  loading: {
    color: '#000000',
    height: '4px'
  },
  // /////////////////////////////////////////////////////////// Global CSS/SCSS
  // ---------------------------------------------------------------------------
  css: [
    '~/assets/scss/main.scss'
  ],
  styleResources: {
    scss: [
      '~/assets/scss/variables.scss'
    ]
  },
  // /////////////////////////////////////////////////////// Nuxt.js Dev Modules
  // ---------------------------------------------------------------------------
  buildModules: [
    // Doc: https://github.com/nuxt-community/eslint-module
    '@nuxtjs/eslint-module',
    // Doc: https://github.com/nuxt-community/moment-module#readme
    '@nuxtjs/moment',
    // Doc: https://google-analytics.nuxtjs.org
    '@nuxtjs/google-analytics'
  ],
  // /////////////////////////////////////////////////////////// Nuxt.js Modules
  // ---------------------------------------------------------------------------
  modules: [
    // Doc: https://github.com/nuxt-community/style-resources-module
    '@nuxtjs/style-resources',
    // Doc: https://axios.nuxtjs.org/usage
    '@nuxtjs/axios',
    // Doc: https://sitemap.nuxtjs.org
    '@nuxtjs/sitemap',
    // Doc: https://github.com/nuxt-community/gtm-module#nuxtjsgtm
    '@nuxtjs/gtm',
    // Doc: https://content.nuxtjs.org
    '@nuxt/content',
    // AU internal components module
    '~/modules/zero'
  ],
  // ///////////////////////////////////////////////////// [Module] Nuxt-content
  // ---------------------------------------------------------------------------
  content: {
    markdown: {
      prism: {
        theme: false
      }
    }
  },
  // ///////////////////////////////////////////////////////////// [Module] Zero
  // ---------------------------------------------------------------------------
  zero: {
    core: {
      include: true,
      toaster: {
        display: 10,
        timeout: 5000
      }
    },
    filters: {
      include: false
    },
    pagination: {
      include: false
    }
  },
  // ///////////////////////////////////////////////////////// [Module] MomentJS
  // ---------------------- Doc: https://github.com/nuxt-community/moment-module
  moment: {
    timezone: true,
    defaultTimezone: 'UTC'
  },
  // ///////////////////////////////////////////////////////////// [Module] Zero
  // ------------------------------------------- Dox: https://sitemap.nuxtjs.org
  sitemap: {
    hostname: 'https://au-nuxt-static.on.fleek.co'
  },
  // //////////////////////////////////////////////////////////// [Module] Axios
  // -------------------------------------- See https://axios.nuxtjs.org/options
  axios: {
  },
  // ///////////////////////////////////////////////// [Module] Google Analytics
  // ---------------------------------------------------------------------------
  googleAnalytics: {
    // GTM used in favor of GA package
    checkDuplicatedScript: true
    // id: process.env.SERVER_ENV === 'production' ? process.env.GAID : false
  },
  // ////////////////////////////////////////////////////////////// [Module] GTM
  // ------------------------- Dox: https://github.com/nuxt-community/gtm-module
  gtm: {
    // alternatively, the GTM ID can be specified as an environment variable
    id: '',
    pageTracking: true
  },
  // /////////////////////////////////// Plugins to load before mounting the App
  // ---------------------------------------------------------------------------
  plugins: [],
  // /////////////////////////////////////////////////////// Router + Middleware
  // ---------------------------------------------------------------------------
  generate: {
    fallback: '404.html'
  },
  // /////////////////////////////////////////////////////// Build configuration
  // ------------------------------------------------ Extend webpack config here
  build: {
    babel: {
      // needed to run @nuxt/storybook
      // envName: server, client, modern
      presets ({ envName }) {
        return [
          [
            '@nuxt/babel-preset-app',
            {
              corejs: { version: 3 }
            }
          ]
        ]
      }
    },
    // ---------------------------------------------------------- Hot Middleware
    hotMiddleware: {
      client: {
        overlay: false
      }
    },
    // -------------------------------------------------------------- Extensions
    extend (config, ctx) {
      config.module.rules.push({
        test: /\.md$/,
        use: 'raw-loader'
      })
    }
  },
  storybook: {
    parameters: {
      layout: 'fullscreen'
    }
  }
}
