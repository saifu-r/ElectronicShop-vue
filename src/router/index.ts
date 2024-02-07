import { createRouter, createWebHistory } from 'vue-router'
import GadgetShop from '../pages/GadgetShop.vue'
import ItemOffers from '../pages/ItemOffers.vue'
import UserAccount from '../pages/UserAccount.vue'
import UserProfile from '../pages/UserProfile.vue'
import AdminPanel from '../pages/AdminPanel.vue'
import SingleProduct from '../pages/SingleProduct.vue'
import UserCart from '../pages/UserCart.vue'
import CategoryProducts from '../pages/CategoryProducts.vue'
import ProductList from '../components/sections/admin/ProductList.vue'
import CheckOrder from '../components/sections/admin/CheckOrder.vue'
import OrderShipment from '../components/sections/admin/OrderShipment.vue'
import { useStore } from "vuex";


const router = createRouter({
  history: createWebHistory(),
  routes: [
    {path: '/', redirect: '/gadget-shop'},
    {path: '/gadget-shop', component: GadgetShop},
    {path: '/gadget-shop/:prodName', props: true, component: SingleProduct},
    {path: '/gadget-shop/c/:category', props: true, component: CategoryProducts},
    {path: '/offers', component: ItemOffers},
    {path: '/account', component: UserAccount},
    {path: '/cart', component: UserCart},
    {path: '/profile', component: UserProfile, meta: {requiresAuth: true}},
    {path: '/admin', component: AdminPanel, 
    children: [
      {path: 'products', component: ProductList},
      {path: 'order', component: CheckOrder},
      {path: 'shipment', component: OrderShipment},
    ]},

  ]
})

router.beforeEach((to, _, next)=>{
  const store = useStore();
  if(to.meta.requiresAuth && !store.getters.isAuthenticated){
    next('/gadget-shop')
  }else{
    next()
  }
})

export default router
