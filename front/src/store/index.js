import {createStore} from 'vuex'

const store = createStore ({
    state: {
        user: {
            data: {},
            token: sessionStorage.getItem("TOKEN"),
        }
    },
    getters: {},
    action: {
        register({commit}, user) {
            return fetch(`http://localhost:8000/api/register`, {
                headers: {
                    'Content-Type': 'application/json',
                    Accpect: 'application/json',
                },
                method: 'POST',
                body: JSON.stringify(user),
            })
            .then((res)=>res.json())
            .then((res)=> {
                commit("setUser",res);
                return res;
            })

        }
    },
    mutations: {
        logout:(state) => {
            state.user.token= null;
            state.user.data = {};
        },
        setUser: (state,userData)=> {
            state.user.token = userData.user;
            sessionStorage.setItem('TOKEN',userData.token)
        }
    },
    modules: {},

})
export default store;