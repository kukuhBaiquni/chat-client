import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import './index.scss'
import store from './store'

import TimeAgo from 'javascript-time-ago'
import en from 'javascript-time-ago/locale/en.json'

TimeAgo.addDefaultLocale(en)

const app = createApp(App)

app.use(router)
app.use(store)

app.mount('#app')
