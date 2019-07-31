<template>
  <div>
    <section>
      <exe-detail :exeDetail="detail"></exe-detail>
    </section>
    <div class="exe-wrap">
      <router-link :to="`/exercise/${$route.params.exeid}/news`">项目动态</router-link>
      <router-link :to="`/exercise/${$route.params.exeid}/task`">任务列表</router-link>
    </div>
    <router-view></router-view>
  </div>
</template>

<script>
import ExeDetail from '@/views/Exercise/components/ExeDetail';
import { getProjectInfo } from '@/api/project';

export default {
  name: 'exe-main',
  components: {
    ExeDetail,
  },
  mounted() {
    this.getProjectInfo();
  },
  data() {
    return {
      detail: {},
    };
  },
  methods: {
    async getProjectInfo() {
      try {
        const { exeid } = this.$route.params;
        const { data } = await getProjectInfo({ project_id: exeid });
        [this.detail] = data;
      } catch (e) {
        console.log(e);
      }
    },
  },
};
</script>

<style lang="scss" scoped>
$red: #f73859;

  .exe-wrap{
    box-sizing: border-box;
    border-bottom:solid 1px #ababab;
    margin-bottom:20px;
    a{
      box-sizing: border-box;
      display: inline-block;
      width:150px;
      text-align: center;
      color:#ababab;
      padding-bottom:10px;
      text-decoration:none;
      margin-bottom:-1px;
    }
    .active{
      color:$red;
      border-bottom:solid 1px $red;
    }
  }
</style>
