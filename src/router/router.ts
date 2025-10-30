import { routes } from '@/router/routes'
import { createRouter, createWebHistory } from 'vue-router'
import { userStore } from '@/stores/user'

const router = createRouter({
  history: createWebHistory(),
  routes,
})

router.beforeEach(async (to) => {
  if (!userStore().isAuthorized && to.meta.requiresAuth) {
    return { name: 'webauthn' }
  }
})

export { router }
