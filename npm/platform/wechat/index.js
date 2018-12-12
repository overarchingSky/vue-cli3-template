module.exports = (api, projectOptions) => {
    api.chainWebpack(webpackConfig => {
      // 通过 webpack-chain 修改 webpack 配置
    })
  
    api.configureWebpack(webpackConfig => {
      // 修改 webpack 配置
      // 或返回通过 webpack-merge 合并的配置对象
    })
  
    api.registerCommand('test', args => {
      // 注册 `vue-cli-service test`
    })

    // 请确保为正确的环境变量指定默认模式
    // module.exports.defaultModes = {
    //     'my-build': 'production'
    // }
}