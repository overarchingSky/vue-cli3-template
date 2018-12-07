const childProcess = require('child_process')
const path = require('path')

/**
 * usage:
 * //generator.js
 * let plugin = new pluginTool(api,options,rootOptions)
 * let propmt = true//允许插件依赖的其它插件在命令行发起询问
 * plugin.add('@vue/cli-plugin-cube-ui',propmt)
 * plugin.invoke('@vue/cli-plugin-cube-ui','1.0.0',propmt)
 */
module.exports = class plugin {
  /**
   * 
   * @param {Object} api vue-cli PluginAPI实例
   * @param {*} options 插件参数
   * @param {*} rootOptions 
   */
  constructor(api, options, rootOptions){
    this.api = api
    this.options = options || {}
    this.rootOptions = rootOptions
  }
  /**
   * 添加依赖插件
   * @param {String} name 插件名称
   * @param {Boolean} propmt 是否允许插件询问 默认为false
   */
  add(name,propmt = false){
    this._install(name, (cliPluginName,paramsArr,cwd) => {
      this.api.onCreateComplete(() => {
        let params = propmt ? [] : paramsArr
        childProcess.spawnSync('vue',['add', cliPluginName, ...params],{
          stdio: 'inherit',
          cwd
        })
      })
    })
  }
  /**
   * 添加依赖插件(可指定版本)
   * @param {String} name 插件名称
   * @param {String} version 版本规则
   * @param {Boolean} propmt 是否允许插件询问 默认为false
   */
  invoke(name,version,propmt = false){
    this._install(name,(cliPluginName,paramsArr,cwd) => {
      this.api.extendPackage({
        devDependencies:{
          [name]: version,
        }
      })
      this.api.onCreateComplete(() => {
        let params = propmt ? [] : paramsArr
        childProcess.spawnSync('vue',['invoke', cliPluginName,...params],{
          stdio: 'inherit',
          cwd
        })
      })
    })
  }
  /**
   * 加载模块
   * @param {String} name 模块名称
   */
  _install(name,cb){
    let isCliPlugin = /@vue\/cli-plugin-/.test(name)//是否是cli收录的插件，cli收录的插件可以使用@vue/cli-plugin-{name}的方式声明依赖,使用vue invoke/add {name}安装
    var cliPluginName = name
    if(isCliPlugin){
        cliPluginName = name.replace(/@vue\/cli-plugin-/,'')
    }

    //组建传递给依赖插件的参数
    var paramsArr = Object.keys(this.options).reduce((a,b) => {
      a.push('--' + b)
      a.push(this.options[b])
      return a
    },[])

    //得到当前子进程的执行路径
    var cwdArr = process.cwd().split('/'),cwd
    if(cwdArr[cwdArr.length - 1] == this.rootOptions.projectName){
      cwd = process.cwd()
    }else{
      cwd = path.join(process.cwd(), this.rootOptions.projectName)
    }

    cb && cb(cliPluginName,paramsArr,cwd)

  }
}