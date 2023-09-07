import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)

// 公共路由
export const constantRoutes = [
  {
    path: '/',
    component: () => import('@/views/Home.vue')
  },
  {
    path: '/drag',
    name: 'drag',
    component: () => import('@/views/v-drag.vue')
  },
  {
    path: '/copy',
    name: 'copy',
    component: () => import('@/views/v-copy.vue')
  },
  {
    path: '/debounce',
    name: 'debounce',
    component: () => import('@/views/v-debounce.vue')
  },
  {
    path: '/longpress',
    name: 'longpress',
    component: () => import('@/views/v-longpress.vue')
  },
  {
    path: '/emoji',
    name: 'emoji',
    component: () => import('@/views/v-emoji.vue')
  },
  {
    path: '/lazyLoad',
    name: 'lazyLoad',
    component: () => import('@/views/v-lazyLoad.vue')
  },
  {
    path: '/waterMarker',
    name: 'waterMarker',
    component: () => import('@/views/v-waterMarker.vue')
  },
  {
    path: '/premission',
    name: 'premission',
    component: () => import('@/views/v-premission.vue')
  },
  {
    path: '/loading',
    name: 'loading',
    component: () => import('@/views/v-loading.vue')
  },
  {
    path: '/focus',
    name: 'focus',
    component: () => import('@/views/v-focus.vue')
  },
  {
    path: '/errorImage',
    name: 'errorImage',
    component: () => import('@/views/v-errorImage.vue')
  },
  {
    path: '/tooltip',
    name: 'tooltip',
    component: () => import('@/views/v-tooltip.vue')
  },
  {
    path: '/mosaic',
    name: 'mosaic',
    component: () => import('@/views/v-mosaic.vue')
  },
]

const createRouter = () => new Router({
  // 设置前缀
  scrollBehavior: () => ({ y: 0 }),
  // 静态路由和动态路由的临时合并
  routes: [...constantRoutes]
})

// 实例化一个路由,这里的作用相当与new Router
const router = createRouter()

export default router