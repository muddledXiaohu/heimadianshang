<template>
  <div>
    <!-- 导航栏部分 -->
    <van-nav-bar
      title="小黑黑搜索.vant"
      left-text="返回"
      right-text="添加"
      left-arrow
      @click-left="onClickLeft"
      @click-right="onClickRight"
      :fixed="true"
    />
    <!-- 搜索框部分 -->
    <van-search
      show-action
      placeholder="请输入搜索关键词"
      @search="onSearch"
      @cancel="onCancel"
      clearable
      v-model="searchText"
    />
    <!-- 删除商品 -->

    <van-swipe-cell v-for="(item, index) in getListshop" :key="index">
      <van-cell :border="false" :title="item.name">商品上架时间：{{item.ctime|dateformat()}}</van-cell>
      <template #right>
        <van-button square type="danger" text="删除" @click="deleteshop(item.id)" />
      </template>
    </van-swipe-cell>

    <!-- 搜索历史部分 -->
    <div v-show="!showHistory">
      <van-cell title="搜索历史">
        <van-icon name="delete" size="18" @click="clearHistory" />
      </van-cell>
      <van-tag
        type="primary"
        size="large"
        v-for="(item,index) in searchHistory"
        :key="index"
        @click="handleHistory($event)"
      >{{item}}</van-tag>
      <van-divider v-show="!searchHistory.length">暂无搜索历史</van-divider>
    </div>

    <!-- 弹出框 -->
    <!-- <van-popup v-model="show" position="top" :style="{ height: '3%' }">取消删除</van-popup>
    <van-popup v-model="show" position="top" :style="{ height: '3%' }">删除成功</van-popup>-->
  </div>
</template>

<script>
import { Dialog } from 'vant'
export default {
  props: [],
  data () {
    return {
      getListshop: [],
      searchText: '',
      showHistory: false,
      searchHistory: []
    }
  },
  mounted () {
    this.getList()
    let res = localStorage.getItem('history')
    if (res === null) {
      res = []
    } else if (res === '') {
      res = []
    } else {
      res = res.split(',')
    }
    this.searchHistory = res
  },
  methods: {
    // 获取数据
    async getList () {
      if (!this.searchText.trim()) return
      const { data: res } = await this.$http.get(
        'http://api.cms.liulongbin.top/api/getprodlist'
      )
      this.getListshop = res.message
      this.showHistory = true
    },
    onClickLeft () {
      this.$router.push('/home')
    },
    // 添加页面
    onClickRight () {
      this.$router.push('/addgoods')
    },
    // 搜索
    async onSearch () {
      this.showHistory = true
      if (this.searchHistory === '') {
        this.searchHistory = []
        this.searchHistory.push(this.searchText.trim())
      } else {
        const index = this.searchHistory.indexOf(this.searchText.trim())
        if (index === -1) {
          this.searchHistory.push(this.searchText.trim())
        }
      }
      localStorage.setItem('history', this.searchHistory)
      this.getList()
    },
    // 取消
    onCancel () {
      this.searchText = ''
      this.getListshop = []
      this.showHistory = false
    },
    // 滑动关闭删除商品
    async deleteshop (id) {
      Dialog.confirm({
        title: '警告',
        message: '确认删除商品吗？',
        confirmButtonColor: 'red'
      })
        .then(async () => {
          const { data: res } = await this.$http.get('/api/delproduct/' + id)
          this.$notify({ type: 'success', message: res.message })
          this.getList()
          this.searchText = ''
        })
        .catch(() => {
          this.$notify({ type: 'primary', message: '取消删除' })
        })
    },
    // 点击历史记录
    handleHistory (e) {
      this.searchText = e.target.innerText
    },
    // 清空历史记录
    clearHistory () {
      localStorage.setItem('history', [])
      this.searchHistory = []
    }
  }

}
</script>

<style lang="less" scoped>

.van-search {
  padding: 8px 8px;
  height: 60px;
}
.van-search .van-cell {
  padding: 5px 5px 5px 0;
}
/deep/.van-field__control {
  color: #323233;
}
/deep/.van-cell span {
  color: #323233;
  font-size: 18px;
}
[data-v-ded676a2] .van-cell span {
  font-size: 14px;
  color: #323233;
}
.van-tag {
  margin: 11px;
  background-color: #969799;
}
</style>
