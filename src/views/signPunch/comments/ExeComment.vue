<template>
      <div class="cmt-card">
      <div class="user">
        <div class="img">
          <a href=""><img :src='user.avatar || noImage'></a>
        </div>
          <span>{{user.nickname || 'xxxx'}}</span>
          <span class="date"><em>·</em>{{cmt.create_date | timeAgo}}</span>
      </div>
      <div class="con"> {{cmt.content}}</div>
    </div>
</template>

<script>
import { getUserInfo } from '@/api/user';

export default {
  name: 'exe-comment',
  props: {
    cmt: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      noImage: '//placem.at/people?w=56&h=56&random=1',
      user: {},
    };
  },
  computed: {
    id() {
      if (typeof this.cmt.user_id === 'undefined') {
        return this.$session.getUser().id;
      }
      return this.cmt.user_id;
    },
  },
  mounted() {
    this.getUserInfo();
  },
  methods: {
    async getUserInfo() {
      try {
        const [userInfo] = await getUserInfo({ id: this.id });
        this.user = userInfo;
      } catch (e) {
        console.log(e);
      }
    },
  },
};
</script>

<style lang="scss">
.cmt-card{
  max-width: 1000px;
  background-color: #fff;
  padding: 1em;
  border-bottom:1px solid #e0e0e0;
  .user{
      .img{
      float: left;
      width: 45px;
      height: 45px;
      overflow: hidden;
      margin-right: 10px;
      border-radius: 50%;
      background-color: #f0f0f0;
      img{
        display: block;
        width: 100%;
        height: 100%;
        border-radius: 50%;
      }
    }
  }
  .date{
    font-size: 14px;
    color: #999;
    em{
      display: inline-block;
      margin-right: 10px;
      vertical-align: middle;
      font-weight: bold;
    }
  }
  .con {
    font-size: 14px;
    line-height: 20px;
    letter-spacing: 1px;
    margin: 1em 0;
  }
}

</style>
