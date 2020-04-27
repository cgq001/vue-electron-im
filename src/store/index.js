import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

import screen from './module/screen'
import user from './module/user'
export default new Vuex.Store({
  state: {
    
  },
  mutations: {
  },
  actions: {
  },
  modules: {
    screen,
    user
  }
})
