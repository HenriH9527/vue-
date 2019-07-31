<template>
    <div class="system-info-container">
      <div class="sys-msg-content">{{msgSys.content}}
          <div class="confirm-btn" @click="setMsgRead" v-bind:style="{ background: isRead}">知道了</div>
      </div>
    </div>
</template>

<script>
import { setMsgRead } from '@/api/user';

export default {
  name: 'msg-system',
  props: {
    msgSys: Object,
    require: true,
  },
  data() {
    return {
      readColor: '#757575',
      unReadColor: '#F73859',
    };
  },
  computed: {
    isRead() {
      if (this.msgSys.is_read === 0) {
        return this.unReadColor;
      } else if (this.msgSys.is_read === 1) {
        return this.readColor;
      }
    },
    SysContent() {
      if (this.msgSys.content === null) {
        return this.msgSys.content;
      } else if (this.msgSys.content.length <= 80) {
        return this.msgSys.content;
      } else if (this.msgSys.content.length > 80) {
        return [this.msgSys.content.substring(0, 80), '……'].join('');
      }
    },
  },
  methods: {
    async setMsgRead() {
      try {
        if (this.msgSys.is_read === 0) {
          this.msgSys.is_read = 1;
          this.$store.commit('handleSysMsgUnreadNum');
          this.$store.commit('checkAllMsgIsRead');
        }
        await setMsgRead({ id: this.msgSys.id });
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
$text-dark-1: #283149;
$text-dark-2: #404B69;
$text-dark-3: #757575;
$text-gray: #C0C4CC;

.system-info-container {
  width: 500px;
  height: 80px;
  margin: 0 auto;
  margin-top: 20px;
  border: 1px solid $text-gray;
  border-radius: 10px;
  font-size: 14px;
  line-height: 20px;
  color: $text-dark-2;
  .sys-msg-content {
    padding: 5px 10px;
  }
  .confirm-btn {
      margin-left: 400px;
      margin-top: 8px;
      width: 68px;
      height: 20px;
      font-size: 12px;
      border: 1px solid $primary-color;
      border-radius: 10px;
      text-align: center;
      line-height: 20px;
      color: white;
      background: $primary-color;
      cursor: pointer;
  }
}
</style>
