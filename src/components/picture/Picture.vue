<template>
    <div>
<!-- 导航栏 -->
<van-tabs swipeable @click="getList">
  <van-tab v-for="item in pictrueList" :title="item.title" :name='item.id' :key="item.id" >
      <ul>
          <li v-for="ele in imgList" :key="ele.id">

              <router-link :to="'/photo/Info/' + ele.id">
            <van-image width="100%" height="100%" lazy-load :src="ele.img_url" />
            <div class="botInfo">
            <p>{{ele.title}}</p>
            <p>{{ele.zhaiyao}}</p>
             </div>
              </router-link>

          </li>
      </ul>

  </van-tab>
</van-tabs>
    </div>
</template>
<script>
export default {
  props: [],
  data () {
    return {
      pictrueList: [],
      imgList: []

    }
  },
  mounted () {
    this.getPictureList()
    this.getList(0)
  },
  methods: {
    onClickLeft () {

    },
    // 获取图片分类数据
    async getPictureList () {
      const { data: res } = await this.$http.get('/api/getimgcategory')
      //   console.log(res.message)
      res.message.unshift({ title: '全部', id: 0 })
      this.pictrueList = res.message
    },
    // 切换分类获取数据
    async getList (name, title) {
      console.log(name)
      //   console.log(title)
      const { data: res } = await this.$http.get('/api/getimages/' + name)
      console.log(res)
      this.imgList = res.message
    }

  }
}
</script>
<style lang="less" scoped>
li{
    position: relative;
    margin:10px;
}
.botInfo{
    position: absolute;
    left: 0;
    bottom: 3px;
    width: 100%;
    background: rgba(0,0,0,.4);
    color: #fff;
    height: 75px;
    padding: 0;

    p{
        padding: 0;
        margin: 0;
        font-size: 12px;
         padding: 0 10px;
         line-height: 1.2;
         display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 4;
        overflow: hidden;
        text-overflow: ellipsis;
    }
}
</style>
