import Vue from "vue";
import { wxInit } from "@/utils/wx";
//微信js-sdk签名
Vue.prototype.$wxSign = function(url) {
  /* global vm */
  if (!vm) {
    console.warn("vm不存在，请将vue实例保存到全局变量vm中");
  }
  let $wxSign = Vue.prototype.$wxSign;
  $wxSign.timer && clearTimeout($wxSign.timer);
  $wxSign.timer = setTimeout(_ => {
    vm.$store
      .dispatch("getSingedWX", { url })
      .then(config => {
        console.log("config---初始化wxInit", config);
        return wxInit(config);
      })
      .then(response => {
        console.log("config成功");
        $wxSign.resolve();
      })
      .catch(err => {
        $wxSign.reject(err);
      });
  }, 0);
  //微信签名队列，为了避免在短时间内多次调用$wxSign方法重复签名同一个url（如：同一个页面存在多个图片选择上传组件时），现将签名任务存放在队列中（用来接收成功回调），然后实际上只执行一次wxInit签名，待wxInit成功后，依次触发队列中的签名回调，下发签名成功通知
  $wxSign.$wxSignQueue = $wxSign.$wxSignQueue || [];
  let promise = new Promise((resolve, reject) => {
    $wxSign.$wxSignQueue.push({ resolve, reject });
  });
  return promise;
};

Vue.prototype.$wxSign.resolve = function() {
  Vue.prototype.$wxSign.$wxSignQueue &&
    Vue.prototype.$wxSign.$wxSignQueue.forEach(item => {
      item.resolve();
    });
};

Vue.prototype.$wxSign.reject = function() {
  Vue.prototype.$wxSign.$wxSignQueue &&
    Vue.prototype.$wxSign.$wxSignQueue.forEach(item => {
      item.reject();
    });
};
