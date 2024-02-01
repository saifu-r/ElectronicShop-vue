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
    <base-card mode="modified" v-for="(product, index) in products" :key="index">
      <template #category>
        <div class="card">
          <img :src='product.imageUrl' alt='image' style="width: 150px;"/>
          <p>{{ product.name }}</p>
          <h3>Price: {{ product.price }} TK </h3>

        </div>
      </template>
    </base-card>

  </div>
</template>

<script lang="ts">
import { computed, defineComponent, onMounted, ref } from "vue";
import { useStore } from "vuex";

export default defineComponent({
  setup() {
    const store = useStore()
    const products = computed(() => store.getters.products);

    const fetchData = async () => {
      await store.dispatch('fetchProducts')
    };

    onMounted(() => {
      fetchData();
    });
    return { products }


  },
});
</script>

<style scoped>
.title__container {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  gap: 10px;

}

.container {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 3rem;
  padding: 30px;

}

.card {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  max-width: 220px;

}

.card h3 {
  padding-top: 20px;
  display: flex;
  justify-content: flex-start;
}

.card img {
  height: 10rem;

}
</style>