<template>
  <div class="detail-wrap">
    <vue-markdown :source="task.reason" :emoji="true"></vue-markdown>
  </div>
</template>

<script>
import { getTaskInfo } from '@/api/task';

export default {
  name: 'task-detail',
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

<style lang="scss">

.detail-wrap{
  background-color: #fff;
  padding: 1em;
}

</style>
