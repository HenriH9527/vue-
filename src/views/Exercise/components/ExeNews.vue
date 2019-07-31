<template>
  <div class="TaskShare">
    <div class="user">
      <div class="img">
          <a href=""><img :src='user.avatar || noImage'></a>
      </div>
      <span class="name">{{user.nickname || 'xxxx'}}</span>
      <span class="date"><em>·</em>{{newss.create_date | timeAgo}}</span>
    </div>
    <div class="con">
        <h3>{{newss.title}}</h3>
        <vue-markdown :source="newss.content" :emoji="true" class="text"></vue-markdown>
    </div>
    <div class="btn">
      <!-- <span class="delete">删除</span> -->
      <span class="praise" @click="toZan"><svg-icon :icon-class="iconClass"/> {{news.star_number||'0'}}</span>
      <span class="reply" @click="showDiscuss"><svg-icon icon-class="comment"/> {{news.cmt_number||'0'}}</span>
    </div>
    <div class="box" :class="{show : open}">
        <div class="bot">
           <exe-comment v-for="(cmt, index) of cmts" :key="index" :cmt="cmt" ></exe-comment>
        </div>
        <div class="comment-inp" v-if="this.$session.isLogin()">
          <div class="img">
          <img src="" alt="">
          </div>
          <div class="text">
            <el-input
                type="textarea"
                class="inp"
                autosize
                placeholder="评论..."
                v-model="newComment">
            </el-input>
            <el-button size="small"  type="primary" class="sub" @click="pubCmt()">发布</el-button>
            <div class="notice" v-if="!this.$session.isLogin()"><a href="#/signin">登入</a>后才可评论</div>
          </div>
        </div>
    </div>
  </div>
</template>
<script>
import { Message } from 'element-ui';
import { getNewsCmt, publishNewsCmt, starNews, unStarNews } from '@/api/project';
import { getUserInfo } from '@/api/user';
import exeComment from '@/views/Exercise/components/ExeComment';

export default {
  name: 'exe-news',
  components: {
    exeComment,
  },
  props: {
    news: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      noImage: '//placem.at/people?w=56&h=56&random=1',
      user: {},
      open: false, // 判断评论内容显隐
      iconClass: 'zan', // 判断点赞
      login: false, // 是否登陆
      newComment: '', // 输入框输入内容
      newss: this.news,
      cmts: [],
    };
  },
  computed: {
    id() {
      return this.newss.release_user;
    },
  },
  async mounted() {
    await this.getUserInfo();
    if (this.newss.is_star === true) {
      this.iconClass = 'approved';
    } else {
      this.iconClass = 'zan';
    }
  },
  methods: {
    async getUserInfo() {
      const [userInfo] = await getUserInfo({ id: this.id }).catch(e => console.log(e));
      this.user = userInfo;
    },
    async showDiscuss() {
      try {
        if (this.open === false) {
          if (!this.cmts.length) {
            const { data } = await getNewsCmt({ project_dynamic_id: this.newss.id });
            this.cmts = [...data];
          }
          this.open = true;
        } else {
          this.open = false;
        }
      } catch (e) {
        Message({
          type: 'error',
          message: e.message,
        });
      }
    },
    async toZan() {
      if (this.iconClass === 'zan') {
        this.iconClass = 'approved';
        this.newss.star_number += 1;
        try {
          const obj = {
            project_dynamic_id: this.news.id,
          };
          await starNews(obj);
          // this.iconClass = 'approved';
          // this.newss.star_number += 1;
          console.log(this.newss.star_number);
          console.log(this.news);
        } catch (e) {
          Message({
            type: 'error',
            message: e.message,
          });
        }
      } else if (this.iconClass === 'approved') {
        this.iconClass = 'zan';
        this.newss.star_number -= 1;
        try {
          const obj = {
            project_dynamic_id: this.news.id,
          };
          await unStarNews(obj);
          // this.iconClass = 'zan';
          // this.newss.star_number -= 1;
          console.log(this.newss.agree_number);
          console.log(this.news);
        } catch (e) {
          Message({
            type: 'error',
            message: e.message,
          });
        }
      }
    },
    async pubCmt() {
      try {
        const obj = {
          dynamic_id: this.news.id,
          comment: this.newComment,
        };
        await publishNewsCmt(obj);
        this.cmts.push({
          create_date: Date.now(),
          comment: this.newComment,
          release_user: this.$session.getUser().id,
        });
        console.log(this.cmts);
        this.newss.cmt_number += 1;
      } catch (e) {
        Message({
          type: 'error',
          message: e.message,
        });
      }
    },
  },
};
</script>
<style lang='scss' scoped>
.TaskShare{
  background-color: #fff;
  margin-bottom: 15px;
  padding: 22px;
  text-align: left;
  margin-top: 20px;
  &:hover{
    .btn .delete{
        display: block;
    }
  }
  a{
      text-decoration:none;
  }
  .user{
    overflow: hidden;
    line-height: 45px;
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
    .name{
      float: left;
      font-size: 14px;
      color: #222222;
      margin-right: 12px;
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
  }
  .con{
    font-size: 14px;
    color: #222;
    line-height: 20px;
    letter-spacing: 1px;
    margin: 10px 0;
    h3{
        font-size: 16px;
        margin: 0;
        font-weight: normal;
        line-height: 28px;
    }
    p{
        margin: 0 0 15px;
    }
  }
  .btn{
    overflow: hidden;
    font-size: 14px;
    line-height: 20px;
    color: #b2b2b2;
    .delete{
      float: right;
      color: #ea6c6e;
      cursor: pointer;
      display: none;
    }
    span{

      float: left;
      color: #757575;
      padding-left: 22px;
      cursor: pointer;
    }
  }
  .box{
    overflow: hidden;
    will-change: height;
    height: 0;
    &.show{
      height: auto;
    }
  }
  .bot{
    position: relative;
    padding-top: 10px;
    margin-top: 10px;
    overflow: hidden;
    border-top: 1px solid #e0e0e0;
    .right{
        float: right;
        font-size: 14px;
        line-height: 40px;
      .cancel{
          color: #e54f52;
          margin: 0 20px;
          float: left;
      }
      .sub{
          float: left;
          width: 70px;
          border-radius: 5px;
          background-color: #e54f52;
          color: #ffffff;
          border: none;
          height: 40px;
          outline: none;
          cursor: pointer;
      }
    }
    .left{
        overflow: hidden;
        border: 1px solid #f0f0f0;
        border-radius: 5px;
        line-height: 30px;
        font-size: 14px;
        color: #b6b6b6;
        padding: 4px 16px 4px 60px;
        position: relative;
        background-color: #fcfcfc;
      span{
          position: absolute;
          left: 16px;
          top: 4px;
      }
      .inp{
          display: block;
          width: 100%;
          overflow: hidden;
          line-height: 30px;
          border: none;
          outline: none;
          color: #b6b6b6;
          background-color: #fcfcfc;
      }
    }
  }

  .notice{
    border: 1px solid #eee;
    background-color: #fafafa;
    text-align: center;
    font-size: 12px;
    color: #757575;
    height: 53px;
    line-height: 53px;
      a{
          color: #f73859;
      }
  }
}
.comment-inp{
    overflow: hidden;
    .img{
        float: left;
        width: 25px;
        height: 25px;
        border-radius: 50%;
        background-color: #ccc;
        overflow: hidden;
        margin-right: 12px;
        img{
            display: block;
            width: 100%;height: 100%;border-radius: 50%;
        }
    }
    .text{
        overflow: hidden;
        position: relative;
        .inp{
            display: block;
            width: 100%;
            textarea{
                display: block;
                width: 100%;
                padding-right: 80px;
                box-sizing: border-box;
            }
        }
        .sub{
            position: absolute;
            right: 2px;
            bottom: 2px;
            width: 46px;
            height: 29px;
            padding: 0;
            text-align: center;
            line-height: 29px;
        }
    }
}
</style>
