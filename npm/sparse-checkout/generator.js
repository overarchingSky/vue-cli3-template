chalk = require('chalk')
module.exports = async (api, options, rootOptions) => {  
    api.extendPackage({
      devDependencies:{
        "shelljs": "^0.8.3"
      },
      scripts:{
        "pull:comp": "node ./scripts/git-pull-comp/index.js"
      }
    })
    await api.render('./template',options)
    console.log(chalk.green('✔') + '  按需加载模块加载完毕')
  }