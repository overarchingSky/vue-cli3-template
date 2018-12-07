// 添加header信息，返回一个新的request方法
export default function (http, header = {}) {
  let newHttp = function (...rq) {
    let option = rq[3] || {}
    option.headers = {
      ...option.headers,
      ...header // 这行和上一行会导致多种content-type出现，导致服务器拒绝。
    }
    rq[3] = option
    return http(...rq)
  }
  return newHttp
}
