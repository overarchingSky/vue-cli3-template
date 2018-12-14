<template>
  <div :class="classes"></div>
</template>

<script>
// 组件class前缀
const prefixCls = '{{__component_class_name__}}'

export default {
  name: '{{__component_name__}}',
  computed: {
    classes () {
      return `${prefixCls}`
    }
  }
}
</script>

<style module lang="less">
/* 已启用css module， template中请使用$style.className添加class */
/* 务必遵循css BEM原则 */

</style>
