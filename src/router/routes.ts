import BooksView from '@/views/BooksView.vue'
import RootView from '@/views/RootView.vue'
import SignInView from '@/views/SignInView.vue'
import SignUpView from '@/views/SignUpView.vue'

export const routes = [
  { path: '/', name: 'root', component: RootView },
  { path: '/books', name: 'books', component: BooksView, meta: { requiresAuth: true } },
  { path: '/signup', name: 'signup', component: SignUpView },
  { path: '/signin', name: 'signin', component: SignInView, props: true },
]
