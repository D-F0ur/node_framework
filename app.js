const path = require('path')
const Koa = require('koa')
const favicon = require('koa-favicon')
const views = require('koa-views')
const koaStatic = require('koa-static')
const koaLogger = require('koa-logger')
const bodyParser = require('koa-bodyparser')
const render = require('koa-art-template')
const session = require('koa-session-minimal')
const MysqlStore = require('koa-mysql-session')

const config = require('./config/config')
const routers = require('./routers/routers')

const app = new Koa()

// session存储配置
const sessionMysqlConfig = {
  host: config.database.HOST,
  user: config.database.USERNAME,
  port: config.database.PORT,
  password: config.database.PASSWORD,
  database: config.database.DATABASE
}

// 配置session中间件
app.use(session({
  key: 'USER_SID',
  store: new MysqlStore(sessionMysqlConfig)
}))

// 配置控制台日志中间件
app.use(koaLogger())

// 配置ctx.body解析中间件
app.use(bodyParser())

// 配置静态资源加载中间件
app.use(koaStatic(path.join(__dirname, '/static')))

// 配置favicon
app.use(favicon(__dirname + '/static/assets/images/favicon.ico'))

// 配置服务端模板渲染引擎中间件
// app.use(views(path.join(__dirname, '/views'), {
//   extension: 'ejs'
// }))
render(app, {
  root: path.join(__dirname, '/views'),
  extname: '.html',
  debug: process.env.NODE_ENV !== 'production'
})

// 初始化路由中间件
app.use(routers.routes()).use(routers.allowedMethods())

// 监听启动端口
app.listen(config.port)
console.log(`listening on port ${config.port}`)
