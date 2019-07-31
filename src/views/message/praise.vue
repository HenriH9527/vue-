<template>
  <div class="praise-container">
      <div class="underline"></div>
      <msg-praise v-for="(x,index) of praise" :praise="x" :key="index"></msg-praise>
      <div class="praise-info" v-bind:style="{display: showInfo}">暂时还没有收到点赞哦~</div>
      <praise-pagination v-on:getPageData="getPageData"></praise-pagination>
  </div>
</template>

<script>
import msgPraise from '@/views/message/components/msgPraise';
import { getUserMsg } from '@/api/user';
import praisePagination from '@/views/message/components/praisePagination';

export default {
  components: {
    msgPraise,
    praisePagination,
  },
  data() {
    return {
      praise: [],
      showInfo: 'none',
      showNum: 8,
      temp: {},
      tempNum: '',
    };
  },
  mounted() {
    this.getUserMsg();
  },
  destroyed() {
    this.$store.commit('hidePraisePagi');
  },
  methods: {
    async getUserMsg() {
      try {
        const { data } = await getUserMsg({ offset: 0, size: this.showNum, message_type: 1 });
        console.log(data);
        this.praise = [...data.messages];
        this.temp = data.page;
        this.tempNum = data.page.count;
        this.$store.commit('sendPraiseNum', this.tempNum);
        if (this.tempNum !== 0 && this.temp.pageCount !== 1) {
          this.$store.commit('showPraisePagi');
        }
        if (this.praise.length === 0) {
          this.showInfo = 'block';
        }
      } catch (e) {
        console.log(e);
      }
    },
    async getPageData(currentPage) {
      try {
        const { data } = await getUserMsg({ offset: currentPage - 1, size: this.showNum, message_type: 1 });
        this.praise = [...data.messages];
        console.log(data);
        this.temp = data.page;
        if (this.temp.count !== this.tempNum) {
          this.tempNum = this.temp.count;
          this.$store.commit('sendPraiseNum', this.tempNum);
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

.praise-container {
  padding-bottom: 50px;
  .praise-info {
    margin-top: 26px;
    margin-left: 36px;
  }
}
.underline {
  margin: 0 auto;
  width: 640px;
  height: 2px;
  background: $border-color;
}

</style>

