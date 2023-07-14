import { createRouter, createWebHistory, Router } from 'vue-router'
/*
import AzureMapExample from '@/components/AzureMapExample.vue'
*/
import PointTesting from '@/components/PointTesting.vue'
import UserLocationTesting from '@/components/UserLocationTesting.vue'
import SpriteTesting from '@/components/SpriteTesting.vue'
import BubbleMapTesting from '@/components/bubbleMapTesting.vue'
import PopupTesting from '@/components/PopupTesting.vue'

///default built in routes
const routes = [
  {
    path: '/PointTest',
    name: 'PointTest',
    component: PointTesting,
  },
  {
    path: '/UserLocationTest',
    name: 'UserLocation',
    component: UserLocationTesting,
  },
  {
    path: '/SpriteTesting',
    name: 'SpriteTesting',
    component: SpriteTesting,
  },
  {
    path: '/BubbleMapTesting',
    name: 'BubbleMapTesting',
    component: BubbleMapTesting,
  },
  {
    path: '/PopupTesting',
    name: 'PopupTesting',
    component: PopupTesting,
  },
]

const router: Router = createRouter({
  //if we are on sharepoint then we need to modify the Base_Url slightly to work
  history: createWebHistory(),
  routes: routes,
})

export default router
