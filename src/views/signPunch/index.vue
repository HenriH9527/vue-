<template>
    <div class="signPunch">
        <textarea name="" id="" v-model="cardText" cols="30" rows="10" placeholder="分析今日学习心得" class="signtext"></textarea>
        <div class="whiteBg">
            <el-button type="danger" class="punch" @click="bitCard"><i class="el-icon-edit"></i>确定打卡</el-button>
        </div>
        <vue-common v-for="(v,index) in news" :key="index" :news="v"></vue-common>
        <div class="getMore" @click='lookMore'>
            <i class="el-icon-arrow-down"></i> 查看更多
        </div>
    </div>
</template>

<script>
import { Message } from 'element-ui';
import { getStudy, pushStudy } from '@/api/task';
import VueCommon from './comments/common';

export default {
  name: 'signPunch',
  components: {
    VueCommon,
  },
  data() {
    return {
      news: [],
      sizes: 5,
      cardText: null,
    };
  },
  mounted() {
    this.getStudy();
    // this.sizes = 5;
    // const getNews = setInterval(this.getProjectNews, 1000);
  },
  watch: {
    async sizes() {
      try {
        const { data } = await getStudy({ offset: 1, size: this.sizes });
        this.news = [...data];
      } catch (e) {
        console.log(e);
      }
    },
  },
  methods: {
    async getStudy() {
      try {
        const { data } = await getStudy({ offset: 1, size: this.sizes });
        this.news = [...data];
      } catch (e) {
        console.log(e);
      }
    },
    // 验证登录
    // some problem，验证了2000+次
    validateCount() {
      const this_temp = this;
      const validated = async () => {
        try {
          this_temp.$checkLogin();
          const { id } = this.$session.getUser();
          await validated({ user_id: id });
        } catch (e) {
          console.log(e);
        }
      };
      validated();
    },
    // 打卡功能
    async bitCard() {
      this.validateCount();
      if (this.cardText === null) {
        Message({
          type: 'warning',
          message: '要填写内容哟^-^',
          showClose: true,
          center: true,
        });
      } else {
        const { msg } = await pushStudy({ content: this.cardText }).catch(e => console.log(e));
        Message({
          type: 'success',
          message: '发布成功了哟！^-^',
          showClose: true,
          center: true,
        });
      }
      this.cardText = null;
    },
    // 查看更多
    lookMore() {
      this.sizes += 3;
    },
  },
};
</script>

<style lang="scss" >
.signPunch{
    font-size:0;
}
.signtext {
    box-sizing: border-box;
    width:100%;
    border:none;
    resize:none;
    padding:20px;
    border-top-left-radius: 5px;
    border-top-right-radius: 5px;
    font-size:16px;
    &:focus{
        outline: none;
    }
}
.whiteBg{
    background: #fff;
    width:100%;
    border-bottom-left-radius: 5px;
    border-bottom-right-radius: 5px;
    padding:20px;
    text-align: right;
    box-sizing: border-box;
}
.punch{
    font-size:16px;
    display: inline-block;
    color: white;
    border:solid 1px #F73859;
    padding:5px 10px;
    border-radius: 2px;
    cursor:pointer;
    .el-icon-edit{
        margin-right: 10px;
    }
}
.signItem{
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
}
.avator{
    width:65px;
    height:65px;
    overflow: hidden;
    border-radius: 100%;
    box-shadow: 0 0 10px #ababab;
}
.follow{
    display: inline-block;
    width:55px;
    text-align: center;
    color:white;
    border:solid 1px #F73859;
    border-radius: 5px;
    font-size:14px;
    padding:3px 0;
    margin-top:10px;
}
.info{
    text-align: center;
}
.content{
    height:65px;
    position: relative;
    margin-left:15px;
    span{
        font-size: 16px;
        position: absolute;
        top:50%;
        transform: translateY(-50%);
    }
}
.operation{
    margin-top:14px;
    margin-left:15px;
}
.date{
    font-size:14px;
    color:#ababab;
    text-align: right;
    padding-top:40px;
}
.getMore{
    text-align: center;
    font-size:16px;
    margin-top:15px;
    cursor:pointer;
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
</style>
