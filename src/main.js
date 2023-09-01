import Vue from 'vue'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import App from './App.vue'
import router from '../src/router/index'
import store from "../src/store/index";


Vue.config.productionTip = false
import '../src/assets/font/iconfont.css'
Vue.use(ElementUI);

import VueLazyload from 'vue-lazyload'
Vue.use(VueLazyload)

new Vue({
  render: h => h(App),
  beforeCreate() {
    Vue.prototype.$bus = this  //安装全局事件总线
  },
  router,
  store
}).$mount('#app')
