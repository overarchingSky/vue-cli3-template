//授权信息配置
export let authorization = {
  url(vm) {
    let url =
      window.location.protocol +
      "//" +
      window.location.host +
      "/_authorizationCallback";
    return vm.$store.dispatch("getAuthorizationUrl", {
      url
    });
  }
};
