<template>
    <div class="praise-comment-container">
      <div class="nav-bar">
        <router-link to="/message/praiseAndComment/myComment">
          <span class="tag-box">我的评论</span>
          <span v-if="firstCircle" class="red-circle">{{cmtUnreadNum}}</span>
        </router-link>
        <span class="divide-line">/</span>
        <router-link to="/message/praiseAndComment/myPraise">
          <span class="tag-box">我的点赞</span>
          <span v-if="secondCircle" class="red-circle">{{praiseUnreadNum}}</span>
        </router-link>
        <!-- <div class="underline"></div> -->
      </div>
      <div class="content-container">
        <transition name="fade" mode="out-in">
          <router-view></router-view>
        </transition>
      </div>
    </div>
</template>

<script>
export default {
  data() {
    return {
      showCircle: 'inline-block',
      hideCircle: 'none',
    };
  },
  mounted() {

  },
  computed: {
    firstCircle() {
      return this.$store.state.msg.cmtMsgRead;
    },
    secondCircle() {
      return this.$store.state.msg.praiseMsgRead;
    },
    cmtUnreadNum() {
      if (this.$store.state.msg.cmtUnreadNum >= 99) {
        return 99;
      }
      return this.$store.state.msg.cmtUnreadNum;
    },
    praiseUnreadNum() {
      if (this.$store.state.msg.praiseUnreadNum >= 99) {
        return 99;
      }
      return this.$store.state.msg.praiseUnreadNum;
    },
  },
  methods: {

  },
};
</script>

<style lang="scss" scoped>
@import "src/assets/scss/_color.scss";
$primary-color: #F73859;
$divider-color: #E0E0E0;
$border-color: #EEEEEE;
$text-dark-1: #283149;
$text-dark-2: #404B69;
$text-dark-3: #757575;
$text-gray: #C0C4CC;

.praise-comment-container {
  .nav-bar {
    width: 640px;
    height: 30px;
    margin: 0 auto;
    padding-top: 10px;
    .underline {
      margin: 0 auto;
      margin-top: 5px;
      width: 640px;
      height: 2px;
      background: $border-color;
    }
    a {
      display: inline-block;
      text-decoration: none;
      color: $text-dark-1;
      font-size: 14px;
      width: 74px;
      height: 30px;
      text-align: center;
      line-height: 30px;
      // border: 1px solid white;
      // border-radius: 10px;
      transition: 0.1s;
      &.active{
        color: $primary-color;
        // border: 1px solid $primary-color;
        // border-radius: 10px;
        border-bottom: 2px solid $primary-color;
      }
      &:hover {
        color: $primary-color;
      }
      .red-circle {
        position: absolute;
        font-size: 8px;
        text-align: center;
        width: 16px;
        height: 16px;
        line-height: 16px;
        margin-left: 2px;
        background: $primary-color;
        border-radius: 50%;
        transition: 0.1s;
        opacity: 0.9;
        color: white;
        display: inline-block;
      }
    }
    .divide-line {
      margin-left: 4px;
      margin-right: 4px;
      color: $text-dark-3;
    }
  }
}
</style>
