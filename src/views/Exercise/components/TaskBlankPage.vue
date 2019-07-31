<template>
  <div></div>
</template>

<script>
export default {
  data() {
    return {
      msg: 'hello',
    };
  },
  mounted() {
    const { exeid, taskid } = this.$route.params;
    this.$router.push(`/exercise/${exeid}/task/${taskid}/`);
  },
};
</script>

<style lang="scss" scoped>
</style>
