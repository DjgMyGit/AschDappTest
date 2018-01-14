import Vue from 'vue';
import Vuex from "vuex";
Vue.use(Vuex);
const store = new Vuex.Store({
    state: {
        accout: null,
        secret: '',
    },
    mutations: {
        setAccount(state, payload) {
            state.accout = payload.account;
            state.secret = payload.secret;
        }
    },
    actions: {
        setAccount({ commit }, paylod) {
            commit("setAccount", paylod);
        }
    }
});
export default store;