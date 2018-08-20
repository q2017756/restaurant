import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

const state = {
  token: null,
  isRoot: true
}

// actions
const actions = {
  login: ({ commit },data) => commit('login',data),
  logout: ({ commit }) => commit('logout'),
}

// mutations
const mutations = {
  login (state, data) {
    localStorage.token = data;
    state.token = data;
  },
  logout (state) {
    localStorage.removeItem('token');
    state.token = null
  }
}

// getters
const getters = {
  tokenExits: state => state.token ? true : false
}

export default new Vuex.Store({
  state,
  getters,
  actions,
  mutations
});
