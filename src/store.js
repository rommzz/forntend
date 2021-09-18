import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

/* eslint no-tabs: ["error", { allowIndentationTabs: true }] */
export default new Vuex.Store({
  state: {
    barColor: 'rgba(0, 0, 0, .8), rgba(0, 0, 0, .8)',
    barImage: 'https://demos.creative-tim.com/material-dashboard/assets/img/sidebar-1.jpg',
    drawer: null,
  },
  mutations: {
    SET_BAR_IMAGE (state, payload) {
      state.barImage = payload
    },
    SET_DRAWER (state, payload) {
      state.drawer = payload
    },

    basic (state, payload) {
      state[payload.key] = payload.value
    },

    setting (state, payload) {
      state.settings[payload.key] = payload.value
    },

    /* User */
    setUserData (state, userData) {
      state.user = userData
      localStorage.setItem('user', JSON.stringify(userData))
      axios.defaults.headers.common.Authorization = `Bearer ${userData.token}`
    },

    clearUserData () {
      localStorage.removeItem('user')
      location.reload()
    },
  },
	getters: {
    user: state => {
      return state.user
    },
    isLogged: state => !!state.user,
	},
  actions: {
		login ({ commit }, credentials) {
      return axios
        .post('/login', credentials, {
          headers: {
          'Content-Type': 'application/json',
        },
})
        .then(({ data }) => {
          commit('setUserData', data)
          localStorage.removeItem('userLoginAttempt')
        })
        .catch(err => {
					console.log(err)
        })
    },

    logout ({ commit }) {
      commit('clearUserData')
    },
  },
})
