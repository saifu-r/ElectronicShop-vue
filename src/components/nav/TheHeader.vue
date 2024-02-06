<template>
    <nav id="desktop-nav">
        <div class="logo"><router-link to="/gadget-shop">GadgetTech</router-link></div>
        <div class="search-bar">
            <img src="../../assets/search.png" alt="search.img">
            <input type="text" name="search" id="search" placeholder="search">
        </div>
        <div>
            <ul class="nav-links">
                <li><router-link to="/offers">Offers</router-link></li>
                <li v-if="!isAuthenticated"><router-link to="/account">Account</router-link></li>
                <li v-else><router-link to="/profile">Account</router-link></li>
                <li><router-link to="/offers">Contact</router-link></li>
                <li><router-link to="/admin">🔑</router-link></li>
              </ul>
        </div>
        <div class="cart">
            <img src="../../assets/cart.png" alt="cart.img">
            <h4>Cart</h4>
            <div class="badge">0</div>
        </div>

    </nav>
</template>

<script lang="ts">
import { computed, defineComponent } from "vue";
import { useStore } from "vuex";


export default defineComponent({
  setup() {
    const store = useStore();

    const isAuthenticated= computed(()=> store.getters.isAuthenticated)

    return {isAuthenticated}
  },
});
</script>

<style scoped>

a{
  transition: all 300ms ease;
  color: black;
  text-decoration: none;
  text-decoration-color: #58626e;
}

a:hover{
  color: #fff;
  text-decoration: underline;
  text-underline-offset: 1rem;
  text-decoration-color: #fff;
}
nav, .nav-links{
  display: flex;
  background-color: #a1b3cb;
}
nav{
  justify-content: space-around;
  align-items: center;
  height: 12vh;

}
.nav-links{
  gap: 2rem;
  list-style: none;
  font-size: 1.5rem;
}

.logo{
  font-size: 2rem;
}
.logo:hover{
  cursor: default;
}
.search-bar {
  display: flex;
  align-items: center;
  height: 6vh;
  width: 60vh;
  border: 1px solid black;
  padding: 0 10px;
  background: white;

}
.search-bar img {
  width: 40px; /* Adjust the width of the search icon */
  margin-right: 10px; /* Adjust the spacing between the icon and input field */
}
#search {
  border: none;
  outline: none;
  flex: 1;
}
.cart{
    display: flex;
    align-items: center;
    flex-direction: column;
    height: 6vh;
    padding: 5px;
    position: relative;
}
.cart img{
    width: 20px;
}

.badge {
  position: absolute;
  top: 0;
  right: -10px;
  background-color: red;
  color: white;
  border-radius: 50%;
  padding: 4px 8px; /* Adjust padding based on your design */
  font-size: 12px; /* Adjust font size based on your design */
}

</style>