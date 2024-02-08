import { ref } from "vue";
import { createStore } from "vuex";
import { collection, getDocs, addDoc, Timestamp, query, where, deleteDoc, updateDoc, doc, getDoc, setDoc  } from "firebase/firestore";
import { ref as storageRef, uploadBytes, getDownloadURL} from "firebase/storage";
import {getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword} from "firebase/auth"
import { db, storage } from "@/firebase";
import Product from '@/types/Product'
import Element from '@/types/Element'
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
    userId: null,
    userEmail: null,
    token: null,

    element: <Element[]>[],
    totalSum: 0,
    totalQty: 0

  },


  getters: {
    categories(state) {
      return state.categories;
    },
    products(state) {
      return state.products;
    },
    userId(state) {
      return state.userId;
    },
    userEmail(state) {
      return state.userEmail;
    },
    token(state) {
      return state.token;
    },
    isAuthenticated(state) {
      return !!state.token;
    },
    element(state){
      return state.element
    },
    totalSum(state){
      return state.totalSum
    },
    totalQty(state){
      return state.totalQty
    }
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
      state.userId = payload.userId;
      state.userEmail = payload.userEmail;
      state.token = payload.token;
      state.element= payload.element;
      state.totalQty= payload.totalQty;
      state.totalSum= payload.totalSum
    },
    placeOrder(state, payload){
      state.element.push(payload) 
      state.totalQty += payload.qty
      state.totalSum += +payload.price * payload.qty
    }
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

    async deleteProduct({ commit }, name) {
      try {
        // Reference to the "products" collection
        const productsCollection = collection(db, "products");
  
        // Query the collection for the document with the specified name
        const querySnapshot = await getDocs(
          query(productsCollection, where("name", "==", name))
        );
  
        // If a document is found, delete it
        if (querySnapshot.size > 0) {
          const productDoc = querySnapshot.docs[0];
          await deleteDoc(productDoc.ref);
          console.log(`Product '${name}' deleted successfully.`);
  
          // Remove the product from every user's cart
          // not working
          const usersCollection = collection(db, "users");
          const usersSnapshot = await getDocs(usersCollection);
          usersSnapshot.forEach(async userDoc => {
            const userId = userDoc.id;
            const cartRef = doc(db, `carts/${userId}`);
            const cartSnapshot = await getDoc(cartRef);
            if (cartSnapshot.exists()) {
              const cartData = cartSnapshot.data();
              const updatedElement = cartData.element.filter((item: Element) => item.name !== name);
              await updateDoc(cartRef, { element: updatedElement });
              console.log(`Product '${name}' removed from user '${userId}' cart.`);
            }
          });
  
          // Commit the mutation to remove the product from the Vuex state
          commit('deleteProduct', name);
        } else {
          console.warn(`Product '${name}' not found.`);
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

  async registerUser({ commit, state }, payload) {
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

        const cartRef = doc(db, `carts/${user.uid}`)

        await setDoc(cartRef, {
          element: state.element,
          totalQty: state.totalQty,
          totalSum: state.totalSum
        });


        const token= user.getIdToken()
        // Handle successful registration
        commit('setUser', {
          token: await token,
          userEmail: user.email,
          userId: user.uid,
          element: state.element,
          totalQty: state.totalQty,
          totalSum: state.totalSum
        });

        localStorage.setItem('userEmail', payload.email)
        localStorage.setItem('userId', user.uid)
        localStorage.setItem('token', await token)

        console.log('User registered successfully.');
        router.replace('/gadget-shop')

    } catch (error) {
      console.error('Error updating topProduct:', error);
    }
  },

  async loginUser({ commit, state }, payload) {
    try {
      // Sign in with Firebase Authentication
      const userCredential = await signInWithEmailAndPassword(getAuth(), payload.email, payload.password);
      const user = userCredential.user;

      const cartRef = doc(db, `carts/${user.uid}`);
      const cartSnapshot = await getDoc(cartRef);
      
      const element= ref<Element[]>([])
      const totalQty= ref()
      const totalSum= ref()


      if (cartSnapshot.exists()) {
        const cartData = cartSnapshot.data();
        element.value = cartData.element;
        totalQty.value = cartData.totalQty;
        totalSum.value = cartData.totalSum;
      }

      const token= user.getIdToken()
      commit('setUser', {
          token: await token,
          userEmail: user.email,
          userId: user.uid,
          element: element.value,
          totalQty: totalQty.value,
          totalSum: totalSum.value,

        });

        localStorage.setItem('userEmail', payload.email)
        localStorage.setItem('userId', user.uid)
        localStorage.setItem('token', await token)

      console.log('User logged in successfully.');
      router.replace('/gadget-shop')

    } catch (error) {
      console.error('Error updating topProduct:', error);
    }
  },

  async tryLogin(context){
    const userId= localStorage.getItem('userId')
    const userEmail= localStorage.getItem('userEmail')
    const token= localStorage.getItem('token')

    const cartRef = doc(db, `carts/${userId}`);
    const cartSnapshot = await getDoc(cartRef);
    
    const element= ref<Element[]>([])
    const totalQty= ref()
    const totalSum= ref()


    if (cartSnapshot.exists()) {
      const cartData = cartSnapshot.data();
      element.value = cartData.element;
      totalQty.value = cartData.totalQty;
      totalSum.value = cartData.totalSum;
    }

    if(token && userId && userEmail){
      context.commit('setUser', {
        token: token,
        userId: userId,
        userEmail: userEmail,
        element: element.value,
        totalQty: totalQty.value,
        totalSum: totalSum.value
      })
    }
  },

  logoutUser(context){

    localStorage.removeItem('token')
    localStorage.removeItem('userId')
    localStorage.removeItem('userEmail')
    context.commit('setUser', {
      token: null,
      userEmail: null,
      userId: null,
      element: <Element[]>[],
      totalSum: 0,
      totalQty: 0
    });

    router.replace('/gadget-shop')
  },

  async placeOrder({ commit, state }, product) {
    try {
      // Check if the product is already in the cart
      const existingProductIndex = state.element.findIndex(item => item.name === product.name);

      // If the product is already in the cart, update its quantity
      if (existingProductIndex !== -1) {
        state.element[existingProductIndex].qty += product.qty;
      } else {
        // If the product is not in the cart, add it as a new product
        state.element.push(product);
      }

      // Update totalQty and totalSum in Vuex state
      state.totalQty += product.qty;
      state.totalSum += product.price * product.qty;

      // Get userId from Vuex state
      const userId = state.userId;

      // Define the cart document reference
      const cartRef = doc(db, `carts/${userId}`);

      // Get the cart document
      const cartSnapshot = await getDoc(cartRef);

      if (cartSnapshot.exists()) {
        // Update the existing cart document with updated element, totalQty, and totalSum
        await updateDoc(cartRef, {
          element: state.element,
          totalQty: state.totalQty,
          totalSum: state.totalSum
        });
      }

    } catch (error) {
      console.error('Error placing order: ', error)
    }
  },

  async removeToCartAction({ commit, state }, name) {
    try {
      // Find the index of the item to be removed
      const indexToRemove = state.element.findIndex(item => item.name === name.prodName);
      
      if (indexToRemove !== -1) {
        // Update totalQty and totalSum before removing the item
        state.totalQty -= state.element[indexToRemove].qty;
        state.totalSum -= state.element[indexToRemove].price * state.element[indexToRemove].qty;
        
        // Remove the item from the element array
        state.element.splice(indexToRemove, 1);

        // Get userId from Vuex state
        const userId = state.userId;

        // Define the cart document reference
        const cartRef = doc(db, `carts/${userId}`);

        // Update the cart document in Firestore with the updated element, totalQty, and totalSum
        await updateDoc(cartRef, {
          element: state.element,
          totalQty: state.totalQty,
          totalSum: state.totalSum
        });
      } else {
        console.log('Item not found in cart');
      }
    } catch (error) {
      console.error('Error removing item from cart: ', error);
    }
  }

  
  },
  modules: {},
});
