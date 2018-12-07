// 将body中参数拼接到路径上
import qs from 'qs'

export default function (http) {
  let newHttp = function (...rq) {
    let [url, , data] = rq
    url = url + '?' + qs.stringify(data)
    rq[0] = url
    rq[2] = {}
    return http(...rq)
  }
  return newHttp
}
