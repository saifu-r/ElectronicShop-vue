<template>
    <nav id="desktop-nav">
        <div class="logo">StarTech</div>
        <div class="search-bar">
            <img src="../../assets/search.png" alt="search.img">
            <input type="text" name="search" id="search" placeholder="search">
        </div>
        <div>
            <ul class="nav-links">
                <li>Offers</li>
                <li>Contact</li>
                <li>Account</li>
            </ul>
        </div>
        <div class="cart">
            <img src="../../assets/cart.png" alt="cart.img">
            <h4>Cart</h4>
            <div class="badge">0</div>
        </div>

    </nav>
</template>

<style scoped>
nav, .nav-links{
  display: flex;
  background-color: #cccaca;
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
  font-size: 2.5rem;
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