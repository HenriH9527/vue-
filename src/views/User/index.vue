<template>
  <div>
    <div class="dynamic-component">
      <router-link to="/user/project">项目动态</router-link>
      <router-link to="/user/info">个人资料</router-link>
    </div>
    <router-view></router-view>
  </div>
</template>

<style lang="scss" scoped>
  .dynamic-component{
    box-sizing: border-box;
    border-bottom:solid 1px #ababab;
    margin-bottom:20px;
    a{
      box-sizing: border-box;
      display: inline-block;
      width:150px;
      text-align: center;
      color:#ababab;
      padding-bottom:10px;
      text-decoration:none;
      margin-bottom:-1px;
    }
    .active{
      color:#e86568;
      border-bottom:solid 1px #e86568;
    }
  }
</style>
