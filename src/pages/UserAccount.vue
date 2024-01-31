<template>

    <!-- <component :is="selectedComponent"></component> -->


    <register-component @toggle-component="setselectedComponent" v-if="selectedComponent ==='register-component'"></register-component>
    <login-component @toggle-component="setselectedComponent" v-else></login-component>

    
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import RegisterComponent from '../components/sections/accounts/RegisterComponent.vue'
import LoginComponent from '../components/sections/accounts/LoginComponent.vue'

export default defineComponent({
    components:{RegisterComponent, LoginComponent},
    setup(){
        const selectedComponent= ref('register-component')
        const setselectedComponent= (component: string)=>{
            selectedComponent.value= component
        }

        return {selectedComponent, setselectedComponent}
    }

});
</script>

<style scoped>

</style>
