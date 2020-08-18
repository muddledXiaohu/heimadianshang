<template>
  <div>
    <van-nav-bar title="选择城市" left-text="返回" left-arrow @click-left="goBack" :fixed="true" />
    <van-search v-model="keys" placeholder="请输入城市名或者拼音查询" />
    <nav class="city_nav">
      <div class="city_tip">
        <span>
          当前定位城市：
          <strong>
            <router-link to="/Map">成都</router-link>
          </strong>
        </span>
        <span>定位不准时，请在城市列表中选择</span>
      </div>
      <van-divider />
    </nav>
    <!-- 城市主体 -->
    <div class="cityContent">
      <ul class="letter_classify">
        <li v-for="(value, key, index) in sortgroupcity" :key="key" class="letter_classify_li">
          <h4 class="city_title" id="value">
            {{key}}
            <span v-if="index == 0">（按字母排序）</span>
          </h4>
          <ul class="groupcity_name_container citylistul clear">
            <p tag="li" v-for="item in value" :key="item.id" class="ellipsis">{{item.name}}</p>
          </ul>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
export default {
  props: [],
  data () {
    return {
      keys: '',
      LocationCity: '', // 当前城市
      // 城市列表
      citylist: []
    }
  },
  mounted () {
    this.getCity()
  },
  computed: {
    // 将获取的数据按照A-Z字母开头排序
    sortgroupcity () {
      const sortobj = {}
      for (let i = 65; i <= 90; i++) {
        if (this.citylist[String.fromCharCode(i)]) {
          sortobj[String.fromCharCode(i)] = this.citylist[String.fromCharCode(i)]
        }
      }
      // console.log(sortobj)
      return sortobj
    }
  },
  methods: {
    // 返回功能
    goBack () {
      window.history.go(-1)
    },
    // 获取城市数据
    async getCity () {
      const { data: res } = await this.$http.get('/getCity')
      // console.log(res)
      this.citylist = res.data
    }

  }
}

</script>
<style lang="less" scoped>
.van-nav-bar{
  height: 50px;
  background-color: #f2f2f2;
}
/deep/.van-nav-bar__title{
color: #666666;
  font-size: 24px;

}
/deep/.van-icon.van-nav-bar__arrow {
  color:#666;
  font-size: 24px;
}
.city_tip{
  font-size: 14px;
  padding-left: 15px;
  span:nth-child(2){
    float:right;
    padding-right:15px;
    font-weight: 700;
    color: #9f9f9f;
  }
}
.city_title{
   margin-left: 10px;
}
.citylistul{
  padding-left: 10px;
}
.fr{
  float:right;
}
</style>
