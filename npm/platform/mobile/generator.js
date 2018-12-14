chalk = require('chalk')
const {pluginTool} = require('vue-cli-helper-utils')
module.exports = async (api, options, rootOptions) => {  
    let plugin = new pluginTool(api,{...options,
      /* 以下参数是供cube-ui插件使用 */
      postCompile:true,
      importType:'partly',
      rem:false,
      amfeFlexible:false,
      vw:true
    },rootOptions)

    // 修改 `package.json` 里的字段
    api.extendPackage({
      dependencies:{
        "vconsole": "^3.2.0",
        "vee-validate": "2.1.0-beta.5",
      }
    })
    // 内联import语句
    api.injectImports('src/main.js', [`import '@/utils/toast'`, `import '@/utils/dialog'`, `import '@/utils/validate'`])

    plugin.add('@vue/cli-plugin-cube-ui')
    await api.render('./template')
    console.log(chalk.green('✔') + '  移动化完毕')
  }