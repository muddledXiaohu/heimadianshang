<template>
  <div class="contanior">
    <div class="main">
      <div class="logo">
        <div class="milogo"></div>
      </div>
      <h3 class="login-title">账号登录</h3>
      <el-form :model="loginForm" :rules="loginFormRules" ref="loginFormRef" label-width="100px">
        <el-form-item type="number" prop="username">
          <el-input v-model="loginForm.username" placeholder="手机号"></el-input>
        </el-form-item>
        <el-form-item type="password" prop="password">
          <el-input v-model="loginForm.password" placeholder="密码" show-password></el-input>
        </el-form-item>
      <div>
        <div style="margin: 16px;">
          <van-button round block color="#ff6700" native-type="submit" class="login_color" @click="logins">登录</van-button>
        </div>
        <div style="margin: 16px;">
          <van-button round block color="#F0F0F0" native-type="submit" @click="register">手机短信登录</van-button>
        </div>
      </div>
      </el-form>
      <div class="register">
        <a href="javascript:;">立即注册</a>
        <span>|</span>
        <a href="javascript:;">忘记密码？</a>
      </div>
      <div class="icon">
        <p>其他方式登录</p>
        <span class="iconfont left20">&#xe61a;</span>
        <span class="iconfont center-icon-color">&#xe608;</span>
        <span class="iconfont right-color">&#xe619;</span>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: [],
  data () {
    return {
      loginForm: {
        username: '',
        password: ''
      },
      loginFormRules: {
        username: [{ required: true, message: '请输入手机号码', trigger: 'blur' },
          { pattern: /^1[3456789]\d{9}$/, message: '手机号码格式不正确', trigger: 'blur' }],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 6, max: 16, message: '长度在 6 到 16 个字符', trigger: 'blur' }
        ]
      }
    }
  },
  mounted () {},
  methods: {
    async logins () {
      const { data: res } = await this.$http.get('http://api.cms.liulongbin.top/login')
      console.log(res)
      this.$refs.loginFormRef.validate(valid => {
        if (!valid) return this.$message.error('填好一点')
        if (this.loginForm.username !== res.data.username) return this.$message.error('手机号没有注册，去注册')
        if (this.loginForm.username !== res.data.username || this.loginForm.password !== res.data.password) return this.$message.error('登录失败')
        this.$router.push('/member')
      })
    },
    register () {
      this.$router.push('/register')
    }
  }
}
</script>
<style lang="less" scoped>
body {
  background-color: #fafafa;
}
.contanior {
  padding: 0 10px;
  border-right: 1px solid #ccc;
  margin: 30px auto;
  max-width: 500px;
  min-width: 320px;
}
.main {
  margin: 10px;
  background-color: #fff;
  .logo {
    height: 100px;
    position: relative;
    .milogo {
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
      width: 50px;
      height: 50px;
      background: url(../assets/milogo@2x.png), no-repeat;
      background-size: 100%;
    }
  }
  h3 {
    margin: 0;
    padding: 0;
  }
  .login-title {
    text-align: center;
    font-weight: 400;
    margin-bottom: 20px;
    color: #676767;
  }
  /deep/ .el-form-item__content{
    margin-left: 0!important;

  }
  /deep/ .el-input input{
    height: 50px!important;
    line-height: 50px;

  }
  /deep/ .el-input__inner{
  color: #9B9B9B;
  font-size: 16px;
  }
  .van-button {
    font-size: 18px;
  }
  .login_color .van-button__text {
    color: #fff;
  }
  .van-button__text {
    color: #000;
  }
  .register {
    text-align: center;
  }

  .register a {
    color: #9b9b9b;
  }
  .register span {
    padding: 0 10px;
  }
}
.icon{
  margin-top: 45px;
  text-align: center;
}
.icon p{
  font-size: 12px;
  color: #B0B0B0;
}
.left20{
  margin-left: -40px;

}

.iconfont{
  font-family:"iconfont";
  font-size:35px;
  font-style:normal;
  -webkit-font-smoothing: antialiased;
  -webkit-text-stroke-width:0.2px;
  -moz-osx-font-smoothing:grayscale;
  padding-left:20px;

}
.icon .left20.iconfont{
    color: #46BB36;
}
.icon .center-icon-color.iconfont {
 color:#06B4FD;
}
.icon .right-color.iconfont{
  color: #FB5555;
}
@font-face {
  font-family: 'iconfont';  /* project id 2008708 */
  src: url('//at.alicdn.com/t/font_2008708_dexqug0zcob.eot');
  src: url('//at.alicdn.com/t/font_2008708_dexqug0zcob.eot?#iefix') format('embedded-opentype'),
  url('//at.alicdn.com/t/font_2008708_dexqug0zcob.woff2') format('woff2'),
  url('//at.alicdn.com/t/font_2008708_dexqug0zcob.woff') format('woff'),
  url('//at.alicdn.com/t/font_2008708_dexqug0zcob.ttf') format('truetype'),
  url('//at.alicdn.com/t/font_2008708_dexqug0zcob.svg#iconfont') format('svg');
}

</style>
