import { createRouter, createWebHistory, Router } from 'vue-router'
/*
import AzureMapExample from '@/components/AzureMapExample.vue'
*/
import PointTesting from '@/components/PointTesting.vue'
import UserLocationTesting from '@/components/UserLocationTesting.vue'
import SpriteTesting from '@/components/SpriteTesting.vue'
import BubbleMapTesting from '@/components/bubbleMapTesting.vue'
import PopupTesting from '@/components/PopupTesting.vue'
import LineTesting from '@/components/LineTesting.vue'
import PolygonTesting from '@/components/PolygonTesting.vue'
import SpiderClusterTesting from '@/components/SpiderClusterTesting.vue'
import HTMLMarkerTesting from '@/components/HTMLMarkerTesting.vue'
import GeoJSONTesting from '@/components/GeoJSONTesting.vue'
import ClusterAverageTesting from '@/components/ClusterAverageTesting.vue'

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
  {
    path: '/LineTesting',
    name: 'LineTesting',
    component: LineTesting,
  },
  {
    path: '/PolygonTesting',
    name: 'PolygonTesting',
    component: PolygonTesting,
  },
  {
    path: '/SpiderClusterTesting',
    name: 'SpiderClusterTesting',
    component: SpiderClusterTesting,
  },
  {
    path: '/HTMLMarkerTesting',
    name: 'HTMLMarkerTesting',
    component: HTMLMarkerTesting,
  },
  {
    path: '/GeoJsonTest',
    name: 'GeoJsonTest',
    component: GeoJSONTesting,
  },
  {
    path: '/dataCluster',
    name: 'dataClusterTest',
    component: ClusterAverageTesting,
  },
]

const router: Router = createRouter({
  //if we are on sharepoint then we need to modify the Base_Url slightly to work
  history: createWebHistory(),
  routes: routes,
})

export default router
