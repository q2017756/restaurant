import Vuex from "vuex";

import demo from "./modules/demo";
import todos from "./modules/todos";

const createStore = () => {
  return new Vuex.Store({
    modules: {
      demo,
      todos
    }
  });
};

export default createStore;
