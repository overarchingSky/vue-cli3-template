chalk = require('chalk')
const inject = require('./utils/inject')
module.exports = async (api, options, rootOptions) => {  
    api.extendPackage({
      devDependencies:{
        "vue-wechat-title": "^2.0.4",
        "weixin-js-sdk": "^1.3.2"
      }
    })
    api.postProcessFiles(files => {
      inject('src/main.js',`Vue.use(require('vue-wechat-title'))`,files)
    })
    await api.render('./template')
    console.log(chalk.green('✔') + '  微信化完毕')
  }