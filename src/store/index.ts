import Vue from 'vue'
import Vuex from 'vuex'
import { STORE_MUTATION_UPDATE_INTRO_DONE, DIFFICULTY_EASY, STORE_MUTATION_UPDATE_DIFFICULTY } from '@/const/storeConsts';

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    introDone: false,
    gameDifficulty: DIFFICULTY_EASY
  },
  mutations: {
    [STORE_MUTATION_UPDATE_INTRO_DONE](state, payload) {
      state.introDone = payload;
    },
    [STORE_MUTATION_UPDATE_DIFFICULTY](state, payload) {
      state.gameDifficulty = payload;
    }
  },
  actions: {
  },
  modules: {
  }
})
