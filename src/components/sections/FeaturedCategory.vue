<template>
  <div class="title__container">
    <div class="title">
      <h2>Featured Category</h2>
    </div>
    <div class="sub-title">
      <h4>Get Your Desired Product from Featured Category!</h4>
    </div>
  </div>

  <div class="container">
    <base-card mode="modified" v-for="category in categories" :key="category.id">
      <template #category>
        <div class="card">
          <img :src="category.image" alt="image" />
          <h3>{{category.title}}</h3>
        </div>
      </template>
    </base-card>
    
  </div>
</template>

<script lang="ts">
import { defineComponent, onBeforeMount, ref } from "vue";
import { useStore } from "vuex";
// import x from '../../assets/category/tv.png'

export default defineComponent({
  setup() {
    const store= useStore()
    const categories= ref([])

    onBeforeMount(()=>{
      categories.value= store.getters.categories
    })

    return {categories}
  },
});
</script>


<style scoped>

.title__container{
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

}

.card img {
  height: 4rem;
}

</style>