<template>
  <div>
      <!-- 头部 -->
    <van-row>
            <van-nav-bar
            title="我的订单"
            right-text="..."
            left-arrow
            @click-left="orderReturn"
            :fixed="true"
            />
    </van-row>

    <van-row>
        <van-col class="colSearch">
            <van-search shape="round" placeholder="请输入搜索关键词" />
            <van-divider />
        </van-col>
    </van-row>
    <van-row>
        <!-- 导航 -->
            <van-tabs type="line">
                <van-tab title="全部">
                    <van-dropdown-menu class="dropdownMenu">
                        <van-dropdown-item v-model="value1" :options="option1" />
                    </van-dropdown-menu>

                    <!-- 商品展示页面 -->
                    <var v-for="(item, index) in option2" :key="index" class="orderCommodity">
                        <van-card
                        :price="'实付金额: ¥' + item.sell_price"
                        :num="'共' + item.market_price + '件商品'"
                        :desc="item.details"
                        :title="item.title"
                        :thumb="item.src"
                        :tag="item.state"
                        >
                        <template #tags>
                            <van-button size="mini"><van-icon name="delete" /></van-button>
                        </template>
                        <template #dest>
                            <div>123</div>
                        </template>
                        <template #footer>
                            <van-button @click="orderComment" plain type="default" size="small">去评价</van-button>
                            <van-button @click="orderShoping" plain type="danger" size="small">再次购买</van-button>
                        </template>
                        </van-card>
                    </var>
                </van-tab>
                <van-tab title="待付款"><van-empty description="您暂时没有相关订单" /></van-tab>
                <van-tab title="待收货"><van-empty description="您暂时没有相关订单" /></van-tab>
                <van-tab title="已完成"><van-empty description="您暂时没有相关订单" /></van-tab>
            </van-tabs>
    </van-row>
  </div>
</template>
<script>
export default {
  props: [],
  data () {
    return {
      value1: '',
      option1: [],
      option2: []
    }
  },
  mounted () {
    this.orderData()
  },
  methods: {
    // 获取mock的数据
    async orderData () {
      // 获取关键词标签
      const { data: res } = await this.$http.get('http://api.cms.liulongbin.top/123xh')
      this.option1 = res.xhData
      // 获取商品信息
      const { data: comt } = await this.$http.get('http://api.cms.liulongbin.top/123xh')
      this.option2 = comt.commodity
      console.log(this.option2)
    },

    // 返回按钮
    orderReturn () {
      this.$router.push('/member')
    },

    // 评论
    orderComment () {
      this.$router.push('/goodscomments')
    },

    // 再次购买
    orderShoping () {
      this.$router.push('/goods/list')
    }
  }
}
</script>

<style lang="less" scoped>

/deep/.van-nav-bar .van-icon,
/deep/.van-nav-bar__text {
    color: #646566;
    font-size: 19px;
}
/deep/.van-nav-bar__text {
    margin-bottom: 10px;
}
.colSearch{
    width: 100%;
    height: 50px;
}
/deep/.van-divider {
    margin: 6px 0;
}
.van-tabH5{
    width: 50px;
}
/deep/.van-dropdown-menu__bar {
    height: 0;
}
/deep/.van-dropdown-menu__title {
    position: absolute;
    top: -26px;
    left: 92%;
}
/deep/.van-dropdown-menu__title::after {
    position: absolute;
    top: 50%;
    right: -4px;
    margin-top: -5px;
    border: 6px solid;
    border-color: transparent transparent #dcdee0 #dcdee0;
    -webkit-transform: rotate(-45deg);
    transform: rotate(-45deg);
    opacity: .8;
    content: '';
}
/deep/.van-tabs__nav--line {
    width: 94%;
}
/deep/.dropdownMenu .van-cell {
    display: inline-block;
    width: 90px;
    padding: 10px 16px;
    text-align: center;
    margin-left: 7%;
    margin-top: 6px;
    border-radius: 10px;
    line-height: 10px;
    font-size: 12px;
}
/deep/.van-dropdown-item__content {
    background-color: #f7f7f7;
}
/deep/[data-v-68d9d6d8] .van-dropdown-item__content {
    padding: 10px 0;
}
/deep/.van-tabs__content{
    background-color: #f7f7f7;
}
/deep/.van-card {
    background-color: #fff;
    margin: 15px;
    border-radius: 10px;
}
/deep/.van-card__header{
    padding-top: 20px;
}
/deep/.van-card__title {
    position: absolute;
    left: -60px;
    top: -20px;
}
/deep/.van-card__desc {
    position: absolute;
    top: 16px;
    width: 100%;
}
/deep/.van-card__price {
    position: absolute;
    left: 60%;
    top: 72px;
}
/deep/.van-button--mini{
    position: absolute;
    top: -20px;
    right: 4px;
    border: 0;
    height: 20px;
}
/deep/.van-button--small {
    height: 30px;
    border-radius: 3px;
}
/deep/.van-card__footer{
    border-top: 1px solid #f3f3f3;
    margin-top: 5px;
    padding-top: 5px;
}
/deep/.van-button--small {
    padding: 0 14px;
}
/deep/.dropdownMenu .van-ellipsis {
    display: none;
}
/deep/.van-card__thumb {
    width: 74px;
    height: 61px;
    margin-right: 10px;
    margin-top: 6px;
    position: inherit;
}
/deep/.van-card__price-currency{
    display: none;
}

/deep/.van-card__num {
    position: absolute;
    top: 72px;
    left: 20%;
}
/deep/.van-card__price {
    width: 100px;
    font-weight: 400;
    font-size: 11px;
}
/deep/.van-card__price-integer {
    font-size: 10px;
}
/deep/.van-tag--danger {
    background-color: #fff;
    color: #ccc;
}
/deep/.van-card__tag {
    position: absolute;
    top: 9px;
    left: 75%;
}

</style>
