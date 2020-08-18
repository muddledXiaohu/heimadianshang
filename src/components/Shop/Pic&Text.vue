<template>
  <div>
    <div v-for="(item, index) in content" :key="index">
      <div class="container">
        <div class="header">{{item.title}}</div>
      </div>
      <hr />
      <div class="container">
        <div class="content" v-html="item.content"></div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: [],
  data () {
    return {
      id: this.$route.params.id,
      content: []
    }
  },
  mounted () {
    this.getData()
  },
  methods: {
    // 获取页面渲染的数据
    async getData () {
      const { data: res } = await this.$http.get('/api/goods/getdesc/' + this.id)
      this.content = res.message
    }
  }
}
</script>
<style lang="less" scoped>
.container {
  padding: 0 1%;
  .header {
    line-height: 45px;
    text-align: center;
    font-size: 16px;
    color: #226aff;
    font-weight: 700;
  }

}
</style>
