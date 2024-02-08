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
    <router-link :to="categoryProducts">
    <base-card  mode="modified" v-for="category in categories" :key="category" @click="showCategory(category.title)">
      <template #category>
        <div class="card">
          <img :src="category.image" alt="image" />
          <h3>{{category.title}}</h3>
        </div>
      </template>
    </base-card>
  </router-link>
    
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, onBeforeMount, ref } from "vue";
import { useStore } from "vuex";
import Category from '@/types/Category'

export default defineComponent({
  setup() {
    const store= useStore()
    const categories= ref<Category[]>([])

    onBeforeMount(()=>{
      categories.value= store.getters.categories
    })

    const category= ref('')
    const showCategory= (categ: string)=>{
      category.value= categ
    }

    const categoryProducts= computed(()=>{
      return '/gadget-shop/c/'+ category.value
    })

    return {categories, showCategory, categoryProducts}
  },
});
</script>


<style scoped>
*{
  background-color: #f2f4f8;
}

.title__container{
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
  padding: 30px;
  text-decoration: none;
  color: black;

}

.card {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 40px;
  cursor: pointer;
  background-color: #fff;
  border-radius: 12px;

}

.card:hover{
  transform: scale(1.05);
}

.card img{
  height: 4rem;
  background-color: #fff;
}

.card h3{
  background-color: #fff;
}

@media only screen and (max-width: 900px){
  .card{
    padding: 25px;
  }
  .card img{
    height: 3rem;
  }
}

</style>