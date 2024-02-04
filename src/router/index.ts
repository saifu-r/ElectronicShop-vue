import { createRouter, createWebHistory } from 'vue-router'
import GadgetShop from '../pages/GadgetShop.vue'
import ItemOffers from '../pages/ItemOffers.vue'
import UserAccount from '../pages/UserAccount.vue'
import AdminPanel from '../pages/AdminPanel.vue'
import SingleProduct from '../pages/SingleProduct.vue'
import CategoryProducts from '../pages/CategoryProducts.vue'
import ProductList from '../components/sections/admin/ProductList.vue'
import CheckOrder from '../components/sections/admin/CheckOrder.vue'
import OrderShipment from '../components/sections/admin/OrderShipment.vue'


const router = createRouter({
  history: createWebHistory(),
  routes: [
    {path: '/', redirect: '/gadget-shop'},
    {path: '/gadget-shop', component: GadgetShop},
    {path: '/gadget-shop/:prodName', props: true, component: SingleProduct},
    {path: '/gadget-shop/c/:category', props: true, component: CategoryProducts},
    {path: '/offers', component: ItemOffers},
    {path: '/account', component: UserAccount},
    {path: '/admin', component: AdminPanel, 
    children: [
      {path: 'products', component: ProductList},
      {path: 'order', component: CheckOrder},
      {path: 'shipment', component: OrderShipment},
    ]},

  ]
})

export default router
