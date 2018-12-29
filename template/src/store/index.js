import Vuex from 'vuex'
import Vue from 'vue'
import mutations from './mutations'
import actions from './actions'
import state from './state'
import getters from './getters'

Vue.use(Vuex)
const store = new Vuex.Store({
  state,
  mutations,
  actions,
  getters
})

export default store
