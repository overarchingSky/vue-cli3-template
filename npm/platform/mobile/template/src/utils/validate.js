// https://github.com/baianat/vee-validate
// 示例页面：https://codesandbox.io/s/y3504yr0l1?initialpath=%2Fform&module=%2Fsrc%2Fcomponents%2FForm.vue
import Vue from 'vue'
import { locale } from '@/lang/config'
import VeeValidate, { Validator as _validator } from 'vee-validate'
import cn from 'vee-validate/dist/locale/zh_CN'
import en from 'vee-validate/dist/locale/en'

// 重写extend方法
let extend = _validator.extend
_validator.extend = function (name, options) {
  extend(name, {
    validate: options.validate
  })
  let locale = {
    zh_CN: {
      messages: {
        [name]: options.messages['zh_CH']
      }
    },
    en: {
      messages: {
        [name]: options.messages['en']
      }
    }
  }
  _validator.localize(locale)
}

// 拓展验证器phone类型
_validator.extend('phone', {
  validate: value => /^[1][3,4,5,7,8][0-9]{9}$/.test(value),
  messages: {
    zh_CH: field => `${field}格式错误`,
    en: field => `The ${field} value is not valid`
  }
})
// 拓展验证器长度类型
_validator.extend('length-6', {
  validate: value => String(value).length === 6,
  messages: {
    zh_CH: field => `${field}必须为6位数字`,
    en: field => `The ${field} Must be 6 digits`
  }
})

// 拓展验证器长度类型
_validator.extend('identification', {
  validate: value => value.length === 2,
  messages: {
    zh_CH: field => `${field}必须完整`,
    en: field => `The ${field} Must be 6 digits`
  }
})

// usage in component
// this.$validator.validateAll().then(result => {
// 	return new Promise((resolve, reject) => {
// 		if (result) {
// 			resolve(this.form)
// 		} else {
// 			reject()
// 		}
// 	})
// })
// 切换当前语言
// this.$validator.localize('ar')
// 错误信息：
// 为字段使用别名，data-vv-as='手机号码' ，如果不加data-vv-as,则在验证的错误信息中，将读取name属性，如，提示phone不能为空，设置别名后，提示手机号码不能为空
// <input type='text' name='phone'  data-vv-as='手机号码' v-model='form.phone' v-validate=''required|phone'' placeholder='请输入手机号码'/>
// 所有的错误信息都放在this.errors中通过例如this.errors.first('phone')来获取，其中phone为input的name属性值，不支持中文，这也是使用data-vv-as设置别名的原因
Vue.use(VeeValidate, {
  dictionary: {
    zh_CN: cn,
    en: en
  }
})
// 修改简体中文默认提示
_validator.localize('zh_CN', {
  messages: {
    required: field => `${field}不能为空`
  }
})

// 设置默认语言
_validator.localize(locale)

export let Validator = _validator
