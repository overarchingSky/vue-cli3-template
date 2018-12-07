<template>
    <div></div>
</template>

<script>
import { authorization } from "platform/wechat/config";

export default {
    beforeRouteEnter (to, from, next) {
        next(vm => {
            //保存触发授权的路由，方便授权成功后的重定向
            let redirect = vm.$auth.redirect();
            let url = redirect ? redirect.from.path : from.path;

            console.log("_authorizationFrom:",url);
            localStorage.setItem("_authorizationFrom", url);
            //保存触发授权的路由，方便授权成功后的重定向 end
        })
    },
    beforeCreate() {
        //尝试获取下用户数据，如果能获取到，则表明存在有效的cookie，直接静默登录
        //如果获取失败，则表明用户未登录过，过cookie过期，需要登录
        this.$auth.fetch({
            ...this.$auth.options.fetchData,//解构/auth/config.js里配置的fetchData
            success(data) {
                let url = localStorage.getItem("_authorizationFrom") || '/';
                //静默登录
                console.log("静默登录");
                this.$router.replace(url);
            },
            error() {
                //未登录
                console.log("未登录");
                sessionStorage.setItem('_authorization','false')
                //根据配置的登录方式，导向不同的登录页面
                if(this.$auth.loginType == 'api'){
                    console.log("账号密码或短信验证登录");
                    //账号密码或短信验证登录
                    this.$router.replace('/login')
                }else{

                    console.log("授权登录 step-1:获取授权登录地址，并重定向到该地址");
                    //授权登录 step-1:获取授权登录地址，并重定向到该地址
                    if (_.isFunction(authorization.url)) {
                        console.log("isFunction(authorization.url): true");
                        authorization.url(this).then(authorizationUrl => {
                            
                            console.log("location.href = authorizationUrl;");
                            console.log("location.href: ",authorizationUrl);
                            location.href = authorizationUrl;
                        });
                    } else {

                        console.log("isFunction(authorization.url): false");
                        console.log("location.href = authorizationUrl;");
                        console.log("location.href: ",authorization.url);
                        location.href = authorization.url;
                    }
                    //setp-1成功后会重定向到/_authorizationCallback页面，即au.vue
                }
            }
        });
    }
}
</script>

<style>

</style>
