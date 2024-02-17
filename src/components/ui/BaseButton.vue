<template>
    <button v-if="!link" :class="mode">
        <slot></slot>
    </button>
    <router-link v-else :to="to" :class="mode">
        <slot></slot>
    </router-link>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
    props: {
        link:{
            type: Boolean,
            required: false,
            default: false
        },
        to: {
            type: String,
            required: false,
            default: null
        },
        mode:{
            type: String,
            required: false,
            default: null
        }
    }

});
</script>

<style scoped>
button,
a {
  text-decoration: none;
  padding: 0.75rem 1.5rem;
  font: inherit;
  background-color: #3a0061;
  border: 1px solid #3a0061;
  color: white;
  cursor: pointer;
  border-radius: 30px;
  margin-right: 0.5rem;
  display: inline-block;
}

a:hover,
a:active,
button:hover,
button:active {
  background-color: #270041;
  border-color: #270041;
}

.flat {
  background-color: transparent;
  color: #3a0061;
  border: none;
}

.outline {
  background-color: transparent;
  border: 2px solid #0079FF;
  color: #0079FF;
  border-radius: 10px;
}
.browse {
  border-radius: 10px;
  background-color: #D80032;

}

.browse:hover{
  background-color: #ca3155;
}
.login {
  border-radius: 10px;
  background-color: #0079FF;

}

.login:hover{
  background-color: #0077ff;
}
.outline:hover{
  background-color: #0077ff;
  color: #fff;
}





.flat:hover,
.flat:active {
  background-color: #edd2ff;
}
</style>