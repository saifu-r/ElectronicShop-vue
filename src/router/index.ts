import { createRouter, createWebHistory } from 'vue-router'
import HomePage from '../pages/HomePage.vue'
import ItemOffers from '../pages/ItemOffers.vue'
import UserAccount from '../pages/UserAccount.vue'
import AdminPanel from '../pages/AdminPanel.vue'


const router = createRouter({
  history: createWebHistory(),
  routes: [
    {path: '/', redirect: '/home'},
    {path: '/home', component: HomePage},
    {path: '/offers', component: ItemOffers},
    {path: '/account', component: UserAccount},
    {path: '/admin', component: AdminPanel},

  ]
})

export default router
