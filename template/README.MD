## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Run your tests
```
npm run test
```

### Lints and fixes files
```
npm run lint
```

# 开发前必读

强烈推荐使用 VSCODE 编译器 并且安装 `Vetur`,`VSLive Share`,`ESLint`这三个插件, 尤其是ESLint, 方便自动lint并格式化

### ✨ 新建组件

为了统一目录结构,新建组件一律使用如下命令:

```shell
npm run new:comp
```

> 组件内统一采用[css modules](https://github.com/css-modules/css-modules)书写样式, 并遵循[BEM规范](https://www.cnblogs.com/dujishi/p/5862911.html), 请确保添加module属性在style标签上，


### ✨ 组件配置文件 (index.json)

支持的参数列表如下:

|   参数    | 默认值 | 类型    | 说明                        |
| :-------: | :----- | :------ | --------------------------- |
|    dev    | true   | Boolean | 是否开发中,为`true`时, 将会被替换为一个开发中的提示组件，这样在开发到一半的时候即可提交 |
| prototype | false  | Boolean | 是否需要绑定到 vue 原型     |
|    map    | []     | Array   | 绑定到原型的映射数组，采用（仅prototype为ture生效）        |

```
// index.json示例：
{
    "dev": false,
  "prototype": true,
  "map": [
    {
      "key": "$msgbox",
      "value": "${moduleName}"
    },
    {
      "key": "$alert",
      "value": "${moduleName}.alert"
    },
    {
      "key": "$confirm",
      "value": "${moduleName}.confirm"
    },
    {
      "key": "$prompt",
      "value": "${moduleName}.prompt"
    }
  ]
}
```

### ✨ 拉去wt-ui组件

```
npm run pull:comp
```
该命令可拉取wt-ui组件库中的指定组件，并在项目的src/wt-ui目录下建立子git仓库，这样做的目的是为了更方便的迭代wt-ui或修复某个bug  
确保调整完毕后，可切换到该目录提交并推送到远程仓库。如果是进行二次定制化开发，严禁提交！

第一次使用该命令时，会询问并要求填写git组件库地址，如果填写错误，可到scripts/git-pull-comp/.config.js修改


### ✨ eslint代码检查

如果使用的vscode并安装了推荐的插件，那么可以随意书写，不用关心代码格式，直接ctrl + s即可（有时可能需要按多次）

### ✨ Jest前端测试

future ...

# css

## 语言

CSS预处理语言统一使用`less`

## 命名及书写规范

- 命名使用[BEM规范](https://www.cnblogs.com/dujishi/p/5862911.html)，包含Block、Element、Modifier三部分组成，我们使用`__`双下划线作为`Element`连接符，使用`--`双中划线连接`Modifier`，`-`作为单词连接符。
- BEM统一使用`b`、`e`、`m`Mixins来书写。
- less变量命名以`-`单中划线分割，尽量语义化，例如`$tab-vertical-header-width`，以`block-modifier-element-modifier`方式组成，以`$`打头。

## less注释规范

- 以`/* */`方式书写注释。
- `=`和`-`符号长度均为20。

## 文件及目录结构

##### 通用样式：`src/less/`

##### 工具：`src/utils`

##### 页面布局框架：`src/layout`

##### 资源：`src/assets`

##### 页面：`src/views`

##### vue原型字段配置：`src/prototype.js`

##### 全局组件注册：`src/register-global-components.js`

##### vue混入片段：`src/mixins`

## 环境变量

- 基础配置: .env
- 开发配置：.env.development
- 生产配置：.env.production
- 后端本地配置：.env.backEnd

环境变量适用于构建期间使用的配置，如需配置在运行期间能访问的变量请以[VUE_APP_*](https://cli.vuejs.org/zh/guide/mode-and-env.html#在客户端侧代码中使用环境变量)的方式定义。


如需更改vue-loader或webpack等配置，请参考[vue-cli3](https://cli.vuejs.org/zh/guide/)



