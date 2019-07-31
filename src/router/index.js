import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

export const constRouterMap = [

  {
    // 页面整体布局容器
    path: '/',
    name: 'index',
    redirect: '/home',
    meta: {
      auth: false,
      title: '首页',
    },
    component: () => import('@/layout/Main'),
    children: [
      // 首页
      {
        path: '/home',
        name: 'home',
        meta: {
          auth: false,
          title: '首页',
        },
        component: () => import('@/views/Homepage'),
      },
      // 文章
      {
        path: '/article',
        name: 'article',
        meta: {
          auth: false,
          title: '文章',
        },
        component: () => import('@/views/article'),
      },

      // 实战练习
      {
        path: '/exercise',
        name: 'exercise',
        meta: {
          auth: false,
          title: '实战项目',
        },
        redirect: '/exercise/list',
        component: () => import('@/views/exercise'),
        children: [
          // 项目动态
          {
            path: ':exeid/news',
            name: 'projectNews',
            meta: {
              auth: false,
              title: '项目动态',
            },
            component: () => import('@/views/exercise/News.vue'),
          },
          // 任务列表
          {
            path: ':exeid/task',
            name: 'task',
            meta: {
              auth: false,
              title: '任务列表',
            },
            component: () => import('@/views/exercise/TaskList.vue'),
            children: [

            ],
          },
        ],
      },
      {
        path: '/signPunch',
        name: 'signPunch',
        component: () => import('@/views/signPunch/index.vue'),
      },
      {
        path: '/exercise/:exeid/task/:taskid',
        name: 'taskPage',
        // redirect: '/exercise/:exeid/task/:taskid/detail',
        meta: {
          auth: false,
          title: '任务页面',
        },
        component: () => import('@/views/exercise/task'),
        children: [
          // 任务详情
          // {
          //   path: 'detail',
          //   name: 'taskDetail',
          //   meta: {
          //     auth: false,
          //     title: '任务详情',
          //   },
          //   component: () => import('@/views/exercise/task/detail'),
          // },
          // 思路分享
          {
            path: '/',
            name: 'taskIdea',
            meta: {
              auth: false,
              title: '思路分享',
            },
            component: () => import('@/views/exercise/task/idea'),
          },
          {
            path: 'taskBlankPage',
            name: 'taskBlankPage',
            meta: {
              auth: false,
              title: '思路分享',
            },
            component: () => import('@/views/exercise/components/TaskBlankPage'),
          },
        ],
      },
      // 项目列表
      {
        path: '/exercise/list',
        name: 'exeList',
        meta: {
          auth: false,
          title: '项目列表',
        },
        component: () => import('@/views/exercise/ExeList.vue'),
      },
      // 消息
      {
        path: '/message',
        name: 'message',
        redirect: '/message/praiseAndComment',
        meta: {
          auth: true,
          title: '消息',
        },
        component: () => import('@/views/message/messageNavBar'),
        children: [
          {
            path: '/message/praiseAndComment',
            name: 'praiseAndComment',
            redirect: '/message/praiseAndComment/myComment',
            meta: {
              auth: false,
              title: '点赞评论',
            },
            component: () => import('@/views/message/praiseAndComment'),
            children: [
              {
                path: '/message/praiseAndComment/myComment',
                name: 'myComment',
                meta: {
                  auth: false,
                  title: '我的评论',
                },
                component: () => import('@/views/message/comment'),
              },
              {
                path: '/message/praiseAndComment/myPraise',
                name: 'myPraise',
                meta: {
                  auth: false,
                  title: '我的点赞',
                },
                component: () => import('@/views/message/praise'),
              },
            ],
          },
          {
            path: '/message/systemInfo',
            name: 'systemInfo',
            meta: {
              auth: false,
              title: '系统通知',
            },
            component: () => import('@/views/message/systemInfo.vue'),
          },
        ],
      },
      // 团队
      {
        path: '/team',
        name: 'team',
        meta: {
          auth: false,
          title: '很棒棒团队',
        },
        component: () => import('@/views/team'),
      },
      // 个人中心
      {
        path: '/user',
        name: 'user',
        redirect: '/user/info',
        meta: {
          auth: true,
          title: '个人中心',
        },
        component: () => import('@/views/user'),
        children: [
          // 个人资料
          {
            path: 'info',
            name: 'UserInfo',
            meta: {
              auth: false,
              title: '个人资料',
            },
            component: () => import('@/views/user/Info'),
          },
          // 个人关注的项目动态
          {
            path: 'project',
            name: 'UserProject',
            meta: {
              auth: false,
              title: '项目动态',
            },
            component: () => import('@/views/user/Project'),
          },
        ],
      },
    ],
  },
  // 登陆
  {
    path: '/signin',
    name: 'signin',
    meta: {
      auth: false,
      title: '登陆',
    },
    component: () => import('@/views/Login/signin.vue'),
  },
  {
    path: '/loginBlankPage',
    name: 'loginBlankPage',
    meta: {
      auth: false,
      title: '登录',
    },
    component: () => import('@/views/Login/loginBlankPage.vue'),
  },
  // 注册sign up
  {
    path: '/signup',
    name: 'signup',
    meta: {
      auth: false,
      title: '注册',
    },
    component: () => import('@/views/Login/signup.vue'),
  },
  {
    path: '*',
    name: 'page404',
    component: () => import('@/views/error/error404.vue'),
  },
];
export default new Router({
  linkActiveClass: 'active',
  routes: [...constRouterMap],
});
