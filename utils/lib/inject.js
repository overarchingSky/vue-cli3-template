/**
 * 添加指定代码到指定文件中
 * @param {String} filePath 待更新文件路径（相对于生成的项目的根目录）
 * @param {String|Array} ctx 要添加的代码
 * @param {Object} files 文件map对象，vue-cli postProcessFiles钩子回调接函数收到的第一个参数，key为文件路径，值为文件内容
 * eg:
 * //generator.js
 * api.postProcessFiles(files => {
 *   inject('src/main.js','import elementUi from "element-ui"',files)
 *    //or
 *    inject('src/main.js',['import elementUi from "element-ui"',***],files)
 * })
 */
module.exports = function inject (filePath,ctx, files) {
    const fileCtx = files[filePath]
    if (fileCtx) {
      // inject codeing into document
      const lines = fileCtx.split(/\r?\n/g).reverse()
      const lastImportIndex = lines.findIndex(line => line.match(/^import/))
        if(Array.isArray(ctx)){
            ctx.forEach(line => {
                lines[lastImportIndex] += `\n${line}`
            })
        }else{
            lines[lastImportIndex] += `\n${ctx}`
        }

      files[filePath] = lines.reverse().join('\n')
    }
  }