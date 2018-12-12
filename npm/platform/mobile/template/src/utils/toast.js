//基于cube-ui的toast
import Vue from "vue";
/* global _ */
let time = 3000; //toast默认显示时间
let tip = null; //所有toast都维护在tip这一个变量上

//toast
function info(params = "") {
  if (_.isObject(params)) {
    tip = Vue.prototype.$createToast
      .call(Vue, {
        type: "warn",
        time,
        ...params
      })
      .show();
  } else if (_.isString(params)) {
    console.log("string");
    tip = Vue.prototype.$createToast
      .call(Vue, {
        txt: params,
        type: "warn",
        time
      })
      .show();
  } else {
    console.error("$toast.info参数必须为对象或字符串！");
  }
}

function error(message = "") {
  if (!_.isString(message)) {
    console.warn("$toast.error参数必须为字符串！");
    message = message.toString();
  }
  tip = Vue.prototype.$createToast
    .call(Vue, {
      type: "error",
      txt: message,
      time
    })
    .show();
}

function success(message = "") {
  if (_.isString(message)) {
    tip = Vue.prototype.$createToast
      .call(Vue, {
        type: "correct",
        txt: message,
        time
      })
      .show();
  } else {
    console.error("$toast.success参数必须为字符串！");
  }
}

export function toast(message) {
  if (_.isString(message)) {
    tip = Vue.prototype.$createToast.call(Vue, {
      type: "loading",
      txt: message,
      time
    });
    //try catch块内代码只是为了去掉icon，目前cube-ui还没有不带icon的toast create api，暂时用一下代码处理下
    try {
      tip.$el.getElementsByClassName("cube-loading")[0].remove();
      tip.$el.getElementsByClassName("cube-toast-tip")[0].style.marginLeft = 0;
    } catch (error) {}

    tip.show();
  } else {
    console.error("$toast.success参数必须为字符串！");
  }
}

toast.info = info;
toast.error = error;
toast.success = success;

/**
 * 显示一个loading加载提示框
 * @param {String} message 可选
 */
export function loading(message = "") {
  if (_.isString(message)) {
    tip && tip.remove(); //清除之前toast的实例
    loading.target && loading.target.hide();
    loading.target = Vue.prototype.$createToast.call(Vue, {
      txt: message,
      type: "loading",
      time: 0 //设置为0，不自动关闭
    });

    loading.target.show();
    //提供两个方法关闭loading
    loading.close = function() {
      this.target.hide();
    };
    loading.hide = loading.close;
  } else {
    console.error("$loading参数必须为字符串！");
  }
}

Vue.prototype.$toast = toast;

Vue.prototype.$loading = loading;

//使用方式：

// this.$toast();
// this.$toast("message");
// this.$toast.info("message");
// this.$toast.error("message");
// this.$toast.success("message");

// this.$loading()
// this.$loading('message')
