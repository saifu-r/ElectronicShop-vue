import { createStore } from 'vuex'

export default createStore({
  state: {
    categories:[
      {image: require('../assets/category/phone.png'), title: 'Phone'},
      {image: require('../assets/category/laptop.png'), title: 'Laptop'},
      {image: require('../assets/category/tv.png'), title: 'TV'},
      {image: require('../assets/category/headphone.png'), title: 'Headphone'},
      {image: require('../assets/category/smartwatch.png'), title: 'Smart Watch'},
      {image: require('../assets/category/camera.png'), title: 'Camera'},
      {image: require('../assets/category/printer.png'), title: 'Printer'},
      {image: require('../assets/category/monitor.png'), title: 'Monitor'},
      {image: require('../assets/category/keyboard.png'), title: 'Keyboard'},
      {image: require('../assets/category/mouse.png'), title: 'Mouse'},
    ]
  },
  getters: {
    categories(state){
      return state.categories
    }
  },
  mutations: {
  },
  actions: {
  },
  modules: {
  }
})
