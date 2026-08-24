import '@/styles/style.css'
import * as z from 'zod'
import App from '@/App.vue'
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { router } from '@/router/router'

z.config({ jitless: true })
const app = createApp(App)
app.use(createPinia())
app.use(router)
app.mount('#app')
