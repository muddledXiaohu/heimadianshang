<template>
  <div>
    <van-dialog v-model="show" title="点关注，不迷路" show-cancel-button>
      <img src="../../public/images/whsewm.jpg" />
    </van-dialog>
    <van-swipe :autoplay="3000">
      <van-swipe-item v-for="item in images" :key="item.id">
        <img v-lazy="item.img" />
      </van-swipe-item>
    </van-swipe>
    <!-- 九宫格 -->
    <van-grid :column-num="3">
      <van-grid-item>
        <!-- <van-image src="require('../assets/menu1.png')" /> -->
        <!-- <van-image :src="require('../assets/menu1.png')" /> -->
        <router-link to="/newslist">
          <van-image :src="require('../../public/images/menu1.png')" />
          <p class="navTitle">新闻资讯</p>
        </router-link>
      </van-grid-item>
      <van-grid-item>
        <router-link to="/photo/list">
          <van-image :src="require('../../public/images/menu2.png')" />
          <p class="navTitle">图片分享</p>
        </router-link>
      </van-grid-item>
      <van-grid-item>
        <router-link to="/goods/list">
          <van-image :src="require('../../public/images/menu3.png')" />
          <p class="navTitle">商品购买</p>
        </router-link>
      </van-grid-item>
      <van-grid-item>
        <router-link to="/">
          <van-image :src="require('../../public/images/menu4.png')" />
          <p class="navTitle">留言反馈</p>
        </router-link>
      </van-grid-item>
      <van-grid-item>
        <router-link to="/">
          <van-image :src="require('../../public/images/menu5.png')" />
          <p class="navTitle">视频专区</p>
        </router-link>
      </van-grid-item>
      <van-grid-item>
        <router-link to="/city">
          <van-image :src="require('../../public/images/menu6.png')" />
          <p class="navTitle">联系我们</p>
        </router-link>
      </van-grid-item>
    </van-grid>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
export default {
  props: [],
  data () {
    return {
      images: [],
      nineImages: [],
      show: undefined
    }
  },
  mounted () {
    this.getLunbo()
    this.show = sessionStorage.getItem('show')
    if (this.show == null) {
      this.show = true
      sessionStorage.setItem('show', 'true')
    } else {
      this.show = false
    }
  },
  methods: {
    async getLunbo () {
      const { data: res } = await this.$http.get('/api/getlunbo')
      this.images = res.message
    }
  },
  computed: {
    ...mapGetters(['getCarLists'])
  }
}
</script>
<style lang="less" scoped>
.van-swipe img {
  display: block;
  box-sizing: border-box;
  width: 100%;
  height: 200px;
  padding: 0;
  background-color: #fff;
  pointer-events: none;
}
// 九宫格
.navTitle {
  font-size: 14px;
}
.van-dialog img{
  width: 100%;
}
/deep/.van-image img {
  width: 60px;
}

</style>
