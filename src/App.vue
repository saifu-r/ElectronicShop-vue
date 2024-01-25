<template>
  <the-header></the-header>
  <router-view></router-view>
  <the-footer></the-footer>

</template>

<script lang="ts">
import { defineComponent } from "vue";
import TheHeader from "./components/nav/TheHeader.vue"
import TheFooter from "./components/nav/TheFooter.vue"

export default defineComponent({
  components:{TheHeader, TheFooter},
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
