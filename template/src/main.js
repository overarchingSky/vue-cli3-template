import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './axios'
import api from './api'
//import './auth'
import './less'
import prototypes from './prototype'
import _typeof from '@/utils/typeof.js' // 将类型判定，挂载到全局_上
// 引入全局组件的js
import './register-global-components'
import '@/utils/toast'
import '@/utils/dialog'
window._ = _typeof

window.Vue = Vue

// 挂载变量到Vue.prototype上
for (const key in prototypes) {
  if (prototypes.hasOwnProperty(key)) {
    if (Vue.prototype[key]) {
      console.warn(`字段${key} 已经存在vue.prototype上，请使用其它字段名代替`)
      continue
    }
    Vue.prototype[key] = prototypes[key]
  }
}

// 设置所有请求的base url
Vue.axios.defaults.baseURL = api.api_server
// 是否带上cookie
Vue.axios.defaults.withCredentials = process.env.VUE_APP_WITHCREDENTIALS
/* eslint-disable no-new */

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
console.log('VUE_APP_TEST', process.env)
