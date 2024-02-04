<template>
  <div class="container">
    <div class="section__image">
      <img :src="imageUrl" alt="img">
    </div>
    <div class="section__details">
      <div class="section__product__name">
        <h2>{{ name }}</h2>
      </div>
      <div class="section__product__brand">
        <h3>Brand: {{ brand }}</h3>
      </div>
      <div class="section__product__description">
        <p>Details: {{ description }}</p>
      </div>
      <div class="section__product__price">
        <base-badge :title='newPrice' type="price"></base-badge>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, ref } from "vue";

export default defineComponent({
  props: ['name', 'category', 'brand', 'description', 'imageUrl', 'price', 'timestamp'],
  setup(props){
    const newPrice= ref('')
    newPrice.value= 'Price: $' + props.price

    return {newPrice}
  }
});
</script>

<style scoped>
.container {
    display: flex;
    flex-direction: row;
    padding: 20px 100px;
    gap: 40px;
    border-bottom: 1px solid black;
    margin: 20px;
}

.section__image img {
    width: 200px;
    height: 200px;
}

.section__details {
    display: flex;
    flex-direction: column;
    gap: 20px;
    width: 700px;
}
</style>

