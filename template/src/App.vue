<template>
  <div id="app" v-wechat-title="$route.meta.title">
    <component :is="curView" v-if="$auth.ready()"></component>
  </div>
</template>

<script>
import AppMain from '@/layout/'
export default {
  name: 'app',
  data () {
    return {
      curView: null
    }
  },
  components: {
    ...AppMain
  },
  watch: {
    $route () {
      // 匹配视图
      let tp = this.$router.currentRoute.meta.view
      if (tp in AppMain) {
        this.curView = tp || null
        console.warn(`curView: ${tp}`)
      } else {
        console.error(
          `layout view ${tp} is unavailable ,make sure ${tp}.vue existed in src/layout and configured in case '${
            process.env.platform
          }' of src/layout/index.js`
        )
      }
    }
  }
}
</script>

<style lang="less">
html,
body{
  height: 100%;
  margin: 0;
  padding: 0;
}
body{
	font-size: 0.28rem !important;
}
li{
  list-style-type: none;
}
#app {
  font-family: "Microsoft YaHei", "微软雅黑", "Avenir", Helvetica, Arial;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #000;
  height: 100%;
  .loading {
    color: #777;
    margin-top: -20%;
  }
}
</style>
