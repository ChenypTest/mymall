import Vue from 'vue'
//引入
// import NutUI from '@nutui/nutui';
// import '@nutui/nutui/dist/nutui.css';
import App from './App.vue'
import router from './router/index'

Vue.config.productionTip = false

//原型
Vue.prototype.$bus=new Vue()

//使用
// NutUI.install(Vue);
document.title = "首页"

new Vue({
  render: h => h(App),
  router
}).$mount('#app')

//初始化主页

router.beforeEach((to, from, next) => {
  /* 路由发生变化修改页面title */
  if (to.meta.title) {
    document.title = to.meta.title
  }
  next()
})
