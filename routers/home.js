/**
 * 主页子路由
 */

const router = require('koa-router')()
const home = require('../controllers/home')

router.get('/', home.homePage)

module.exports = router
