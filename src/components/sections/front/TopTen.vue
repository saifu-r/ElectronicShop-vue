<template>
  <div class="title__container">
    <div class="title">
      <h2>Top Ten Products</h2>
    </div>
    <div class="sub-title">
      <h4>Seize the Best Products with Exceptional Deals!</h4>
    </div>
  </div>

  <div class="container">
    <router-link :to="productDetails">
      <base-card mode="modified" v-for="(product, index) in products" :key="index" @click="showDetails(product.name)">
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
    const products = computed<Product[]>(() => store.getters.products);

    const fetchData = async () => {
      await store.dispatch('fetchProducts')
    };

    onMounted(() => {
      fetchData();
    });

    const productName = ref('')
    const showDetails = (prodName: string) => {
      productName.value = prodName
    }

    const productDetails = computed(() => {
      return '/gadget-shop/' + productName.value
    })

    return { products, showDetails, productDetails }


  },
});
</script>

<style scoped>
*{
  background-color: #f2f4f8;
}
.title__container {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  gap: 10px;

}

.container a{
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