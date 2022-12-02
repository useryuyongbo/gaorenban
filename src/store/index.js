import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    role:"none"
  },
  getters: {
  },
  mutations: {
    SET_IMPORT(state,roles){
      state.role=roles
    }
  },
  actions: {
  },
  modules: {
  }
})
