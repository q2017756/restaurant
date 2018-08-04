import * as type from "./type";
import * as api from "./api";
export default {
  state: {
    name: "lee"
  },
  mutations: {
    setName: state => {
      state.name = "Fred Lee";
      // console.log(22222);
    }
  },
  actions: {
    [type.DEMO]({ commit }, params) {
      api.demo();
      commit("setName");
    }
  }
};
