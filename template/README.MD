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

### ✨ 隔代组件通信

为了避免隔代组件之间通信的繁琐流程，我们加入了mixins/emmiter.js，提供了dispatch和broadcast方法，开发中如有需求，可使用  
但使用该方式，会造成事件流难以追踪，所以务必写好注释，例如：  
```               
A-----(监听B组件update事件)----->B-----(B组件引入了C组件作为其子组件)----->C
```
在上诉流程中，C组件使用emmiter.js中的dispatch方法代B组件向上抛出了update事件，从而触发了A组建中的时间回调方法  

在这过程中，B组件对update事件是无感知的，不知情的，小伙伴们由于惯性思维，会根据A组件去B组件中寻找this.$emit('update',***)等代码，然而是找不到的，由此带来不必要的困惑，所以务必在B组件中写好注释，声明update事件的触发源！  

想想下，如果上述流程是从A到B到C一直到Z，中间还穿插了各种分支，然后Z中触发了update事件，o(╥﹏╥)o，这将是一场灾难!

<(‵"′)> ，为了维护世界的和平，so...

### ✨ 变量类型判断

为了更精准的类型判断，统一使用src/utils/typeof.js中提供的[方法](https://github.com/overarchingSky/vue-cli3-template/blob/master/template/src/utils/typeof.js)  

在main.js中，已经全局引入并将其挂在到window._中，业务组件中可直接这样使用：
```
_.isArray()
```

需要注意的是，由于使用了全局变量，eslint对上诉代码的检测会失败，抛出使用了未定义变量的错误，所以，需要在使用前加上如下注释告知eslint这里为全局变量
```
/* global _ */
_.isArray()
```

### ✨ 拉取wt-ui组件

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

##### 平台代码：`src/platform`

##### 工具：`src/utils`

##### 页面布局框架：`src/layout`

##### 资源：`src/assets`

##### 页面：`src/views`

##### vue原型字段配置：`src/prototype.js`

##### 全局组件注册：`src/register-global-components.js`

##### vue混入片段：`src/mixins`

##### 通用页面(如正在开发中)：`src/template`

## 环境变量

- 基础配置: .env
- 开发配置：.env.development
- 生产配置：.env.production
- 后端本地配置：.env.backEnd

环境变量适用于构建期间使用的配置，如需配置在运行期间能访问的变量请以[VUE_APP_*](https://cli.vuejs.org/zh/guide/mode-and-env.html#在客户端侧代码中使用环境变量)的方式定义。


如需更改vue-loader或webpack等配置，请参考[vue-cli3](https://cli.vuejs.org/zh/guide/)

## 新建其它项目

如有其它端项目需求，在全局安装vue-cli3的前提下，使用如下命令生成模板项目
```
vue create --preset overarchingSky/vue-cli3-template {项目本地路径} 
```

该命令会询问一些问题，可根据情况选择

关于[overarchingSky/vue-cli3-template](https://github.com/overarchingSky/vue-cli3-template)

