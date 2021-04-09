import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
// import fastclick from 'fastclick'
import VueLazyload from 'vue-lazyload'

import './registerServiceWorker'

import '@/common/stylus/index.styl'

// fastclick.attach(document.body)

Vue.config.productionTip = false

Vue.use(VueLazyload, {
  loading: require('@/common/image/default.png'),
  error: 'https://pcache.cmam.migu.cn/prod/cmam_music/storage_1/albummaterial/11004/000002/0127/7283/1100000000255111663/cffb35b03da540a78df6fc5dd50fd0d8_1372844695.jpg'
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
