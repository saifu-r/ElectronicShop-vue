<template>
    <base-card>
        <form @submit.prevent="submitForm">
            <div class="upper-container">
                <div class="header">
                    <h3>Login Account</h3>
                </div>
                <div class="form-control">
                    <label for="email">Email</label>
                    <input type="email" name="email" id="email" placeholder="Email" v-model="email">
                </div>
                <div class="form-control">
                    <label for="password">Password</label>
                    <input type="password" name="password" id="password" v-model="password">
                </div>
            </div>

            <div class="lower-container">
                <button>Login</button>
                <p>---------- Don't have an account? ----------</p>
                <button @click="toggleComponent">Create Your Account</button>
            </div>
        </form>
    </base-card>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";

export default defineComponent({
    emit: ['toggle-component'],
    setup(context, { emit }) {

        const component = ref('register-component')
        const toggleComponent = () => {
            emit('toggle-component', component.value)
        }

        const email= ref('')
        const password= ref('')

        const submitForm = () => {
            console.log('the password is '+ password.value);


        }
        return { toggleComponent,email, password, submitForm }
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