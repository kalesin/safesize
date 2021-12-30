import { createWebHistory, createRouter } from 'vue-router'
import ShoesDisplay from './components/ShoesDisplay.vue'
import ProductPage from './components/ProductPage.vue'

const router = createRouter({
    history: createWebHistory(),
    routes: [
        { path: '/home', component: ShoesDisplay, name: 'home' },
        { path: '/product/:id', component: ProductPage, name: 'product' },
        { path: '/:pathMatch(.*)*', component: ShoesDisplay, redirect: 'home' },
    ]
})

router.beforeEach((to, from, next) => {
    window.scrollTo(0, 0);
    next();
})

export default router;
