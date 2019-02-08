import '@fortawesome/fontawesome-free/css/all.min.css'
import Vue from 'vue'
import './plugins/vuetify'
import App from './App.vue'
import router from './router'
import store from './store'

// Global filters
import '@/filters/array-filters'

export const eventBus = new Vue()

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
