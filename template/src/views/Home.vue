<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png">
    <HelloWorld msg="Welcome to vue-cli3-template"/>
  </div>
</template>

<script>
// cps is an alias to /src/components
import HelloWorld from 'cps/HelloWorld.vue'

export default {
  name: 'home',
  components: {
    HelloWorld
  }
}
</script>

<style scoped>
.home{
  text-align:center;
  font-size:7px;
}
</style>
