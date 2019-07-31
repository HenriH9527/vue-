<template>
  <div class="sys-msg-container">
    <div class="nav-bar">
      <div class="nav-list">系统通知<span v-if="showCircle" class="red-circle">{{SysUnreadNum}}</span></div>
      <div class="underline"></div>
    </div>
    <msg-system v-for="(s,index) of msgSys" :msgSys="s" :key="index"></msg-system>
    <div class="no-sys-msg" v-bind:style="{display: showInfo}">暂时还没有系统消息哦~</div>
    <sys-pagination v-on:getPageData="getPageData"></sys-pagination>
  </div>
</template>

<script>
import msgSystem from '@/views/message/components/msgSystem';
import { getUserMsg } from '@/api/user';
import sysPagination from '@/views/message/components/sysPagination';

export default {
  components: {
    msgSystem,
    sysPagination,
  },
  data() {
    return {
      msgSys: [],
      showInfo: 'none',
      showNum: 5,
      temp: {},
      tempNum: '',
    };
  },
  mounted() {
    this.getUserMsg();
  },
  computed: {
    SysUnreadNum() {
      if (this.$store.state.msg.sysMsgUnreadNum >= 99) {
        return 99;
      }
      return this.$store.state.msg.sysMsgUnreadNum;
    },
    showCircle() {
      return this.$store.state.msg.SysMsgNumRead;
    },
  },
  destroyed() {
    this.$store.commit('hideSysMsgPagi');
  },
  methods: {
    async getUserMsg() {
      try {
        const { data } = await getUserMsg({ offset: 1, size: this.showNum, message_type: 3 });
        console.log(data);
        this.msgSys = [...data.messages];
        this.temp = data.page;
        this.tempNum = data.page.count;
        this.$store.commit('sendSysMsgNum', this.tempNum);
        if (this.tempNum !== 0 && this.temp.pageCount !== 1) {
          this.$store.commit('showsysMsgPagi');
        }
        if (this.msgSys.length === 0) {
          this.showInfo = 'block';
        }
      } catch (e) {
        console.log(e);
      }
    },
    async getPageData(currentPage) {
      try {
        const { data } = await getUserMsg({ offset: currentPage - 1, size: this.showNum, message_type: 3 });
        this.msgSys = [...data.messages];
        this.temp = data.page;
        console.log(currentPage);
        if (this.temp.count !== this.tempNum) {
          this.tempNum = this.temp.count;
          this.$store.commit('sendsysMsgNum', this.tempNum);
        }
      } catch (e) {
        console.log(e);
      }
    },
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

.sys-msg-container {
  width: 640px;
  margin: 0 auto;
  padding-bottom: 50px;
  .nav-bar {
    width: 640px;
    height: 30px;
    margin: 0 auto;
    padding-top: 10px;
    font-size: 14px;
    .nav-list {
      margin-left: 12px;
      height: 30px;
      line-height: 30px;
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
  }
  .underline {
    margin: 0 auto;
    width: 640px;
    height: 2px;
    background: $border-color;
  }
  .no-sys-msg {
    margin-top: 26px;
    margin-left: 10px;
  }
}
</style>

