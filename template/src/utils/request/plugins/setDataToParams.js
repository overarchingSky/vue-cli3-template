// 将参数放置到params里（路径后？跟参数的形式）
export default function (http) {
  let newHttp = function (...rq) {
    let [, , data, extra] = rq
    extra = {
      ...extra,
      options: {
        params: data
      }
    }
    return http(...rq, extra)
  }
  return newHttp
}
