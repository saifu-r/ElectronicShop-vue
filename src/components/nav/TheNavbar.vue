<template>
    <nav :class="{active: !isMobileMenuOpen}">
        <div class="navbar-row first-row" >
            <div class="title" v-if="isMobileMenuOpen">
                <h2>Gadget Shop</h2>
            </div>
            <div class="close">
                <div class="hamburger-icon" @click="toggleMobileMenu">
                    <div :class="{ 'line': true, 'line1-open': isMobileMenuOpen }"></div>
                    <div :class="{ 'line': true, 'line2-open': isMobileMenuOpen }"></div>
                    <div :class="{ 'line': true, 'line3-open': isMobileMenuOpen }"></div>
                </div>
            </div>
        </div>
        <div v-if="isMobileMenuOpen">
            <div class="navbar-row second-row">
                <div class="admin-img">
                    <img src="../../assets/admin/admin.png" alt="">
                </div>
                <div class="admin-details">
                    <h4>Saifur Rahman</h4>
                    <h4>Administration</h4>
                    <h6>🟢 online</h6>
                </div>
            </div>
            <div class="navbar-row search-bar">
                <img src="../../assets/search.png" alt="search.img">
                <input type="text" name="search" id="search" placeholder="search">
            </div>
            <div class="navbar-row forth-container">
                <div class="menu-title">
                    <h3>Menu</h3>
                </div>
                <div class="list">
                    <ul>
                        <li>
                            <img src="../../assets/admin/product.png" alt="product.img">
                            <h5>Product Page</h5>
                        </li>
                        <li>
                            <img src="../../assets/admin/order.png" alt="order.img">
                            <h5>Orders</h5>
                        </li>
                        <li>
                            <img src="../../assets/admin/shipment.png" alt="shipment.img">
                            <h5>Shipment</h5>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    </nav>
</template>


<script lang="ts">
import { defineComponent, ref } from "vue";

export default defineComponent({
    setup() {
        const isMobileMenuOpen = ref(false);
        const searchText = ref('');

        const toggleMobileMenu = () => {
            isMobileMenuOpen.value = !isMobileMenuOpen.value;

        };

        return {
            isMobileMenuOpen,
            toggleMobileMenu,
            searchText,
        };
    },
});
</script>

<style scoped>
nav {
    width: 15rem;
    height: 100vh;
    background-color: #727171;
    color: #fff;
    padding: 10px;
    display: flex;
    flex-direction: column;
    position: fixed;
    top: 0;
    left: 0;
    transition: transform 0.3s ease-in-out;
}

nav.active{
    width: auto;
    height: 100vh;
    position: fixed;
    top: 0;
    left: 0;
    transition: transform 0.3s ease-in-out;
}

.navbar-row {
    margin: 25px 5px;
    /* padding: 10px; */
}

img {
    width: 30px;
    height: 30px;
    border-radius: 50%;
    margin-right: 10px;
}

.first-row {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;

}

.second-row {
    display: flex;
    flex-direction: row;
    align-items: center;
}

.search-bar {
    display: flex;
    align-items: center;
    height: 6vh;
    width: auto;
    border: 1px solid black;
    padding: 0 5px;
    background: white;

}

.search-bar img {
    width: 30px;
    /* Adjust the width of the search icon */
    margin-right: 10px;
    /* Adjust the spacing between the icon and input field */
}

#search {
    border: none;
    outline: none;
    flex: 1;
}

.forth-container {
    display: flex;
    flex-direction: column;
    gap: 20px;
}

li {
    list-style: none;
    display: flex;
    flex-direction: row;
    margin: 5px 0;
    padding: 5px;
    align-items: center;
}

.hamburger-icon {
    background: none;
    border: none;
    cursor: pointer;
    font-size: 1.5em;
    color: #fff;
}

.line {
    height: 3px;
    width: 30px;
    background-color: #fff;
    margin: 6px 0;
    transition: 0.4s;
}

.line1-open {
    transform: rotate(-45deg) translate(-6px, 6px);
}

.line2-open {
    opacity: 0;
}

.line3-open {
    transform: rotate(45deg) translate(-6px, -6px);
}
</style>

