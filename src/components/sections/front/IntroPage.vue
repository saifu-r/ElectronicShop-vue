<template>
  <div class="home">
    <div class="section__text">
      <div class="section__text__title">
        <h1>The <strong>new-tech</strong> gift you are wishing for is right here</h1>
      </div>
      <div class="section__text__para">
        <p>Step into the Future</p>
      </div>
      <div class="section__text__action">
        <base-button mode="browse">Browse Now--</base-button>
      </div>
    </div>
    <div class="section__image">
      <img src="../../../assets/introimg.png" alt="introimg" />
    </div>
  </div>
</template>
  
<style scoped>
.home {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  gap: 5rem;
  height: 80vh;
  background-color: #f2f4f8;
}

.section__text {
  display: flex;
  flex-direction: column;
  align-self: center;
  text-align: center;
  width: 25rem;
  gap: 30px;

}

.section__text__title h1 {
  font-weight: 200;
  font-size: 3rem;
}

.section__text__para {
  font-weight: 600;
  font-size: 1.5rem;
  margin: 15px;

}

.section__image img {
  height: 30rem;
  width: 30rem;
}
strong{
  color: #D80032;
}

@media only screen and (max-width: 1200px) {
  .home {
  justify-content: center;
  align-items: center;
}

.section__image img {
  height: 20rem;
  width: 20rem;
}
.section__text__title h1 {
  font-weight: 200;
  font-size: 2rem;
}

}
@media only screen and (max-width: 900px) {
  .home {
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.section__image img {
  height: 15rem;
  width: 15rem;
}
.section__text__title h1 {
  margin-top: 40px;
  font-size: 2rem;
}

}
</style>