import { createWebHashHistory,createRouter } from 'vue-router'

import Page1 from "../components/page1.vue";
import Layout from "../components/layout.vue";
const routes = [
  {
    path: '/',
    component: Layout,
    children: [
      {
        path: '/page1',
        component: Page1
      }
    ]
  },

]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
