import { ref } from "vue";
import { createStore } from "vuex";
import { collection, getDocs, getDoc, addDoc, Timestamp, query, where, deleteDoc, updateDoc, doc  } from "firebase/firestore";
import { ref as storageRef, uploadBytes, getDownloadURL} from "firebase/storage";
import {getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword} from "firebase/auth"
import { db, storage } from "@/firebase";
import Product from '@/types/Product'
import router from "@/router";
import { useRoute } from "vue-router";

export default createStore({
  state: {
    categories: [
      { image: require("../assets/category/phone.png"), title: "Phone" },
      { image: require("../assets/category/laptop.png"), title: "Laptop" },
      { image: require("../assets/category/tv.png"), title: "TV" },
      { image: require("../assets/category/headphone.png"), title: "Headphone"},
      { image: require("../assets/category/smartwatch.png"), title: "Smart Watch",},
      { image: require("../assets/category/camera.png"), title: "Camera" },
      { image: require("../assets/category/printer.png"), title: "Printer" },
      { image: require("../assets/category/monitor.png"), title: "Monitor" },
      { image: require("../assets/category/keyboard.png"), title: "Keyboard" },
      { image: require("../assets/category/mouse.png"), title: "Mouse" },
    ],
    products: <Product[]>[],
    userEmail: null,
    token: null,

  },


  getters: {
    categories(state) {
      return state.categories;
    },
    products(state) {
      return state.products;
    },
    userEmail(state) {
      return state.userEmail;
    },
    token(state) {
      return state.token;
    },
  },


  mutations: {
    fetchProducts(state, payload) {
      state.products = payload;
    },
    saveProduct(state, payload) {
      state.products.push(payload);
    },
    deleteProduct(state, payload) {
      state.products = state.products.filter(product => product.name !== payload);
    },
    changeTop(state, payload) {
      const productToUpdate = state.products.find(product => product.name === payload);

      if (productToUpdate) {
          productToUpdate.topProduct = !productToUpdate.topProduct; // Toggle the value
      }
    },
    setUser(state, payload) {
      state.userEmail = payload.userEmail;
      state.token = payload.token;
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
          topProduct: false
        }
        await addDoc(productsCollection, newProduct);
        console.log("File uploaded successfully. Download URL:", downloadURL);
        context.commit('saveProduct', newProduct)
      } catch (error) {
        console.error("Error uploading file or storing product data:", error);
      }
    },

    async deleteProduct(context, payload) {
      try {
        // Reference to the "products" collection
        const productsCollection = collection(db, "products");
  
        // Query the collection for the document with the specified name
        const querySnapshot = await getDocs(
          query(productsCollection, where("name", "==", payload))
        );
        // If a document is found, delete it
        if (querySnapshot.size > 0) {
          const productDoc = querySnapshot.docs[0];
          await deleteDoc(productDoc.ref);
          console.log(`Product '${payload}' deleted successfully.`);
          context.commit('deleteProduct', payload);
        } else {
          console.warn(`Product '${payload}' not found.`);
        }
      } catch (error) {
        console.error("Error deleting product:", error);
      }
    },

    async changeTop(context, payload) {
      try {
          // Fetch the product document from Firestore
          const productRef = collection(db, 'products');
          const querySnapshot = await getDocs(productRef);
          const productDoc = querySnapshot.docs.find(doc => doc.data().name === payload);
          // Update the 'topProduct' field in Firestore
          if (productDoc) {
              await updateDoc(doc(db, 'products', productDoc.id), {
                  topProduct: !productDoc.data().topProduct, // Toggle the value
              });
          }
          // Commit the mutation to update the state
          context.commit('changeTop', payload);
      } catch (error) {
          console.error('Error updating topProduct:', error);
      }
  },

  async registerUser(context, payload) {
    try {
        // Create user in Firebase Authentication
        const userCredential = await createUserWithEmailAndPassword(getAuth(), payload.email, payload.password);
        const user = userCredential.user;

        // Store additional user information in Firestore
        const usersCollection = collection(db, 'users');
        await addDoc(usersCollection, {
            uid: user.uid,
            name: payload.name,
            email: user.email,
            phoneNumber: payload.phoneNumber,
        });

        // Handle successful registration
        context.commit('setUser', {
          token: user.getIdToken(),
          userEmail: user.email,

        });

        console.log('User registered successfully.');

    } catch (error) {
      console.error('Error updating topProduct:', error);
    }
  },

  async loginUser(context, payload) {
    try {
      const route= useRoute()
      // Sign in with Firebase Authentication
      const userCredential = await signInWithEmailAndPassword(getAuth(), payload.email, payload.password);
      const user = userCredential.user;

      context.commit('setUser', {
          token: user.to,
          userEmail: user.email,

        });

      console.log('User logged in successfully.');
      router.replace('/gadget-shop')

    } catch (error) {
      console.error('Error updating topProduct:', error);
    }
  },
  },
  modules: {},
});
