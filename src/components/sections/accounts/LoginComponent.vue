<template>
    <base-spinner v-if="isLoading"></base-spinner>
    <base-card>
        <form >
            <div class="upper-container">
                <div class="header">
                    <h3>Login Account</h3>
                </div>
                <div class="form-control">
                    <label for="email">Email</label>
                    <input type="email" name="email" id="email" placeholder="Email" v-model.trim="email">
                </div>
                <div class="form-control">
                    <label for="password">Password</label>
                    <input type="password" name="password" id="password" v-model.trim="password">
                </div>
            </div>

            <div class="lower-container">
                <base-button mode="outline" @click.prevent="submitForm">Login</base-button>
                <base-button @click.prevent="loginWithGoogle">Login With Google</base-button>
                <p>---------- Don't have an account? ----------</p>
                <base-button @click="toggleComponent">Create Your Account</base-button>
            </div>
        </form>
    </base-card>
</template>

<script lang="ts">
import BaseButton from "@/components/ui/BaseButton.vue";
import { computed, defineComponent, ref } from "vue";
import { useStore } from "vuex";

export default defineComponent({
  components: { BaseButton },
    emit: ['toggle-component'],
    setup(_, { emit }) {
        const isLoading= ref(false)
        const store = useStore()
        const component = ref('register-component')
        const toggleComponent = () => {
            emit('toggle-component', component.value)
        }

        const email= ref('')
        const password= ref('')

        const submitForm = async() => {
            isLoading.value= true
            const userData= {
                email: email.value,
                password: password.value,
            }

            await store.dispatch('loginUser', userData)

            isLoading.value= false
        }

        const loginWithGoogle= ()=>{
            const userId = computed(() => store.getters.userId);
            console.log('the userId is: '+ userId.value);
            const userEmail = computed(() => store.getters.userEmail);
            console.log('the userEmail is: '+ userEmail.value);
            const token = computed(() => store.getters.token);
            console.log('the token is: '+ token.value);
        }

        return { toggleComponent,email, password, submitForm, loginWithGoogle, isLoading }
    },
});
</script>

<style scoped>
.upper-container {
    display: flex;
    flex-direction: column;
    align-items: center;
}

.form-control {
    display: flex;
    flex-direction: column;
    margin: 10px 0;
}

input {
    height: 30px;
    width: 300px;
    padding: 5px;
    border-width: 1px;
    border-radius: 5px;
    border-color: #ccc;
}

.lower-container {
    margin-top: 20px;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 10px;
}

button {

    padding: 12px;
    width: 300px;
}
</style>