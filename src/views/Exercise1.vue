<template>
  <div class="exercise">
    <div class="exercise-title">
      <h2>实战项目</h2>
      <p>理论没那么高尚，实践没那么庸俗</p>
    </div>
    <div class="task-list">
      <ExeCard :ExeList="ExeList" :login="login"></ExeCard>
    </div>
  </div>
</template>

<script>
// import ExeCard from '@/components/Exercise/ExeCard';
import ExeCard from '@/views/Exercise/components/ExeCard';

export default {
  components: {
    ExeCard,
  },
  data() {
    return {
      ExeList: [
        {
          id: 1,
          img: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1527082927989&di=e3789d6c0e3a6cbdefa7aca2b315b85d&imgtype=0&src=http%3A%2F%2Fimgsrc.baidu.com%2Fimgad%2Fpic%2Fitem%2F77094b36acaf2edd92e640f7871001e93901939c.jpg',
          title: '喵与喵寻',
          param: '喵与喵寻致力于解决当今社会中流浪猫狗的生存问题,为具备收养条件且有收养需求的用户提供相关信息,并且提供走失宠物失物招领的功能和宠物社区的模块<br/>我们是来自棒棒团的成员,我们想做个可以帮助流浪猫的小程序...同时也',
          significance: '喵与喵寻致力于解决当今社会中流浪猫狗的生存问题,为具备收养条件且有收养需求的用户提供相关信息,并且提供走失宠物失物招领的功能和宠物社区的模块',
          documet: '喵与喵寻产品和开发文档',
          address: 'https://github.com/Tex-wz/meowcat',
        }, {
          id: 2,
          img: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1527084963065&di=1c0cca79207c70b07c90b956dab1ef95&imgtype=0&src=http%3A%2F%2Fimgsrc.baidu.com%2Fimgad%2Fpic%2Fitem%2Fd62a6059252dd42a627eca7f093b5bb5c8eab8eb.jpg',
          title: '喵与喵寻',
          param: '喵与喵寻致力于解决当今社会中流浪猫狗的生存问题,为具备收养条件且有收养需求的用户提供相关信息,并且提供走失宠物失物招领的功能和宠物社区的模块<br/>我们是来自棒棒团的成员,我们想做个可以帮助流浪猫的小程序...同时也',
          significance: '喵与喵寻致力于解决当今社会中流浪猫狗的生存问题,为具备收养条件且有收养需求的用户提供相关信息,并且提供走失宠物失物招领的功能和宠物社区的模块',
          documet: '喵与喵寻产品和开发文档',
          address: 'https://github.com/Tex-wz/meowcat',
        },
      ],
      login: true, // 登录判断
    };
  },
  methods: {

  },
  beforeMount() {

  },
};
</script>

<style lang="scss" scoped>
$primary-color: #f73859;
$divider-color: #e0e0e0;
$border-color: #eeeeee;
$text-dark-1: #283149;
$text-dark-2: #404b69;
$text-dark-3: #757575;
$text-gray: #c0c4cc;

$size-xs: 480px;
$size-sm: 600px;
$size-md: 840px;
$size-lg: 960px;
$size-xl: 1280px;
$size-2x: 1440px;

.exercise {
  position: relative;
  width: 100%;
  box-sizing: border-box;
  .exercise-title {
    color: $text-dark-1;
  }
}
@media screen and (max-width: $size-md) {
  .exercise {
    .task-list {
      .task-item {
        flex-direction: column;
        .task-item-banner {
          width: 100%;
        }
        .task-item-content {
          width: 100%;
        }
      }
    }
  }
}
</style>
