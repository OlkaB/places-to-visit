import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    layout: {
      isMenuVisible: false
    },
    user: {
      name: 'John Doe'
    }
  },

  getters: {
    userName (state) {
      return state.user.name;
    },
  },

  mutations: {
  },

  actions: {

  }
})
