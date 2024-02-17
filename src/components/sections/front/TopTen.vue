<template>
  <div class="title__container">
    <div class="title">
      <h2>Top Products</h2>
    </div>
    <div class="sub-title">
      <h4>Seize the Best Products with Exceptional Deals!</h4>
    </div>
  </div>
  <base-spinner v-if="isLoading"></base-spinner>

  <div class="container">
    <router-link :to="productDetails">
      <base-card mode="modified" v-for="(product, index) in filteredProducts" :key="index"
        @click="showDetails(product.name)">
        <template #category>
          <div class="card">
            <img :src='product.imageUrl' alt='image' style="width: 150px;" />
            <p>{{ product.name }}</p>
            <h3>Price: ${{ product.price }}</h3>
          </div>
        </template>
      </base-card>
    </router-link>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, onMounted, ref, watch } from "vue";
import { useStore } from "vuex";

import Product from '@/types/Product'

export default defineComponent({
  setup() {
    const store = useStore()
    const isLoading = ref(false)
    const products = computed<Product[]>(() => store.getters.products);

    const fetchData = async () => {
      isLoading.value = true
      await store.dispatch('fetchProducts')
      isLoading.value = false
    };

    onMounted(() => {
      fetchData();
    });

    const filteredProducts = computed<Product[]>(() => {
      return store.getters.products.filter((product: Product) => product.topProduct === true) || null;
    });

    const productName = ref('')
    const showDetails = (prodName: string) => {
      productName.value = prodName
    }

    const productDetails = computed(() => {
      return '/gadget-shop/' + productName.value
    })

    return { products, showDetails, productDetails, filteredProducts, isLoading }


  },
});
</script>

<style scoped>
* {
  background-color: #f2f4f8;
}

h2 {
  color: #D80032;
}

.title__container {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  gap: 10px;

}

.container a {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 3rem;
  padding: 30px
}

.card {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  max-width: 220px;
  max-height: 220px;
  cursor: pointer;
  background-color: #fff;
  border-radius: 12px;
}

.card:hover {
  transform: scale(1.05);
  color: #D80032;
}

.card h3 {
  padding-top: 20px;
  display: flex;
  justify-content: flex-start;
  background-color: #fff;
}

.card img {
  height: 10rem;
  width: 10rem;

}

p {
  text-align: center;
  background-color: #fff;
}

a {
  text-decoration: none;
  color: black;
}
</style>