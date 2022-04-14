import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export const store = new Vuex.Store({

  state: {
        isAuth: false,
        username: "",
        fname: "",
        lname: "",
  },

  mutations: {
    update(state, payload) {
      state.username = payload.username
      state.fname = payload.fname
      state.lname = payload.lname
    },
    login(state, payload) {
      state.isAuth = payload.isAuth
    }
  },

  actions: {
    inrementAction ({commit}, payload) {
      commit('incrementCounter', payload)
    }
  },

  getters: {
    counter (state) {
      return state.count
    }
  }
})