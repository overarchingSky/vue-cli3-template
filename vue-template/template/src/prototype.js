/**
 * 配置需要挂载到vue.prototype的字段
 */
import api from './api'
import { join } from 'utils/url'
export default {
  // 私有图片获取接口
  $privateImageUrl: join(api.api_server, process.env.VUE_APP_PRIVATE_RESOURCES),
  // 公开图片获取接口
  $publicImageUrl: join(api.api_server, process.env.VUE_APP_PUBLIC_RESOURCES)
  // 以上两个接口还可以添加styleName参数，指定图片大小，压缩等情况
}
