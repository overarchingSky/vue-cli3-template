let config = {
  auth: require("./driver"),
  http: require("@websanova/vue-auth/drivers/http/axios.1.x.js"),
  router: require("@websanova/vue-auth/drivers/router/vue-router.2.x.js"),
  // 定义登录接口，并且在登录的时候自动获取用户信息
  loginData: {
    url: "/auth/login",
    method: "POST",
    rememberMe: true,
    fetchUser: true
  },
  // 定义登出接口，目前没有对服务器发起请求
  logoutData: {
    url: "/auth/logout",
    method: "PUT",
    makeRequest: false,
    redirect: "/login"
  },
  authRedirect: {
    <% if(platform == 'wechat') { %>path: "/_authorization"<% } else { %>path: "/_authorization"<% } %>
  },
  // 定义获取用户信息的接口
  fetchData: {
    url: "/evaluation/api/user/user_information",
    method: "GET",
    enabled: true,
    params: {
      
    }
  },
  refreshData: { enabled: false },
  // 自定义用户数据解析
  parseUserData: function(data) {
    data.id = data.droneUser.id;
    return data;
  }
  // check: function() {
  //   let userInfo = this.user();
  //   if (userInfo && !userInfo.mobile) {
  //     router.push("/_authorization");
  //   }
  // }
};
export default config;
