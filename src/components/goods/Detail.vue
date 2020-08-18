<template>
  <div>
    <van-row>
      <!-- 轮播图 -->
      <van-col>
        <van-swipe class="my-swipe" :autoplay="3000" indicator-color="white">
          <van-swipe-item v-for="(image, index) in images" :key="index">
            <img v-lazy="image" />
          </van-swipe-item>
        </van-swipe>

        <!-- 商品介绍 -->
        <van-cell-group v-model="introduce">
            <van-cell v-for="(item, index) in introduce" :key="index" :title="item.title"></van-cell>
            <div class="Price">
                <span>市场价:</span>
                <van-divider class="dividerMarketPrice" v-for="(item, index) in introduce" :key="index" content-position="left">¥{{item.market_price}}</van-divider>
                <span>销售价:</span>
                <van-divider class="dividerSellPrice" v-for="(item, index) in introduce" :key="index" content-position="left">¥{{item.sell_price}}</van-divider>
            </div>
            <div>
                <span>购买数量</span>
                <van-stepper style="vertical-align: middle;" step="1" v-model="cou" @change="onChange" />
            </div>
            <div class="showPidding">
              <van-button type="info" size="small">立即购买</van-button>
            <van-button @click="detailJoin" type="danger" size="small">
              加入购物车
            </van-button>
            </div>
            <van-overlay :show="show" @click="show = true">
              <div class="wrapper" @click.stop>
                <div class="block">
                  <div>
                    <van-icon name="success" color="#fff" size=60px />
                  </div>
                  <span class="addCart">已添加购物车</span>
                </div>
              </div>
            </van-overlay>

        </van-cell-group>

         <!-- 商品参数 -->
        <van-cell-group v-model="introduce" class="Commodity">
            <van-cell class="parameters" title="商品参数"></van-cell>
            <div>
                <van-cell :border="false" v-for="(item, index) in introduce" :key="index" :title="'商品货号:' + item.goods_no" />
                <van-cell :border="false" v-for="(item, index) in introduce" :key="index" :title="'库存情况:' + item.stock_quantity" />
                <van-cell class="borderods" v-for="(item, index) in introduce" :key="index" :title="'上架时间:'">{{item.add_time| dateformat()}}</van-cell>
            </div>
            <van-button @click="detailIntroduce" class="buttonbul" plain type="info" size="large">图文介绍</van-button>
            <van-button @click="detailComment" class="buttonred" plain type="danger" size="large" text="商品评论"></van-button>

        </van-cell-group>
      </van-col>
    </van-row>

  </div>
</template>

<script>
import { mapMutations, mapActions } from 'vuex'
export default {
  data () {
    return {
      id: this.$route.params.id,
      cou: 0,
      images: [],
      introduce: [],
      show: false
    }
  },
  created () {
    this.detailChart()
  },
  mounted () {
    this.changeToString()
  },
  computed: {

  },
  methods: {
    ...mapMutations(['addlist']),
    ...mapActions(['changeToString']),
    // 页面数据渲染
    async detailChart () {
      // 轮播图
      const { data: res } = await this.$http.get('api/getthumimages/' + this.id)
      this.images = res.message
      // 商品价格详情
      const { data: details } = await this.$http.get(
        '/api/goods/getinfo/' + this.id
      )
      this.introduce = details.message
      // console.log(res)
      // console.log(details)

      const arrurl = window.location.href.split('detail/')
      this.id = arrurl[1]
    },

    // 返回按钮
    detailReturn () {
    },

    onChange () {
    //   console.log(this.cou)
    },

    // 加入购物车
    detailJoin () {
      const id = this.id
      const cou = this.cou
      this.addlist({ id, cou })
      this.show = true
      setTimeout(() => {
        this.show = false
      }, 1000)
    },

    // 图文介绍
    async detailIntroduce () {
      this.$router.push('/goodsdesc/' + this.id)
    },

    // 商品评论
    detailComment () {
      this.$router.push('/goodscomments/' + this.id)
    }
  }
}
</script>

<style lang="less" scoped>
#app {
  padding: 40px 0 50px 0;
  width: 100%;
  height: 100%;
  background: #fff;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
}
.van-cell {
    padding-bottom: 1px;
}
.van-row {
  display: flex;
  justify-content: center;
  padding: 10px;
}
.van-col {
  width: 100%;
}
.van-nav-bar {
  width: 100%;
  height: 40px;
  background: #1989fa;
  text-align: center;
  line-height: 40px;
  color: #fff;
  font-size: 14px;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1;
}
/deep/.van-nav-bar__text,
/deep/.van-nav-bar__title {
    color: #fff;
}

.my-swipe .van-swipe-item {
  color: #fff;
  font-size: 20px;
  line-height: 150px;
  text-align: center;
}

.my-swipe {
  height: 230px;
  border: 1px solid #ccc;
  border-radius: 3px;
}
.van-swipe__indicators {
  position: absolute;
  bottom: 10px;
  left: 50%;
  display: -webkit-box;
  display: -webkit-flex;
  display: flex;
  -webkit-transform: translateX(-50%);
  transform: translateX(-50%);
}
.van-swipe img {
  width: 200px;
  height: 200px;
}
/deep/.van-nav-bar .van-icon{
    color: #fff;
}
.van-cell-group {
  margin-top: 10px;
  padding: 15px;
  border-radius: 3px;
  border: 1px solid #ccc;
}
.dividerMarketPrice{
    display: inline-block;
    text-decoration: line-through;
}
.Price{
    margin-top: -10px;
}
span{
    color: #8f8f94;
    font-size: 14px;
    margin-left: 15px;
    margin-right: 4px;
}
.van-cell__title span{
    color: #000;
    font-size: 16px;
    margin-left: 0;
    margin-right: 0;
}
.dividerSellPrice{
    color: red;
    display: inline-block;
}
.van-stepper{
    display: inline-block;
}
.van-button{
    margin: 5px;
    text-align: center;
}
.van-button__text{
    color: #fff;
}
.van-button__text{
    margin-left: 0;
    margin-right: 0;
}
.Commodity .parameters .van-cell__title{
    margin-bottom: 5px;
}
.Commodity .parameters .van-cell__title span{
    font-size: 18px;
    color: #000;
    margin: 0;
}
.Commodity .van-cell span{
    color: #8f8f94;
    font-size: 14px;
}
.Commodity .borderods{
    border-bottom: 1px solid #ccc;
    padding-bottom: 10px;
}
.Commodity .van-button{
    height: 40px;
    margin: 10px 0 0;
}
/deep/.Commodity .buttonbul .van-button__content .van-button__text{
    color: #1989fa;
}
/deep/.Commodity .buttonred .van-button__content .van-button__text{
    color: red;
}
.wrapper {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
  }

  .block {
    width: 120px;
    height: 120px;
    background-color: #fff;
  }
    .wrapper {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
  }
  .showPidding{
    margin-top: 10px;
  }

  .block {
    width: 120px;
    height: 120px;
   background-color: rgba(0,0,0,.6);
   border-radius: 3px;
  }
  .van-overlay {
   background-color: rgba(0,0,0,0);
}
.addCart{
  color: #fff;
  font-size: 15px;
  text-align: center;
}
.block .van-icon {
  margin-left: 30px;
}
</style>
