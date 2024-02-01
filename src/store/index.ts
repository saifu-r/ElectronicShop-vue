import { ref } from "vue";
import { createStore } from "vuex";
import { collection, getDocs } from 'firebase/firestore';
import { db } from '@/firebase';

export default createStore({
  state: {
    categories: [
      { image: require("../assets/category/phone.png"), title: "Phone" },
      { image: require("../assets/category/laptop.png"), title: "Laptop" },
      { image: require("../assets/category/tv.png"), title: "TV" },
      {
        image: require("../assets/category/headphone.png"),
        title: "Headphone",
      },
      {
        image: require("../assets/category/smartwatch.png"),
        title: "Smart Watch",
      },
      { image: require("../assets/category/camera.png"), title: "Camera" },
      { image: require("../assets/category/printer.png"), title: "Printer" },
      { image: require("../assets/category/monitor.png"), title: "Monitor" },
      { image: require("../assets/category/keyboard.png"), title: "Keyboard" },
      { image: require("../assets/category/mouse.png"), title: "Mouse" },
    ],

    products: [],
  },
  getters: {
    categories(state) {
      return state.categories;
    },
    products(state) {
      return state.products;
    },
  },
  mutations: {
    fetchProducts(state, payload) {
      state.products = payload;
    },
    saveProduct(state, payload){
      state.products.push(payload)
    }
  },
  actions: {
    async fetchProducts(context) {
      const products = ref();
      try {
        // Reference to the "products" collection
        const productsCollection = collection(db, "products");

        // Fetch documents from the collection
        const querySnapshot = await getDocs(productsCollection);

        // Map the documents to an array
        products.value = querySnapshot.docs.map((doc) => doc.data());
        // console.log("Fetched Products:", products);
        // console.log(products.value);

        // console.log("hello");
        
      } catch (error) {
        console.error("Error fetching data:", error);
      }
      context.commit('fetchProducts', products)
    },
  },
  modules: {},
});
