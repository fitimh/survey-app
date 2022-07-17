import {createStore} from "vuex";
import httpAxios from "../utils/httpAxios";

const store = createStore({
   state: {
      user: {
         data: {},
         token: sessionStorage.getItem("TOKEN"),
      },
   },
   getters: {},
   actions: {
      register({commit}, user) {
         return httpAxios.post("/auth/register", user).then(({data}) => {
            commit("setUser", data);
            return data;
         });
      },
      login({commit}, user) {
         return httpAxios.post("/auth/login", user).then(({data}) => {
            commit("setUser", data);
            return data;
         });
      },
   },
   mutations: {
      logout: (state) => {
         state.user.token = null;
         state.user.data = {};
      },
      setUser: (state, userData) => {
         state.user.token = userData.token;
         state.user.data = userData.user;
         sessionStorage.setItem("TOKEN", userData.token);
      },
   },
   modules: {},
});
export default store;
