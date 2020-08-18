<template>
  <div>
    <!-- 输入框 -->
    <van-cell-group>
      <van-field v-model="commodity" placeholder="请输入商品名称" />
    </van-cell-group>
    <!-- 按钮 -->
    <van-button
      class="addbutton"
      round
      block
      type="info"
      native-type="submit"
      @click="showPopup"
    >添加商品</van-button>

  </div>
</template>

<script>
export default {
  data () {
    return {
      commodity: ''
    }
  },
  mounted () {
  },
  methods: {
    onClickLeft () {
      this.$router.push('/search')
    },
    async showPopup () {
      // // console.log(this.commodity)
      if (this.commodity.trim().length > 0) {
        const { data: res } = await this.$http.post('/api/addproduct', {
          name: this.commodity
        })
        if (res.status === 0) {
          this.$router.push('/search')
        } else {
          return this.$notify({ type: 'primary', message: res.message })
        }
      } else {
        this.$notify({ type: 'danger', message: '请先输入商品名称' })
      }
    }
  }
}
</script>

<style lang="less" scoped>
.van-hairline--bottom {
  background: #1989fa;
}
/deep/.van-nav-bar__title {
  color: #fff;
  line-height: 24px;
}
/deep/.van-nav-bar__text {
  color: #fff;
}
/deep/.van-icon-arrow-left::before {
  color: #fff;
}
/deep/.van-button {
  margin-top: 25px;
  padding: 0 15px;
}
.van-popup {
  background-color: red;
  text-align: center;
  font-size: 15px;
  color: #fff;
}
.addbutton {
  width: 95%;
  margin: 35px auto;
}
</style>
