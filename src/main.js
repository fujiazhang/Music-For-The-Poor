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
  error: ''
})
app.directive('loading', loadingDirective)

app.mount('#app')


