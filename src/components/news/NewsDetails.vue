<template>
<van-pull-refresh v-model="isLoading" @refresh="onRefresh">
  <div class="main">
    <!-- 头部 -->
    <div class="header_box">
      <h4>{{NewsDetails.title}}</h4>
      <div class="NewsDetails_header">
        <span class="f_float">发表时间：{{NewsDetails.add_time | dateformat('yyyy-MM-DD')}}</span>
        <span class="r_float">点击次数：{{NewsDetails.click}}</span>
      </div>
    </div>
    <!-- 主体内容 -->
    <div v-html="NewsDetails.content" class="main_body"></div>
    <!-- 评论区域 -->
    <comment></comment>
  </div>
</van-pull-refresh>
</template>
<script>
import Comments from '../Comments.vue'
export default {
  components: {
    comment: Comments
  },
  props: [],
  data () {
    return {
      // 是否处于加载中 刷新
      isLoading: false,
      NewsDetails: {}
    }
  },
  created () {
    this.getNewsDetails()
  },
  mounted () {},
  methods: {
    // 根据id 获取文章详情
    async getNewsDetails () {
      //   console.log(this.getid)
      // 获取新闻资讯详情
      const { data: Details } = await this.$http.get(
        '/api/getnew/' + this.getid
      )
      // console.log(Details)
      if (Details.status === 0) {
        // this.$toast.success('获取文章详情成功')
        this.NewsDetails = Details.message[0]
        // console.log(this.NewsDetails)
      } else {
        this.$toast.fail('失败文案')
      }
    },
    // 下拉刷新
    onRefresh () {
      setTimeout(() => {
        this.$toast('刷新成功')
        this.isLoading = false
        this.count++
      }, 1000)
    }

  },
  computed: {
    // 从url中获取 id
    getid () {
      return this.$route.params.id
    }
  }
}
</script>
<style lang="less" scoped>
// scoped不加style 是全局生效  加上是当前组件生效
//只要是定义单文件组件 就应该加上scoped 阻止组件之间的样式冲突

.header_box {
  color: #1989fa;
  //   padding: 5px;
}
.f_float {
  float: left;
}
.r_float {
  float: right;
}
h4 {
  margin-top: 10px;
  text-align: center;
  font-size: 14px;
  font-weight: 700;
}
.NewsDetails_header {
  height: 20px;
  font-size: 12px;
  border-bottom: 1px solid #ccc;
}
.main {
  padding: 5px;
}
.comment {
  text-align: left;
  border-bottom: 1px solid #ccc;
}
.main_body p {
  color: #535353;
}
</style>
