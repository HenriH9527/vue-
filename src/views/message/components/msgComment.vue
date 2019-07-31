<template>
    <div class="comment-container">
      <div class="underline"></div>
      <div class="profile-photo">
        <a href=""><img :src='comment.avatar || noImage'/></a>
      </div>
      <div class="comment-box" v-bind:style="{ color: isRead}">
        <p class="comment-name" @click="setMsgRead"><span>{{comment.nickname}}</span>评论了你的动态：<span>{{dynaContent}}</span></p>
        <p class="comment-time">回复时间：<span>{{realTime}}</span></p>
        <div class="content-box">
          <div class="content">{{cmtContent}}</div>
        </div>
      </div>
    </div>
</template>

<script>
import { getUserInfo, setMsgRead } from '@/api/user';

export default {
  name: 'msg-comment',
  props: {
    comment: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      cmtOperator: [],
      noImage: '//placem.at/people?w=56&h=56&random=1',
      tempTime: [],
      cmts: this.comment,
      readColor: '#C0C4CC',
      unReadColor: '#404B69',
    };
  },
  mounted() {

  },
  computed: {
    realTime() {
      return this.changeTimeFormat(this.comment.create_date);
    },
    isRead() {
      if (this.comment.is_read === 0) {
        return this.unReadColor;
      } else if (this.comment.is_read === 1) {
        return this.readColor;
      }
    },
    dynaContent() {
      if (this.comment.dynamic_content === null) {
        return this.comment.dynamic_content;
      } else if (this.comment.dynamic_content.length <= 26) {
        return this.comment.dynamic_content;
      } else if (this.comment.dynamic_content.length > 26) {
        return [this.comment.dynamic_content.substring(0, 26), '……'].join('');
      }
    },
    cmtContent() {
      if (this.comment.content === null) {
        return this.comment.content;
      } else if (this.comment.content.length <= 110) {
        return this.comment.content;
      } else if (this.comment.content.length > 110) {
        return [this.comment.content.substring(0, 110), '……'].join('');
      }
    },
  },
  methods: {
    async getUserInfo() {
      try {
        const [userInfo] = await getUserInfo({ id: this.comment.operation_user });
        this.cmtOperator = userInfo;
      } catch (e) {
        console.log(e);
      }
    },
    changeTimeFormat(timeData) {
      const tempTime = new Date(parseInt(timeData, 0));
      let realTime = tempTime.toLocaleString();
      // 获取日期
      realTime = realTime.match(/[0-9:/]+/g)[0].toString();
      // 改变日期格式
      this.tempTime = realTime.split('/');
      realTime = [this.tempTime[0], '年', this.tempTime[1], '月', this.tempTime[2], '日'].join('');
      return realTime;
    },
    async setMsgRead() {
      try {
        if (this.comment.is_read === 0) {
          this.comment.is_read = 1;
          this.$store.commit('handleCmtUnreadNum');
          this.$store.commit('checkAllMsgIsRead');
        }
        if (this.comment.project_id !== null) {
          console.log('有数据');
          this.$store.commit('handleSortFlag');
          this.$store.commit('sendDynamicId', this.comment.position_id);
          this.$router.push(`/exercise/${this.comment.project_id}/news`);
        }
        await setMsgRead({ id: this.comment.id });
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

.comment-container {
  width: 640px;
  height: 162px;
  margin: 0 auto;
  .underline {
    margin: 0 auto;
    width: 640px;
    height: 2px;
    background: $border-color;
  }
  .profile-photo {
    width: 80px;
    height: 156px;
    float: left;
    a {
      text-decoration: none;
      width: 50px;
      height: 50px;
      border-radius: 50%;
      overflow: hidden;
      background: grey;
      float: right;
      margin-right: 10px;
      margin-top: 14px;
      img {
        width: 50px;
        height: 50px;
      }
    }
  }
  .comment-box {
    width: 560px;
    height: 156px;
    float: right;
    font-size: 14px;
    // color: $text-dark-3;    this is readColor
    color: $text-dark-2;
    p {
      padding: 5px;
      margin: 0;
    }
    .comment-name {
      padding-top: 14px;
      transition: 0.1s;
      cursor: pointer;
      span {
        margin-right: 6px;
      }
      &:hover {
        color: $primary-color;
        opacity: 0.9;
      }
    }
    .content-box {
      width: 560px;
      height: 80px;
      margin-top: 6px;
      border: 1px solid $text-gray;
      border-radius: 10px;
      .content {
        margin-top: 5px;
        margin-left: 8px;
      }
    }
  }
}
</style>
