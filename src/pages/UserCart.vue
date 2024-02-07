<template>
  <section>
    <h2>Your Cart</h2>
    <h3>Total Amount: <base-badge type="price" :title="price">${{ cartTotal }}</base-badge></h3>
    <ul>
      <cart-items v-for="item in cartItems" :key="item" :prodName="item.name" :price="item.price"
        :qty="item.qty"></cart-items>
    </ul>
  </section>
</template>
  
<script lang="ts">
import { computed, defineComponent } from "vue";
import { useStore } from "vuex";
import CartItems from '../components/sections/cart/CartItems.vue'
import Element from '@/types/Element'

export default defineComponent({
  components: { CartItems },
  setup() {
    const store = useStore()
    const cartTotal = computed(() => {
      return store.getters.totalSum
    })

    const cartItems = computed<Element[]>(() => {
      return store.getters.element
    })

    const price = computed(() => '$' + cartTotal.value)

    return { cartTotal, cartItems, price }
  },
});
</script>
  
<style scoped>
section {
  margin: 1rem auto;
  max-width: 100rem;
}

h2 {
  color: #292929;
  text-align: center;
  border-bottom: 2px solid #ccc;
  padding-bottom: 1rem;
}

h3 {
  text-align: center;
  margin-bottom: 2rem;
}

ul {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
  gap: 3rem;
  list-style: none;
  margin: 0;
  padding: 0;
}
</style>
  
  