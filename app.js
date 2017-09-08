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

// 存放sessionId的cookie配置
let cookie = {
  maxAge: '', // cookie有效时长
  expires: '',  // cookie失效时间
  path: '', // 写cookie所在的路径
  domain: '', // 写cookie所在的域名
  httpOnly: '', // 是否只用于http请求中获取
  overwrite: '',  // 是否允许重写
  secure: '',
  sameSite: '',
  signed: '',
}
// 配置session中间件
app.use(session({
  key: 'USER_SID',
  store: new MysqlStore(sessionMysqlConfig)
  // cookie: cookie
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
