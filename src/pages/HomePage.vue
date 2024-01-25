<template>
    <intro-page></intro-page>
    <featured-category></featured-category>
    <top-ten></top-ten>
  
</template>

<script lang="ts">
import { defineComponent } from "vue";
import IntroPage from "../components/sections/IntroPage.vue"
import FeaturedCategory from "../components/sections/FeaturedCategory.vue"
import TopTen from "../components/sections/TopTen.vue"

export default defineComponent({
    components:{IntroPage, FeaturedCategory, TopTen},
});
</script>

<style scoped>


</style>