/**
 * 整合所有子路由
 */

const router = require('koa-router')()

const index = require('./index')
const api = require('./api')
const admin = require('./admin')
const work = require('./work')
const error = require('./error')

router.use('/', index.routes(), index.allowedMethods())
router.use('/api', api.routes(), api.allowedMethods())
router.use('/admin', admin.routes(), admin.allowedMethods())
router.use('/work', work.routes(), work.allowedMethods())
router.use('/error', error.routes(), error.allowedMethods())

module.exports = router