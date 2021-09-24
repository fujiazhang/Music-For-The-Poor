const path = require('path')

module.exports = {
  publicPath: '/music/',
  outputDir: 'music',
  assetsDir: './static',
  // ...other vue-cli plugin options...
  pwa: {
    name: 'FreeMusic',
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
    before: app => { }
  },
  // 配置使用stylus全局变量
  chainWebpack: config => {
    const types = ["vue-modules", "vue", "normal-modules", "normal"];
    types.forEach(type =>
      addStyleResource(config.module.rule("stylus").oneOf(type))
    );
  }
}


// 定义函数addStyleResource

function addStyleResource(rule) {
  rule.use("style-resource")
    .loader("style-resources-loader")
    .options({
      patterns: [
        path.resolve(__dirname, "./src/common/stylus/variable.styl"),
        path.resolve(__dirname, "./src/common/stylus/mixin.styl"),
      ]
      //后面的路径改成你自己放公共stylus变量的路径
    });
}
