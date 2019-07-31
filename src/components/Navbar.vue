<template>
  <div class="navbar-container" v-if="showNav">
    <header class="navbar">
      <div class="navbar-section">
        <div class="navbar-brand">
          <img src="/static/logo.svg" alt="logo">
          <span>棒棒团</span>
        </div>
        <div class="menu-btn" @click="menushow = !menushow">
          <i class="icon-menu"></i>
        </div>
      </div>
      <div class="navbar-section" :class="{'show-menu': menushow}">
        <router-link to="/home">首页</router-link>
        <router-link to="/article">文章</router-link>
        <router-link to="/exercise">实战项目</router-link>
        <router-link to="/signPunch">签到打卡</router-link>
        <router-link to="/message" v-if="isLogin" @click.native="hideCircle" style="display:none;">消息<span class="red-circle" v-bind:style="{ backgroundColor: circleColor}"></span></router-link>
        <router-link to="/team">棒帮团队</router-link>
        <el-dropdown class="avatar-container" trigger="click" v-if="isLogin" >
          <div class="avatar-wrapper">
            <img class="user-avatar" :src="userImg">
            <i class="el-icon-caret-bottom"></i>
          </div>
          <el-dropdown-menu slot="dropdown">
              <el-dropdown-item>
                <span to="/user" @click="goUser()" class="user-link">个人中心</span>
              </el-dropdown-item>
            <el-dropdown-item divided>
              <span @click="userLogout()" style="display:block;">立即登出</span>
            </el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
        <router-link to="/signin" v-if="!isLogin">登入注册</router-link>
      </div>
    </header>
  </div>
</template>

<script>
export default {
  name: 'nav-bar',
  data() {
    return {
      isLogin: this.$session.isLogin(),
      menushow: false,
      excludeList: ['login'],
      userInfo: this.$session.getUser(),
      socketSuccess: false,
      circleColor: 'white',
      noMsgColor: 'white',
      hasMsgColor: '#F73859',
      SocketAllMsg: [{
        type: 'cmt',
        is_read: 'false',
        cmt_user: 'A君',
        cmt_time: '2018年8月4日xx分',
        cmt_content: 'Its just a test1',
      },
      {
        type: 'cmt',
        is_read: 'true',
        cmt_user: 'B君',
        cmt_time: '2018年8月5日xx分',
        cmt_content: 'Its just a test2',
      },
      {
        type: 'cmt',
        is_read: 'true',
        cmt_user: 'C君',
        cmt_time: '2018年8月6日xx分',
        cmt_content: 'Its just a test3',
      },
      {
        type: 'praise',
        is_read: 'false',
        praise_user: 'A君',
        praise_target: 'Its just a test1',
      },
      {
        type: 'praise',
        is_read: 'false',
        praise_user: 'B君',
        praise_target: 'Its just a test2',
      },
      {
        type: 'praise',
        is_read: 'true',
        praise_user: 'C君',
        praise_target: 'Its just a test3',
      },
      {
        type: 'sysMsg',
        is_read: 'false',
        sys_msg_content: '组队反馈：您已成功组队！组长为用户名：xxx，联系方式微信/QQ：xxx，2018年8月2日xx分',
      },
      {
        type: 'sysMsg',
        is_read: 'true',
        sys_msg_content: 'Its just a test2',
      },
      {
        type: 'sysMsg',
        is_read: 'true',
        sys_msg_content: 'Its just a test3',
      },
      ],
    };
  },
  mounted() {
    console.log(this.userInfo);
    this.id = this.$socket.id;
    if (this.isLogin && this.socketSuccess === false) {
      this.$socket.emit('login', this.userInfo.id);
      console.log('成功推送user_id至服务器');
      this.socketSuccess = true;
    }
    this.$store.commit('sendData', this.SocketAllMsg);
  },
  sockets: {
    connect() {
      this.id = this.$socket.id;
      if (this.isLogin) {
        this.$socket.emit('login', this.userInfo.id);
      }
    },
    message(data) {
      console.log(data);
      if (data) {
        this.circleColor = this.hasMsgColor;
      }
    },
  },
  computed: {
    showNav() {
      return this.excludeList.indexOf(this.$route.name) === -1;
    },
    userImg() {
      const { avatar } = this.$session.getUser();
      return avatar || '//placem.at/people?w=56&h=56&random=1';
    },
  },
  methods: {
    async userLogout() {
      try {
        this.$socket.emit('logout', this.userInfo.id);
        await this.$store.dispatch('userLogout');
        this.$router.push('/home');
        this.isLogin = false;
      } catch (e) {
        console.log(e);
      }
    },
    goUser() {
      this.$router.push('/user');
    },
    hideCircle() {
      this.circleColor = this.noMsgColor;
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

$size-xs: 480px;
$size-sm: 600px;
$size-md: 840px;
$size-lg: 960px;
$size-xl: 1280px;
$size-2x: 1440px;

.navbar-container{
  z-index: 10;
  position: fixed;
  top: 0;
  width: 100%;
  box-shadow: 0px 2px 3px 0px rgba(0,0,0,0.07);
  .navbar{
    color: #fff;
    max-width: 1000px;
    margin: 0 auto;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .navbar-section{
      color: $nav_text;
      .avatar-container {
        position: relative;
        margin-right: 16px;
        top:1em;
        .avatar-wrapper {
          cursor: pointer;
          position: relative;
          overflow: hidden;
          .user-avatar {
            border-radius: 50%;
            height: 40px;
            width: 40px;
          }
          .el-icon-caret-bottom {
            position: absolute;
            right: -16px;
            top: 20px;
            font-size: 1.2em;
          }
        }
      }
      .user-link{
          display: inline-block;
          color: $nav_text;
          text-decoration: none;
          transition: all .2s ease;
          border-bottom: solid 1px transparent;
          &.active, &:hover,
          &:active{
            color: $primary-color;
            border-bottom-color: $primary-color;
          }
        }
      .navbar-brand{
        padding: 1rem;
        padding-left: 0;
        display: flex;
        align-items: center;
        img{
          height: 30px;
          padding-right: 5px;
        }
        span{
          font-size: 1.2rem;
          font-weight: 600;
        }
      }
      .menu-btn{
        display: none;
        cursor: pointer;
        padding: 1.2rem;
        font-size: 1.5rem;
      }
      a{
        display: inline-block;
        color: $nav_text;
        text-decoration: none;
        font-size: 1rem;
        line-height: 1rem;
        padding: 1.5rem .5rem;
        margin: 0 1.5rem;
        transition: all 200ms;
        border-bottom: solid .1rem transparent;
        &.active, &:hover,
        &:active{
          color: $primary-color;
          border-bottom-color: $primary-color;
        }
        &:last-child{
          padding-right: 0;
          margin-right: 0;
        }
        .red-circle {
          position: absolute;
          margin-left: 6px;
          margin-bottom: 12px;
          width: 5px;
          height: 5px;
          border-radius: 50%;
          transition: 0.1s;
        }
      }
    }
    @media screen and (max-width: $size-md){
      flex-direction: column;
      .navbar-section{
        width: 100%;
        display: flex;
        .menu-btn{
          display: block;
        }
        &:first-child{
          justify-content: space-between;
          align-items: center;
        }
        &:last-child{
          border-top: solid 1px #eee;
          transition: all 200ms;
          height: 0;
          overflow: hidden;
          flex-direction: column;
          a{
            width: 100%;
            padding: 1.5rem 0;
            margin: 0;
            &.active, &:hover{
              border-bottom-color: transparent;
            }
          }
        }
        &.show-menu{
          height: calc(4.1rem * 4);
        }
      }
    }
    @media screen and (max-width: 1000px) {
      padding: 0 1.2rem;
    }
  }
}
</style>
