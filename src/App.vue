<template>
  <the-header></the-header>

</template>

<script lang="ts">
import { defineComponent } from "vue";
import TheHeader from "./components/nav/TheHeader.vue"

export default defineComponent({
  components:{TheHeader},
});
</script>

<style>
*{
  margin: 0;
  padding: 0;

}
body{
  font-family: 'League Spartan', sans-serif;
}

html{
  scroll-behavior: smooth;
}
</style>
