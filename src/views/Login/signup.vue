<template>
  <div class="signup-wrap">
    <el-form :model="signUpForm" :rules="rules" ref="signUpForm" label-width="0px">
      <img src="/static/logo.svg" alt="logo" class="logo">
      <h1 class="signup-title">欢迎来到棒棒团</h1>
        <el-form-item prop="phone">
            <el-input
              v-model.trim="signUpForm.phone"
              placeholder="请输入电话号码">
            </el-input>
        </el-form-item>
        <el-form-item prop="smsCode">
          <el-col :span="15">
            <el-input
              v-model.trim="signUpForm.smsCode"
              :disabled="!sendCode"
              placeholder="请输入短信验证码">
            </el-input>
          </el-col>
          <el-col :span="1" style="min-height:1px"></el-col>
          <el-col :span="8">
            <button
            :class="[sendCode ? 'disabled' : '', 'signup-btn']"
            :disabled="sendCode"  @click.prevent="sendSmsCode()">
            <span v-show="sendCode">{{time}} 秒后重新发送</span>
            <span v-show="!sendCode">发送手机验证码</span>
            </button>
          </el-col>
        </el-form-item>
        <el-form-item prop="password">
            <el-input
              v-model.trim="signUpForm.password"
              placeholder="请输入密码"
              type="password">
            </el-input>
        </el-form-item>
        <el-form-item prop="verifyPassword">
            <el-input
              v-model.trim="signUpForm.verifyPassword"
              placeholder="请重复输入密码"
              type="password">
            </el-input>
        </el-form-item>
        <button class="signup-btn signup-signup-btn" @click.prevent="userSignup('signUpForm')">注册</button>
        <div class="bottom-link">
          <router-link to="/home"><i class="el-icon-caret-left" />回到首页</router-link>
          <router-link to="/signin">已有账号? 前往登陆<i class="el-icon-caret-right" /></router-link>
        </div>
    </el-form>
  </div>
</template>

<script>
import { Message } from 'element-ui';
import { register, sendSms } from '@/api/user';

const phoneReg = /^((13[0-9])|(14[5,7])|(15[0-3,5-9])|(17[0,3,5-8])|(18[0-9])|166|198|199|(147))\d{8}$/;

export default {
  name: 'sign-up',
  data() {
    const verifyPhone = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入电话号码'));
      } else if (!phoneReg.test(value)) {
        callback(new Error('电话号码格式不正确'));
      } else {
        callback();
      }
    };
    const checkPwd = (rule, value, callback) => {
      const pwdReg = /^[\w]{6,20}$/;
      if (value === '') {
        callback(new Error('请输入密码'));
      } else if (!pwdReg.test(value)) {
        callback(new Error('密码由 6-20 的字母, 数字或下划线组成'));
      } else if (this.signUpForm.verifyPassword === '') {
        this.$refs.signUpForm.validateField('verifyPassword');
      } else {
        callback();
      }
    };
    const verifyPwd = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请重复输入密码'));
      } else if (value !== this.signUpForm.password) {
        callback(new Error('两次输入密码不一致'));
      } else {
        callback();
      }
    };
    return {
      sendCode: false,
      time: 60,
      msg: '',
      signUpForm: {
        phone: '',
        smsCode: '',
        password: '',
        verifyPassword: '',
      },
      rules: {
        phone: [
          { validator: verifyPhone, trigger: 'blur' },
        ],
        smsCode: [
          { required: true, message: '请输入短信验证码', trigger: 'blur' },
        ],
        password: [
          { validator: checkPwd, trigger: 'blur' },
        ],
        verifyPassword: [
          { validator: verifyPwd, trigger: 'blur' },
        ],
      },
    };
  },
  methods: {
    async sendSmsCode() {
      const { phone } = this.signUpForm;
      try {
        if (!phoneReg.test(phone)) throw new Error('电话号码格式不正确!');
        await sendSms({ phone });
        this.sendCode = true;
        const tick = setInterval(() => {
          this.time--;
          if (this.time <= 0) {
            this.sendCode = false;
            this.time = 60;
            clearInterval(tick);
          }
        }, 1000);
      } catch (e) {
        Message({
          message: e.message,
          type: 'error',
        });
      }
    },
    async userSignup(formName) {
      this.$refs[formName].validate(async (valid) => {
        if (valid) {
          const signupInfo = {
            phone: this.signUpForm.phone,
            sms_code: this.signUpForm.smsCode,
            password: this.signUpForm.password,
            verify_password: this.signUpForm.verifyPassword,
          };
          const siginInfo = {
            phone: this.signUpForm.phone,
            password: this.signUpForm.password,
          };
          try {
            await register(signupInfo);
            await this.$store.dispatch('userLogin', siginInfo);
            this.$router.push('/user/info');
          } catch (e) {
            Message({
              message: e,
              type: 'error',
            });
            console.log(e);
          }
        } else {
          console.log('提交错误!');
          return false;
        }
      });
    },
  },
};
</script>

<style lang="scss">
$red: #F73859;
$white: #fff;
$size-xs: 480px;
.signup-btn{
  &.disabled{
    box-shadow:none;
    cursor:inherit;
    background-color: lighten($red, 10%);
    &:hover{
      box-shadow: none;
    }
  }
  color: #fff;
  outline: none;
  border: none;
  text-align: center;
  width: 100%;
  cursor: pointer;
  transition: all .3s ease;
  height: 3em;
  background-color: $red;
  border-radius: 1.5em;
  box-shadow: 0 4px 16px rgba(0,0,0,.2);
  &:hover{
    box-shadow: 0 1px 4px rgba(0,0,0,.2);
  }
}
.signup-wrap {
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
  .signup-title {
    color: $red;
  }
  .signup-signup-btn {
      margin-top: 1em;
  }
  .sms-signup-btn{
    position: relative;
    top: 0;
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
