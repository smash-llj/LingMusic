import Vue from 'vue';
import Vuex from "vuex";
import getters from './getters'
Vue.use(Vuex)

import persistedState from 'vuex-persistedstate'


const moduleFiles = require.context('./modules', true, /\.js$/)
const modules = moduleFiles.keys().reduce((modules, modulePath) => {
    const moduleName = modulePath.replace(/^\.\/(.*)\.\w+$/, '$1')
    const val = moduleFiles(modulePath)
    modules[moduleName] = val.default
    return modules
}, {})


const arr = []
for (const key in modules) {
    arr.push(key)
}

console.log(arr);
export default new Vuex.Store({
    modules,
    getters,
    plugins: [persistedState({
        key: 'music',
        paths: arr
    })]


})