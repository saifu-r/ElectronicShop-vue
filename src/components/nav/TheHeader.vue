<template>
  <nav id="desktop-nav">
    <div class="logo"><router-link to="/gadget-shop">GadgetTech</router-link></div>
    <div class="list">

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
      <div class="cart"><router-link to="/cart">
          <img src="../../assets/cart.png" alt="cart.img">
          <h4>Cart</h4>
          <div class="badge">{{ totalQty }}</div>
        </router-link>
      </div>
    </div>

    <div class="hamburger" @click="showMenu">
      <img src="../../assets/hamburger.png" alt="hamburger">
    </div>

  </nav>

  <div class="menu" v-if="isMenuAvailable">
    <ul class="menuUl">
      <li><router-link to="/offers">Offers</router-link></li>
      <li v-if="!isAuthenticated"><router-link to="/account">Account</router-link></li>
      <li v-else><router-link to="/profile">Account</router-link></li>
      <li><router-link to="/offers">Contact</router-link></li>
      <li><router-link to="/admin">🔑</router-link></li>
      <li><div class="cart"><router-link to="/cart">
          <img src="../../assets/cart.png" alt="cart.img">
          <h4>Cart</h4>
          <div class="badge">{{ totalQty }}</div>
        </router-link>
      </div></li>
    </ul>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, ref } from "vue";
import { useStore } from "vuex";


export default defineComponent({
  setup() {
    const store = useStore();

    const isAuthenticated = computed(() => store.getters.isAuthenticated)
    const totalQty = computed(() => store.getters.totalQty)

    const isMenuAvailable = ref(false)

    const showMenu = () => {
      isMenuAvailable.value = !isMenuAvailable.value
    }

    return { isAuthenticated, totalQty, showMenu, isMenuAvailable }
  },
});
</script>

<style scoped>
a {
  transition: all 300ms ease;
  color: black;
  text-decoration: none;
  text-decoration-color: #58626e;
}

a:hover {
  color: #fff;
  text-decoration: underline;
  text-underline-offset: 1rem;
  text-decoration-color: #fff;
}

nav,
.nav-links {
  display: flex;
  background-color: #8b9197;
}

nav {
  justify-content: space-around;
  align-items: center;
  height: 12vh;

}

.nav-links {
  gap: 2rem;
  list-style: none;
  font-size: 1.5rem;
}

.list {
  display: flex;
  flex-direction: row;
  gap: 40px;
  align-items: center;
  justify-content: space-between;
}

.logo {
  font-size: 2rem;
}

.logo:hover {
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
  width: 40px;
  /* Adjust the width of the search icon */
  margin-right: 10px;
  /* Adjust the spacing between the icon and input field */
}

#search {
  border: none;
  outline: none;
  flex: 1;
}

.cart a {
  display: flex;
  align-items: center;
  flex-direction: column;
  height: 6vh;
  padding: 5px;
  position: relative;
}

.cart img {
  width: 20px;
}

.badge {
  position: absolute;
  top: 0;
  right: -10px;
  background-color: red;
  color: white;
  border-radius: 50%;
  padding: 4px 8px;
  /* Adjust padding based on your design */
  font-size: 12px;
  /* Adjust font size based on your design */
}

.hamburger img {
  width: 40px;
  display: none;
}

.menuUl a{
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  border-bottom: 1px solid black;
  padding: 1rem 0;
  font-weight: bolder;
  color: #fff;
  background: #8b9197;
}

@media only screen and (max-width: 1200px) {
  .hamburger img {
    display: block;
  }

  .list {
    display: none;
  }


}
</style>