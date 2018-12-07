chalk = require('chalk')
const pluginTool = require('./utils/plugin-tool')
module.exports = async (api, options, rootOptions) => {  
    let plugin = new pluginTool(api,options,rootOptions)
    plugin.add('@vue/cli-plugin-element-ui',true)
    await api.render('./template')
    console.log(chalk.green('✔') + '  pc化完毕')
  }