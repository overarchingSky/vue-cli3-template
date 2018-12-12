// 拉取组件库指定组件、模块
const shell = require('shelljs')
const inquirer = require('inquirer')
const fs = require('fs')
const path = require('path')
const chalk = require('chalk')
let { repository } = require('./.config')

let prompts = [{
  name: 'dir',
  type: 'input',
  message: '请输入拉取的组件名:',
  default: 'test/ssr'
}]

console.log('+++++repository', repository)

if (!repository) {
  prompts.unshift({
    name: 'repository',
    type: 'input',
    message: '请输入按需克隆的git地址:',
  })
}

async function pullComp () {
  let answers = await inquirer.prompt(prompts)
  let dir = answers.dir
  if (!repository) {
    repository = answers.repository
    // 将repository保存到.config.js的repository字段中
    saveConfig({ repository })
  }
  fs.stat('./src/components/common/.git', err => {
    const exists = !err
    if (!exists) {
      shell.exec(`git init ./src/components/common`)
    }
    shell.exec(`cd ./src/components/common && git remote rm origin`)
    shell.exec(`cd ./src/components/common && git remote add -f origin ${repository} && git config core.sparsecheckout true && echo "${dir}" >> .git/info/sparse-checkout && git checkout master`, function (data) {
      console.log(`\n拉取组件${dir}成功！"\n`)
    })
  })
}

function saveConfig (obj) {
  let content = Object.keys(obj).reduce((a, b) => {
    return a + `\t${b}:"${obj[b].replace(/\"/g, '')}",\n`
  }, 'module.exports = {\n') + '}'

  // fs.readFile(path.resolve(__dirname,'.config.js'),'utf-8', (err,data) => {
  //   if(err){
  //     throw err
  //   }
  // })
  fs.writeFile(path.resolve(__dirname, '.config.js'), content, (err) => {
    if (err) {
      throw err
    }
    console.log(chalk.green('设置成功'))
  })
}

pullComp()
