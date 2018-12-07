/*
 * actions - 封装系统里各种数据请求接口。
 */
import Vue from 'vue'
import qs from 'qs'
import _ from '../typeof'

/**
 * 根据传入的url、method以及data数据发起请求，并返回一个promise对象。
 * @param {请求地址} url
 * @param {请求方法，'GET'或者'POST'或者'PUT'} method
 * @param {请求数据，应该为json对象} data
 */
export default function request (
  url,
  method = 'GET',
  data,
  option = { headers: { 'content-type': 'application/json;charset=UTF-8' } },
  extra = { options: { url: '', method: '' } } // 这个字段用于方便plugins中拓展一些功能
) {
  if (!_.isObject(extra)) {
    return console.error('参数extra必须为对象 at src/request/index.js')
  }
  extra.options = extra.options || {}
  extra.options.url = url
  extra.options.method = method
  extra.options.headers = extra.options.headers || option.headers
  if (!extra.options.params && !extra.options.data) {
    // 如果extra.options中没有指定参数放置位置，使用默认策略
    if (method.toLocaleLowerCase() === 'get') {
      // get方法默认将参数放到params（即用？的形式跟参数）
      extra.options.params = data
    } else {
      if (option.headers['content-type'] !== 'application/json;charset=UTF-8') {
        extra.options.data = qs.stringify(data)
      } else {
        extra.options.data = data
      }
    }
  }
  return Vue.prototype.$http(extra.options).catch(err => {
    let message = ''
    console.error(err.response)
    let data = err.response && err.response.data
    message = parseError(data)
    return Promise.reject(message)
  })
}

export function parseError (data) {
  let { status, detail } = data
  detail = detail || '请求错误'
  if (status >= 500) {
    return '好像出了点意外，请稍后重试'
  } else if (status === 400) {
    return detail
  } else if (status === 401) {
    return '尚未授权'
  } else if (status === 403) {
    return '尚未登录'
  } else if (status === 404) {
    return '未找到'
  }
  return '未知错误'
}
