// 数据库，封装了各种接口的调用
import request from './request'

// 更新用户资料
export function updateUserInfo (data) {
  return request('/uaa/api/renter/information', 'POST', data)
}

// 获取微信授权登录地址
export function getAuthorizationUrl (data) {
  return request('wechat/api/public/authorization-url', 'GET', data)
}

/**
 * 获取微信授权用户是否已经注册过
 * @param {Object} data {code:***}
 */
export function hasRegister (data) {
  return request('uaa/api/public/authorize', 'POST', data)
}

// 获取登录验证码
export function getCode (data) {
  return request('/uaa/api/public/sendAuthorizeCode', 'GET', data)
}

// 绑定手机号码
export function bindMobile (data) {
  return request('uaa/api/bindPhoneNumber', 'POST', data)
}

// 获取签名后的微信sdk
export function getSingedWX (data) {
  // data {url:当前路径}
  return request('wechat/api/public/jsapi-signature', 'GET', data)
}
