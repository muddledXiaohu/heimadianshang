<template>
  <div>
    <section class="main" v-if="lists.length === 0">
      <!-- 购物车没有商品显示的页面 -->
      <div class="box">
        <!-- 购物车图片 -->
        <div class="shopcar">
          <img src="../../../public/images/car.png" alt="">
        </div>
        <p>购物车空空如也</p>
        <router-link class="gotoShopping" to="/goods/list">
          <van-button type="info">去逛逛</van-button>
        </router-link>
      </div>
    </section>

    <section v-else>
      <!-- 购物车有商品显示的页面 -->
      <!-- 下拉刷新  -->
      <van-pull-refresh v-model="isLoading" @refresh="onRefresh">
        <div>
          <div v-for="item in lists" :key="item.id">
            <van-swipe-cell>
              <van-card
                :num="item.cou"
                :price="item.sell_price"
                :title="item.title"
                :thumb="item.thumb_path"
              >
                <template #footer>
                  <van-button color="#f2f3f5" size="mini" @click="sub(item.id)">-</van-button>
                  <van-button color="#f2f3f5" size="mini">{{item.cou}}</van-button>
                  <van-button color="#f2f3f5" size="mini" @click="add(item.id)">+</van-button>
                </template>
              </van-card>
              <template #right>
                <van-button
                  content
                  text="删除"
                  type="danger"
                  class="delete-button"
                  @click="openDialog(item.id)"
                />
              </template>
            </van-swipe-cell>
          </div>
        </div>
      </van-pull-refresh>
    </section>
    <!-- 提交订单区域 -->
    <van-submit-bar :price="getTotal*100" decimal-length button-text="提交订单" @submit="onSubmit" />
  </div>
</template>

<script>
import { Toast } from 'vant'
import { mapState, mapMutations, mapActions, mapGetters } from 'vuex'
export default {
  props: [],
  data () {
    return {
      isLoading: false
    }
  },
  computed: {
    // 商品列表属性映射
    ...mapState(['lists']),
    // 购物车商品种类数量,计算购物车商品总价
    ...mapGetters(['getCarLists', 'getTotal'])
  },
  create () {

  },
  mounted () {
    this.$nextTick(() => {
      this.changeToString()
      this.getLists()
    }
    )
  },
  methods: {
    // 返回功能
    goBack () {
      window.history.go(-1)
    },
    // 添加商品数量功能
    ...mapMutations([
      'initlists', 'add', 'sub'
    ]),

    // 下拉刷新时触发
    onRefresh () {
      setTimeout(() => {
        this.getLists()
        location.reload()
        Toast('刷新成功')
        this.isLoading = false
      }, 1000)
    },
    // 点击删除打开对话框
    openDialog (id) {
      this.$dialog.confirm({
        message: '确定删除吗？'
      }).then(() => {
        // instance.close();
        this.deleteRun(id)
      }).catch(() => {
        // console.log(err)
      })
    },
    // 购物车提交
    // 商品订单提交
    onSubmit () {
      // 处理逻辑跳转到支付页面
      this.$router.push('/pay')
    },
    // 获取商品列表方法映射,删除功能
    ...mapActions(['getLists', 'deleteRun', 'changeToString'])
  }
}
</script>
<style lang="less" scoped>
/deep/.van-nav-bar__text{
  color: #fff
}
/deep/.van-icon-arrow-left::before{
  color: #fff
}
.van-nav-bar {
  background-color: #1989fa;
  font-size: 18px;

}
/deep/.van-nav-bar__title{
  color: #fff

}
.main{
  width: 100%;
  height: 270px;
  // background-color: #f00;
  display:flex;
  flex-direction: column;
  justify-content:space-around;
  align-items: center;

}
.box{
  display:flex;
  flex-direction:column;
  align-items:center;
}
.shopcar{
  display:flex;
  justify-content:center;
  width: 100px;
  height: 100px;
  background-color: #e2a5a3;
  border-radius: 50%;
  img{width:100%;
  flex:1}
}
p{ color:#dbdbdb;
font-size:24px
}
/deep/.van-card__content {
  justify-content:start
}
/deep/.van-card__price:first-child{
  color: red;
}
/deep/.van-card__footer>button{
  color: #000!important
}
.van-nav-bar{
  position: fixed;
  top:0;
  width: 100%;
}

/deep/.van-swipe-cell__right>button{
  height: 100%;
}
/deep/ .van-submit-bar{
  position: fixed;
  bottom:50px;

}
</style>
