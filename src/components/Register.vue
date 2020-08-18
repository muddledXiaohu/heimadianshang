<template>
  <div class="contanior">
    <div class="main">
      <div class="logo">
        <div class="milogo"></div>
      </div>
      <h3 class="login-title">手机号登录</h3>
      <el-form ref="registerFormRef" :model="registerForm" :rules="registerFormRules" label-width="80px">
        <el-form-item type="number" prop="phone">
          <span class="country_code">
            +86
            <van-icon name="arrow" />
          </span>
          <el-input v-model="registerForm.phone" placeholder="手机号" class="input-left55"></el-input>
        </el-form-item>
        <el-form-item prop='code'>
            <span class="verification-code"><el-button v-if="  btnTitle" @click="getNub($event)" :disabled='flag' :class={reverse:flag} v-model="verifyCode">{{btnTitle}}</el-button></span>
          <el-input placeholder="请输入验证码" v-model="registerForm.code"></el-input>
          <div v-if="error" class="invalid-feedback" :class="{feedback:flags}">{{error}}</div>
        </el-form-item>
        <div>
          <div style="margin: 16px;">
            <van-button
              round
              block
              color="#ff6700"
              native-type="submit"
              class="register_color"
              @click="loginRegister"
            >立即登录</van-button>
          </div>
          <div style="margin: 16px;">
            <van-button
              round
              block
              color="#F0F0F0"
              native-type="submit"
              class="btns-font-size"
              @click="handle"
            >用户名密码登录</van-button>
          </div>
        </div>
      </el-form>
      <div class="register">
        <a href="javascript:;">收不到验证码？</a>
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
      registerForm: {
        phone: '',
        code: ''

      },
      flag: false,
      flags: false,
      verifyCode: '',
      btnTitle: '获取验证码',
      error: '',
      registerFormRules: {
        phone: [
          { required: true, message: '请输入手机号码', trigger: 'blur' },
          { pattern: /^1[3456789]\d{9}$/, message: '手机号码格式不正确', trigger: 'blur' }
        ]
      }
    }
  },
  mounted () {},
  methods: {
    handle () {
      this.$router.push('/login')
    },
    // 登录
    async loginRegister () {
      const { data: res } = await this.$http.get('/login')
      console.log(res)
      if (this.registerForm.phone === res.data.username) return this.$message.error('手机号已注册，去登陆')
      if (this.registerForm.phone !== res.data.username) {
        if (this.registerForm.code.length !== 4) {
          return this.$message.error('验证码错误')
        } else {
          this.$router.push('/member')
        }
      }
    },
    // 获取验证码
    getNub () {
      console.log(this.registerForm.phone)
      if (this.registerForm.phone === '') {
        return this.$message.error('手机号不能为空')
      } else if (!/^1[345678]\d{9}$/.test(this.registerForm.phone)) {
        this.flags = true
        this.error = '请输入正确格式的手机号'
        this.getcss()
        return
      }

      this.getReverse()
      console.log(11)
    },
    getcss () {
      const flag = this.flags
      setTimeout(() => {
        if (flag) {
          this.flags = false
        }
      }, 3000)
    },
    // 到计时
    getReverse () {
      let time = 60
      const timer = setInterval(() => {
        if (time === 0) {
          clearInterval(timer)
          this.flag = false
          this.btnTitle = '获取验证码'
        } else {
          this.btnTitle = time + '秒后重试'
          this.flag = true
          time--
        }
      }, 1000)
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
  /deep/ .el-form-item__content {
    position: relative;
    margin-left: 0 !important;
  }
  /deep/ .el-input input {
    height: 50px !important;
    line-height: 50px;
  }
  /deep/ .el-input__inner {
    color: #9b9b9b;
    font-size: 18px;
  }
  .country_code {
    position: absolute;
    left: 7px;
    top: 7px;
    z-index: 999;
    font-size: 18px;
    color: #9b9b9b;
    .van-icon {
      position: absolute;
      left: 30px;
      top: 10px;
    }
  }
  /deep/ .input-left55 .el-input__inner {
    padding-left: 53px !important;
  }

  .van-button__text {
    font-size: 18px;
    font-weight: 700;
  }
  .btns-font-size .van-button__text {
    color: #000;
  }
  .verification-code{
      position: absolute;
      top: 1px;
      right: 1px;
      z-index: 9;
     .el-button{
          background-color: #fff;
          border: none;
          color: #0D93FF;
          height: 48px;
      }
  }
  .register {
    text-align: center;
  }

  .register a {
    color: #9b9b9b;
  }
  .icon {
    margin-top: 45px;
    text-align: center;
  }
  .icon p {
    font-size: 12px;
    color: #b0b0b0;
  }
  .left20 {
    margin-left: -40px;
  }

  .iconfont {
    font-family: "iconfont";
    font-size: 35px;
    font-style: normal;
    -webkit-font-smoothing: antialiased;
    -webkit-text-stroke-width: 0.2px;
    -moz-osx-font-smoothing: grayscale;
    padding-left: 20px;
  }
  .icon .left20.iconfont {
    color: #46bb36;
  }
  .icon .center-icon-color.iconfont {
    color: #06b4fd;
  }
  .icon .right-color.iconfont {
    color: #fb5555;
  }
  @font-face {
    font-family: "iconfont"; /* project id 2008708 */
    src: url("//at.alicdn.com/t/font_2008708_dexqug0zcob.eot");
    src: url("//at.alicdn.com/t/font_2008708_dexqug0zcob.eot?#iefix")
        format("embedded-opentype"),
      url("//at.alicdn.com/t/font_2008708_dexqug0zcob.woff2") format("woff2"),
      url("//at.alicdn.com/t/font_2008708_dexqug0zcob.woff") format("woff"),
      url("//at.alicdn.com/t/font_2008708_dexqug0zcob.ttf") format("truetype"),
      url("//at.alicdn.com/t/font_2008708_dexqug0zcob.svg#iconfont")
        format("svg");
  }
}
.reverse{
    color: #666!important;
    background-color: #ccc!important;
    width:110px;
}
.invalid-feedback{
    display: block;
    text-align: center;
    display: none;
    margin: 0;
    padding: 0;
}
 /deep/ .feedback{
display: block;
color: #F56C6C;
font-size: 14px;
}
 /deep/ .el-form-item__error{
    display: none;

}
</style>
