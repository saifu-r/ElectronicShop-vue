// firebase.ts
import { initializeApp } from 'firebase/app';
import { getStorage } from 'firebase/storage';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyAS_OCWFzEVH8y7QBxtTYr7ZwnoceR1uSo",
    authDomain: "vue-gadget-shop-f7997.firebaseapp.com",
    projectId: "vue-gadget-shop-f7997",
    storageBucket: "vue-gadget-shop-f7997.appspot.com",
    messagingSenderId: "613420459137",
    appId: "1:613420459137:web:b897f19dc69068d9311980",
    measurementId: "G-99244PEL2C"
  };

const app = initializeApp(firebaseConfig);
const storage = getStorage(app);
const db = getFirestore(app);

export { storage, db };