chalk = require('chalk')
const {inject} = require('vue-cli-helper-utils')
module.exports = async (api, options, rootOptions) => {  
    api.extendPackage({
      devDependencies:{
        "vue-wechat-title": "^2.0.4",
        "weixin-js-sdk": "^1.3.2"
      }
    })
    api.postProcessFiles(files => {
      inject('src/main.js',[`// 微信授权、登录`,`import '@/router/authorization.js'`,`Vue.use(require('vue-wechat-title'))`],files)
    })

    await api.render('./template')
    console.log(chalk.green('✔') + '  微信化完毕')
  }