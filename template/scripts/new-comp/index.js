require('shelljs/global')
const ora = require('ora')
const fs = require('fs-extra')
const path = require('path')
const inquirer = require('inquirer')
const prefix = 'pt'
// 导入选项配置
const { readText, nameFormat } = require('./utils/tools')
const promps = {
  comptName: {
    type: 'input',
    name: 'name',
    message: '请输入组件名称:',
    validate: function (value) {
      if (/^[\-a-z]+$/.test(value)) {
        return true
      }
      return '组件名称只能包含小写字母和横杠(-)!'
    }
  },
  compConfig: [
    {
      type: 'confirm',
      name: 'needConfig',
      message: '是否需要组件配置文件(普通组件不需要)',
      default: false
    }
  ]
}

const templates = path.resolve(__dirname, `./templates/components`)
// 源文件map
const sourceFiles = {
  index: path.resolve(templates, `name.vue`),
  json: path.resolve(templates, `index.json`),
  withData: path.resolve(templates, `withData.vue`)
}

let spinner
/**
 * 快麦ERP-小程序: 快捷模板构建
 */

async function doTemplate () {
  // 模板类型,模板名称
  let { name } = await inquirer.prompt(promps.comptName)
  let { needConfig } = await inquirer.prompt(promps.compConfig)
  try {
    spinner = ora('开始创建组件模板').start()
    createTemplate(name, needConfig)
  } catch (error) {
    spinner.fail(`组件 ${name} 的目录结构创建失败,错误信息如下:`)
    console.error(error)
  }
}

/**
 * 新建模板
 * @param {String} name 模板名称
 * @param {Boolean} needConfig 是否生成组件配置文件
 */
function createTemplate (name, needConfig) {
  const fullName = `${prefix}-${name}`
  const compPath = path.resolve(__dirname, `../../src/components/${fullName}`)
  // 目标文件map
  const distFiles = {
    index: path.resolve(compPath, `index.vue`),
    json: path.resolve(compPath, `index.json`),
    withData: path.resolve(compPath, `widthData.vue`)
  }
  if (fs.existsSync(compPath)) {
    spinner.fail(`组件 ${name} 已经存在,无法创建`)
  } else {
    // 输出index.js
    // let idxContent = readText(sourceFiles.index)
    // idxContent = idxContent
    //   .replace('{{__component_name__}}', prefix + name)
    //   .replace(/\{\{__component_name__\}\}/g, `Pt` + nameFormat(name))
    // fs.createFileSync(distFiles.index)
    // fs.writeFileSync(distFiles.index, idxContent)

    // 输出index.vue文件
    fs.createFileSync(distFiles.index)
    fs.writeFileSync(
      distFiles.index,
      replaceCompName('index', name).replace(
        /\{\{__component_name__\}\}/g,
        nameFormat(fullName)
      )
    )

    // 输出withData.vue文件
    fs.createFileSync(distFiles.withData)
    fs.writeFileSync(
      distFiles.withData,
      replaceCompName('withData', name).replace(
        /\{\{__component_name__\}\}/g,
        fullName
      ).replace(
        /\{\{__hump_component_name__\}\}/g,
        nameFormat(fullName)
      )
    )

    // 生成json
    if (needConfig) {
      fs.copyFileSync(sourceFiles.json, distFiles.json)
    }
    spinner.succeed(`组件 ${name} 的目录结构已完成初始化`)
  }
}

/**
 * 替换模板内占位符为模板名称
 * @param {String} type 文件类型
 * @param {String} name 模板mingc
 * @param {Boolean} addPrefix 模板mingc
 */
function replaceCompName (type, name, addPrefix = true) {
  return readText(sourceFiles[type]).replace(/\{\{__component_class_name__\}\}/g, `${addPrefix ? 'pt-' : ''}${name}`)
}

doTemplate()
