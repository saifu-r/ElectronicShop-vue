<template>
    <h1>This is user profile page</h1>

    <p>The userId is : {{ userId }}</p>
    <p>The userEmail is : {{ userEmail }}</p>
    <!-- <p>The token is : {{ token }}</p> -->

    <base-button @click="logout">Logout</base-button>
</template>

<script lang="ts">
import { computed, defineComponent } from "vue";
import { useStore } from "vuex";

export default defineComponent({
  setup() {
    const store = useStore();
    const userId= computed(()=>store.getters.userId)
    const userEmail= computed(()=>store.getters.userEmail)
    const token= computed(()=>store.getters.token)

    

    const logout= ()=>{
        store.dispatch('logoutUser')
    }

    return {userId, userEmail, token, logout}
  },
});
</script>

<style scoped>

</style>