<template>
  <div>
    <div class="detail-page-title" v-for="item in titleList" :key="item.id">
      <h4>{{item.title}}</h4>
      <p>
        <span class="time">发表时间：{{item.add_time|dateformat}}</span>
        <span class="click">点击：{{item.click}}</span>
      </p>
      <hr />
      <ul class="thumbnail-image">
        <li v-for="(ele,index) in imgList" :key="index">
          <van-image width="100%" :src="ele.src" @click="handle(index,ele.src)" />
        </li>
      </ul>
      <div v-html="item.content" class="detail-content"></div>
      <template>
        <div>
          <comment></comment>
        </div>
      </template>
    </div>
  </div>
</template>
<script>
import { ImagePreview } from 'vant'
import Comments from '../Comments.vue'
export default {
  components: {
    comment: Comments
  },
  props: [],
  data () {
    return {
      imgList: [],
      titleList: [],
      show: false,
      images: [],
      id: this.$route.params.id
    }
  },
  mounted () {
    this.getDetailList()
    this.getList()
  },
  methods: {
    // 获取图片分享详情中的缩略图
    async getDetailList () {
      //   console.log(id)
      const { data: res } = await this.$http.get('/api/getthumimages/' + this.id)
      // console.log(res)
      this.imgList = res.message
      this.imgList.forEach(item => {
        this.images.push(item.src)
      })
    },
    // 获取图片详情
    async getList () {
      const { data: res } = await this.$http.get('/api/getimageInfo/' + this.id)
      //   console.log(res)
      this.titleList = res.message
    },
    handle (index, src) {
    //   console.log(this.imgList)
      ImagePreview({
        images: this.images,
        startPosition: index
      })
    }

  }
}
</script>
<style lang="less" scoped>
.detail-page-title {
  padding: 0 5px;
  overflow: hidden;
  h4 {
    text-align: center;
    color: #26a2ff;
    font-size: 15px;
  }
  p {
    margin-bottom: 10px;
    overflow: hidden;
    .time {
      float: left;
      font-size: 13px;
      color: #8f8f94;
    }
    .click {
      float: right;
      font-size: 13px;
      color: #8f8f94;
    }
  }
  .thumbnail-image {
    overflow: hidden;
    padding-left: 10px;
    li {
      float: left;
      padding-right: 10px;
      padding-bottom: 10px;
      width: 33.333%;
      box-sizing: border-box;
      overflow: hidden;
    }
  }
}
.detail-content {
  margin-bottom: 20px;
}

</style>
