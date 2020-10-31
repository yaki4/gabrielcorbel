import path from 'path'
import webpack from 'webpack'
export default {
  mode: 'universal',
  /*
  ** Headers of the page
  */
  head: {
    title: "Gabriel Corbel | Faiseur d' interactivité | Interactive developper",
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: "Gabriel Corbel | Faiseur d' interactivité | Interactive developper" },
      { name: 'theme-color', content: '#1A1A1A' },
      { name: 'msapplication-TileColor', content: '#1A1A1A' },
      { name: 'mobile-web-app-capable', content: 'yes' },
      {
        hid: `og:title`,
        property: 'og:title',
        content: "Gabriel Corbel | Faiseur d' interactivité | Interactive developper"
      },
      {
        hid: 'og:type',
        property: 'og:type',
        content: 'website'
      },
      {
        hid: 'og:description',
        property: 'og:description',
        content: 'Bonjour, Hi 👋 je suis toujours en cours de fabrication.'
      },
      {
        hid: 'og:site_name',
        property: 'og:site_name',
        content: "Gabriel Corbel | Faiseur d' interactivité | Interactive developper"
      },
      {
        hid: 'og:url',
        property: 'og:url',
        content: 'https://gabrielcorbel.com'
      },
      {
        hid: 'og:image:width',
        property: 'og:image:width',
        content: '1200'
      },
      {
        hid: 'og:image:height',
        property: 'og:image:height',
        content: '630'
      },
      {
        hid: 'og:image',
        property: 'og:image',
        content: ''
      },
      {
        hid: 'twitter:card',
        property: 'twitter:card',
        content: 'summary_large_image'
      },
      {
        hid: 'twitter:title',
        property: 'twitter:title',
        content: "Gabriel Corbel | Faiseur d' interactivité | Interactive developper"
      },
      {
        hid: 'twitter:description',
        property: 'twitter:description',
        content: "Gabriel Corbel | Faiseur d' interactivité | Interactive developper"
      },
      {
        hid: 'twitter:site',
        property: 'twitter:site',
        content: ''
      },
      {
        hid: 'twitter:image',
        property: 'twitter:image',
        content: ''
      },
      {
        hid: 'twitter:url',
        property: 'twitter:url',
        content: ''
      }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon/favicon.ico' }
    ]
  },
  /*
  ** Customize the progress-bar color
  */
  loading: { color: '#fff' },
  /*
  ** Global CSS
  */
  css: [
    {
      src: '~/assets/styles/main.styl',
      lang: 'stylus'
    }
  ],
  /*
  ** Plugins to load before mounting the App
  */
  plugins: [
  ],
  /*
  ** Nuxt.js dev-modules
  */
  buildModules: [
    // Doc: https://github.com/nuxt-community/eslint-module
    '@nuxtjs/eslint-module'
  ],
  /*
  ** Nuxt.js modules
  */
  modules: [
  ],
  /*
  ** Build configuration
  */
  build: {
    transpile: ['GLTFLoader.js', 'OrbitControls.js', 'TransformControls.js'],
    /*
     ** You can extend webpack config here
     */
    extend (config, ctx) {

      config.plugins.push(new webpack.ProvidePlugin({
        THREE: 'three'
      }))

      config.module.rules.push({
        test: /\.(glsl|vs|fs)$/,
        loader: 'raw-loader'
      }, {  
        test: /\.fnt$/,
        use: [
          'file-loader',
          'extract-loader',
          {
            loader: 'html-loader',
            options: {
              // by adding this it will extract each "page” file from the xml as well
              // attrs: ['page:file']
            }
          }
        ]
      },{
        enforce: 'pre',
        test: /\.(js|vue)$/,
        loader: 'eslint-loader',
        exclude: /(node_modules)/
      })
      const stylusRules = config.module.rules.find(
        rule => rule.test.toString().includes('styl')
      )
      if (stylusRules && Array.isArray(stylusRules.oneOf)) {
        stylusRules.oneOf.forEach((one) => {
          if (Array.isArray(one.use)) {
            one.use.forEach((u) => {
              if (u.loader === 'stylus-loader') {
                const stylusOptions = u.options
                stylusOptions.paths = [path.resolve('./assets/styles')]

                stylusOptions.import = [
                  '~rupture/rupture/index.styl',
                  'base/index.styl'
                ]
              }
            })
          }
        })
      }
    }
  }
}
