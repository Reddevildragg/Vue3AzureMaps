import { createApp } from 'vue'
import App from './App.vue'

import router from '@/router/index.ts'
import 'bootstrap/dist/js/bootstrap.js'
import '@/design/main.scss'

import { Vue3AzureMaps } from './Vue3AzureMaps'

const app = createApp(App)
app.use(router)
app.use(Vue3AzureMaps, {
  key: '_fjWee10_s4FruW4IeF9_Ch7tIB-aw19MB2dYOkCXCQ',
})

app.mount('#app')
