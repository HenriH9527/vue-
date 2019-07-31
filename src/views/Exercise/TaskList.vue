<template>
  <section class="task-list">
     <task-card v-for="(task,index) in tasks" :key="index" :task="task"></task-card>
  </section>
</template>

<script>
import TaskCard from '@/views/Exercise/components/TaskCard';
import { getTasks } from '@/api/task';

export default {
  name: 'task-list',
  components: {
    TaskCard,
  },
  data() {
    return {
      tasks: [],
    };
  },
  mounted() {
    this.getTasks();
  },
  methods: {
    async getTasks() {
      try {
        const { exeid } = this.$route.params;
        const { data } = await getTasks({ project_id: exeid });
        this.tasks = [...data];
      } catch (e) {
        console.log(e);
      }
    },
  },
};
</script>

<style lang="scss" scoped>
  .task-list{
    position: relative;
    // max-width: 1000px;

  }
</style>
