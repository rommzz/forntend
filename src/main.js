// =========================================================
// * Vuetify Material Dashboard - v2.1.0
// =========================================================
//
// * Product Page: https://www.creative-tim.com/product/vuetify-material-dashboard
// * Copyright 2019 Creative Tim (https://www.creative-tim.com)
//
// * Coded by Creative Tim
//
// =========================================================
//
// * The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './plugins/base'
import './plugins/chartist'
import './plugins/vee-validate'
import vuetify from './plugins/vuetify'
import i18n from './i18n'
import axios from 'axios'

Vue.config.productionTip = false
/* eslint-disable */
axios.defaults.baseURL = 'http://localhost:8000/api/'


/* eslint-enable */

new Vue({
  router,
  store,
  vuetify,
  i18n,
  created () {
    const user = JSON.parse(localStorage.getItem('user'))
    if (user) {
      this.$store.dispatch('storeUser', user)
    }
  },
  render: h => h(App),
}).$mount('#app')
