// 添加公共参数
export default function (http, commonParams = {}) {
  let newHttp = function (...rq) {
    let [, , data] = rq
    rq[2] = {
      ...commonParams,
      ...data
    }
    return http(...rq)
  }
  return newHttp
}
