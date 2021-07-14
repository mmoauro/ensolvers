import Vue from "vue";
import Vuex from "vuex";
const jwt = require("jsonwebtoken");
Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    token: null,
  },
  mutations: {
    setToken(state, token) {
      state.token = token;
      localStorage.setItem('token', token);
    },
    logout (state) {
      state.token = null;
      localStorage.removeItem('token');
    }
  },
  getters: {
    getToken: () => {
      const token = localStorage.getItem('token');
      if (token && token != null) {
        const user = jwt.decode(token);
        if (user && user.id && !isNaN(user.id))
          return token;
      }
      return null;
    }
  }
});
