import { RouteRecordRaw } from 'vue-router'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [{ path: '', component: () => import('pages/index.vue') }],
  },
  {
    path: '/data-feeder',
    component: () => import('layouts/MainLayout.vue'),
    children: [{ path: '', component: () => import('pages/data-feeder.vue') }],
  },
  {
    path: '/data-viewer',
    component: () => import('layouts/MainLayout.vue'),
    children: [{ path: '', component: () => import('pages/data-viewer.vue') }],
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue'),
  },
]

export default routes
