<template>
  <div>
    <section>
      <task-detail :taskDetail="task"></task-detail>
    </section>
    <div class="tasks-wrap">
      <!-- <router-link :to="`/exercise/${$route.params.exeid}/task/${$route.params.taskid}/detail`">任务详情</router-link> -->
      <router-link :to="`/exercise/${$route.params.exeid}/task/${$route.params.taskid}`">思路分享</router-link>
    </div>
    <router-view></router-view>
  </div>
</template>

<script>
import TaskDetail from '@/views/Exercise/components/TaskDetail';
import { getTaskInfo } from '@/api/task';

export default {
  name: 'task-list',
  components: {
    TaskDetail,
  },
  data() {
    return {
      task: {},
    };
  },
  mounted() {
    this.getTaskInfo();
  },
  methods: {
    async getTaskInfo() {
      try {
        const { taskid } = this.$route.params;
        const { data } = await getTaskInfo({ task_id: taskid });
        [this.task] = data;
      } catch (e) {
        console.log(e);
      }
    },
  },
};
</script>

<style lang="scss" scoped>
$red: #f73859;
  .tasks-wrap{
    box-sizing: border-box;
    border-bottom:solid 1px #ababab;
    margin-bottom:20px;
    width: 100%;
    a{
      box-sizing: border-box;
      display: inline-block;
      width:150px;
      // text-align: center;
      text-indent: 1em;
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
