module.exports = {
  publicPath: '/music/',
  outputDir: 'music',
  assetsDir: './static',
  // ...other vue-cli plugin options...
  pwa: {
    name: 'Music',
    themeColor: '#4DBA87',
    msTileColor: '#ffffff',
    appleMobileWebAppCapable: 'yes',
    appleMobileWebAppStatusBarStyle: 'white',
    iconPaths: {
      appleTouchIcon: 'public/img/icons/apple-touch-icon-152x152.png',
      maskIcon: 'public/img/icons/safari-pinned-tab.svg',
      msTileImage: 'public/img/icons/msapplication-icon-144x144.png'
    },

    // configure the workbox plugin
    workboxPluginMode: 'InjectManifest',
    workboxOptions: {
      // swSrc is required in InjectManifest mode.
      swSrc: 'src/registerServiceWorker.js'
      // ...other Workbox options...
    }
  },
  devServer: {
    open: process.platform === 'darwin',
    // host: '192.168.199.163',
    port: 8082,
    https: false,
    hotOnly: false,
    // proxy: {}, // 设置代理
    before: app => {}
  }
}
