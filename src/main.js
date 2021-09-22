import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import lazyPlugin from 'vue3-lazy';
import loadingDirective from '@/components-base/loading/directive'
import Notifications from 'vue3-vt-notifications'

import '@/common/stylus/index.styl'

const app = createApp(App)

app.use(store)
app.use(router)
app.use(Notifications)
app.use(lazyPlugin, {
  loading: require('@/common/image/default.png'),
  error: 'https://pcache.cmam.migu.cn/prod/cmam_music/storage_1/albummaterial/11004/000002/0127/7283/1100000000255111663/cffb35b03da540a78df6fc5dd50fd0d8_1372844695.jpg'
})
app.directive('loading', loadingDirective)

app.mount('#app')


