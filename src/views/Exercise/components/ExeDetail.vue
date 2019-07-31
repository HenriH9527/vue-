<template>
  <div>
    <div class="state state2">
      <div class="ExePic">
        <img :src="exeDetail.avatar">
      </div>
      <div class="ExeDetail">
        <header>
          {{exeDetail.name}}
        </header>
        <article class="text">
          <section><span>项目意义: </span>{{exeDetail.significance}}</section>
          <section><span>项目文件: </span><a :href="exeDetail.document">{{exeDetail.document}}</a></section>
          <section><span>项目地址: </span><a :href="exeDetail.github">{{exeDetail.github}}</a></section>
        </article>
        <footer>
          <div class="writeDyn" v-if="login" @click="editNews()">
            <svg-icon icon-class="edit"/>
          写动态</div>
          <div class="focusPro">关注项目</div>
        </footer>
      </div>
    </div>
    <section :class="[showEdit ? 'show': '', 'news']" >
      <el-input
        type="textarea"
        autosize
        placeholder="请输入标题"
        v-model="title"
        style="margin-bottom:4px;"
        >
      </el-input>
      <el-input
        type="textarea"
        :autosize="{ minRows: 6, maxRows: 10}"
        placeholder="请输入内容"
        v-model="news">
      </el-input>
      <el-button type="primary" @click="pubNew()">发布</el-button>
    </section>
  </div>
</template>
<script>
import { Message } from 'element-ui';
import { publishNews } from '@/api/project';

export default {
  name: 'exe-detail',
  computed: {
    login() {
      return this.$session.isLogin();
    },
  },
  props: {
    exeDetail: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      news: '',
      title: '',
      showEdit: false,
    };
  },
  methods: {
    editNews() {
      this.showEdit = !this.showEdit;
    },
    async pubNew() {
      try {
        if (!this.news || !this.title) {
          Message({
            type: 'error',
            message: '提交标题或内容不能为空!',
          });
          return false;
        }
        const { exeid } = this.$route.params;
        const obj = {
          project_id: exeid,
          title: this.title,
          content: this.news,
        };
        await publishNews(obj);
        Message({
          type: 'success',
          message: '发布成功!',
        });
        this.showEdit = false;
        this.news = '';
        this.title = '';
        this.$router.push(`/exercise/${exeid}/news`);
      } catch (e) {
        console.log(e);
      }
    },
  },

};
</script>

<style lang="scss" scoped>

$card-bgcolor: lightcyan;   // 卡片的背景色
$card-font-color: #b5b5b5;  // 卡片中暗淡字体的颜色
$btn-bgcolor: #f73859;  // button按钮的背景色,border边框色
$text-dark-3: #757575;  // 显示更多
  .news{
    position: relative;
    margin: 1em 0 0;
    height: 0;
    &.show{
      height: auto;
    }
    overflow: hidden;
    .el-button--primary{
      margin: 1em 1em;
      float: right;
      font-size: 12px;
      width: 75px;
      height: 25px;
      border-radius: 5px;
      background-color: #f73859;
      padding: .5em;
    }
  }
.state {
  width: 100%;
  border: solid 1px #eee;
  background-color: #fff;
  margin-bottom: 25px;
  position: relative;
  overflow: hidden;
  display: flex;
  // z-index: -99;
}

.state2 {
  height: 200px;
  .ExePic {
    height: 100%;
    width: 36%;
    background-color: $card-bgcolor;
    img {
      display: block;
      width: 100%;
      height: 100%;
    }
  }
  .ExeDetail {
    width: 64%;
    padding: 20px;
    display: flex;
    flex-direction: column;
    header {
      font-size: 16px;
      font-weight: bold;
      .title {
        text-decoration: none;
        color: #000;
      }
    }
    article {
      margin: 1.5em 0;
      font-size: 14px;
      line-height: 1.5;
      section {
        display: flex;
        margin-top: .5em;
        &:nth-child(1){
          max-height: 4.5em;
          overflow: hidden;
        }
      }
      span {
        white-space: nowrap;
        color: $card-font-color;
        padding-right: 1em;
      }
    }
    footer {
      font-size: 12px;
      position: absolute;
      bottom: 12px;
      right: 12px;
      padding: 0;
      border: none;
      .writeDyn {
        width: 75px;
        height: 25px;
        border-radius: 5px;
        border: 1px solid $btn-bgcolor;
        color: $btn-bgcolor;
        cursor: pointer;
        margin-right: 10px;
        display: flex;
        justify-content: center;
        align-items: center;
      }
      .focusPro {
        width: 75px;
        height: 25px;
        border-radius: 5px;
        background-color: $btn-bgcolor;
        color: #fff;
        cursor: pointer;
        display: flex;
        justify-content: center;
        align-items: center;
      }
    }
  }
}

</style>
