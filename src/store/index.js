import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    // 获取商品需要的字符串参数
    ids: '',
    // 定义购物车里面的商品
    lists: [],
    carArr: JSON.parse(localStorage.getItem('car') || '[]')
  },
  mutations: {
    //  获取商品数量并拼接成字符串
    getArrAndToString (state, ids) {
      // console.log(ids);
      state.ids = ids
    },
    // 获取购物车商品
    initList (state, lists) {
      state.lists = lists
    },
    // 添加商品数量功能
    add (state, id) {
      const index = state.lists.findIndex(item => item.id === id)
      state.lists[index].cou++
      state.carArr[index].cou++
      localStorage.setItem('car', JSON.stringify(state.carArr))
    },
    // 减少商品数量功能
    sub (state, id) {
      const index = state.lists.findIndex(item => item.id === id)
      if (state.lists[index].cou === 1) {
        return false
      }
      state.lists[index].cou--
      state.carArr[index].cou--
      localStorage.setItem('car', JSON.stringify(state.carArr))
    },
    // 删除购物车里面的商品
    delete (state, id) {
      // 根据id找到商品
      const index = state.lists.findIndex(item => item.id === id)
      state.lists.splice(index, 1)
      state.carArr.splice(index, 1)
      localStorage.setItem('car', JSON.stringify(state.carArr))
    },
    // 添加商品
    addlist (state, product) {
      const obj = {}
      console.log(product)
      obj.id = product.id - 0
      obj.cou = product.cou - 0
      obj.selected = true
      var flag = true
      state.carArr.forEach(item => {
        if (item.id === obj.id) {
          item.cou += product.cou
          // eslint-disable-next-line no-return-assign
          return flag = false
        }
      })
      if (flag) state.carArr.push(obj)
      localStorage.setItem('car', JSON.stringify(state.carArr))
    }

  },
  actions: {
    // 异步调用方法
    async   getLists (context) {
      // console.log(this.state.ids)
      if (this.state.ids === '') {
        return
      }
      const { data: res } = await Vue.prototype.$http.get(
        '/api/goods/getshopcarlist/' + this.state.ids
      )
      // 重点！！！！！！ 在这里修改商品数量
      this.state.carArr.forEach((item, index) => Object.assign(res.message[index], item))
      // console.log(res.message);
      context.commit('initList', res.message)
    },

    // 删除功能
    deleteRun (context, id) {
      context.commit('delete', id)
    },
    // 获取本地数据并获取真实数量
    changeToString (context) {
      let obj = window.localStorage.getItem('car')
      if (obj === null) {
        return false
      }
      obj = JSON.parse(obj)
      let arr = []
      obj.forEach(item => arr.push(item.id))
      arr = arr.join(',')
      // console.log(obj);
      context.commit('getArrAndToString', arr)
    }
  },
  getters: {
    // 计算购物车商品数量
    getCarLists (state) {
      let result = 0
      state.carArr.forEach(item => { result += item.cou })
      return result
    },
    getTotal (state) {
      let total = 0
      // eslint-disable-next-line no-return-assign
      state.lists.forEach(item => total += item.cou * item.sell_price)
      return total
    }
  }
})
