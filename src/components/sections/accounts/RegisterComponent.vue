<template>
    <base-card mode="normal">
        <form>
            <div class="upper-container">
                <div class="header">
                    <h3>Registration Account</h3>
                </div>

                <div class="name">
                    <div class="form-control">
                        <label for="firstName">First Name</label>
                        <input type="text" name="firstName" id="firstName" placeholder="First Name" v-model.trim="firstName">
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
                    <input type="text" name="phoneNumber" id="phoneNumber" placeholder="Phone Number" v-model.trim="phoneNumber">
                </div>
            </div>

            <div class="lower-container">
                <base-button mode="outline" @click.prevent="register">Continue</base-button>
                <base-button>Sign In With Google</base-button>
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
        const firstName= ref('')
        const lastName= ref('')
        const email= ref('')
        const password= ref('')
        const phoneNumber= ref('')

        const fullName= computed(()=>{
            return `${firstName.value} ${lastName.value}`
        })

        const register= async()=>{
            const userData= {
                name: fullName.value,
                email: email.value,
                password: password.value,
                phoneNumber: phoneNumber.value
            }

            await store.dispatch('registerUser', userData)

            const user= store.getters.user
            console.log(user);
            
        }

        
        return { toggleComponent, firstName, lastName, email, password, phoneNumber, register }
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

@media only screen and (max-width: 900px){
    .name{
        flex-direction: column;
    }
    .upper-container{
        align-items: center;
    }
}
@media only screen and (max-width: 700px){

}

</style>