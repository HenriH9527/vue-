<template>
    <div class="message-container">
      <div class="message-navbar">
        <div class="message-title">消息</div>
        <router-link to="/message/praiseAndComment">
          <span class="iconfont heart">&#xe86f;</span>
          点赞评论
          <span class="red-circle" v-if="firstCircle"></span>
        </router-link>
        <router-link to="/message/systemInfo" @click.native="hideSecondCircle">
          <span class="iconfont">&#xe64b;</span>
          系统通知
          <span class="red-circle" v-if="secondCircle"></span>
          </router-link>
      </div>
      <div class="message-content">
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
      msg: 'hello message!',
      // firstCircle: this.$store.state.msg.cmtAndPraiseRead,
      // secondCircle: this.$store.state.msg.SysMsgRead,
      showCircle: 'inline-block',
      hideCircle: 'none',
    };
  },
  mounted() {
    console.log(this.firstCircle);
  },
  computed: {
    firstCircle() {
      return this.$store.state.msg.cmtAndPraiseRead;
    },
    secondCircle() {
      return this.$store.state.msg.SysMsgRead;
    },
  },
  methods: {
    hideSecondCircle() {
      if (this.secondCircle === true) {
        this.$store.commit('readSysMsg');
        this.$store.commit('checkAllMsgIsRead');
      }
    },
  },
};
</script>

<style lang="scss" scoped>
@import "src/assets/scss/color.scss";

$primary-color: #F73859;
$divider-color: #E0E0E0;
$border-color: #EEEEEE;
$text-dark-1: #283149;
$text-dark-2: #404B69;
$text-dark-3: #757575;
$text-gray: #C0C4CC;

.message-container {
  width: 1000px;
  zoom: 1;
  overflow: auto;
  .message-navbar {
    width: 280px;
    display: inline-block;
    .message-title,a {
      width: 280px;
      height: 46px;
      color: $text-dark-1;
      text-align: center;
      line-height: 46px;
      background: $border-color;
      border-radius: 15px;
    }
    .message-title {
      font-weight: bold;
      font-size: 18px;
    }
    a {
      display: block;
      text-decoration: none;
      margin-top: 10px;
      font-size: 15px;
      color: $text-dark-2;
      cursor: pointer;
      transition: 0.1s;
      .iconfont {
        margin-right: 6px;
        font-size: 18px;
      }
      .heart {
        font-weight: bold;
      }
      &.active {
        color: #EEEEEE;
        border-radius: 15px;
        border-color: $border-color;
        background: $primary-color;
        }
      &:hover {
        opacity: 0.8;
      }
      .red-circle {
        position: absolute;
        margin-left: 8px;
        margin-top: 14px;
        background: $primary-color;
        width: 5px;
        height: 5px;
        border-radius: 50%;
        transition: 0.1s;
      }
    }
  }
  .message-content {
    // display: inline-block;
    float: right;
    width: 690px;
    // height: 560px;
    background: white;
    border-radius: 15px;
  }
}

</style>
