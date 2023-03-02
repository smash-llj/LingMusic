import Vue from 'vue';
import Vuex from "vuex";
const actions = {
    song(context, value) {
        context.commit('songDeTail', value)
    }
};
const mutations = {
    songDeTail(state, value) {
        state.gb = value
    }
};
const state = {
    gb: false
};
Vue.use(Vuex)
export default new Vuex.Store({
    actions,
    mutations,
    state
})