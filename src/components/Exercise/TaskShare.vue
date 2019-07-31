<template>
  <div class="TaskShare">
    <div class="user">
      <div class="img">
          <a href=""><img :src='content.imgUrl' alt=""></a>
      </div>
      <a :href='content.userUrl' class="name">{{content.name}}</a>
      <span class="date"><em>·</em>{{content.date}}</span>
    </div>
    <div class="con">
        <h3>{{content.title}}</h3>
        <p>{{content.text}}</p>
    </div>
    <div class="btn">
      <!-- <span class="delete">删除</span> -->
      <a href="#" class="praise" @click="toZan"><svg-icon :icon-class="iconClass"/> {{praiseNum}}</a>
      <a href="#" class="reply" @click="showDiscuss"><svg-icon icon-class="comment"/> {{replyNum}}</a>
    </div>
    <div class="box" :class="{show : open}">
        <div class="bot" v-for="(comment,key) in content.comments" :key="key">
            <div class="user">
                <div class="img">
                    <a href=""><img src='' alt=""></a>
                </div>
                <a :href='content.userUrl' class="name">{{comment.name}}</a>
                <span class="date"><em>·</em>{{comment.date}}</span>
            </div>
            <div class="con">
                <p>{{comment.text}}</p>
            </div>
        </div>
        <form action="">
            <div class="comment-inp">
                <div class="img">
                    <img src="" alt="">
                </div>
                <div class="text">
                    <el-input
                        type="textarea"
                        class="inp"
                        autosize
                        placeholder="评论..."
                        v-model="textarea1">
                    </el-input>
                    <el-button size="small"  type="primary" class="sub" @click="issue">发布</el-button>
                </div>
            </div>
        </form>
        <div class="notice" v-if="login"><a href="#/login">登入</a>后才可评论</div>
    </div>
  </div>
</template>
<script>
import { Button, Input } from 'element-ui';
import SvgIcon from '../SvgIcon';

export default {
  name: 'task-share',
  props: {
    content: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      open: false, // 判断评论内容显隐
      iconClass: 'zan', // 判断点赞
      praiseNum: this.content.praise, // 点赞数量
      replyNum: this.content.reply, // 评论数量
      login: false, // 是否登陆
      textarea1: '', // 输入框输入内容
      commentCon: this.content.commentPart, // 当前登陆人员信息
    };
  },
  methods: {
    showDiscuss() {
      if (this.open === true) {
        this.open = false;
      } else {
        this.open = true;
      }
    },
    hideDiscuss() {
      this.open = false;
    },
    toZan() {
      if (this.iconClass === 'zan') {
        this.iconClass = 'approved';
        this.praiseNum += 1;
      } else if (this.iconClass === 'approved') {
        this.iconClass = 'zan';
        this.praiseNum -= 1;
      }
      this.$emit('change-praise', this.praiseNum);
    },
    issue() {
      this.commentCon.text = this.textarea1;
      this.$emit('issue', this.commentCon);
      this.textarea1 = '';
      this.replyNum += 1;
      this.$emit('change-reply', this.replyNum);
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
    a{
      float: left;
      color: #757575;
      padding-left: 22px;
    }
  }
  .bot{
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
  .box{
      display: none;
    &.show{
        display: block;
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
