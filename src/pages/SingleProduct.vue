<template>
  <base-spinner v-if="isLoading"></base-spinner>
    <div class="container">
        <div class="section__image">
            <img :src="image" alt="image">
        </div>
        <div class="section__details">
            <div class="section__product__name">
                <h2>{{ prodName }}</h2>
            </div>
            <div class="section__product__brand">
                <h3>Brand: {{ brand }}</h3>
            </div>
            <div class="section__product__description">
                <p>Details: {{ description }}</p>
            </div>
            <div class="section__product__price">
                <base-badge :title='price' type="price"></base-badge>
            </div>
            <div class="section__product__order">
                <base-button mode="login" @click="orderItem">Order Now</base-button>
            </div>

        </div>
    </div>
</template>

<script lang="ts">
import { computed, defineComponent, onBeforeMount, ref } from "vue";
import { useStore } from "vuex";
import Product from '@/types/Product'
import router from "@/router";

export default defineComponent({
    props: ['prodName'],
    setup(props) {
    const store = useStore();
    const isLoading= ref(false)
    const selectedProduct = ref<Product | null>(null);

    // Use onBeforeMount to fetch data before the component is mounted
    onBeforeMount(async () => {
      try {
        isLoading.value= true
        await store.dispatch('fetchProducts'); // Adjust the action name as per your store setup
        isLoading.value= false
        selectedProduct.value = store.getters.products.find((product: Product) => product.name === props.prodName) || null;
      } catch (error) {
        console.error('Error fetching product details:', error);
      }
    });

    const brand = computed(() => selectedProduct.value?.brand || '');
    const description = computed(() => selectedProduct.value?.description || '');
    const price = computed(() => 'Price: $' + (selectedProduct.value?.price || ''));
    const image = computed(() => selectedProduct.value?.imageUrl || '');

    const orderItem= ()=>{
        if(!store.getters.isAuthenticated){
            router.replace('/account')
        }else{
            const product= {
                name: props.prodName,
                price: selectedProduct.value?.price,
                qty: 1
            }
            store.dispatch('placeOrder', product)    
        }
    }

    return { selectedProduct, brand, description, price, image, orderItem,isLoading };
  },
});
</script>

<style scoped>
.container {
    display: flex;
    flex-direction: row;
    padding: 80px;
    gap: 40px;
}

.section__image img {
    width: 400px;
    height: 400px;
}

.section__details {
    display: flex;
    flex-direction: column;
    gap: 40px;
    width: 700px;
}

@media only screen and (max-width: 1200px){
  .section__product__description{
    max-width: 400px;
  }
}

@media only screen and (max-width: 900px){
  .container{
    flex-direction: column;
    padding: 10px 0px;
    justify-content: center;
    align-items: center;
  }
  .section__image img{

    width: 300px;
    height: 300px;

  }
  .section__details{
    justify-content: center;
    align-items: center;
    text-align: center;
    width: 100%;
  }
}
</style>