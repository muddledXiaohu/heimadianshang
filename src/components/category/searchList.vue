<template>
  <div>
    <van-pull-refresh v-model="isLoading" @refresh="onRefresh">
      <div class="container">
        <!-- 顶部区域 -->
        <div class="header">
          <!-- 顶部搜索区域 -->
          <van-search v-model="value" placeholder="请输入搜索关键词" />
          <!-- （综合）四个标签栏 -->
          <div class="middle">
            <van-dropdown-menu>
              <van-dropdown-item v-model="value1" :options="option1" title="综合" />
            </van-dropdown-menu>

            <span>销量</span>
            <van-dropdown-menu>
              <van-dropdown-item v-model="value2" :options="option2" title="价格" />
            </van-dropdown-menu>

            <!-- <van-dropdown-item title="筛选" /> -->
            <!-- <van-dropdown-item title="筛选"  /> -->
            <span>
              <a href="javascript:;" @click="popSelect">筛选</a>
            </span>
          </div>
          <!-- （拍照像素）四个标签栏 -->
          <van-dropdown-menu class="secondMenu">
            <van-dropdown-item title="拍照像素" ref="firstItemRefs">
              <van-checkbox-group v-model="result">
                <van-cell-group>
                  <!-- :title="`复选框 ${item}`" -->
                  <van-cell
                    v-for="(item, index) in firstData"
                    clickable
                    :key="index"
                    @click="ftoggle(index)"
                  >
                    <div>
                      <p>{{item.title_text}}</p>
                      <p>{{item.content_text}}</p>
                    </div>
                    <template #right-icon>
                      <van-checkbox :name="item" ref="checkboxes" />
                    </template>
                  </van-cell>
                </van-cell-group>
              </van-checkbox-group>

              <div class="footer">
                <van-button @click="resetBtn">重置</van-button>
                <van-button type="danger" @click="fonConfirm">确认</van-button>
              </div>
            </van-dropdown-item>
            <van-dropdown-item title="屏幕大小" ref="secondItemRefs">
              <van-checkbox-group v-model="result">
                <van-cell-group>
                  <!-- :title="`复选框 ${item}`" -->
                  <van-cell
                    v-for="(item, index) in secondData"
                    clickable
                    :key="index"
                    @click="stoggle(index)"
                  >
                    <div>
                      <p>{{item.title_text}}</p>
                      <p>{{item.content_text}}</p>
                    </div>
                    <template #right-icon>
                      <van-checkbox :name="item" ref="checkboxes" />
                    </template>
                  </van-cell>
                </van-cell-group>
              </van-checkbox-group>

              <div class="footer">
                <van-button @click="resetBtn">重置</van-button>
                <van-button type="danger" @click="fonConfirm">确认</van-button>
              </div>
            </van-dropdown-item>
            <van-dropdown-item title="运行内存" ref="thirdItemRefs">
              <van-checkbox-group v-model="result">
                <van-cell-group>
                  <!-- :title="`复选框 ${item}`" -->
                  <van-cell
                    v-for="(item, index) in thirdData"
                    clickable
                    :key="index"
                    @click="ttoggle(index)"
                  >
                    <div>
                      <p>{{item.title_text}}</p>
                      <p>{{item.content_text}}</p>
                    </div>
                    <template #right-icon>
                      <van-checkbox :name="item" ref="checkboxes" />
                    </template>
                  </van-cell>
                </van-cell-group>
              </van-checkbox-group>

              <div class="footer">
                <van-button @click="resetBtn">重置</van-button>
                <van-button type="danger" @click="tonConfirm">确认</van-button>
              </div>
            </van-dropdown-item>

            <!-- <van-dropdown-item v-model="value6" :options="option6" title="" /> -->
            <van-dropdown-item title="电池续航" ref="lastItemRefs">
              <van-checkbox-group v-model="result">
                <van-cell-group>
                  <!-- :title="`复选框 ${item}`" -->
                  <van-cell
                    v-for="(item, index) in lastData"
                    clickable
                    :key="index"
                    @click="toggle(index)"
                  >
                    <div>
                      <p>{{item.title_text}}</p>
                      <p>{{item.content_text}}</p>
                    </div>
                    <template #right-icon>
                      <van-checkbox :name="item" ref="checkboxes" />
                    </template>
                  </van-cell>
                </van-cell-group>
              </van-checkbox-group>

              <div class="footer">
                <van-button @click="resetBtn">重置</van-button>
                <van-button type="danger" @click="onConfirm">确认</van-button>
              </div>
            </van-dropdown-item>
          </van-dropdown-menu>
          <!-- 图片展示区 -->
          <van-grid :border="false" :column-num="5" height="150px">
            <van-grid-item>
              <van-image src="https://img.yzcdn.cn/vant/apple-1.jpg" />
              <span class="telep">手机</span>
            </van-grid-item>
            <van-grid-item>
              <van-image src="https://img.yzcdn.cn/vant/apple-1.jpg" />
              <span class="telep">手机</span>
            </van-grid-item>
            <van-grid-item>
              <van-image src="https://img.yzcdn.cn/vant/apple-1.jpg" />
              <span class="telep">手机</span>
            </van-grid-item>
            <van-grid-item>
              <van-image src="https://img.yzcdn.cn/vant/apple-2.jpg" />
              <span class="telep">手机</span>
            </van-grid-item>
            <van-grid-item>
              <van-image src="https://img.yzcdn.cn/vant/apple-3.jpg" />
              <span class="telep">手机</span>
            </van-grid-item>
          </van-grid>
        </div>
        <!-- 商品列表区域 -->
        <div class="shopList" v-for="(item, index) in cardList" :key="index">
          <van-card :thumb="item.thum_img" centered class="card">
            <template #tags>
              <p class="top-shopList">
                <van-tag type="danger" color="#7232dd" round class="first-tag">标签</van-tag>
                <span class="title">
                  <a href="javascript:;">{{item.title_name}}</a>
                </span>
              </p>
              <p class="description">{{item.shop_des}}</p>
              <div class="itemsTages">
                <div class="first-item">
                  <p>CPU</p>
                  <p class="grey">MTK G85</p>
                </div>
                <div class="second-item">
                  <p>四摄像头</p>
                  <p class="grey">4800万+800万</p>
                </div>
                <div class="third-item">
                  <p>超大屏</p>
                  <p class="grey">6.53英寸</p>
                </div>
              </div>
              <p class="price">
                <span class="price-num">￥{{item.shop_price}}</span>
                <van-tag type="primary" class="blueTag">分期</van-tag>
              </p>
              <p class="assess grey">
                <a href="javascript:;">{{item.shop_assess}}</a>
              </p>
            </template>
          </van-card>
        </div>

        <!-- 筛选层弹出 -->
        <div class="select">
          <van-popup v-model="show" position="right" :style="{ height: '100%' , width: '80%'}">
            <!-- <el-checkbox-group > -->
            <!-- v-for="city in cities" :label="city" :key="city" -->
            <div class="select-item">
              <button class="orange">
                <input type="checkbox" name="value" id="value" checked hidden />
                <label for="value">1234</label>
              </button>
              <button class="orange" >
                <input type="checkbox" name="value" id="value" checked hidden />
                <label for="value">1234</label>
              </button>
            </div>
          </van-popup>
        </div>
        <!-- </el-checkbox-group> -->
        <van-row>
          <div></div>
        </van-row>
      </div>
    </van-pull-refresh>
  </div>
</template>
<script>
export default {
  props: [],
  data () {
    return {
      checkboxGroup1: '',

      // 拍照像素那一栏的数据
      firstData: [
        {
          title_text: '四摄像头',
          content_text: '后置相机拥有4个摄像头'
        },
        {
          title_text: '三摄像头',
          content_text: '后置相机拥有3个摄像头'
        },
        {
          title_text: '双摄像头',
          content_text: '后置相机拥有2个摄像头'
        },
        {
          title_text: '高清拍摄',
          content_text: '后置相机在1200万像素以上'
        }
      ],
      secondData: [
        {
          title_text: '超大屏',
          content_text: '屏幕超过6英寸'
        },
        {
          title_text: '中小屏',
          content_text: '屏幕小于6英寸'
        }
      ],
      thirdData: [
        {
          id: '21',
          title_text: '极速畅玩',
          content_text: '运行内存为3GB'
        },
        {
          id: '22',
          title_text: '极速畅玩',
          content_text: '运行内存为3GB'
        },
        {
          id: '23',
          title_text: '极速畅玩',
          content_text: '运行内存为3GB'
        }
      ],
      lastData: [
        {
          title_text: '超长待机',
          content_text: '电池容量balabala'
        }
      ],
      // checked1: '',
      result: [],
      value: '',
      value1: 1,
      value2: 'b',
      option1: [
        { text: '综合排序', value: 1 },
        { text: '新品优先', value: 2 }
      ],
      option2: [
        { text: '综合排序', value: 'b' },
        { text: '销量排序', value: 'c' }
      ],
      show: false,
      selectList: [],
      cardList: [],
      isLoading: false
    }
  },
  created () {
    this.getSelectList()
    this.getcardList()
  },
  methods: {
    async getSelectList () {
      const { data: res } = await this.$http.get('/selectList')
      console.log(res.data)
      this.selectList = res.data
    },
    popSelect () {
      this.show = true
      this.getSelectList()
    },
    clickBtn () {},
    async getcardList () {
      const { data: res } = await this.$http.get('/shopList')
      console.log(res.data)
      this.cardList = res.data
    },
    toggle (index) {
      this.$refs.checkboxes[index].toggle()
    },
    ftoggle (index) {
      this.$refs.checkboxes[index].toggle()
    },
    stoggle (index) {
      this.$refs.checkboxes[index].toggle()
    },
    ttoggle (index) {
      this.$refs.checkboxes[index].toggle()
    },
    resetBtn () {
      // .resetValidation(this.$refs.lastItemRefs)
    },
    onConfirm () {
      this.$refs.lastItemRefs.toggle()
    },
    fonConfirm () {
      this.$refs.firstItemRefs.toggle()
    },
    sonConfirm () {
      this.$refs.secondItemRefs.toggle()
    },
    tonConfirm () {
      this.$refs.thirdItemRefs.toggle()
    },
    onRefresh () {
      setTimeout(() => {
        this.$toast('刷新成功')
        this.isLoading = false
        this.count++
      }, 1000)
    }
  }
}
</script>
<style lang="less" scoped>

.container {
  background-color: #f7f8fa;
  font-family: "Microsoft yahei ";
  .grey {
    font-size: 8px;
    color: #b5b5b5;
  }
  .shopList {
    background-color: #fff;
    a {
      font-size: 8px;
      color: #b5b5b5;
    }
  }
  .middle {
    background-color: #fff;
    display: flex;
    justify-content: space-around;
    text-align: center;
    span {
      padding-top: 12px;
      font-size: 12px;
      a {
        color: black;
      }
    }
  }
  .van-grid {
    font-size: 12px;
    .telep {
      padding-top: 8px;
    }
  }
  .selectContainer {
    padding: 15px;
  }

  .btn {
    height: 40px;
  }
  .shopList {
    margin-top: 10px;
    .card {
      background-color: #fff;
    }
    .first-tag {
      transform: translateY(-4px);
    }
    .title {
      a {
        font-size: 16px;
        margin-left: 6px;
        color: black;
      }
    }
    .description {
      margin-top: -8px;
      color: #ff6700;
      font-size: 12px;
      text-overflow: -o-ellipsis-lastline;
      overflow: hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      line-clamp: 2;
      -webkit-box-orient: vertical;
    }
    .itemsTages {
      margin-top: -14px;
      margin-left: -4px;
      font-size: 10px;
      text-align: center;
      display: flex;
      .first-item {
        flex: 1;
        border-right: 1px solid #fafafa;
      }
      .second-item {
        flex: 1;
        border-right: 1px solid #fafafa;
      }
      .third-item {
        flex: 1;
        border-right: 1px solid #fafafa;
      }
    }
    .price {
      margin-top: -4px;

      .price-num {
        font-size: 20px;
        color: #ff6700;
      }
      .blueTag {
        margin-left: 5px;
      }
    }
    .assess {
      margin-top: -8px;
    }
  }
  .footer {
    display: flex;
    .van-button {
      flex: 1;
    }
  }
  .orange:hover{
    color: #fe7a00;
    background-color: #fde0d5;
    border: 1px solid #fe7a00;
    border-radius: 4px;
  }
}
</style>
