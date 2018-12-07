// const pluginTool = require('./utils/plugin-tool')
// const inject = require('./utils/inject')
/**
 * 由于作为vue-cli3 preset，package.json不会被自动读取并执行，现在用子进程手动读取
 */
const childProcess = require('child_process')
childProcess.spawnSync('cnpm',['install'],{
  stdio: 'inherit',
  cwd:__dirname
})
//子进程end

const {pluginTool} = require('vue-cli-plugin-helper-utils')
module.exports = (api, options, rootOptions) => {
    let plugin = new pluginTool(api,options,rootOptions)
    // 修改 `package.json` 里的字段
    api.extendPackage({
      scripts: {
        "dev-local": "vue-cli-service serve --model backEnd",
        "build-local": "vue-cli-service build --model backEnd",
        "build-dev": "vue-cli-service build --model development",
        "build-prod": "vue-cli-service build --model production",
      },
      dependencies:{
        "axios": "^0.16.2",
        "vue-axios": "^2.0.2",
        "fecha": "^2.3.2",
        "vconsole": "^3.2.0",
        "vee-validate": "2.1.0-beta.5",
        "vue-wechat-title": "^2.0.4"
      }
    })
    
    // 复制并用 ejs 渲染 `./template` 内所有的文件
    api.render('./template',options)
    if(options.useAuth !== false){
      //安装vue-auth插件
      plugin.invoke('vue-cli-plugin-wingedcare-template-auth',"^0.0.1")
    }
    
    switch(options.platform){
      case 'pc':
        //安装wingedcarea-vue-template-pc插件
        plugin.invoke('vue-cli-plugin-wingedcare-template-pc',"^0.0.7")
        break;
      case 'wechat':
        //这里没有使用break; 是为了同时安装wingedcarea-vue-template-wechat和wingedcarea-vue-template-mobile插件
        plugin.invoke('vue-cli-plugin-wingedcare-template-wechat',"^0.0.7")
      case 'mobile':
        //安装wingedcarea-vue-template-mobile插件
        plugin.invoke('vue-cli-plugin-wingedcare-template-mobile',"^0.0.15")
        break;
      
    }
  }

