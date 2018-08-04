// 配置参考 https://zh.nuxtjs.org/guide/configuration
module.exports = {
  /*
  ** Headers of the page
  */
  head: {
    title: "demo",
    meta: [
      { charset: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { hid: "description", name: "description", content: "Nuxt.js project" }
    ],
    link: [{ rel: "icon", type: "image/x-icon", href: "/favicon.ico" }]
  },
  modules: ["@nuxtjs/axios", "@nuxtjs/proxy"],
  vender:[
    'element-ui'
  ],
  babel:{
    "plugins": [["component", [
      {
        "libraryName": "element-ui",
        "styleLibraryName": "theme-default"
      },
      'transform-async-to-generator',
      'transform-runtime'
    ]]],
    comments: true
  },
  /*
  ** Customize the progress bar color
  */
  loading: { color: "#3B8070" },
  /*
  ** Build configuration
  */
  proxy: [["/user", { target: "http://api.wengtianmeng.com" }]],
  plugins: ["~/plugins/",{ src: '~plugins/element-ui', ssr: true }],
  build: {
    vendor: ["axios", "~/plugins/"],
    loaders: [
      {
        test: /\.sass$/,
        loaders: ["style", "css", "scss"]
      }
    ],
    /*
    ** Run ESLint on save
    */
    extend(config, { isDev, isClient }) {
      if (isDev && isClient) {
        config.module.rules.push({
          enforce: "pre",
          test: /\.(js|vue)$/,
          loader: "eslint-loader",
          exclude: /(node_modules)/
        });
      }
    }
  }
};
