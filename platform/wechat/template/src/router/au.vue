<template>
    <div class="au"></div>
</template>

<script>
export default {
beforeCreate() {
    //检测下是否已经授权登录过，如果登录过，回退3次，回到触发授权登录前的页面
    let hasAuthorization = sessionStorage.getItem('_authorization')
    if(hasAuthorization && hasAuthorization === 'true'){
      console.log('已登录过，回退三次，到主界面')
      history.go(-3)
      return
    }
    //获取step-1成功后返回的code
    let {code:authorizationCode} = this.$router.currentRoute.query;
    console.log('authorizationCode:',authorizationCode)


    console.log('询问我们自己的后台系统，该code是否注册过');
    //setp-2:询问我们自己的后台系统，该code是否注册过
    this.$store.dispatch('hasRegister',{authorizationCode,type:'wechat-mp'})
    .then(response => {
      console.log('response',response)
      let {binded,authorizationCode} = response
      if(binded){

        console.log('该code在我们自己的系统中存在账户');
        console.log('直接微信静默登录，并跳转到目标页面');
        //setp-3:该code在我们自己的系统中存在账户，直接微信静默登录，并跳转到目标页面
        var redirect = localStorage.getItem("_authorizationFrom");
        console.log('redirect:',redirect);
        this.$auth.login({
          data:{
              type:'third_party',
              rememberMe: true,
              authorizationCode,
          },
          redirect:false,
          success:_ => {
            console.log("登录成功，跳转到："+location.protocol+"//"+location.hostname + redirect);
            //保存下授权登录过的标志
            sessionStorage.setItem('_authorization','true')
            location.href=location.protocol+"//"+location.hostname + redirect;
            // this.$router.replace(redirect)
          }
        });
      }else{
        //step-3:不存在账户，带着authorizationCode参数，跳转到注册页面注册一个新的账户或绑定到已有账户，在注册时，带上authorizationCode，会在后台自动与账户绑定，完成微信授权与我们账户的绑定流程
        //this.$router.replace(`/login/${authorizationCode}`)
            location.href=location.protocol+"//"+location.hostname+`/login/${authorizationCode}`;
            console.log("不存在账户，带着authorizationCode参数，跳转到注册页面：");
            console.log(location.protocol+"//"+location.hostname+redirect);
      }
    }).catch(errorMessage => {

      //此处代码是防止意外产生error的情况卡死在本页面
      try {

        console.log('在检查'+authorizationCode+'是否注册过时发生了有异常。');
        console.error('异常信息：',errorMessage)
        console.log(errorMessage.response)
        this.$toast.error('授权登录异常')
        setTimeout(() => {
          this.$router.back()
        }, 1500);
      } catch (error) {
        alert('授权登录异常，请稍后再试')
        this.$router.back()
      }
    })
  }
}
</script>

<style>

</style>
