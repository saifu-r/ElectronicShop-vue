<template>
    <li>
      <div>
        <img :src="image" :alt="title" />
      </div>
      <div>
        <h3>{{ title }}</h3>
        <div class="item__data">
          <div>
            Price per Item:
            <strong>${{ price }}</strong>
          </div>
          <div>
            Quantity:
            <strong>{{ qty }}</strong>
          </div>
        </div>
        <div class="item__total">Total: ${{ itemTotal }}</div>
        <button @click="removeItem">Remove</button>
      </div>
    </li>
  </template>
  
  <script lang="ts">
  import { computed, defineComponent } from "vue";
  import { useStore } from "vuex";
  
  export default defineComponent({
    props: ["prodId", "title", "image", "price", "qty"],
    setup(props) {
      const store= useStore()
      const itemTotal= computed(()=>{
          return (props.price * props.qty).toFixed(2)
      })
  
      const removeItem= ()=>{
          store.dispatch('removeToCartAction',{
            productId: props.prodId,
            
          })
      }
  
  
  
      return {itemTotal, removeItem}
    },
  });
  </script>
  
  <style scoped>
  li {
    margin: 1rem auto;
    padding: 1rem;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.26);
    text-align: center;
    max-width: 25rem;
  }
  
  img {
    width: 5rem;
    height: 5rem;
    border-radius: 50%;
    object-fit: cover;
  }
  
  .item__data {
    display: flex;
    justify-content: space-between;
  }
  
  .item__total {
    font-weight: bold;
    margin: 1rem 0;
    border-top: 1px solid #474747;
    border-bottom: 2px solid #474747;
    padding: 0.25rem 0;
    width: auto;
  }
  
  button {
    font: inherit;
    border: 1px solid #8f0030;
    background-color: #8f0030;
    color: white;
    border-radius: 30px;
    cursor: pointer;
    padding: 0.5rem 1.5rem;
  }
  
  button:hover,
  button:active {
    background-color: #53001c;
    border-color: #53001c;
  }
  </style>
  