<template>
  <div class="title__container">
    <div class="title">
      <h2>Featured Category</h2>
    </div>
    <div class="sub-title">
      <h4>Get Your Desired Product from Featured Category!</h4>
    </div>
  </div>

  <div class="container">
    <base-card mode="modified" v-for="i in 16" :key="i">
      <template #category>
        <div class="card">
          <img src="../../assets/cart.png" alt="" />
          <h3>Phone</h3>
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

}

.card img {
  height: 4rem;
}

</style>