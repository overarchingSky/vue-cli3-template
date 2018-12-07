/**
 * auth driver - 用于修改登录和请求中的权限验证逻辑
 */
module.exports = {
  request: function(req, token) {
    this.options.http._setHeaders.call(this, req);
  },
  response: function(res) {
    //目前采用的cookie的方式，在接口请求时自动添加token，这里就无需返回token了，但为了能触发vue-auth使其能记住登录状态，这里随便返回一个字符串
    return "mk_token";
  }
};
