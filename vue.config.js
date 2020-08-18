module.exports = {
  lintOnSave: true,
  // publicPath: process.env.NODE_ENV === 'production' ? './' : '/',
  publicPath: './',
  chainWebpack: config => {
    // 发布模式
    config.when(process.env.NODE_ENV === 'production', config => {
      // entry找到默认的打包入口，调用clear则是删除默认的打包入口
      // add添加新的打包入口
      config.entry('app').clear().add('./src/main-prod.js')

      // 使用externals设置排除项
      config.set('externals', {
        vue: 'Vue',
        'vue-router': 'VueRouter',
        // vuex: 'Vuex',
        axios: 'axios',
        'element-ui': 'ElementUI',
        moment: 'moment'
        // vant: 'Vant'
      })

      // 首页规则
      config.plugin('html').tap(args => {
        args[0].isProd = true
        return args
      })
    })
    // 开发模式
    config.when(process.env.NODE_ENV === 'development', config => {
      config.entry('app').clear().add('./src/main-dev.js')

      // 首页规则
      config.plugin('html').tap(args => {
        args[0].isProd = false
        return args
      })
    })
  }
}
