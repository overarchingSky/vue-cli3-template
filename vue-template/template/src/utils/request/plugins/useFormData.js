// 将参数序列化到form-data中
export default function (http) {
  let newHttp = function (...rq) {
    let [, , data, extra] = rq
    // form-data
    let formData = new FormData()
    for (let i in data) {
      formData.append(i, data[i])
    }
    rq[2] = formData
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
