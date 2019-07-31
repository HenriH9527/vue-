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
    this.$router.push('/user/info');
  },
};
</script>

<style lang="scss" scoped>
</style>
