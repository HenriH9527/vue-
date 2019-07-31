<template>
  <div class="signin-wrap">
    <el-form :model="signinForm" :rules="rules" ref="signinForm" label-width="0px">
      <img src="/static/logo.svg" alt="logo" class="logo">
      <h1 class="signin-title">欢迎来到棒棒团</h1>
        <el-form-item prop="username">
            <el-input
              v-model.trim="signinForm.username"
              placeholder="请输入账号">
              <i slot="prefix" class="prefix icon-user"></i>
            </el-input>
        </el-form-item>
        <el-form-item prop="password">
            <el-input
              v-model.trim="signinForm.password"
              placeholder="请输入密码"
              type="password"
              @keyup.enter.native="userLogin()">
              <i slot="prefix" class="prefix icon-lock"></i>
            </el-input>
        </el-form-item>
        <button class="signin-btn" @click.prevent="userLogin()">登录</button>
        <div class="bottom-link">
          <router-link to="/home"><i class="el-icon-caret-left" />回到首页</router-link>
          <router-link to="/signup">没有账号? 前往注册<i class="el-icon-caret-right" /></router-link>
        </div>
        <span class="signin-tips">Tips: 测试账号：13912345678; 密码：bbtwebtest</span>
    </el-form>
  </div>
</template>

<script>
import { Message } from 'element-ui';
import { login } from '@/api/user';
import { getProjectList } from '@/api/project';

export default {
  name: 'Login',
  data() {
    return {
      msg: '',
      signinForm: {
        username: '',
        password: '',
      },
      rules: {
        phone: [
          { required: true, message: '请输入账号', trigger: 'blur' },
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
        ],
      },
    };
  },
  methods: {
    async userLogin() {
      const userInfo = {
        phone: this.signinForm.username,
        password: this.signinForm.password,
      };
      try {
        await this.$store.dispatch('userLogin', userInfo);
        this.$router.push('/loginBlankPage');
      } catch (e) {
        console.log(e);
      }
      console.log(userInfo);
    },
  },
};
</script>

<style lang="scss">
$red: #F73859;
$white: #fff;
$size-xs: 480px;
$size-sm: 600px;
$size-md: 840px;
$size-lg: 960px;
$size-xl: 1280px;
$size-2x: 1440px;
.signin-wrap {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%,-50%);
  width: 400px;
  padding: 4em;
  border-radius: 5px;
  background-color: $white;
  box-shadow: 0 1px 8px rgba(0,0,0,.1);
  text-align: center;
  .logo{
    width: 50px;
  }
  .prefix{
    margin: 0 2px;
    color: $red;
  }
  .signin-title {
    color: $red;
  }
  .signin-btn {
    text-align: center;
    width: 100%;
    height: 3em;
    margin-top: 1em;
    background-color: $red;
    color: $white;
    outline: none;
    border: none;
    border-radius: 1.5em;
    cursor: pointer;
    box-shadow: 0 4px 16px rgba(0,0,0,.2);
    transition: all .3s ease;
    &:hover{
      box-shadow: 0 1px 4px rgba(0,0,0,.2);
    }
  }
  .bottom-link {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    padding-top: .5em;
    a {
      display: inline-block;
      color: #222;
      text-decoration: none;
      font-size: 1rem;
      line-height: 1rem;
      padding: 1.5rem .5rem;
      transition: all 200ms;
      border-bottom: solid .1rem transparent;
      &.active,
      &:hover{
        color: $red;
      }
      &:last-child{
        color: $red;
        &:hover{
          color: lighten($red, 20%)
        }
      }
    }
  }
  @media screen and (max-width:$size-xs){
    margin: 2rem auto;
    position: relative;
    width: calc(100% - 5rem);
    padding: 1.5rem;
    top: auto;
    left: auto;
    transform: none;
  }
}
</style>
