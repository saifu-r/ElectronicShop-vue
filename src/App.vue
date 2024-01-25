<template>
  <the-header></the-header>
  <router-view></router-view>

</template>

<script lang="ts">
import { defineComponent } from "vue";
import TheHeader from "./components/nav/TheHeader.vue"

export default defineComponent({
  components:{TheHeader},
});
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Roboto&display=swap');
*{
  margin: 0;
  padding: 0;

}
body{
  font-family: 'Roboto', sans-serif;
}

html{
  scroll-behavior: smooth;
}
</style>
