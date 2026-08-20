import RootView from '@/views/RootView.vue'
import InnerView from '@/views/InnerView.vue'
import SignInView from '@/views/SignInView.vue'
import SignUpView from '@/views/SignUpView.vue'
const BookShow = () => import('@/components/book/showing/BookShow.vue')
const BookEdit = () => import('@/components/book/editing/BookEdit.vue')
const BooksList = () => import('@/components/list/BooksList.vue')
const The404Error = () => import('@/components/404/The404Error.vue')
const TheStats = () => import('@/components/stats/TheStats.vue')
const ThePrivacy = () => import('@/components/ThePrivacy.vue')
const TheTerms = () => import('@/components/TheTerms.vue')

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
        component: BookShow,
        name: 'book',
      },
      {
        path: ':id/edit',
        component: BookEdit,
        name: 'edit',
      },
      {
        path: '/stats',
        component: TheStats,
        name: 'stats',
      },
      {
        path: 'add',
        component: BookEdit,
        name: 'add',
      },
    ],
  },
  { path: '/signup', name: 'signup', component: SignUpView, meta: { guestOnly: true } },
  { path: '/signin', name: 'signin', component: SignInView, meta: { guestOnly: true }, props: true },
  { path: '/privacy', name: 'privacy', component: ThePrivacy },
  { path: '/terms', name: 'terms', component: TheTerms },
  { path: '/:pathMatch(.*)*', name: '404', component: The404Error },
]
