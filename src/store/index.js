import { createStore } from "vuex";

export default createStore({
  state: {
    token: 'notsetyet'
  },
  mutations: {
    setToken(state, token) {
      state.token = token;
    }
  }
});
