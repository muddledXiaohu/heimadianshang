import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../components/Home.vue'
// 新闻列表
import NewsDetails from '../components/news/NewsDetails.vue'
import NewsInformation from '../components/news/NewsInformation.vue'
// 评论
import Comments from '../components/Comments.vue'
import Photo from '../components/picture/Picture.vue'
import PhotoInfo from '../components/picture/Detail.vue'
// 联系我们
import myMap from '../components/map/Map.vue'
import City from '../components/map/City.vue'
// 购物车
import ShopCar from '../components/car/ShopCar.vue'
import Pay from '../components/car/Pay.vue'
// 商品
import Detail from '../components/goods/Detail.vue'
// 商品列表
import shopList from '../components/Shop/shop_list.vue'
import PicText from '../components/Shop/Pic&Text.vue'
// 搜索
import Search from '../components/search/Search.vue'
import Addgoods from '../components/search/Addgoods.vue'
import Login from '../components/login/Login.vue'
import Register from '../components/login/Register.vue'

// 个人中心
import Member from '../components/members/Member.vue'
import Order from '../components/members/Order.vue'
import tabList from '../components/shopSort/tabList'
import searchList from '../components/category/searchList'

Vue.use(VueRouter)

// 重复点击报错
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push (location) {
  return originalPush.call(this, location).catch(err => err)
}

Vue.use(VueRouter)

const routes = [

  { path: '/', name: 'home', redirect: '/home' },
  { path: '/home', name: 'home', component: Home },
  { path: '/newslist', name: 'newslist', component: NewsInformation },
  { path: '/news/detail/:id', name: 'newslist', component: NewsDetails },
  // 购物车路由
  { path: '/shopcar', component: ShopCar },
  // 支付页面
  { path: '/pay', component: Pay },
  { path: '/comment', name: 'Comments', component: Comments },
  { path: '/goods/detail/:id', component: Detail },
  { path: '/goodsdesc/:id', component: PicText },
  { path: '/goodscomments/:id', component: Comments },
  // 购物
  { path: '/goods/list', name: 'shopList', component: shopList },
  // 搜索
  { path: '/search', component: Search },
  { path: '/addgoods', component: Addgoods },
  // 图片
  { path: '/photo/list', component: Photo },
  { path: '/photo/Info/:id', component: PhotoInfo },
  // 选择城市页面
  { path: '/city', component: City },
  // 地图页面
  { path: '/map', component: myMap },
  // 登录
  { path: '/login', component: Login },
  { path: '/register', component: Register },
  // 个人中心
  { path: '/member', component: Member },
  { path: '/order', component: Order },
  { path: '/shopList', name: 'shopList', component: shopList },
  // 商品分类
  { path: '/tabList', name: 'tabList', component: tabList },
  { path: '/searchlist', name: 'searchList', component: searchList }
]

const router = new VueRouter({
  routes
})
// 路由守卫
router.beforeEach((to, from, next) => {
  if (to.path === '/login') return next()
  // const tokenStr = localStorage.getItem('token')
  // if (to.path === '/member' && !tokenStr) return next('/login')
  next()
})

export default router
