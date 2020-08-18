<template>
  <div>
      <h4>发表评论</h4>
      <hr />
      <textarea
        label="请输入留言"
        placeholder="请输入留言"
        :rules="[{ required: true, message: '请输入留言'}]"
        style="height:100px;width:100%"
        v-model="content"
      ></textarea>
      <template>
        <van-button size="large" type="info" @click="pubCom">发表评论</van-button>
        <!-- 加载更多评论详情页 -->
        <van-list>
          <van-cell v-for="(item,index) in comList" :key="item.id">
            <div class="title" style="background-color:#ccc;">
              第
              <span>{{index+1}}</span>楼
              用户:
              <span>{{item.user_name}}</span>
              发表时间:
              <span>{{item.add_time | dateformat('YYYY-MM-DD HH:mm:ss')}}</span>
            </div>
            <div class="body">
              <span style="padding:0 20px;">{{item.content}}</span>
            </div>
          </van-cell>
        </van-list>
        <van-button size="large" class="btn2" @click="load">加载更多</van-button>
      </template>
  </div>
</template>
<script>
export default {
  data () {
    return {
      content: '',
      comList: [],
      pageindex: 1,
      id: this.$route.params.id
    }
  },
  mounted () {
    this.getcomList()
  },
  methods: {
    async getcomList () {
      const { data: ret } = await this.$http.get(
        `/api/getcomments/${this.id}?pageindex=${this.pageindex}`
      )
      this.comList = ret.message
    },

    async pubCom () {
      // 验证用户是否登录
      const a = window.sessionStorage.getItem('token')
      if (a === '') {
        this.$message.error('请先进行登录操作')
        return this.$router.push('/login')
      }
      const { data: res } = await this.$http.post('/api/postcomment/' + this.id,
        { content: this.content }
      )
      if (res.status !== 0) {
        this.$toast.fail(res.message)
        this.content = ''
        return
      }
      this.pageindex = 1
      this.$toast.success(res.message)
      this.content = ''
      this.getcomList()
    },
    async load () {
      this.pageindex++
      const { data: ret } = await this.$http.get(
        `/api/getcomments/${this.id}?pageindex=${this.pageindex}`
      )
      console.log(ret)
      if (ret.message.length === 0) {
        this.$toast.fail('没有了')
        this.pageindex--
        return
      }
      this.comList = this.comList.concat(ret.message)
    }
  }
}
</script>
<style lang="less" scoped>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
h4 {
  margin-bottom: 5px;
}
.textarea {
  padding-left: 5px;
  margin-right: 2px;
}
.van-button {
  margin: 5px 0;
}
.active{
  display: block;
}
.btn2 {
  color: red;
  border: 0.5px solid red;
}
/deep/.van-cell {
  padding: 10px 0;
}
.van-panel__footer{
  padding:8px 5px;
}
</style>
