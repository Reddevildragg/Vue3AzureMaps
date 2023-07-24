import { createApp } from 'vue'
import App from './App.vue'

import router from '@/router/index.ts'
import 'bootstrap/dist/js/bootstrap.js'
import '@/design/main.scss'

import { VueAzureMaps } from 'Vue3AzureMapsPlugin'

const app = createApp(App)
app.use(router)
app.use(VueAzureMaps, {
  key: '_fjWee10_s4FruW4IeF9_Ch7tIB-aw19MB2dYOkCXCQ',
})

app.mount('#app')
