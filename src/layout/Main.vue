<template>
  <div>
    <nav-bar class="nav-bar"></nav-bar>
    <div class="breadcrumb-wrap">
      <breadcrumb></breadcrumb>
    </div>
    <div class="app-main">
      <transition name="fade" mode="out-in">
          <router-view></router-view>
      </transition>
    </div>
    <footer-bar></footer-bar>
  </div>
</template>
<script>
import NavBar from '@/components/Navbar';
import FooterBar from '@/components/Footer';
import Breadcrumb from '@/components/Breadcrumb';

export default {
  components: {
    NavBar,
    FooterBar,
    Breadcrumb,
  },
  data() {
    return {};
  },
};
</script>
<style lang="scss" scoped>
@import "src/assets/scss/color.scss";

.nav-bar {
  background-color: $nav_bg;
  z-index: 9;
}

.breadcrumb-wrap {
  position: fixed;
  text-align: center;
  top: 65px;
  width: 100%;
  z-index: 9;
  background-color: $body_bg;
  @media screen and (max-width: 1080px) {
    padding-left: 16px;
  }
}
.app-main {
  max-width: 1000px;
  min-height: calc(100vh - 200px);
  margin: 0 auto;
  padding: 120px 16px 16px;
 }
</style>
