<template>
  <div class="footer-wrap">
    <footer>
      <div class="footer-section">
        <div class="footer-brand">
          <img src="/static/logo.svg" alt="logo">
          <span>棒棒团</span>
        </div>
      </div>
      <div class="footer-section">
        <a href="#">公众号</a>
        <a href="#">微信</a>
        <a href="#">用户条款</a>
        <a href="#">棒棒团队</a>
      </div>
    </footer>
  </div>
</template>

<script>
export default {
  name: 'footer-bar',

};
</script>

<style lang="scss">
@import "src/assets/scss/color.scss";

$primary-color: #F73859;
$divider-color: #E0E0E0;
$border-color: #EEEEEE;
$text-dark-1: #283149;
$text-dark-2: #404B69;
$text-dark-3: #757575;
$text-gray: #C0C4CC;

$size-xs: 480px;
$size-sm: 600px;
$size-md: 840px;
$size-lg: 960px;
$size-xl: 1280px;
$size-2x: 1440px;
.footer-wrap {
  width: 100%;
}
footer{
  border-top: solid 1px $divider-color;
  display: flex;
  align-items: center;
  justify-content: space-between;
  max-width: 1000px;
  margin: 0 auto;
  padding: 1.2rem 0;
  color: $nav_text;
  .footer-section{
    .footer-brand{
      display: flex;
      align-items: center;
      img{
        margin-right: .5rem;
        height: 1.5rem;
      }
      span{
        font-size: 1.2rem;
        line-height: 1.2rem;
        font-weight: 600;
        @media screen and (max-width: 340px) {
          font-size: 1rem;
          line-height: 1rem;
        }
      }
    }
    a{
      font-size: 1rem;
      line-height: 1rem;
      color: $nav_text;;
      text-decoration: none;
      padding-left: 2rem;
      &:hover{
        text-decoration: underline;
      }
      @media screen and (max-width: $size-xs) {
        font-size: .8rem;
        padding-left: .8rem;
      }
      @media screen and (max-width: 340px) {
        font-size: .8rem;
        padding-left: .1rem;
      }
    }
  }
  @media screen and (max-width: 1000px) {
    padding: 1rem;
  }
}
</style>
