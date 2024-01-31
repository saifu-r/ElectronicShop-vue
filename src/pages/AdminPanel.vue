<template>
    <h1>hello from admin panel</h1>
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
</style>