module.exports = [
    {
      type: "list",
      name: "platform",
      message: "请选择平台：",
      choices: [
        {
          name: "pc",
          value: "pc"
        },
        {
          name: "移动web",
          value: "mobile"
        },
        {
          name: "微信",
          value: "wechat"
        }
      ]
    },
    {
      type: "confirm",
      name: "useAuth",
      message: "是否使用权限模块（vue-cli-plugin-wingedcare-template-auth插件）?",
      default: "Yes",
      when:data => {
        //微信平台，强制使用vue-auth
        return data.platform !== 'wechat'
      }
    },
    {
      type: "confirm",
      name: "theme",
      message: "是否使用主题?",
      default: "No",
    },
    {
      type: "confirm",
      name: "useSparseCheckout",
      message: "是否使用git按需克隆?（用于方便的调试、修改组件库）",
      default: "Yes",
    }
  ]
