import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

const state = {
  token: null,
  isRoot: true,
  scheduleInfo: {

  },
  calendarData: [],
  calendarDataOne: [],
}

// actions
const actions = {
  login: ({ commit },data) => commit('login',data),
  logout: ({ commit }) => commit('logout'),
  setScheduleInfo: ({ commit },data) => commit('setScheduleInfo',data),
  setCalendarData: ({ commit },data) => commit('setCalendarData',data),
  setCalendarDataOne: ({ commit },data) => commit('setCalendarDataOne',data),
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
  },
  setCalendarData (state, data) {
    state.calendarData = data
  },
  setCalendarDataOne (state, data) {
    state.calendarDataOne = data
  },
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
