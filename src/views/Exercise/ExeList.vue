<template>
  <div class="exercise">
    <div class="task-list">
      <ExeCard :ExeList="ExeList"></ExeCard>
    </div>
    <pagination :ExeCardNum="ExeCardNum" v-on:getPageData="getPageData"></pagination>
  </div>
</template>

<script>
import ExeCard from '@/views/Exercise/components/ExeCard';
import { getProject } from '@/api/project';
import pagination from '@/components/pagination';

export default {
  components: {
    ExeCard,
    pagination,
  },
  data() {
    return {
      ExeList: [],
      temp: {},
      ExeCardNum: '',
      showNum: 5,
    };
  },
  mounted() {
    this.getProject();
  },
  destroyed() {
    this.$store.commit('hidePagi');
  },
  methods: {
    async getProject() {
      try {
        const { data } = await getProject({ offset: 0, size: this.showNum });
        this.ExeList = [...data.projects];
        console.log(this.ExeList);
        this.temp = data.page;
        this.ExeCardNum = this.temp.count;
        this.$store.commit('sendTaskNum', this.ExeCardNum);
        this.$store.commit('showPagi');
      } catch (e) {
        console.log(e);
      }
    },
    async getPageData(currentPage) {
      try {
        const { data } = await getProject({ offset: currentPage - 1, size: this.showNum });
        this.ExeList = [...data.projects];
        this.temp = data.page;
        if (this.temp.count !== this.ExeCardNum) {
          this.ExeCardNum = this.temp.count;
          this.$store.commit('sendTaskNum', this.ExeCardNum);
        }
      } catch (e) {
        console.log(e);
      }
    },
  },
};
</script>

<style lang="scss" scoped>
$primary-color: #f73859;
$divider-color: #e0e0e0;
$border-color: #eeeeee;
$text-dark-1: #283149;
$text-dark-2: #404b69;
$text-dark-3: #757575;
$text-gray: #c0c4cc;

$size-xs: 480px;
$size-sm: 600px;
$size-md: 840px;
$size-lg: 960px;
$size-xl: 1280px;
$size-2x: 1440px;

.exercise {
  position: relative;
  width: 100%;
  box-sizing: border-box;
  .exercise-title {
    color: $text-dark-1;
  }
}
@media screen and (max-width: $size-md) {
  .exercise {
    .task-list {
      .task-item {
        flex-direction: column;
        .task-item-banner {
          width: 100%;
        }
        .task-item-content {
          width: 100%;
        }
      }
    }
  }
}
</style>
