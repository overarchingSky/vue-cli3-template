<template>
		<div :class="$style['app-main']">
			<% if(useAuth) { %><vue-view :class="$style['app-main__view']"></vue-view><% }else{ %><router-view :class="[$style['app-main__view'],'scroll']"></router-view><% } %>
		</div>
</template>
<script>
/**
 * default - 定义页面的整体布局框架
 */
export default {
  name: 'default',
  data () {
    return {}
  }
}
</script>
<style module lang="less">
.app-main {
		height: 100%;
		&__view {
			height: 100%;
		}
}
</style>
