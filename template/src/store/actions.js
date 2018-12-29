import * as fetch from "../utils/action";

export default {
  //更新用户信息
  updateUserInfo(ctx, data) {
    return fetch.updateUserInfo(data).then(response => {
      console.log("ctx", response);
      ctx.dispatch("refreshUserInfo");
      return response.data;
    });
  },
  //刷新用户信息
  refreshUserInfo(ctx) {
    /* global vm */
    vm.$auth.fetch({ ...vm.$auth.options.fetchData })
  },
  <% if(platform == 'wechat') { %>
  //获取微信授权登录地址（不可删除）
  getAuthorizationUrl(ctx, data) {
    //data: {url:'***'} url为授权成功后的回跳地址
    return fetch.getAuthorizationUrl(data).then(response => {
      ctx.commit("updateAuthorizationUrl", response.data);
      return response.data;
    });
  },
  //获取微信授权用户是否已经注册过 （不可删除）
  hasRegister(ctx, data) {
    return fetch.hasRegister(data).then(response => {
      return response.data;
    });
  },
  //微信图片上传签名（不可删除）
  getSingedWX(ctx, data) {
    return fetch.getSingedWX(data).then(response => {
      return response.data;
    });
  },
  <% } %>
  //获取手机验证码（不可删除）
  getCode(ctx, data) {
    return fetch.getCode(data);
  },
};
