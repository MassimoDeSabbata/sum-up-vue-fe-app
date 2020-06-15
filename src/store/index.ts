import Vue from 'vue'
import Vuex from 'vuex'
import { STORE_MUTATION_UPDATE_INTRO_DONE } from '@/const/storeConsts';

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    introDone: false
  },
  mutations: {
    [STORE_MUTATION_UPDATE_INTRO_DONE](state, payload) {
      state.introDone = payload;
    }
  },
  actions: {
  },
  modules: {
  }
})
