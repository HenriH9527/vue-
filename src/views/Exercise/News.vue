<template>
  <div>
   <exe-news v-for="(v, index) of news" :key="index" :news="v" v-on:childCall = "getProjectNews"></exe-news>
  </div>
</template>

<script>
import { getProjectNews } from '@/api/project';
import exeNews from '@/views/Exercise/components/ExeNews';

export default {
  components: {
    exeNews,
  },
  data() {
    return {
      news: [],
      tempNews: [],
      tempNews2: [],
      index: '',
    };
  },
  async mounted() {
    await this.getProjectNews();
  },
  methods: {
    async getProjectNews() {
      try {
        const { exeid } = this.$route.params;
        const { data } = await getProjectNews({ project_id: exeid });
        this.news = [...data];
        if (this.$store.state.msg.sortFlag === true) {
          this.tempNews = this.news.filter(item => item.id === this.$store.state.msg.dynamicId);
          this.tempNews2 = this.news.filter(item => item.id !== this.$store.state.msg.dynamicId);
          this.$store.commit('cancelSortFlag');
          this.news = this.tempNews.concat(this.tempNews2);
          console.log(this.news);
        }
      } catch (e) {
        console.log(e);
      }
    },
  },
};
</script>

<style scoped>

</style>
