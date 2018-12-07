chalk = require('chalk')
const pluginTool = require('./utils/plugin-tool')
module.exports = async (api, options, rootOptions) => {  
    let plugin = new pluginTool(api,{...options,
      /* 以下参数是供cube-ui插件使用 */
      postCompile:true,
      importType:'partly',
      rem:true,
      amfeFlexible:false,
      vw:false
    },rootOptions)

    // 修改 `package.json` 里的字段
    api.extendPackage({
      dependencies:{
        "vconsole": "^3.2.0",
        "vee-validate": "2.1.0-beta.5",
      }
    })

    plugin.add('@vue/cli-plugin-cube-ui')
    await api.render('./template')
    console.log(chalk.green('✔') + '  移动化完毕')
  }