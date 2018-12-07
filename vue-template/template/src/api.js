// uat环境和prod环境为运行时自动切换的，根据域名是否以uat-开头判断
function switchApiByDomain () {
  let config = {}
  Object.defineProperty(config, 'api_server', {
    get () {
      if (/^uat-/.test(location.host)) {
        return process.env.VUE_APP_UAT_API
      } else {
        return process.env.VUE_APP_API
      }
    }
  })
  return config
}

function api () {
  let config = null
  if (process.env.VUE_APP_APINAME === 'prod') {
    config = switchApiByDomain()
    console.warn('env:prod/uat')
  } else {
    config = {
      api_server: process.env.VUE_APP_API
    }
    console.warn('env:' + process.env.VUE_APP_APINAME)
  }
  return config
}

export default api()
