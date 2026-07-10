import RootView from '@/views/RootView.vue'
import InnerView from '@/views/InnerView.vue'
import SignInView from '@/views/SignInView.vue'
import SignUpView from '@/views/SignUpView.vue'
import BooksList from '@/components/books-list/BooksList.vue'
import SingleBook from '@/components/single-book/SingleBook.vue'
import TheStats from '@/components/TheStats.vue'

export const routes = [
  { path: '/', name: 'root', component: RootView },
  {
    path: '/books',
    component: InnerView,
    meta: { requiresAuth: true },
    children: [
      {
        path: '',
        component: BooksList,
        name: 'books',
      },
      {
        path: ':id',
        component: SingleBook,
        name: 'book',
      },
      {
        path: '/stats',
        component: TheStats,
        name: 'stats',
      },
    ],
  },
  { path: '/signup', name: 'signup', component: SignUpView },
  { path: '/signin', name: 'signin', component: SignInView, props: true },
]
