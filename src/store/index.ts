import { ref } from "vue";
import { createStore } from "vuex";
import { collection, getDocs, addDoc, Timestamp } from "firebase/firestore";
import {
  ref as storageRef,
  uploadBytes,
  getDownloadURL,
} from "firebase/storage";
import { db, storage } from "@/firebase";

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

    products: [
      {
        name: "",
        price: "",
        description: "",
        category: "",
        brand: "",
        imageUrl: "",
        timestamp: "",
      },
    ],
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
    saveProduct(state, payload) {
      state.products.push(payload);
    },
  },

  actions: {
    async fetchProducts(context) {
      const products = ref();
      try {
        const productsCollection = collection(db, "products");
        const querySnapshot = await getDocs(productsCollection);
        products.value = querySnapshot.docs.map((doc) => doc.data());
      } catch (error) {
        console.error("Error fetching data:", error);
      }
      context.commit("fetchProducts", products);
    },


    async saveProduct(context, payload) {
      const fileName = `product_${Date.now()}_${payload.name}`;
      const storageReference = storageRef(storage, "products/" + fileName);

      try {
        await uploadBytes(storageReference, payload.photo);
        const downloadURL = await getDownloadURL(storageReference);
        const productsCollection = collection(db, "products");


        const newProduct= {
          name: payload.name,
          price: payload.price,
          description: payload.description,
          category: payload.category,
          brand: payload.brand,
          imageUrl: downloadURL,
          timestamp: Timestamp.now(),
        }

        console.log(payload);
        

        await addDoc(productsCollection, newProduct);
        console.log("File uploaded successfully. Download URL:", downloadURL);
        context.commit('saveProduct', newProduct)
      } catch (error) {
        console.error("Error uploading file or storing product data:", error);
      }

     
    },
  },
  modules: {},
});
