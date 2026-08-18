import { routes } from '@/router/routes'
import { createRouter, createWebHistory } from 'vue-router'
import { useUserStore } from '@/stores/user'

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior: () => ({ top: 0 }),
})

router.beforeEach(async (to) => {
  if (!useUserStore().isAuthorized && to.meta.requiresAuth) {
    return { name: 'signin' }
  }
})

export { router }
