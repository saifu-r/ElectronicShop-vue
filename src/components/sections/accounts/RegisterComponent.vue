<template>
    <base-card mode="normal">
        <form @submit.prevent="submitForm">
            <div class="upper-container">
                <div class="header">
                    <h3>Registration Account</h3>
                </div>

                <div class="name">
                    <div class="form-control">
                        <label for="firstName">First Name</label>
                        <input type="text" name="firstName" id="firstName" placeholder="First Name">
                    </div>
                    <div class="form-control">
                        <label for="lastName">Last Name</label>
                        <input type="text" name="lastName" id="lastName" placeholder="Last Name">
                    </div>
                </div>

                <div class="name">
                    <div class="form-control">
                        <label for="email">Email</label>
                        <input type="email" name="email" id="email" placeholder="Email">
                    </div>
                    <div class="form-control">
                        <label for="password">Password</label>
                        <input type="password" name="password" id="password">
                    </div>
                </div>
                <div class="form-control">
                    <label for="phoneNumber">Phone Number</label>
                    <input type="number" name="phoneNumber" id="phoneNumber" placeholder="Phone Number">
                </div>
            </div>

            <div class="lower-container">
                <button>Continue</button>
                <p>---------- Already have an account? ----------</p>
                <p>If you already have an account, please <b @click="toggleComponent">LOGIN</b></p>
            </div>

        </form>

    </base-card>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";

export default defineComponent({
    emit: ['toggle-component'],
    setup(context, { emit }) {
        const component = ref('login-component')
        const toggleComponent = () => {
            emit('toggle-component', component.value)
        }

        const submitForm = () => {
            console.log("hello");
        }
        return { submitForm, toggleComponent }
    },
});
</script>

<style scoped>
.upper-container {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
}



.name {
    display: flex;
    flex-direction: row;
    gap: 10px;
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
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 10px;
}

button {
    margin-top: 20px;
    padding: 12px;
    width: 300px;

}

b {
    color: blue;
    cursor: pointer;
}
</style>