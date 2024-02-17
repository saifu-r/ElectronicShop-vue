<template>
  <the-header v-if="!isAdminRoute"></the-header>
  <the-navbar v-else></the-navbar>
  <router-view></router-view>
  <the-footer></the-footer>

</template>

<script lang="ts">
import { computed, defineComponent, onMounted } from "vue";
import TheHeader from "./components/nav/TheHeader.vue"
import TheFooter from "./components/nav/TheFooter.vue"
import TheNavbar from "./components/nav/TheNavbar.vue"
import router from "./router";
import { useStore } from "vuex";

export default defineComponent({
  components:{TheHeader, TheFooter, TheNavbar},
  setup() {
    const store= useStore()
    const isAdminRoute = computed(() => {
      return router.currentRoute.value.path.startsWith("/admin");
    });

    onMounted(()=>{
      store.dispatch('tryLogin')
    })

    return { isAdminRoute };
  },
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

/* For Chrome, Safari, and newer Edge */
::-webkit-scrollbar {
  width: 12px; /* Width of the scrollbar */
}

/* Handle on hover */
::-webkit-scrollbar-thumb:hover {
  background: #555;
}

/* Handle */
::-webkit-scrollbar-thumb {
  background: #888;
  border-radius: 10px;
}

/* Track */
::-webkit-scrollbar-track {
  background: #f1f1f1;
}

/* Handle on active */
::-webkit-scrollbar-thumb:active {
  background-color: #555;
}
</style>

function created(arg0: () => void) {
  throw new Error("Function not implemented.");
}

function created(arg0: () => void) {
  throw new Error("Function not implemented.");
}
