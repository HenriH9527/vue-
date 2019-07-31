<template>
    <div class="praise-container">
      <div class="praise" v-bind:style="{ color: isRead}" @click="setMsgRead">
        <span class="iconfont">&#xe621;</span>
        <p class="font-container">
          <span>{{praise.nickname}}</span>
          赞了你的动态&nbsp;&nbsp;
          <span>{{dynaContent}}</span>
        </p>
      </div>
        <div class="underline"></div>
    </div>
</template>

<script>
import { Message } from 'element-ui';
import { getUserInfo, setMsgRead } from '@/api/user';

export default {
  name: 'msg-praise',
  props: {
    praise: Object,
    require: true,
  },
  data() {
    return {
      // isRead: '',
      readColor: '#C0C4CC',
      unReadColor: '#404B69',
    };
  },
  mounted() {

  },
  computed: {
    isRead() {
      if (this.praise.is_read === 0) {
        return this.unReadColor;
      } else if (this.praise.is_read === 1) {
        return this.readColor;
      }
    },
    dynaContent() {
      if (this.praise.dynamic_content === null) {
        return this.praise.dynamic_content;
      } else if (this.praise.dynamic_content.length <= 26) {
        return this.praise.dynamic_content;
      } else if (this.praise.dynamic_content.length > 26) {
        return [this.praise.dynamic_content.substring(0, 26), '……'].join('');
      }
    },
  },
  methods: {
    async setMsgRead() {
      try {
        if (this.praise.is_read === 0) {
          this.praise.is_read = 1;
          this.$store.commit('handlePraiseUnreadNum');
          this.$store.commit('checkAllMsgIsRead');
        }
        if (this.praise.project_id !== null) {
          this.$store.commit('handleSortFlag');
          this.$store.commit('sendDynamicId', this.praise.position_id);
          this.$router.push(`/exercise/${this.praise.project_id}/news`);
        }
        await setMsgRead({ id: this.praise.id });
      } catch (e) {
        console.log(e);
      }
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

.praise-container {
  width: 620px;
  margin: 0 auto;
  margin-top: 16px;
  font-size: 14px;
  color: $text-dark-3;
  padding-bottom: 5px;
  p {
    cursor: pointer;
    display: inline-block;
    padding: 0;
    margin: 0;
    transition: 0.1s;
    &:hover {
      color: $primary-color;
      opacity: 0.9;
    }
  }
  .iconfont {
    color: $primary-color;
    margin-right: 6px;
  }
  .underline {
      margin: 0 auto;
      margin-top: 16px;
      width: 620px;
      height: 1px;
      background: $border-color;
  }
}
</style>
