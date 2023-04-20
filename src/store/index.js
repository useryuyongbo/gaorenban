import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    role:"none",
    id:"none",
    name1:"none",
  },
  getters: {
  },
  mutations: {
    SET_IMPORT(state,roles){
      state.role=roles
    },
    SET_ID(state,id){
      state.id=id
    },
    SET_NAME(state,name){
      state.name1=name
    }

  },
  actions: {
  },
  modules: {
  }
})
