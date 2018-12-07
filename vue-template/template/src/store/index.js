import Vuex from "vuex";
import Vue from "vue";
import mutations from "./mutations";
import actions from "./actions";
import state from "./state";
import getters from "./getters";

/**
 * 以下是网易云信demo的store，现在同我们项目的store进行合并
 */
import Xmutations from "pages/chat/store/mutations";
import Xstate from "pages/chat/store/state";
import Xactions from "pages/chat/store/actions";
Vue.use(Vuex);
const store = new Vuex.Store({
  state: { ...state, ...Xstate },
  mutations: { ...mutations, ...Xmutations },
  actions: { ...actions, ...Xactions },
  getters: getters
});

export default store;
