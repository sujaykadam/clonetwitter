import Vue from 'vue'
import Vuex from 'vuex'
import App from './App.vue'
import './assets/tailwind.css'
import router from './router'
export const EventBus = new Vue();
import { store } from './store.js'

Vue.config.productionTip = false
Vue.use(Vuex)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
