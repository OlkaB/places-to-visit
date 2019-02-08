import Vue from 'vue'
import Vuex from 'vuex'
import { checkByValueIfObjectIsInArray } from '@/utils/array-methods.js'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    layout: {
      isMenuVisible: false
    },
    user: {
      name: 'John Doe'
    },
    places: []
  },

  getters: {
    places (state) {
      return state.places;
    },
    userName (state) {
      return state.user.name;
    },
    checkIfPlaceIsOnList: state => placeId => {
      return checkByValueIfObjectIsInArray(state.places, 'id', placeId);
    }
  },

  mutations: {
    removePlaceFromList (state, placeId) {
      state.places = state.places.filter(function (place) {
        return (place.id) !== (placeId);
      });
    },
    addPlaceToList (state, placeData) {
      const isPlaceInArr = checkByValueIfObjectIsInArray(state.places, 'id', placeData['id']);

      if (isPlaceInArr) {
        return;
      }

      state.places.unshift(placeData);
    }
  },

  actions: {

  }
})
