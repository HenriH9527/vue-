<template>
  <div>
   <task-idea v-for="(v, index) of news" :key="index" :news="v"></task-idea>
  </div>
</template>

<script>
import { getTaskNews } from '@/api/task';
import TaskIdea from '@/views/Exercise/components/TaskIdea';

export default {
  components: {
    TaskIdea,
  },
  data() {
    return {
      news: [],
    };
  },
  async mounted() {
    await this.getTaskNews();
  },
  methods: {
    async getTaskNews() {
      try {
        const { taskid } = this.$route.params;
        const { data } = await getTaskNews({ task_id: taskid });
        this.news = [...data];
      } catch (e) {
        console.log(e);
      }
    },
  },
};
</script>

<style scoped>

</style>
