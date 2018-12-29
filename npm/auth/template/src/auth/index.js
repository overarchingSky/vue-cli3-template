import Vue from 'vue'
import VueAuth from '@websanova/vue-auth'
import router from '../router'
import config from './config'
<% if(platform == 'wechat') { %>
import { loginType } from './loginType'
<% } %>

Vue.router = router
// 初始化auth模块
Vue.use(VueAuth, config)

// 是否已经登录
Vue.prototype.$auth.hasLogined = Vue.prototype.$auth.watch.authenticated

<% if(platform == 'wechat') { %>
//挂载登录方式到$auth上,这里加入session是为了防止刷新页面导致loginType重置为默认值
Vue.prototype.$auth.loginType = sessionStorage.getItem('loginType') || loginType
//切换登录方式为授权登录
Vue.prototype.$auth.useAuthorization = function() {
  Vue.prototype.$auth.loginType = 'authorization'
  sessionStorage.setItem('loginType', Vue.prototype.$auth.loginType)
}
//切换登录方式为自有的account方式（如：账号+密码，手机号+验证码等）
Vue.prototype.$auth.useApi = function() {
  Vue.prototype.$auth.loginType = 'api'
  sessionStorage.setItem('loginType', Vue.prototype.$auth.loginType)
}
console.log('* 使用vm.$auth.useAuthorization()可切换到授权登录')
console.log('* 使用vm.$auth.useApi()可切换到账号密码登录或手机验证码登录')

//本地机localhost时默认使用api模式
if(window.location.host.indexOf('localhost') > -1 && process.env.NODE_ENV && process.env.NODE_ENV === 'development'){
  Vue.prototype.$auth.useApi()
  console.log('! 当前是localhost环境，已默认使用API模式')
}
<% } %>