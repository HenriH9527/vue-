<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'App',
  data() {
    return {
      userInfo: this.$session.getUser(),
    };
  },
  // 可能会存在bug,test一下
  destroyed() {
    this.$socket.emit('logout', this.userInfo.id);
  },
};
</script>

<style>
body{
  background-color:#f0f2f5;
  font-family: -apple-system,BlinkMacSystemFont,Helvetica Neue,PingFang SC,Microsoft YaHei,Source Han Sans SC,Noto Sans CJK SC,WenQuanYi Micro Hei,sans-serif;
  color: #1a1a1a;
}
</style>
