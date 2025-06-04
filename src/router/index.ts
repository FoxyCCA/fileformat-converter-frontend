import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import ConvertView from '@/views/ConvertView.vue'
import TablesView from '@/views/TablesView.vue'

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            name: 'home',
            component: HomeView
        },
        {
            path: '/convert',
            name: 'convert',
            component: ConvertView
        },
        {
            path: '/tables',
            name: 'tables',
            component: TablesView
        }
    ]
})

export default router
