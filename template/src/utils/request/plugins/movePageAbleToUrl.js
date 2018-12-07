// 将body中参数的pageable字段中的字段和值拼接到路径上
import qs from 'qs'

export default function (http) {
  let newHttp = function (...rq) {
    let [url, , data] = rq
    let { pageable, ...otherData } = data
    console.log('data', data, pageable, otherData)
    url = url + '?' + qs.stringify(pageable)
    rq[0] = url
    rq[2] = otherData
    console.log('rq', rq)
    return http(...rq)
  }
  return newHttp
}
