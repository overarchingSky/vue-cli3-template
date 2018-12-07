// 将参数放置到body里
export default function (http) {
  let newHttp = function (...rq) {
    let [, method, data, extra] = rq
    if (method.toUpperCase() === 'GET') {
      console.warn(
        'axios中，get请求，body内的参数将被忽略，若要使用body传递参数，请使用其它请求方式或更换请基础求库'
      )
    }
    extra = {
      ...extra,
      options: {
        data
      }
    }
    return http(...rq, extra)
  }
  return newHttp
}
