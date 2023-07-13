import { createPinia } from 'pinia'

import PiniaRouter from "@creative-design-web/pinia-router"
import router from "@/router";

const pinia = createPinia()

pinia.use(PiniaRouter(router))

export default pinia
