/*
 *
 * 📦 [Module] Core
 *
 */

// ///////////////////////////////////////////////////////////////////// Imports
// -----------------------------------------------------------------------------
// ///////////////////////////////////////////////////////////////////// General
import Path from 'path'
import Fs from 'fs'

const camelize = (string) => {
  return string.replace(/-./g, word => word[1].toUpperCase())
}

// ///////////////////////////////////////////////////////////////////// Plugins
const plugins = [
  {
    src: Path.resolve(__dirname, 'plugins/index.js'),
    filename: 'zero/core/index.js'
  },
  {
    src: Path.resolve(__dirname, 'plugins/helpers.js'),
    filename: 'zero/core/helpers.js'
  },
  {
    src: Path.resolve(__dirname, 'plugins/seo.js'),
    filename: 'zero/core/seo.js'
  },
  {
    src: Path.resolve(__dirname, 'plugins/toaster.js'),
    filename: 'zero/core/toaster.js'
  },
  {
    src: Path.resolve(__dirname, 'plugins/uuid.js'),
    filename: 'zero/core/uuid.js'
  },
  {
    src: Path.resolve(__dirname, 'plugins/vue-ls.js'),
    filename: 'zero/core/vue-ls.js',
    mode: 'client'
  },
  {
    src: Path.resolve(__dirname, 'plugins/get-scroll-speed.js'),
    filename: 'zero/core/get-scroll-speed.js',
    mode: 'client'
  },
  {
    src: Path.resolve(__dirname, 'plugins/scroll-to.js'),
    filename: 'zero/core/scroll-to.js'
  },
  {
    src: Path.resolve(__dirname, 'plugins/click-outside.js'),
    filename: 'zero/core/click-outside.js'
  },
  {
    src: Path.resolve(__dirname, 'plugins/nuxt-hammer.js'),
    filename: 'zero/core/nuxt-hammer.js'
  },
  {
    src: Path.resolve(__dirname, 'plugins/global-components.js'),
    filename: 'zero/core/global-components.js'
  }
]

// ////////////////////////////////////////////////////////////////// Middleware
const middlewares = [
  'redirector'
]

// /////////////////////////////////////////////////////////////////// Functions
// -----------------------------------------------------------------------------
// /////////////////////////////////////////////////////////// compileComponents
const compileComponents = (instance) => {
  return new Promise((resolve, reject) => {
    const componentsDir = `${instance.options.rootDir}/components`
    plugins.forEach((plugin) => {
      // Need to pass component name list to global-components.js, which subsequently
      // loads all the module components as global ones for app-wide use
      if (plugin.filename === 'zero/core/global-components.js') {
        plugin.options = []
        const components = Fs.readdirSync(Path.resolve(__dirname, 'components')).filter(file => file !== '.DS_Store')
        components.forEach((component) => {
          const name = component.split('.')[0]
          let override
          try {
            override = Fs.readFileSync(`${componentsDir}/${component}`)
            override = `${componentsDir}/${component}`
          } catch (e) {
            override = false
          }
          const path = override || Path.resolve(__dirname, `components/${component}`)
          plugin.options.push({ name, path })
        })
      }
    })
    resolve()
  })
}

// //////////////////////////////////////////////////////////////// compileStore
const compileStore = (instance) => {
  return new Promise((resolve, reject) => {
    // const contentDir = instance.options.rootDir
    plugins.forEach((plugin) => {
      if (plugin.filename === 'zero/core/index.js') {
        plugin.options = {
          stores: []
        }
        const storePath = Path.resolve(__dirname, 'store')
        const stores = Fs.readdirSync(storePath).filter(store => store !== '.DS_Store')
        stores.forEach((store) => {
          const path = Path.resolve(storePath, store)
          plugin.options.stores.push({
            name: camelize(store.split('.')[0]),
            path
          })
        })
      }
    })
    resolve()
  })
}

// ////////////////////////////////////////////////////////// registerMiddleware
const registerMiddleware = (instance, next) => {
  return new Promise((resolve, reject) => {
    plugins.forEach((plugin) => {
      if (plugin.filename === 'zero/core/index.js') {
        plugin.options.middlewares = []
        middlewares.forEach((key) => {
          import(Path.resolve(__dirname, 'middleware', `${key}.js`))
            .then((middleware) => {
              instance.options.router.middleware.push(key)
              plugin.options.middlewares.push({ key, middleware })
            })
        })
      }
    })
    resolve()
  })
}

// ////////////////////////////////////////////////////////////// registerRoutes
const registerRoutes = (instance) => {
  return new Promise((resolve, reject) => {
    const rootDir = instance.options.rootDir
    // const modules = instance.options.modules
    const redirects = instance.options.publicRuntimeConfig.redirects
    const sitemap = instance.options.sitemap
    // Add redirects to generate routes -> for static sites
    if (redirects && redirects.length > 0) {
      instance.options.generate.routes = () => {
        return redirects.map(redirect => (redirect.from))
      }
      if (sitemap) {
        const exclude = redirects.map(redirect => (redirect.from))
        if (sitemap.exclude && Array.isArray(sitemap.exclude)) {
          sitemap.exclude = [...new Set(sitemap.exclude.concat(exclude))]
        } else {
          sitemap.exclude = exclude
        }
      }
    }
    const routesKey = instance.options.generate.routes
    let routes = typeof routesKey === 'function' ? routesKey() : []

    // Add blog post paths if .md files in @/content/blog
    if (Fs.existsSync(`${rootDir}/content/blog`)) {
      const paths = Fs.readdirSync(`${rootDir}/content/blog`)
        .filter(file => file.includes('.md'))
        .map(file => `/blog/${file.split('.md')[0]}`)
      if (paths.length > 0) {
        routes = routes.concat(paths)
      }
    }

    // Add page paths if .md files in @/content/page
    if (Fs.existsSync(`${rootDir}/content/page`)) {
      const pagesPaths = Fs.readdirSync(`${rootDir}/content/page`)
        .filter(file => file.includes('.json'))
        .map(file => `/${file.split('.json')[0]}`)
      if (pagesPaths.length > 0) {
        routes = routes.concat(pagesPaths)
      }
    }

    instance.options.generate.routes = () => {
      return routes
    }
    resolve()
  })
}

// ///////////////////////////////////////////////////////////// registerPlugins
const registerPlugins = (instance, next) => {
  plugins.forEach((plugin) => {
    instance.addPlugin(plugin)
  })
  if (next) { return next() }
}

// //////////////////////////////////////////////////////////////////// runHttps
const runHttps = (instance, next) => {
  if (process.env.NODE_ENV === 'development' && typeof instance.options.server === 'object') {
    // const rootPath = instance.options.alias['@']
    try {
      instance.options.server.https = {
        key: Fs.readFileSync(Path.resolve(instance.options.rootDir, 'localhost_key.pem')),
        cert: Fs.readFileSync(Path.resolve(instance.options.rootDir, 'localhost_cert.pem'))
      }
    } catch (e) {
      process.exit(0)
    }
  }
  if (next) { return next() }
}

// ///////////////////////////////////////////////////////////////////// Liftoff
// -----------------------------------------------------------------------------
export default async function (instance) {
  if (instance.options.zero.core.include) {
    await compileComponents(instance)
    await compileStore(instance)
    await registerMiddleware(instance)
    await registerRoutes(instance)
    registerPlugins(instance, () => {
      runHttps(instance, () => {
        // console.log('📦 [Module] Core')
      })
    })
  }
}
