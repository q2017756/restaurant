import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

const state = {
  token: null,
  isRoot: true,
  scheduleInfo: {

  }
}

// actions
const actions = {
  login: ({ commit },data) => commit('login',data),
  logout: ({ commit }) => commit('logout'),
  setScheduleInfo: ({ commit },data) => commit('setScheduleInfo',data),
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
  },
  setScheduleInfo (state, data) {
    localStorage.scheduleInfo = data;
    state.scheduleInfo = JSON.parse(data);
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
