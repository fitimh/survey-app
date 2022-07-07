import {createStore} from "vuex";

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
         return fetch(`http://localhost:8000/api/auth/register`, {
            headers: {
               "Content-Type": "application/json",
               Accpect: "application/json",
            },
            method: "POST",
            body: JSON.stringify(user),
         })
            .then((response) => response.json())
            .then((response) => {
               commit("setUser", response);
               return response;
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
