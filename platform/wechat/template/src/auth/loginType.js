//配置使用的登录方式

//登录方式的可用值
export let loginTypeEnums = [
  "authorization" /*第三方授权登录*/,
  "api" /*调用接口，使用账号密码登录*/
];

//当前的登录方式
export let loginType = "authorization";
