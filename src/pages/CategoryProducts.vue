<template>
    <div class="container">
        <h1>Category Products</h1>
        <p>{{ category }}</p>
    </div>
    <product-details v-for="(product, index) in filteredProducts" :key="index" :name="product.name"
        :category='product.category' :brand='product.brand' :description="product.description" :image-Url="product.imageUrl"
        :price="product.price" :timestamp="product.timestamp" @click="singleProduct(product.name)">

    </product-details>
</template>

<script lang="ts">
import { computed, defineComponent, onMounted, ref } from "vue";
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
        const route= useRoute()
        const products = computed<Product[]>(() => store.getters.products);

        const filteredProducts = computed<Product[]>(() => {
            return store.getters.products.filter((product: Product) => product.category.toLowerCase() === props.category.toLowerCase()) || null;
        });

        const singleProduct= (name: string)=>{
            // alert(name)
            router.replace('/gadget-shop/'+ name)

        }

       
        return { products, filteredProducts, singleProduct }
    }

});
</script>



<style scoped></style>