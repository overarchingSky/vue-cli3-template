<template>
		<div class="app-main">
				<div class="layout main">
						<vue-view style="height:100%;overflow-y:auto;-webkit-overflow-scrolling: touch;"></vue-view>
				</div>
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
<style lang="less">
.app-main {
		height: 100%;
		.main {
			height: 100%;
		}
}
</style>
