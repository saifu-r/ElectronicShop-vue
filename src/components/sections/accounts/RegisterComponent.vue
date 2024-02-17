<template>
    <base-spinner v-if="isLoading"></base-spinner>
    <base-card mode="normal">
        <form>
            <div class="upper-container">
                <div class="header">
                    <h3>Registration Account</h3>
                </div>

                <div class="name">
                    <div class="form-control">
                        <label for="firstName">First Name</label>
                        <input type="text" name="firstName" id="firstName" placeholder="First Name"
                            v-model.trim="firstName">
                    </div>
                    <div class="form-control">
                        <label for="lastName">Last Name</label>
                        <input type="text" name="lastName" id="lastName" placeholder="Last Name" v-model.trim="lastName">
                    </div>
                </div>

                <div class="name">
                    <div class="form-control">
                        <label for="email">Email</label>
                        <input type="email" name="email" id="email" placeholder="Email" v-model.trim="email">
                    </div>
                    <div class="form-control">
                        <label for="password">Password</label>
                        <input type="password" name="password" id="password" v-model.trim="password">
                    </div>
                </div>
                <div class="form-control">
                    <label for="phoneNumber">Phone Number</label>
                    <input type="text" name="phoneNumber" id="phoneNumber" placeholder="Phone Number"
                        v-model.trim="phoneNumber">
                </div>
                <p v-if="!!error">{{ error }}</p>

            </div>

            <div class="lower-container">
                <base-button mode="outline" @click.prevent="register">Continue</base-button>
                <base-button mode="login">Sign In With Google</base-button>
                <p>---------- Already have an account? ----------</p>
                <p>If you already have an account, please <b @click="toggleComponent">LOGIN</b></p>
            </div>

        </form>

    </base-card>
</template>

<script lang="ts">
import { computed, defineComponent, ref } from "vue";
import { useStore } from "vuex";

export default defineComponent({
    emit: ['toggle-component'],
    setup(_, { emit }) {
        const store = useStore()
        const component = ref('login-component')
        const toggleComponent = () => {
            emit('toggle-component', component.value)
        }
        const firstName = ref('')
        const lastName = ref('')
        const email = ref('')
        const password = ref('')
        const phoneNumber = ref('')
        const error = ref('')
        const isLoading = ref(false)

        const fullName = computed(() => {
            return `${firstName.value} ${lastName.value}`
        })

        const register = async () => {
            if (firstName.value === '' || lastName.value === '' || email.value === '' || password.value === '' || phoneNumber.value === '') {
                error.value = 'Please fill in all fields.';
                return
            } else if (password.value.length < 6) {
                error.value = 'Password should be at least 6 characters long.';
                return
            } else if (!email.value.includes('@')) {
                error.value = 'Please enter a valid email address.';
                return
            } else if (phoneNumber.value.length !== 11) {
                error.value = 'Phone number should be 11 digits long.';
                return
            }

            try {
                isLoading.value = true
                const userData = {
                    name: fullName.value,
                    email: email.value,
                    password: password.value,
                    phoneNumber: phoneNumber.value
                }

                await store.dispatch('registerUser', userData)
                isLoading.value = false
                const user = store.getters.user
                console.log(user);
            } catch (err: any) {
                error.value = err.message || 'Failed to authenticate, try again'
                isLoading.value = false
            }

        }


        return { toggleComponent, firstName, lastName, email, password, phoneNumber, register, isLoading, error }
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
    color: #0079FF;
    cursor: pointer;
}
.upper-container p {
    color: red;
    display: flex;
    justify-content: center;
}

@media only screen and (max-width: 900px) {
    .name {
        flex-direction: column;
    }

    .upper-container {
        align-items: center;
    }
}

@media only screen and (max-width: 700px) {}
</style>