<template>
  <nav id="desktop-nav">
    <div class="logo"><router-link to="/gadget-shop">Gadgetn'Tech</router-link></div>
    <div class="list">

      <div class="search-bar">
        <input type="text" name="search" id="search" placeholder="search..." v-model="searchQuery">
        <img src="../../assets/search.png" alt="search.img" @click="fetchKeywords">
      </div>

      <ul v-if="suggestions.length > 0">
        <li v-for="keyword in suggestions" :key="keyword">
          {{ keyword }}
        </li>
      </ul>
      <div>
        <ul class="nav-links">
          <li><router-link to="/offers">Offers</router-link></li>
          <li><router-link to="/offers">About</router-link></li>
          <li><router-link to="/offers">Contact</router-link></li>
        </ul>
      </div>
      <div class="cart"><router-link to="/cart">
          <img src="../../assets/cart.png" alt="cart.img">
          <div class="badge">{{ totalQty }}</div>
        </router-link>
      </div>
      <div class="account">
        <base-button mode="login" v-if="!isAuthenticated" link to="/account">Login</base-button>
        <base-button mode="login" v-else link to="/profile">Login</base-button>
      </div>
    </div>

    <div class="hamburger" @click="showMenu">
      <img src="../../assets/hamburger.png" alt="hamburger">
    </div>

  </nav>

  <div class="menu" v-if="isMenuAvailable">
    <ul class="menuUl">
      <li><router-link to="/offers">Offers</router-link></li>
      <li><router-link to="/offers">Contact</router-link></li>
      <li v-if="!isAuthenticated"><router-link to="/account">Login</router-link></li>
      <li v-else><router-link to="/profile">Login</router-link></li>
      <li>
        <div class="cart"><router-link to="/cart">
            <img src="../../assets/cart.png" alt="cart.img">
            <h4>Cart</h4>
            <div class="badgeM">{{ totalQty }}</div>
          </router-link>
        </div>
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, ref, watch } from "vue";
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

    const searchQuery = ref('')
    const suggestions = ref([])

    const fetchKeywords = () => {
      // console.log(searchQuery);
      
      store.dispatch('fetchKeywords')
      console.log(suggestions.value);

    }

    watch(searchQuery, () => {
      store.commit('setSearchQuery', searchQuery.value);
      fetchKeywords();
    });

    return { isAuthenticated, totalQty, showMenu, isMenuAvailable, searchQuery, suggestions, fetchKeywords }
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
  background-color: #dee0e4;
}

nav {
  justify-content: space-around;
  align-items: center;
  height: 80px;

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

.list:nth-last-child(2) {
  gap: 80px;
}

.logo {
  font-size: 2.5rem;
}

.logo a:hover {
  cursor: default;
  color: #D80032;
  text-decoration: none;
}

.search-bar {
  display: flex;
  align-items: center;
  height: 6vh;
  width: 50vh;
  border: 1px solid black;
  border-radius: 10px;
  padding: 0 10px;
  background: white;

}

.search-bar img {
  width: 40px;
  margin-right: 10px;
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
  padding: 5px;
  position: relative;
}

.cart img {
  width: 30px;
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

.badgeM {
  position: absolute;
  top: 0;

  background-color: red;
  color: white;
  border-radius: 50%;
  padding: 4px 8px;
  /* Adjust padding based on your design */
  font-size: 12px;
  /* Adjust font size based on your design */
}

.account a {
  text-decoration: none;
}

.hamburger img {
  width: 40px;
  display: none;
}

.menuUl a {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  border-bottom: 1px solid black;
  border-width: 80%;
  padding: 1rem 0;
  font-weight: bolder;
  color: black;
  background: #dee0e4;
}

@media only screen and (max-width: 1200px) {
  .hamburger img {
    display: block;
  }

  .list {
    display: none;
  }


}</style>