<template>
    <div class="home">
      <div class="section__text">
        <div class="section__text__title">
          <h1>The new-tech gift you are wishing for is right here</h1>
        </div>
        <div class="section__text__para">
          <p>Step into the Future</p>
        </div>
        <div class="section__text__action">
          <base-button mode="outline">Browse Now--</base-button>
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
    justify-content: center;
    gap: 5rem;
    height: 80vh;
    background-color: white;
  }
  
  .section__text {
    align-self: center;
    text-align: center;
    width: 25rem;
  }
  .section__text__title h1{
      font-weight: 200;
      font-size: 2.5rem;
  
  }
  .section__text__para {
    font-weight: 600;
    font-size: 1rem;
    margin: 15px;
  }
  
  .section__image img {
    height: 30rem;
    width: 30rem;
  }
  </style>