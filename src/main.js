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

//前置路由守卫
// 实现效果，每次路由跳转前要进行判断本地存储有没有userInfo，没有的话跳转到登陆页面

router.beforeEach((to, from, next) => {
  let userInfo = localStorage.getItem("userInfo");
  if (!userInfo && to.name !== 'userLogin') {
    next(
      '/userLogin'
    )
  } else {
    next()
  }
})

new Vue({
  render: h => h(App),
  beforeCreate() {
    Vue.prototype.$bus = this  //安装全局事件总线
  },
  router,
  store
}).$mount('#app')
