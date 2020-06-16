import path from 'path'
import webpack from 'webpack'
export default {
  mode: 'universal',
  /*
  ** Headers of the page
  */
  head: {
    title: "Gabriel Corbel | Faiseur d' intéractivité | Interactive developper",
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: "Gabriel Corbel | Faiseur d' intéractivité | Interactive developper" },
      { name: 'theme-color', content: '#1A1A1A' },
      { name: 'msapplication-TileColor', content: '#1A1A1A' },
      { name: 'mobile-web-app-capable', content: 'yes' },
      {
        hid: `og:title`,
        property: 'og:title',
        content: "Gabriel Corbel | Faiseur d' intéractivité | Interactive developper"
      },
      {
        hid: 'og:type',
        property: 'og:type',
        content: 'website'
      },
      {
        hid: 'og:description',
        property: 'og:description',
        content: 'Bonjour, Hi 👋'
      },
      {
        hid: 'og:site_name',
        property: 'og:site_name',
        content: "Gabriel Corbel | Faiseur d' intéractivité | Interactive developper"
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
        content: "Gabriel Corbel | Faiseur d' intéractivité | Interactive developper"
      },
      {
        hid: 'twitter:description',
        property: 'twitter:description',
        content: "Gabriel Corbel | Faiseur d' intéractivité | Interactive developper"
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
    // { src: '~/plugins/components', mode: 'client' },
    {
      src: '~/plugins/three',
      mode: 'client'
    }
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
    // ['nuxt-font-loader-strategy', {
    //   ignoreLighthouse: true,
    //   ignoredEffectiveTypes: ['2g', 'slow-2g'],
    //   fonts: [
    //     {
    //       fileExtensions: ['eot', 'svg', 'ttf', 'woff'],
    //       fontFamily: 'ostrich-sans-inline',
    //       fontFaces: [
    //         {
    //           preload: true,
    //           localSrc: ['ostrich-sans-inline-italic', 'ostrich-sans-inline-italic'],
    //           src: 'assets/fonts/ostrich-sans/ostrich-sans-inline-italic',
    //           fontWeight: 400,
    //           fontStyle: 'italic'
    //         },
    //         {
    //           preload: true,
    //           localSrc: ['ostrich-sans-inline-regular', 'ostrich-sans-inline-regular'],
    //           src: 'assets/fonts/ostrich-sans/ostrich-sans-inline-regular',
    //           fontWeight: 400,
    //           fontStyle: 'normal'
    //         }
    //       ]
    //     },
    //     {
    //       fileExtensions: ['eot', 'svg', 'ttf', 'woff'],
    //       fontFamily: 'ostrich-sans',
    //       fontFaces: [
    //         {
    //           preload: true,
    //           localSrc: ['ostrich-sans', 'ostrich-sansregular'],
    //           src: 'assets/fonts/ostrich-sans/ostrich-sans-regular',
    //           fontWeight: 400,
    //           fontStyle: 'normal'
    //         },
    //         {
    //           preload: true,
    //           localSrc: ['ostrich-sans-black', 'ostrich-sans-black'],
    //           src: 'assets/fonts/ostrich-sans/ostrich-sans-black',
    //           fontWeight: 400,
    //           fontStyle: 'normal'
    //         },
    //         {
    //           preload: true,
    //           localSrc: ['ostrich-sans-bold', 'ostrich-sans-bold'],
    //           src: 'assets/fonts/ostrich-sans/ostrich-sans-bold',
    //           fontWeight: 400,
    //           fontStyle: 'normal'
    //         },
    //         {
    //           preload: true,
    //           localSrc: ['ostrich-sans-dashed', 'ostrich-sans-dashed'],
    //           src: 'assets/fonts/ostrich-sans/ostrich-sans-dashed',
    //           fontWeight: 400,
    //           fontStyle: 'normal'
    //         },
    //         {
    //           preload: true,
    //           localSrc: ['ostrich-sans-light', 'ostrich-sans-light'],
    //           src: 'assets/fonts/ostrich-sans/ostrich-sans-light',
    //           fontWeight: 400,
    //           fontStyle: 'normal'
    //         },
    //         {
    //           preload: true,
    //           localSrc: ['ostrich-sans-rounded', 'ostrich-sans-rounded'],
    //           src: './assets/fonts/ostrich-sans/ostrich-sans-rounded',
    //           fontWeight: 400,
    //           fontStyle: 'normal'
    //         }
    //       ]
    //     }
    //   ]
    // }]
  ],
  /*
  ** Build configuration
  */
  build: {
    /*
     ** You can extend webpack config here
     */
    // plugins: [
    //   new webpack.ProvidePlugin({
    //     THREE: 'three'
    //   })
    // ],
    extend (config, ctx) {
      config.resolve.alias.vue = 'vue/dist/vue.common'

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
