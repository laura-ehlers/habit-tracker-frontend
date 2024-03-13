import { createRouter, createWebHistory } from 'vue-router'

import HabitsPage from '@/components/HabitsPage.vue'
import AnalyticsPage from '@/components/AnalyticsPage.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/habits',
      name: 'Habits',
      component: HabitsPage
    },
    {
      path: '/analytics',
      name: 'Analytics',
      component: AnalyticsPage
    }
  ]
})

export default router
