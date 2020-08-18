<template>
  <div class="container">
    <!-- 顶部搜索导航 -->
    <van-search v-model="shopItems" placeholder="分类" input-align="center"  @search="onSearch"/>
    <!-- 侧边栏导航 -->
    <van-sidebar v-model="activeKey" @change="changeIndex">
      <van-sidebar-item :title="item.title" v-for="(item, index) in listData" :key="index" />
      <van-sidebar-item title="标签名称" />
    </van-sidebar>
    <!-- 右侧 -->
    <div class="right">
      <!-- 图片区域 -->
      <van-image fit="contain" src="//cdn.cnbj1.fds.api.mi-img.com/mi-mall/2020e451744f8ec947e56d8ccccb7862.jpg?f=webp&w=750&h=300&bg=F97F67" />

      <!-- 文字区域 -->
      <van-divider :style="{ padding: '0 16px 0' }">手机</van-divider>
      <!-- 产品展示区域 -->
      <van-grid :column-num="3" >
        <van-grid-item v-for="value in 15" :key="value" >
          <van-image
            src="//cdn.cnbj1.fds.api.mi-img.com/mi-mall/58a4446432aba7894e957f2c18853562.png?thumb=1&w=120&h=120"
            fit="contain"
          />
        </van-grid-item>
      </van-grid>
    </div>
  </div>
</template>
<script>
export default {
  props: [],
  data () {
    return {
      shopItems: '',
      activeKey: '',
      autoplay: '',
      listData: [],
      picList: [],
      //   title: 'title',
      src: ''
    }
  },
  created () {
    this.getList()
  },
  methods: {
    async getList () {
      const res = await this.$http.get('/tabdatalist')
      console.log(res.data.data)
      this.listData = res.data.data
    },
    changeIndex () {
      console.log(this.activeKey)
    },
    onSearch () {
      if (this.shopItems === '手机') {
        return this.$router.push('/searchList')
      }
      return this.$toast('取消')
    }

  }
}
</script>
<style lang="less" scoped>
.van-sidebar {
  float: left;
  margin-right: 10px;
}

.van-image {
  float: right;
  width: 76%;
  height: 10rem;
}
.my-swipe .van-swipe-item {
  float: right;
  margin-right: 10px;
  color: #fff;
  font-size: 20px;
  line-height: 150px;
  text-align: center;
  background-color: #39a9ed;
}
</style>
