// 多国语言
import { Validator } from '@/utils/validate'

// 切换语言
export function localize (lang) {
  // 表单验证器切换语言
  Validator.localize(lang)
}
