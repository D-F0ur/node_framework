/**
 * 工作台子路由
 */

const router = require('koa-router')()
const work = require('./../controllers/work')

module.exports = router.get('/', work.indexPage)
