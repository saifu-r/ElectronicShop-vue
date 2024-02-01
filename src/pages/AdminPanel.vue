<template>
    <div class="container">
        <div class="sub-container">
            <div class="title">
                <h2>Product Page</h2>
            </div>
            <div class="desc">
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Sed hic libero fugit ea?</p>
            </div>
        </div>

        <div class="sub-container">
            <img src="../assets/admin/introimg.png" alt="image">
        </div>

    </div>
    <router-view></router-view>
  </template>


<script lang="ts">
import { defineComponent, ref } from "vue";

export default defineComponent({
    setup() {
    const isMobileMenuOpen = ref(false);
    const searchText = ref('');

    const toggleMobileMenu = () => {
      isMobileMenuOpen.value = !isMobileMenuOpen.value;
    };

    return {
      isMobileMenuOpen,
      toggleMobileMenu,
      searchText,
    };
  },
});
</script>

<style scoped>
/* Add your styling here */

.container{
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    gap: 5rem;
    height: 80vh;
    background-color: white;
}
.sub-container img{
    height: 25rem;
    width: 25rem;
}
.desc{
    width: 20rem;
}
</style>