<template>
    <div class="pagination-container" v-bind:style="{display: showPagination}">
        <ul>
            <li class="pre-next-btn previous-btn" @click="preOrNext(-1)"><span class="iconfont">&#xe779;</span></li>
            <li v-for="(num, index) in nums" :key="index" :class="{actived: num === currentPage, noborder: typeof num === 'string'}" @click="select(num)"><span>{{num}}</span></li>
            <li class="pre-next-btn next-btn" @click="preOrNext(1)"><span class="iconfont">&#xe775;</span></li>
        </ul>
    </div>
</template>

<script>
export default {
  name: 'pagination',
  data() {
    return {
      // 当前页码默认为1
      currentPage: 1,
      // 如果有多个分页，点击第5个按钮之后会展开后面的页码
      boundaryNum: 5,
      // 每页展示任务item的数量，默认5个
      showNum: 5,
    };
  },
  mounted() {
    this.$emit('getPageData', 1);
  },
  computed: {
    // 计算当前分页器展示风格，小于10个按钮则不展示'…'，大于10个按钮则分3种情况展示：点击最左边5个按钮右边出现'…'，点击最右边5个按钮左边出现'…'，点击中间的按钮两边都出现'…'
    nums() {
      const currentNum = this.currentPage;
      const totalNum = this.totalPage;
      if (totalNum <= 10) return totalNum;
      if (currentNum <= this.boundaryNum) {
        return new Array(this.boundaryNum * 2 - 1).fill(0).map((item, index) => index + 1).concat('…', totalNum);
      } else if (currentNum >= totalNum - this.boundaryNum + 1) {
        return [1, '…'].concat(new Array(9).fill(totalNum).map((item, index) => item - index).reverse());
      } return [1, '…'].concat(new Array(7).fill(currentNum - 3).map((item, index) => item + index)).concat('…', totalNum);
    },
    // 获取总任务列表数量
    totalTask() {
      return this.$store.state.task.taskNum;
    },
    // 计算分页数量
    totalPage() {
      return Math.ceil(this.totalTask / this.showNum);
    },
    // 当ExeCard加载完再显示Pagination
    showPagination() {
      return this.$store.state.task.showPagination;
    },
  },
  methods: {
    // 点击数字按钮传送当前页码到父组件Exelist中获取当前需展示的页面内容
    select(num) {
      if (num === this.currentPage) return;
      if (typeof num === 'string') return;
      this.currentPage = num;
      this.$emit('getPageData', num);
    },
    // 点击上一页或下一页按钮传送当前页码到父组件获取当前需展示的页面内容
    preOrNext(n) {
      if (this.currentPage === 1 && n === -1) return;
      if (this.currentPage === this.totalPage && n === 1) return;
      this.currentPage += n;
      this.$emit('getPageData', this.currentPage);
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

.pagination-container {
    ul {
        padding-top: 15px;
        text-align: center;
    }
    li {
      list-style: none;
      display: inline-block;
      border: 1px solid $text-gray;
      height: 30px;
      width: 30px;
      border-radius: 10%;
      line-height: 30px;
      text-align: center;
      font-size: 16px;
      color: $text-dark-3;
      margin-left: 5px;
      margin-right: 5px;
      cursor: pointer;
      opacity: 0.8;
      transition: 0.1s;
      &:hover {
          opacity: 1;
      }
    }
    .pre-next-btn {
        opacity: 0.6;
        font-weight: bold;
        color: $text-dark-2;
    }
    .actived {
        background: $primary-color;
        color: white;
        opacity: 0.9;
    }
    .noborder {
        border: none;
    }
  @media screen and (max-width: 600px){
    li {
      height: 25px;
      width: 25px;
      line-height: 25px;
      margin-left: 3px;
      margin-right: 3px;
    }
  }
}
</style>

