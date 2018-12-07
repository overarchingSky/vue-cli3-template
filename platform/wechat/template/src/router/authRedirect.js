//此为保留的授权路径，不可覆盖，删除，更改
//采用这种重定向方式,可跳转到外链
export default [
  {
    path: "/_authorization",
    meta: { view: "defaultView" },
    component(resolve) {
      return require(["./_authorization"], resolve);
    }
  },
  {
    path: "/_authorizationCallback",
    meta: { view: "defaultView" },
    component(resolve) {
      return require(["./au"], resolve);
    }
  }
];
