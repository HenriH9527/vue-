<template>
  <div>
    <div class="state state2">
      <div class="taskDetail">
        <header>
        <b>{{taskDetail.name}}</b><a>#{{taskDetail.task_id}}</a>
        </header>
        <article class="text">
          <section><span>任务目标: </span>
             {{taskDetail.target}}
           </section>
        </article>
        <article class="text">
          <section><span>任务详情:</span>
            {{task.reason}}
          </section>
        </article>
        <footer>
          <div class="writeDyn" v-if="login" @click="editNews()">
            <svg-icon icon-class="edit"/>
            写思路
           </div>
        </footer>
      </div>
    </div>
    <section :class="[showEdit ? 'show': '', 'news']" >
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
import { publishTaskNews, getTaskInfo } from '@/api/task';

export default {
  name: 'exe-detail',
  computed: {
    login() {
      return this.$session.isLogin();
    },
  },
  props: {
    taskDetail: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      news: '',
      showEdit: false,
      task: {},
    };
  },
  mounted() {
    this.getTaskInfo();
  },
  methods: {
    async getTaskInfo() {
      try {
        const { taskid } = this.$route.params;
        const { data } = await getTaskInfo({ task_id: taskid });
        [this.task] = data;
        console.log(this.task);
      } catch (e) {
        console.log(e);
      }
    },
    editNews() {
      this.showEdit = !this.showEdit;
    },
    async pubNew() {
      try {
        if (!this.news) {
          Message({
            type: 'error',
            message: '提交标题或内容不能为空!',
          });
          return false;
        }
        const { exeid, taskid } = this.$route.params;
        const obj = {
          task_id: taskid,
          content: this.news,
        };
        await publishTaskNews(obj);
        Message({
          type: 'success',
          message: '发布成功!',
        });
        this.showEdit = false;
        this.news = '';
        this.title = '';
        this.$router.push(`/exercise/${exeid}/task/${taskid}/TaskBlankPage`);
        // this.$router.push(`/exercise/${exeid}/task/${taskid}/idea`);
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
  header{
    a{
      position: absolute;
      right: 20px;
      top: 20px;
    }
  }
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
  .taskDetail {
    width: 100%;
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
    }
  }
}

</style>
