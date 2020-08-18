<template>
  <div>
    <!-- 商品列表模块 -->

    <div class="container">
        <!-- 上拉刷新 -->
      <van-pull-refresh v-model="isLoading" @refresh="onRefresh">
        <van-row>
            <!--  -->
          <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="getShopListData">
            <van-col class="box" v-for="(item, index) in dataList" :key="index">
              <router-link :to="'/goods/detail/' + item.id">
                <van-row>
                <div class="imgBox">
                  <van-image width="10rem" height="10rem" fit="fill" :src="item.img_url" />
                </div>
              </van-row>
              <van-row>
                <p class="title">{{item.title}}</p>
              </van-row>
              <van-row class="text">
                <p class="price">
                  <span style="color:#ff0000;margin: 0 12px;">￥{{item.sell_price}}</span>
                  <span style="text-decoration:line-through;
              ">￥{{item.market_price}}</span>
                </p>
                <p class="sell">
                  <span style="margin: 0 10px">热卖中</span>
                  <span style="margin-right: 10px">剩{{item.stock_quantity}}件</span>
                </p>
              </van-row>
              </router-link>
            </van-col>
          </van-list>
        </van-row>
      </van-pull-refresh>
    </div>
  </div>
</template>
<script>
export default {
  props: [],
  data () {
    return {
      dataList: [],
      isLoading: false,
      loading: false,
      finished: false
    }
  },
  created () {
    this.getShopListData()
  },
  methods: {
    async getShopListData () {
      const { data: res } = await this.$http.get(
        '/api/getgoods?pageindex=number'
      )
      this.dataList = res.message
      this.loading = false
      this.finished = true
    },
    onRefresh () {
      setTimeout(() => {
        this.$toast('刷新成功')
        this.isLoading = false
      }, 1000)
    }
  }
}
</script>
<style lang="less" scoped>
.container {
  padding-top: 5px;
  font-size: 13px;
  font-family: "Microsoft YaHei";

  .box {
    width: 46%;
    margin: 0 2% 25px;
    overflow: hidden;
    border: 1px solid #cccccc;
    .title {
      line-height: 30px;
      margin: 20px 12px 0;
      text-overflow: -o-ellipsis-lastline;
      overflow: hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
    }
    .text {
      height: 60px;
      background-color: #eeeeee;
      .price {
        height: 30px;
        line-height: 30px;
        font-size: 16px;
      }
      .sell {
        margin: -12px 0;
        display: flex;
        justify-content: space-between;
      }
    }
    .imgBox {
      padding: 0 10px;
      display: flex;
      justify-content: center;
      margin: 10px auto 40px;
    }
  }
}
</style>
