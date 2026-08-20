import { routes } from '@/router/routes'
import { createRouter, createWebHistory } from 'vue-router'
import { useUserStore } from '@/stores/user'

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior: () => ({ top: 0 }),
})

router.beforeEach((to) => {
  if (to.meta.requiresAuth && !useUserStore().isAuthorized) {
    return { name: 'signin' }
  }
  if (to.meta.guestOnly && useUserStore().isAuthorized) {
    return { name: 'books' }
  }
})

export { router }
