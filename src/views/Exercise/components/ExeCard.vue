<template>
  <div>
    <div v-for="item in ExeList" :key="item.project_id" class="state state1">
      <div class="ExePic">
        <img :src="item.avatar">
      </div>
      <div class="ExeDetail">
        <header>
          <router-link :to="`/exercise/${item.project_id}/news`" class="title" tag='a' target="_blank">
          {{item.name}}
          </router-link>
        </header>
        <article>
          <section v-html="item.significance" class="text"></section>
        </article>
        <footer>
          <div class="focusPro" @click="starProject(item)">关注项目</div>
        </footer>
      </div>
    </div>
  </div>
</template>

<script>
import { starProject, unStarProject } from '@/api/project';

export default {
  name: 'exe-card',
  props: {
    ExeList: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      login: this.$session.isLogin(),
    };
  },
  methods: {
    async starProject(project) {
      try {
        this.$checkLogin();
        const { project_id } = project;
        const { id } = this.$session.getUser();
        await starProject({ project_id, user_id: id });
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

// 初始化所有状态
.state {
  width: 100%;
  border: solid 1px #eee;
  background-color: #fff;
  margin-bottom: 25px;
  position: relative;
  overflow: hidden;
  display: flex;
  border-radius: 15px;
  // z-index: -99;
}

// 状态1 实战页面
.state1 {
  height: 175px;
  .ExePic {
    height: 100%;
    width: 33.3%;
    background-color: $card-bgcolor;
    img {
      display: block;
      width: 100%;
      height: 100%;
    }
  }
  .ExeDetail {
    width: 66.7%;
    padding: 18px;
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
      display: inline-block;
      section{
        position: relative;
        overflow: auto;
        padding-left: 5em;
        &:before{
          position: absolute;
          left:0;
          top: 0;
          content: '项目意义:';
          color: rgba($color: #222, $alpha: .3);
        }
      }
    }
    footer {
      font-size: 12px;
      position: absolute;
      bottom: 12px;
      right: 12px;
      padding: 0;
      border: none;
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
.card {
  display: flex;
  flex-direction: column;
  .more {
    display: flex;
    justify-content: center;
    align-items: center;
  }
}

</style>
