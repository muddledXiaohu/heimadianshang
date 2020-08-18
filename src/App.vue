<template>
  <div id="app">
    <!-- 头部 -->
    <div v-show="navShow">
      <van-nav-bar
        :fixed="true"
        :title="title"
        :left-text="leftText"
        :right-text="rightText"
        :left-arrow="leftArrow"
        @click-left="$router.go(-1)"
      />
    </div>

    <router-view style="margin:40px 0 50px;height:100%;" />

    <!-- 底部 -->
    <van-tabbar  v-model="active" :route="true" :fixed="true">
      <van-tabbar-item to="/home" class="iconfont icon-geniecommunity">首页</van-tabbar-item>
      <van-tabbar-item to="/tabList" class="iconfont icon-instruction">分类</van-tabbar-item>
      <van-tabbar-item to="/member" class="iconfont icon-icon-test2">会员</van-tabbar-item>
      <van-tabbar-item to="/shopcar" class="iconfont icon-icon-test" :badge="getCarLists">购物车</van-tabbar-item>
      <van-tabbar-item to="/search" class="iconfont icon-icon-test1">搜索</van-tabbar-item>
    </van-tabbar>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
export default {
  data () {
    return {
      active: 0,
      navShow: true,
      title: '黑马商城',
      leftText: '返回',
      rightText: '',
      leftArrow: true,
      tabShow: true
    }
  },
  mounted () {
    this.getUrl()
  },
  methods: {
    getUrl () {
      // const res = location.href
      const res = location.hash
      const path = res.split('#')[1]
      switch (path) {
        case '/search':
          this.navShow = false
          break
        case '/city':
          this.navShow = false
          break
        case '/Map':
          this.navShow = false
          break
        case '/home':
          this.navShow = true
          this.leftText = ''
          this.leftArrow = false
          break
        case '/login':
          this.navShow = false
          this.tabShow = false
          break
        case '/register':
          this.navShow = false
          this.tabShow = false
          break
        case '/member':
          this.navShow = false
          this.tabShow = false
          break
        case '/order':
          this.navShow = false
          this.tabShow = false
          break
        default:
          this.navShow = true
          this.leftText = '返回'
          this.leftArrow = true
          this.rightText = ''
          this.tabShow = true
          break
      }
    }
  },
  updated () {
    this.getUrl()
  },
  computed: {
    // 购物车商品种类数量,计算购物车商品总价
    ...mapGetters(['getCarLists'])
  }
}
</script>
<style lang="less">

</style>
