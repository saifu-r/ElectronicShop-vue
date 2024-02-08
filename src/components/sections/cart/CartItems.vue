<template>
  <li>
    <div>
      <img :src="image" :alt="prodName" />
    </div>
    <div>
      <h3>{{ prodName }}</h3>
      <div class="item__data">
        <div>
          Price per Item:
          <strong>${{ price }}</strong>
        </div>
        <div>
          Quantity:
          <strong>{{ qty }}</strong>
        </div>
      </div>
      <div class="item__total">Total: ${{ itemTotal }}</div>
      <button @click="removeItem">Remove</button>
    </div>
  </li>
</template>
  
<script lang="ts">
import { computed, defineComponent, onBeforeMount, ref } from "vue";
import { useStore } from "vuex";
import Product from '@/types/Product'

export default defineComponent({
  props: ["prodName", "price", "qty"],
  setup(props) {
    const store = useStore()
    const itemTotal = computed(() => {
      return (props.price * props.qty).toFixed(2)
    })

    const selectedProduct = ref<Product | null>(null);

    // Use onBeforeMount to fetch data before the component is mounted
    onBeforeMount(async () => {
      try {
        await store.dispatch('fetchProducts'); // Adjust the action name as per your store setup
        selectedProduct.value = store.getters.products.find((product: Product) => product.name === props.prodName) || null;
      } catch (error) {
        console.error('Error fetching product details:', error);
      }
    });

    const image = computed(() => selectedProduct.value?.imageUrl || '');

    const removeItem = () => {
      const name = {
        prodName: props.prodName
      }
      store.dispatch('removeToCartAction', name)
    }



    return { itemTotal, removeItem, image }
  },
});
</script>
  
<style scoped>
li {
  /* margin: 1rem auto; */
  padding: 1rem;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.26);
  text-align: center;
  width: 25rem;
}

img {
  width: 5rem;
  height: 5rem;
  object-fit: cover;
}

h3{
  color: #8f0030;
  margin-bottom: 30px;
}
strong{
  color: #8f0030;
}

.item__data {
  display: flex;
  justify-content: space-between;
}

.item__total {
  font-weight: bold;
  margin: 1rem 0;
  border-top: 1px solid #474747;
  border-bottom: 2px solid #474747;
  padding: 0.25rem 0;
  width: auto;
}

button {
  font: inherit;
  border: 1px solid #8f0030;
  background-color: #8f0030;
  color: white;
  border-radius: 30px;
  cursor: pointer;
  padding: 0.5rem 1.5rem;
}

button:hover,
button:active {
  background-color: #53001c;
  border-color: #53001c;
}

@media only screen and (max-width: 500px){
  li {
  /* margin: 1rem auto; */
  padding: 0.5rem;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.26);
  text-align: center;
  width: 20rem;
}
}
</style>
  