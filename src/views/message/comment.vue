<template>
  <div class="cmt-container">
      <msg-comment v-for="(c,index) of comment" :comment="c" :key="index"></msg-comment>
    <div v-bind:style="{display: showInfo}">
      <div class="underline"></div>
      <div class="cmt-info">暂时还没有收到评论哦~</div>
    </div>
    <cmt-pagination v-on:getPageData="getPageData"></cmt-pagination>
  </div>
</template>

<script>
import msgComment from '@/views/message/components/msgComment';
import { getUserMsg } from '@/api/user';
import cmtPagination from '@/views/message/components/cmtPagination';

export default {
  components: {
    msgComment,
    cmtPagination,
  },
  data() {
    return {
      showInfo: 'none',
      comment: [],
      showNum: 5,
      temp: {},
      tempNum: '',
    };
  },
  mounted() {
    this.getUserMsg();
  },
  destroyed() {
    this.$store.commit('hideCmtPagi');
  },
  methods: {
    async getUserMsg() {
      try {
        const { data } = await getUserMsg({ offset: 0, size: this.showNum, message_type: 2 });
        console.log(data);
        this.comment = [...data.messages];
        this.temp = data.page;
        this.tempNum = data.page.count;
        this.$store.commit('sendCmtNum', this.tempNum);
        if (this.tempNum !== 0 && this.temp.pageCount !== 1) {
          this.$store.commit('showCmtPagi');
        }
        if (this.comment.length === 0) {
          this.showInfo = 'block';
        }
      } catch (e) {
        console.log(e);
      }
    },
    async getPageData(currentPage) {
      try {
        const { data } = await getUserMsg({ offset: currentPage - 1, size: this.showNum, message_type: 2 });
        console.log(currentPage - 1);
        this.comment = [...data.messages];
        console.log(data);
        this.temp = data.page;
        if (this.temp.count !== this.tempNum) {
          this.tempNum = this.temp.count;
          this.$store.commit('sendCmtNum', this.tempNum);
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
$border-color: #EEEEEE;
.cmt-container {
  padding-bottom: 50px;
  .cmt-info {
    margin-top: 26px;
    margin-left: 36px;
  }
}
</style>
