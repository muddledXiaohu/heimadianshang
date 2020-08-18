<template>
  <div>
    <van-nav-bar title="联系我们" />
    <button class="back" @click="back">
      <van-icon name="arrow-left" />
    </button>
    <select class="select">
      <option value="1">成都</option>
      <option value="2">北京</option>
    </select>
    <div class="list">
      <baidu-map
        :center="center"
        :zoom="zoom"
        @ready="handler"
        style="height:370px;white:100%"
        :scroll-wheel-zoom="true"
      ></baidu-map>
      <p>
        <van-button plain type="primary" @click="onLoad(0)" :style="click===0?Color:''">小米之家</van-button>
        <van-button plain type="primary" @click="onLoad(1)" :style="click===1?Color:''">线下专区</van-button>|
        <van-button plain type="primary" @click="onLoad(2)" :style="click===2?Color:''">服务网点</van-button>
        <van-button class="search" plain type="primary" @click="serchHandle">
          <van-icon name="search" />
          <input type="text" name="" id="" v-show="searchInputShow">
        </van-button>
      </p>
    </div>
    <van-list @load="onLoad(0)">

      <van-row v-for="item in list" :key="item.store_name" @click="getClickInfo(item)">
        <span class="title">{{item.store_name}}</span>
        <img :src="item.mi_icon" alt />
        <br />
        <span>{{item.shop_time}}</span>
        <br />
        <span>{{item.address}}</span>
      </van-row>
    </van-list>
  </div>
</template>
<script>
import Vue from 'vue'
import BaiduMap from 'vue-baidu-map'
Vue.use(BaiduMap, {
  /* Visit http://lbsyun.baidu.com/apiconsole/key for details about app key. */
  ak: '7nTMYlGhbdQz3SQ9ZBW6YuZuYaSGIykD'
})
export default {
  data () {
    return {
      center: { lng: 103.991363, lat: 30.72521 }, // 中心坐标
      zoom: 18,
      // 更改按钮颜色
      click: 0,
      Color: { color: '#FF9F5F!important', border: '1px solid #FF9F5F' },
      // 列表
      list: [],
      BMap2: null,
      map2: null,
      marker: null,
      // 标注的新图标
      icon: null,
      // 信息窗口
      opts: {
        width: 20, // 信息窗口宽度
        height: 10, // 信息窗口高度
        title: `当前位置：
    精城国际<br>
    地址：四川省成都市金牛区蜀西路58号<br>
     坐标：103.991363,30.72521` // 信息窗口标题
      },
      searchInputShow: false
    }
  },
  methods: {
    handler ({ BMap, map }) {
      // 引入Bmap对象
      this.BMap2 = BMap
      this.map2 = map
      // 新图标
      this.icon = new BMap.Icon('http://i8.mifile.cn/v1/a1/87fbaa8d-73a4-247a-acea-dea9fed47099.png', new BMap.Size(70, 70), {
        imageSize: new BMap.Size(70, 70)
      })
      // 创建窗口对象
      var infoWindow = new BMap.InfoWindow('', this.opts) // 创建信息窗口对象
      map.openInfoWindow(infoWindow, map.getCenter()) // 打开信息窗口

      var point = new BMap.Point(103.991363, 30.72521)// 标注坐标
      map.centerAndZoom(point, 18)// 地图初始化??

      // 创建标注对象,并修改marker的新图标
      this.marker = new BMap.Marker(point, { icon: this.icon })
      map.addOverlay(this.marker) // 将标注添加到地图中
    },
    // 点击更改标注位置
    getClickInfo (item) {
      this.opts.title = item.store_name// 提示框
      const lng = item.position.lng
      const lat = item.position.lat
      this.map2.removeOverlay(this.marker)// 移除标注
      this.center.lng = lng
      this.center.lat = lat
      var point = new this.BMap2.Point(lng, lat)
      this.map2.centerAndZoom(point, 13)
      // 创建标注对象,并修改marker的新图标
      this.marker = new this.BMap2.Marker(point, { icon: this.icon })
      this.map2.addOverlay(this.marker) // 将标注添加到地图中
      // 创建窗口对象
      var infoWindow = new this.BMap2.InfoWindow('', this.opts) // 创建信息窗口对象
      this.map2.openInfoWindow(infoWindow, this.map2.getCenter()) // 打开信息窗口
    },
    // 返回按钮
    back () {
      window.history.go(-1)
    },
    // 获得列表
    async onLoad (i) {
      this.click = i
      const { data: res } = await this.$http.get('/userinfo')
      this.list = res.data.store_type_list[i].store_list
    },
    // 自定义标注
    SquareOverlay (center, length, color) {
      this._center = center
      this._length = length
      this._color = color
    },
    // 搜索按钮
    serchHandle () {
    }

  },
  created () {
  }

}
</script>
<style lang="less" scoped>
.baidu-map {
  width: 100%;
  height: 100%;
}
.van-nav-bar{
position:fixed;
width: 100%;
top: 0;

}
.back {
  border-radius: 50%;
  width: 30px;
  height: 30px;
  text-align: center;
  background-color: white;
  border: 1px solid #ccc;
  position: fixed;
  left: 10px;
  top: 5px;
  z-index: 99;

  i {
    color: black;
    vertical-align: middle;
    text-align: center;
  }
}
.select {
  position: fixed;
  top: 7px;
  right: 6px;
  z-index: 99;
  border-radius: 10px;
  height: 25px;
}
.van-button {
  margin: 0 10px;
  height: 30px;
  width: 70px;
  font-size: 12px;
  line-height: 30px;
  padding: 0 5px;
  border-radius: 15px;
  border: 1px solid #ccc;
  color: #656565 !important;
  &.search {
    width: 30px;
    margin-left: 35px;
    .van-icon {
      font-size: 16px;
      vertical-align: middle;
    }
  }
}
.list {
  width: 100%;
  position: fixed;
  top: 0px;
  background-color: white
}
.list p {
  border-bottom: 1px solid #ccc;
  margin-bottom: 0;
  padding-bottom: 10px;
}
/deep/.BMap_bubble_title{
  font-size: 12px;
  line-height: 18px!important;
}
.van-row {
  padding: 10px;
  border-bottom: 1px solid #ccc;
  .title {
    font-weight: 520;
    font-size: 16px;
  }
  span {
    font-size: 12px;
  }
  img{
    width: 17px;
    height: 17px;
  }
}
.van-list{
  margin-top:427px !important;
}

</style>
