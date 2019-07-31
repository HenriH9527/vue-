<template>
  <div style="height:100vh; width:100vw; position: relative; background: #fff">
    <div class="error-wrap">
      <img :src="img404" alt="404" width="100%">
        <div class="btn-wrap">
          <span @click="goHome()" class="go-home">返回首页</span>
          <span @click="goBack()" class="go-home">返回上一页</span>
        </div>
      </div>
    </div>
</template>

<script>
import img404 from '@/assets/images/404.jpg';

export default {
  name: 'page404',
  data() {
    return {
      img404,
    };
  },
  computed: {
    message() {
      return '你请求的页面不存在......';
    },
  },
  methods: {
    goHome() {
      this.$router.push('/home');
    },
    goBack() {
      this.$router.go(-1);
    },
  },
};
</script>

<style lang="scss" scoped>
 .error-wrap {
   height: 100%;
   width: 100%;
   .btn-wrap {
     position: absolute;
     bottom: 25%;
     left: 40%;
   }
   .go-home {
      display: block;
      float: left;
      width: 110px;
      margin-right: 2em;
      height: 36px;
      background: #f56c6c;
      border-radius: 100px;
      text-align: center;
      color: #fff;
      font-size: 14px;
      line-height: 36px;
      cursor: pointer;
      animation-name: slideUp;
      animation-duration: 0.5s;
      animation-delay: 0.3s;
      animation-fill-mode: forwards;
    }
 }

</style>
