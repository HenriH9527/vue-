<template>
  <el-breadcrumb class="app-breadcrumb" separator="/">
    <transition-group name="breadcrumb">
      <el-breadcrumb-item v-for="(item,index) of levelList" :key="item.path" v-if='item.meta.title'>
        <span v-if='item.redirect==="noredirect"||index==levelList.length-1' class="no-redirect">{{item.meta.title}}</span>
        <router-link v-else :to="item.redirect||item.path">{{item.meta.title}}</router-link>
      </el-breadcrumb-item>
    </transition-group>
  </el-breadcrumb>
</template>

<script>
export default {
  mounted() {
    this.getBreadcrumb();
  },
  data() {
    return {
      levelList: [],
    };
  },
  watch: {
    $route() {
      this.getBreadcrumb();
    },
  },
  methods: {
    getBreadcrumb() {
      const regx = /:([^/:]+)/gi;
      const route = this.$route.matched.filter(item => item.name);
      const params = route.slice(-1)[0];
      const path = (params.path).match(regx);

      if (path && route) {
        path.forEach(item => {
          const tmp = this.$route.params[item.slice(1)];
          route.forEach(i => {
            if (i.path) i.path = i.path.replace(item, tmp);
            if (i.redirect) i.redirect = i.redirect.replace(item, tmp);
          });
        });
      }
      this.levelList = route;
    },
  },
};
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  .app-breadcrumb.el-breadcrumb {
    display: inline-block;
    font-size: 14px;
    line-height: 40px;
    margin: 0 auto;
    width: 1000px;

    .no-redirect {
      color: #97a8be;
      cursor: text;
    }
  }
</style>
