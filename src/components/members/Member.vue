<template>
  <div>
    <van-row>
      <van-nav-bar
        title="会员中心"
        right-text="..."
        left-arrow
        @click-left="memberReturn"
        :fixed="true"
      />
      <div class="behind">
        <!-- 登陆过 -->
        <div class="information" v-if="values">
          <van-image round width="80px" height="80px" src="https://img.yzcdn.cn/vant/cat.jpeg" />
          <div class="infoLeft">
            <van-tag class="van-tag1" round type="primary" color="#fff">
              <span class="iconfont">&#xe630;</span>
            </van-tag>
            <van-tag class="van-tag2" round type="primary" color="#ba5045">
              <van-icon color="#9932CD" class="vantIconf" name="gem" />钻石
            </van-tag>
            <div class="suerName">
              <span>用户名:{{values.name}}</span>
            </div>
            <van-tag class="van-tag3" round type="primary" color="#ba5045">京享值24831</van-tag>
          </div>
          <div class="logout" @click="logout">
              退出
          </div>
        </div>
        <!-- 没登录 -->
        <div class="information" v-else>
          <van-image round width="80px" height="80px" src="https://img.yzcdn.cn/vant/cat.jpeg" />
          <router-link to="/login">
            <span>去登陆</span>
          </router-link>
        </div>
        <!-- 导航 -->
        <van-tabs type="line">
          <span class="iconfont iconfontxh">&#xe636;</span>
          <span class="iconfont iconfontxh xhiconfont1">&#xe604;</span>
          <span class="iconfont iconfontxh xhiconfont2">&#xe629;</span>
          <span @click="memberOrder" class="iconfont iconfontxh xhiconfont3">&#xe6e4;</span>
          <van-tab title="待付款">
            <van-row type="flex" justify="space-around">
              <van-col span="5">
                <div class="dibs5">5</div>
                <div>商品收藏</div>
              </van-col>
              <van-col span="5">
                <div class="dibs5">0</div>
                <div>我的足迹</div>
              </van-col>
            </van-row>
          </van-tab>
          <van-tab title="待收货">
            <van-empty description="您还没有购买商品" />
          </van-tab>
          <van-tab title="退换 / 售后">
            <van-empty description="暂时没有退款或售后商品" />
          </van-tab>
          <van-tab disabled title="全部订单"></van-tab>
          <div class="postabst"></div>
        </van-tabs>
      </div>
    </van-row>
  </div>
</template>
<script>
export default {
  props: [],
  data () {
    return {
      values: ''
    }
  },
  mounted () {
    this.values = JSON.parse(window.localStorage.getItem('token'))
  },
  methods: {

    // 全部订单
    memberOrder () {
      console.log(1)
      this.$router.push('/order')
    },

    // 返回
    memberReturn () {
      this.$router.push('/login')
    },
    // 退出
    logout () {
      localStorage.removeItem('token')
      location.reload()
    }
  }
}
</script>
<style lang="less" scoped>
/deep/.van-nav-bar__text {
    margin-bottom: 10px;
    font-size: 19px;
}
/deep/.van-nav-bar__title {
    font-weight: 400;
}
.behind{
    width: 100%;
    height: 140px;
    background-color: #f7f7f7;
    position: relative;
}
.behind .information{
    width: 100%;
    height: 120px;
    border-bottom-left-radius: 200px 15px;
    border-bottom-right-radius: 200px 15px;
    background: rgba(190, 25, 25, 0.319) linear-gradient(to
    right, rgba(233, 76, 4, 0.932), rgba(238, 72, 6, 0.5));transition: background-color
    .5s; }.box:hover {background-color: rgb(240, 0, 0);
}
/deep/.van-image{
    margin-top: 20px;
    margin-left: 20px;
}
.infoLeft{
    position: absolute;
    top: 20px;
    left: 110px;
}
/deep/.van-cell {
    border-bottom: 0;
    background-color: rgba(0, 0, 0, 0);
}
/deep/.van-field__control{
    color: #fff;
}
.infoLeft .van-icon {
    color: #000;
}
.van-tag1 {
    padding: 1px;
    position: absolute;
    top: 14px;
    left: 100px;
}
.van-tag2 {
    position: absolute;
    top: 14px;
    left: 125px;
    width: 40px;
}
.iconfont {
  font-family: "iconfont" !important;
  font-size: 16px;
  font-style: normal;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #f40;
}
.van-cell::after {
    content: inherit;
}
.suerName{
    position: absolute;
    top: 30px;
    left: 16px;
    font-size: 13px;
    color: #f1bebb;
}
.identity {
    top: -31px;
    left: 35px;
    font-size: 13px;
    color: #f1bebb;
}
.van-tag3{
    margin-top: 15px;
    margin-left: 7px;
}
.van-tabs{
    margin-top: 20px;
    position: relative;
}
/deep/.van-tabs__wrap{
    margin-bottom: 40px;
    position: relative;
}
.postabst{
    position: absolute;
    top: 65px;
    width: 100%;
    height: 15px;
    background-color: #f7f7f7;
}
/deep/.van-tab__text--ellipsis {
    height: 30px;
}
/deep/.van-tabs--line .van-tabs__wrap {
    padding-top: 15px;
}
.iconfontxh{
    position: absolute;
    top: 14px;
    left: 11%;
    color: #d4a063;
}
.xhiconfont1{
    left: 36%;
    font-size: 20px;
    font-weight: 700;
}
.xhiconfont2{
    left: 60%;
    font-size: 18px;
    font-weight: 700;
}
.xhiconfont3{
    left: 85%;
    color: red;
    width: 50px;
    height: 50px;
    line-height: 10px;
}
.dibs5{
    margin-left: 26px;
    font-weight: 700;
}
/deep/.van-col div{
    font-weight: 100;
}
/deep/.van-tab--disabled {
    color: #646566;
}
/deep/.van-tabs__line {
    background-color: #fff;
}
// 退出按钮
.logout{
    position: absolute;
    top: 32px;
    right: 10px;
    width: 52px;
    border-radius: 28px;
    text-align: center;
    color: #fff;
    background: linear-gradient(90deg, #857d82, #aad0bb);
    font-size: 14px;;

}
</style>
