import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'
import Vant, { Lazyload, Panel, List } from 'vant'
import 'vant/lib/index.css'
// element
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
// 引入mock数据
import './Mock/index'
import moment from 'moment'
// 会员字体图标
import '../public/font_nip2t94sb7n/iconfont.css'
import '../public/font_10lji7b4n8kn/iconfont.css'

import '../public/css/global.css'

Vue.use(ElementUI)

Vue.filter('dateformat', function (val) {
  return moment(val).format('YYYY-MM-DD')
})

axios.defaults.baseURL = 'http://api.cms.liulongbin.top'
Vue.use(Lazyload)
Vue.use(Vant)
Vue.use(Panel)
Vue.use(List)
Vue.config.productionTip = false

Vue.prototype.$http = axios
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
