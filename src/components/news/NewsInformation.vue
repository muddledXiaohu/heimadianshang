<template>
  <div>
    <van-card
      @click="newsDetails(item.id)"
      v-for="(item, index) in newsList"
      :key="index"
      :title="item.title"
      :thumb="item.img_url"
    >
      <template #desc>
        <div class="bottom_box">
          <span class="f_float">发表时间：{{item.add_time | dateformat('yyyy-MM-DD')}}</span>
          <span class="r_float">点击：{{item.click}}</span>
        </div>
      </template>
    </van-card>
  </div>
</template>

<script>
export default {
  props: [],
  data () {
    return {
      newsList: []
    }
  },
  created () {
    // 获取新闻列表
    this.getNewsList()
  },
  mounted () {},
  methods: {
    // 获取新闻列表
    async getNewsList () {
      const { data: res } = await this.$http.get(
        '/api/getnewslist'
      )
      // console.log(res)
      this.newsList = res.message
    },
    newsDetails (newsid) {
      // 路由跳转
      this.$router.push('/news/detail/' + newsid)
    }
  }
}
</script>
<style lang="less" scoped>
// scoped不加style 是全局生效  加上是当前组件生效
//只要是定义单文件组件 就应该加上scoped 阻止组件之间的样式冲突
.f_float {
  float: left;
}
.r_float {
  float: right;
}
.bottom_box {
  margin: 5px 0;
  font-size: 12px;
  color: #226aff;
}
.van-card__title {
  font-weight: 700;
  font-size: 14px;
}
.van-card__content {
  min-height: 67px !important;
}
.van-card__thumb {
  width: 45px;
  height: 45px;
}
</style>
