<template>
    <div class="container">
        <h1>Category Products</h1>
        <h2>{{ category }}</h2>
    </div>
    <base-spinner v-if="isLoading"></base-spinner>
    <product-details v-for="(product, index) in filteredProducts" :key="index" :name="product.name"
        :category='product.category' :brand='product.brand' :description="product.description" :image-Url="product.imageUrl"
        :price="product.price" :timestamp="product.timestamp" @click="singleProduct(product.name)">

    </product-details>
</template>

<script lang="ts">
import { computed, defineComponent, onBeforeMount, onMounted, ref } from "vue";
import { useStore } from "vuex";
import ProductDetails from '../components/sections/item/ProductDetails.vue'
import Product from '@/types/Product'
import { useRoute } from "vue-router";
import router from "@/router";

export default defineComponent({
    components: { ProductDetails },
    props: ['category'],
    setup(props) {
        const store = useStore()
        const route = useRoute()
        const isLoading= ref(false)

        onBeforeMount(async () => {
            try {
                isLoading.value= true
                await store.dispatch('fetchProducts'); // Adjust the action name as per your store setup
                isLoading.value= false
            } catch (error) {
                console.error('Error fetching products:', error);
            }
        });
        const products = computed<Product[]>(() => store.getters.products);

        const filteredProducts = computed<Product[]>(() => {
            return store.getters.products.filter((product: Product) => product.category.toLowerCase() === props.category.toLowerCase()) || null;
        });

        const singleProduct = (name: string) => {
            // alert(name)
            router.replace('/gadget-shop/' + name)

        }


        return { products, filteredProducts, singleProduct, isLoading }
    }

});
</script>



<style scoped>
h1 {
  color: #292929;
  text-align: center;
  border-bottom: 2px solid #ccc;
  border-width: 80%;
  padding-bottom: 1rem;
  margin-top: 2rem;
}

h2 {
  text-align: center;
  margin-bottom: 2rem;
}
</style>