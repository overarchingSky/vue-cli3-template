chalk = require('chalk')
module.exports = async (api, options, rootOptions) => {  
    api.extendPackage({
      devDependencies:{
        "@websanova/vue-auth": "github:websanova/vue-auth",
      }
    })
    await api.render('./template',options)
    api.injectImports('src/main.js',"import './auth'")
    console.log(chalk.green('✔') + '  vue-auth模块加载完毕')
  }