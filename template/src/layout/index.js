import defaultView from './default.vue'
let view
switch (process.env.platform) {
  case 'pc':
    view = { defaultView }
    break
  case 'admin':
    view = { defaultView }
    break
  case 'mobile':
    view = { defaultView }
    break
  case 'client':
    view = { defaultView }
    break
  case 'wechat':
    view = { defaultView }
    break
  default:
    view = { defaultView }
}

export default view
