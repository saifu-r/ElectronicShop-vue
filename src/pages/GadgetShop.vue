<template>
    <intro-page></intro-page>
    <featured-category></featured-category>
    <top-ten></top-ten>
  
</template>

<script lang="ts">
import { defineComponent } from "vue";
import IntroPage from "../components/sections/front/IntroPage.vue"
import FeaturedCategory from "../components/sections/front/FeaturedCategory.vue"
import TopTen from "../components/sections/front/TopTen.vue"

export default defineComponent({
    components:{IntroPage, FeaturedCategory, TopTen},
});
</script>

<style scoped>


</style>