import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from "vuex-persistedstate";
import Cookies from 'js-cookie'

Vue.use(Vuex)

export const store = new Vuex.Store({

  state: {
        isAuth: false,
        username: "",
        fname: "",
        lname: "",
  },
  plugins: [createPersistedState({
    storage: {
      getItem: key => Cookies.get(key),
      setItem: (key, value) => Cookies.set(key, value, { expires: 3, secure: true }),
      removeItem: key => Cookies.remove(key)
    }
  })],
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