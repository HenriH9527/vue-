<template>
  <div class="user-info">
    <ul>
      <li class="user-img">
        <div class="user-item">
          <div class="content">
            <div class="title">我的头像</div>
            <div class="img">
              <img :src="userInfo.avatar || noImage" alt="用户头像">
            </div>
          </div>
          <div class="btn" @click="showHideCont('imgshow')">{{imgshow? '收起': '编辑'}}&nbsp;&nbsp;<i :class="imgshow ? 'icon-chevron-up' : 'icon-chevron-down'"></i></div>
        </div>
        <transition name="fade">
          <div class="hid-content" v-show="imgshow">
            <el-upload
              :limit="1"
              :action="uploadAvatar"
              :on-success="avatarSuccess"
              :on-error="avatarError"
              :before-upload="beforeAvatarUpload"
              :show-file-list="false"
              with-credentials>
              <el-button size="small" type="primary">点击上传</el-button>
              <div slot="tip" class="el-upload__tip">提示: 只能上传jpg/png文件，且不超过 2MB</div>
            </el-upload>
          </div>
        </transition>
      </li>
      <li>
        <div class="user-item">
          <div class="content">
            <div class="title">手机号</div>
            <p>{{ userInfo.phone }}</p>
          </div>
          <div class="btn" @click="showHideCont('phoneshow')">{{phoneshow? '收起': '编辑'}}&nbsp;&nbsp;<i :class="phoneshow ? 'icon-chevron-up' : 'icon-chevron-down'"></i></div>
        </div>
        <transition name="fade">
          <div class="hid-content" v-show="phoneshow">
            <div class="inputbox">
              <label>手机号</label>
                <el-input
                  class="input"
                  v-model="userInfo.phone"
                  placeholder="输入你的新手机号"
                  disabled>
                </el-input>
            </div>
            <p class="agree-btn">
              <el-button type="danger"  disabled>更改绑定</el-button>
            </p>
            <span style="font-size:12px; color: #606266">提示: 暂不支持更改绑定手机号</span>
          </div>
        </transition>
      </li>
      <li>
        <div class="user-item">
          <div class="content">
            <div class="title">昵称</div>
            <p>{{ userInfo.nickname }}</p>
          </div>
          <div class="btn" @click="showHideCont('nameshow')">
            {{nameshow? '收起': '编辑'}}&nbsp;&nbsp;
            <i :class="nameshow ? 'icon-chevron-up' : 'icon-chevron-down'"></i>
          </div>
        </div>
        <transition name="fade">
          <div class="hid-content" v-show="nameshow">
            <div class="inputbox">
              <label>昵称</label>
              <el-input
                class="input"
                v-model="userInfo.nickname"
                placeholder="输入你的新昵称"
              >
              </el-input>
            </div>
            <p class="agree-btn">
              <el-button type="primary" @click="updateName()">更改昵称</el-button>
            </p>
          </div>
        </transition>
      </li>
      <li>
        <div class="user-item">
          <div class="content">
            <div class="title">性别</div>
            <p>{{ genderMap[userInfo.gender]}}</p>
          </div>
          <div class="btn"
            @click="showHideCont('gendershow')">{{gendershow? '收起': '编辑'}}
            &nbsp;&nbsp;<i :class="gendershow ? 'icon-chevron-up' : 'icon-chevron-down'"></i>
          </div>
        </div>
        <transition name="fade">
          <div class="hid-content" v-show="gendershow">
            <div class="inputbox">
              <label>性别</label>
              <el-radio v-model="userInfo.gender" label="m">{{genderMap['m']}}</el-radio>
              <el-radio v-model="userInfo.gender" label="f">{{genderMap['f']}}</el-radio>
              <el-radio v-model="userInfo.gender" label="x">{{genderMap['x']}}</el-radio>
            </div>
            <p class="agree-btn">
              <el-button type="primary" @click="updateGender()">更改性别</el-button>
            </p>
          </div>
        </transition>
      </li>
      <li>
        <div class="user-item">
          <div class="content">
            <div class="title">密码</div>
          </div>
          <div class="btn" @click="showHideCont('passwordshow')">
            {{passwordshow? '收起': '编辑'}}&nbsp;&nbsp;
            <i :class="passwordshow ? 'icon-chevron-up' : 'icon-chevron-down'"></i>
          </div>
        </div>
        <transition name="fade">
          <div class="hid-content" v-show="passwordshow">
            <div class="inputbox">
              <label>当前密码</label>
              <el-input
                class="input"
                v-model.trim="passwordFrom.password"
                placeholder="请输入旧密码"
                type="password">
              </el-input>
            </div>
            <div class="inputbox">
              <label>新密码</label>
              <el-input
                class="input"
                v-model.trim="passwordFrom.new_password"
                placeholder="请输入新密码"
                type="password">
              </el-input>
            </div>
            <div class="inputbox">
               <label>确认新密码</label>
              <el-input
                class="input"
                v-model.trim="passwordFrom.new_verify_password"
                placeholder="请重复输入新密码"
                type="password">
              </el-input>
            </div>
            <p class="agree-btn">
              <el-button type="primary" @click="changePwd()">更改密码</el-button>
            </p>
          </div>
        </transition>
      </li>
    </ul>
  </div>
</template>

<script>
import { Message } from 'element-ui';
import { updateUserInfo, updatePassword } from '@/api/user';

export default {

  data() {
    return {
      uploadAvatar: '/user/upload_avatar',
      userInfo: this.$session.getUser(),
      imgshow: false,
      phoneshow: false,
      nameshow: false,
      gendershow: false,
      genderMap: {
        m: '男',
        f: '女',
        x: '保密',
      },
      passwordshow: false,
      passwordFrom: {
        password: '',
        new_password: '',
        new_verify_password: '',
      },
      noImage: '//placem.at/people?w=56&h=56&random=1',
    };
  },
  methods: {
    showHideCont(flag) {
      this[flag] = !this[flag];
    },
    beforeAvatarUpload(file) {
      const type = file.type === 'image/jpeg' || file.type === 'image/png';
      const limit = file.size / 1024 / 1024 < 2;
      if (!type) {
        Message({
          type: 'error',
          message: '上传头像图片只能是 JPG/PNG 格式!',
        });
      }
      if (!limit) {
        Message({
          type: 'error',
          message: '上传头像图片大小不能超过 2MB!',
        });
      }
      return type && limit;
    },
    avatarSuccess(res, file, fileList) {
      Message({
        type: 'success',
        message: '头像上传成功!',
      });
      this.userInfo.avatar = res.data.avatar;
      this.$session.setUser(this.userInfo);
      this.$store.dispatch('flashInfo');
    },
    avatarError(res, file, fileList) {
      Message({
        type: 'error',
        message: '头像上传失败,请重新上传!',
      });
    },
    async updateName() {
      const regx = /^[a-zA-Z\u4E00-\u9FA5\uf900-\ufa2d·s]{1,20}$/;
      const { nickname } = this.userInfo;
      if (!regx.test(nickname)) {
        Message({
          type: 'error',
          message: '昵称格式不正确,不能包含~!@#$%等特殊字符!',
        });
        return false;
      }
      try {
        await updateUserInfo({ nickname });
        this.$session.setUser(this.userInfo);
        Message({
          type: 'success',
          message: '昵称修改成功!',
        });
      } catch (e) {
        Message({
          type: 'error',
          message: '昵称修改失败!',
        });
        console.log(e);
      }
    },
    async updateGender() {
      const { gender } = this.userInfo;
      try {
        await updateUserInfo({ gender });
        this.$session.setUser(this.userInfo);
        Message({
          type: 'success',
          message: '性别修改成功!',
        });
      } catch (e) {
        Message({
          type: 'error',
          message: '性别修改失败!',
        });
        console.log(e);
      }
    },
    async changePwd() {
      const pwdReg = /^[\w]{6,20}$/;
      const pwd = this.passwordFrom;
      if (!pwdReg.test(pwd.new_password)) {
        Message({
          type: 'error',
          message: '密码由 6-20 的字母, 数字或下划线组成!',
        });
        return false;
      }
      if (pwd.new_password !== pwd.new_verify_password) {
        Message({
          type: 'error',
          message: '两次输入密码不一致!',
        });
        return false;
      }
      try {
        await updatePassword(pwd);
        Message({
          type: 'success',
          message: '修改密码成功',
        });
      } catch (e) {
        Message({
          type: 'error',
          message: e.message,
        });
        console.log(e);
      }
    },
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

.user-info {
  background: white;
  padding: 1.1rem;
  ul {
    margin: 0;
    padding: 0;
  }
  li {
    list-style: none;
    border-bottom: 1px solid $border-color;
    overflow: hidden;
  }
  .user-item {
    display: flex;
    height: 94px;
    color: $text-dark-1;
    align-items: center;
    justify-content: space-between;
    position: relative;
    z-index: 1;
    background: white;
    overflow: hidden;
    .content {
      display: flex;
      align-items: center;
      height: 100%;
      .title {
        width: 100px;
      }
      .img {
        width: 56px;
        height: 56px;
        border-radius: 50%;
        overflow: hidden;
        img {
          height: 100%;
          width: 100%;
          border-radius: 50%;
        }
      }
      p {
        color: $text-dark-1;
      }
    }
    .btn {
      color: #757575;
      cursor: pointer;
    }
  }
  .hid-content {
    padding-left: 100px;
    font-size: 0.8rem;
    position: relative;
    margin-bottom: 1em;
    z-index: 0;
    .imgbtn {
      .el-button.el-button--default {
        padding: 10px 60px;
      }
      .active {
        .el-button.el-button--default {
          color: $primary-color;
          border-color: $primary-color;
        }
      }
    }
    .agree-btn {
      margin-left: 85px;
    }
    .inputbox {
      label {
        width: 80px;
        color: $text-dark-2;
        display: inline-block;
      }
     .input {
        width: 288px;
        border-radius: 4px;
      }
    }
  }
}
.fade-enter-active, .fade-leave-active {
  // transform: translate(0,0);
  height: 100px;
  transition: all .4s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  // transform: translate(0,-100%);
  height: 0;
}
</style>
