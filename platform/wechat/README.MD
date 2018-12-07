## 项目微信（公众号）化插件

## 功能如下：

* 添加src/auth/loginType.js，配置微信登录方式
* 添加src/router/_authorization.vue，内部封装了判定授权并发起登录或账号密码登录逻辑
* 添加src/router/au.vue，授权登录回调页面，可在内部做动态跳转路由等
* 添加src/router/authRedirect.js,_authorization.vue与au.vue的router配置文件，导出的内容可直接合并到router实例化时的参数route中
* 添加src/platform代码
* 添加src/utils/wx.js，微信签名相关逻辑