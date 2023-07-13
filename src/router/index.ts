import { createRouter, createWebHistory, Router } from 'vue-router'
/*
import AzureMapExample from '@/components/AzureMapExample.vue'
*/
import NotFound from '@/view/NotFound.vue'

///default built in routes
const routes = [
  {
    path: '/:catchAll(.*)',
    name: '404_Not_Found',
    component: NotFound,
  },
]

const router: Router = createRouter({
  //if we are on sharepoint then we need to modify the Base_Url slightly to work
  history: createWebHistory(),
  routes: routes,
})

export default router
