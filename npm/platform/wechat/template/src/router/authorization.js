import Vue from 'vue'
import store from '@/store'
import url from '@/utils/url'
import _ from '@/utils/typeof'
import router from '@/router'

let vueAuth = Vue.prototype.$auth

export default class authorization {
    /* 登陆页面路由地址 */
    loginUrl
    /* 授权或登陆路径 */
    authUrl
    /* 授权成功后的回调地址或方法,该字段最终会被转化为一个包含域名的完整地址 */
    authCallBack
    /* 唤起授权的完整路劲，一般由authUrl和authCallBack组成 */
    fullUathUrl
    /* 授权成功最终指向的地址对象 */
    to
    /* 触发授权的地址对象 */
    from

    /**
     * @param {String} url 授权路径
     * @param {String|Function} cb 微信授权成功后跳转的路径，也可以配置成方法来动态计算该路径
     */
    constructor(options){

        let {loginUrl, authUrl, authCallBack, } = options
        this.loginUrl = loginUrl
        this.authUrl = authUrl
        this._formatAuthCallbackUrl(authCallBack)
        this._getFullAuthUrl()
    }
    
    /**
     * 开始登陆或授权
     * @param {Object} to router路由，即将访问的路由对象
     * @param {Object} from router路由，即将俩开的路由对象
     * @param {Function} next router路由，next方法
     */
    start(to,from,next){
        this.to = to || to
        this.from = from || 
        //利用cookie尝试登陆
        this._tryLogin()
        .then(_ => {
            //静默登录
            console.log('静默登录')
            if(next){
                next()
            }else{
                this.$router.push(to.path)
            }
        })
        .catch(_ => {
            console.log('静默登录失败，执行重新登陆程序...')
            if(vueAuth.loginType == 'api'){
                //账号密码或短信验证登录
                this.$router.push({path:this.loginUrl, query:{redirect:to.path}})
            }else{
                this._authorization()
            }
        })
    }
    /**
     * 开始授权
     */
    _authorization(){
        location.href = this.fullUathUrl
    }
    /**
     * 利用cookie尝试登陆
     */
    _tryLogin(){
        return new Promise((resolve,reject) => {
            vueAuth.fetch({
                ...vueAuth.options.fetchData,//解构/auth/config.js里配置的fetchData
                success(data) {
                    resolve(data)
                },
                error(data) {
                    reject(data)
                }
            });
        })
        
    }
    /**
     * 格式化authCallBack为带有域名的完整路劲
     * @param {String} authCallBack
     */
    _formatAuthCallbackUrl(authCallBack){
        if(/https?:\/\//.test(authCallBack)){
            this.authCallBack = authCallBack
        }else{
            this.authCallBack = url.join(window.location.protocol + '//' + window.location.host, authCallBack)
        }
    }
    /**
     * 用传入参数fun执行完获取到的url重写this.authUrl
     * @param {Function} fun 获取authUrl的方法
     */
    _getFullAuthUrl(){
        const authUrl = this.authUrl
        if(_.isFunction(authUrl)){
            //使用authUrl方法获取得到完整授权路劲
            try {
                authUrl(this.to.path).then(authUrl => {
                    this.fullUathUrl = authUrl
                })
            } catch (error) {
                console.error(error)
                console.error('authUrl方法必须返回一个promise对象，并且该promise resolve后仅返回一个url字符串')
            }
        }else{
            this.fullUathUrl = authUrl + this.authCallBack
        }
        
    }
}

//导出授权、登录对象实例
export const authorizationVM = new authorization({
    authUrl(cbUrl){
        return store.dispatch('getAuthorizationUrl', {
            url:cbUrl
        })
    },
    authCallBack: '/',
    loginUrl: process.env.VUE_APP_LOGINURL || '/login'
})
/**
 * 路由拦截，使用自己的逻辑来拦截
 * 这样做会导致如下优缺点：
 * 优点：
 * 当发起授权登录时，可直接在当前页面进行，无需跳转一个control页面，如果
 * 
 * 缺点：
 * 会使vue-auth对路由的拦截功能中，仅登录判定起作用
 * 为了避免上诉缺陷，与角色权限绑定的相关功能，请在界面布局上进行控制（比如直接隐藏掉用户不能访问的路由的相关跳转按钮、链接等）
 * 但需要注意的是，这样的处理并不十分可靠，用户在获取到被禁止访问的路由链接时，仍能访问
 */
router.beforeEach((to, from, next) => {
    if (to.meta.auth) {
      if (vueAuth.hasLogined) {
        next()
      } else if (from.params.redirect) {
        next(from.params.redirect)
      } else {
        // 这里需要获取当前url上特定的参数flag,
        let flag = false
        if (flag) {
          // flag参数是授权成功后回调的路径上的，如果为true，则表示需要在授权成功后进行部分逻辑，然后重定向到不同页面
          // 此种场景如：授权登录成功后，需要判定是否已经填写资料，如果填写了，则直接next(),如果没有，需要重定向到补充资料页面
          // 如果用户中断了资料填写，可在下次访问时，手动在url上带上flag参数，即可再次拦截
        } else {
            // 发起登录 or 授权
            authorizationVM.start(to, from, next)
        }
      }
    } else {
      next()
    }
  })