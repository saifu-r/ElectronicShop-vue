<template>
    <div class="title__container">
    <div class="title">
      <h2>Top Ten Products</h2>
    </div>
    <div class="sub-title">
      <h4>Seize the Best Products with Exceptional Deals!</h4>
    </div>
  </div>

  <div class="container">
    <base-card mode="modified" v-for="i in 10" :key="i">
      <template #category>
        <div class="card">
          <img src="../../assets/cart.png" alt="" />
          <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Molestias </p>
          <h3>Price: 000 TK </h3>

        </div>
      </template>
    </base-card>
    
  </div>
</template>

<style scoped>
.title__container{
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 20px;
    gap: 10px;

}

.container {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 3rem;
  padding: 30px;

}
.card {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  max-width: 220px;

}

.card h3{
    padding-top: 20px;
    display: flex;
    justify-content: flex-start;
}

.card img {
  height: 10rem;

}
</style>