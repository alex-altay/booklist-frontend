import RootView from '@/views/RootView.vue'
import InnerView from '@/views/InnerView.vue'
import SignInView from '@/views/SignInView.vue'
import SignUpView from '@/views/SignUpView.vue'
import BookShow from '@/components/book/showing/BookShow.vue'
import BookEdit from '@/components/book/editing/BookEdit.vue'
import BooksList from '@/components/list/BooksList.vue'
import The404Error from '@/components/The404Error.vue'
import ThePrivacy from '@/components/ThePrivacy.vue'
import TheStats from '@/components/stats/TheStats.vue'
import TheTerms from '@/components/TheTerms.vue'

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
  { path: '/signup', name: 'signup', component: SignUpView },
  { path: '/signin', name: 'signin', component: SignInView, props: true },
  { path: '/privacy', name: 'privacy', component: ThePrivacy },
  { path: '/terms', name: 'terms', component: TheTerms },
  { path: '/404', name: '404', component: The404Error },
]
