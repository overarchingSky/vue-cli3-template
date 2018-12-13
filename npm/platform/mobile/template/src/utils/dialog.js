// 基于cube-ui的toast
import Vue from 'vue'
/* global _ */
let tmp = {
  btn: {
    confirm: {},
    cancel: {}
  }
}
// params
/**
 * params {
 *  title:String,
 *  content:String,
 *  btn:{
 *    confirm:{
 *      text:String
 *    },
 *    cancel:{
 *      text:String
 *    }
 *  }
 * }
 */
export function dialog (type, params) {
  if (!_.isObject(params) && !_.isString(params)) {
    return console.warn('confirm 参数必须为字符串或对象')
  }
  let data
  if (_.isString(params)) {
    data = tmp
    data.content = params
  } else {
    data = { ...tmp, ...params }
  }
  return new Promise((resolve, reject) => {
    new Vue()
      .$createDialog({
        type,
        title: data.title || '确认',
        content: data.content,
        confirmBtn: {
          text: data.btn.confirm.text || '确定',
          active: true,
          disabled: false,
          href: 'javascript:'
        },
        cancelBtn: {
          text: data.btn.cancel.text || '取消',
          active: false,
          disabled: false,
          href: 'javascript:'
        },
        onConfirm: resolve,
        onCancel: reject
      })
      .show()
  })
}

export function confirm (params) {
  return dialog('confirm', params)
}

export function alert (params) {
  return dialog('alert', params)
}

Vue.prototype.$confirm = confirm
Vue.prototype.$alert = alert
