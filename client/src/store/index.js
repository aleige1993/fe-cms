
import Vue from 'vue';
import Vuex from 'vuex';
import actions from './actions';
import mutations from './mutations';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    global: {
      menuList: [],
      enumList: [],
    }
  },
  getters: {
    menuList(state) {
      return state.global.menuList;
    },
    enumList(state) {
      return state.global.enumList;
    }
  },
  actions,
  mutations
});

