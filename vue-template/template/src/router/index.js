import Vue from 'vue'
import Router from 'vue-router'
<% if(platform == 'wechat') { %>import authRedirect from './authRedirect'<% } %>
Vue.use(Router)

// 定义路由规则
let router = new Router({
  mode: 'history',
  routes: [
    <% if(platform == 'wechat') { %>...authRedirect,<% } %>
    // {
    //   path: "/login",
    //   name: "login",
    //   component: resolve => require(["pages/login"], resolve),
    //   meta: { auth: false, view: "defaultView" }
    // }
  ]
})

/*
 * 路由拦截，每次路劲切换时触发，一般用来进行权限判定，更多使用方式参见vue-router导航钩子
 * to: 跳转目标的路由对象
 * from：跳转前的路由对象
 * next: 如果需要拦截跳转，则用next(false),否则用next()
 */
router.beforeEach((to, from, next) => {
  if (to.meta.requireManagerValidated) {
    // 先判断是否已登录，没登录的话，跳转到登录界面
    // 尝试获取下用户数据，如果能获取到，则表明存在有效的cookie，直接静默登录
    // 如果获取失败，则表明用户未登录过，过cookie过期，需要登录
    /* global vm */
    vm.$auth.fetch({
      ...vm.$auth.options.fetchData, // 解构/auth/config.js里配置的fetchData
      success (data) {
        // 判断访问该路由时，当前用户是否必须先通过后台认证
        if (vm.$auth.user().doctor.is_valid) {
          next()
        } else {
          vm.$toast.info('您的医生信息尚未认证，请等待后台认证后再使用此功能')
        }
      },
      error () {
        next({ path: '/login' })
      }
    })
  } else {
    next()
  }
})

export default router
