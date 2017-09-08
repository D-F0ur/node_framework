/**
 * 整合所有子路由
 */

const router = require('koa-router')()

const index = require('./index')
const user = require('./user')
const home = require('./home')
const api = require('./api')
const work = require('./work')
const error = require('./error')

router.use('/', index.routes(), index.allowedMethods())
router.use('/user', user.routes(), user.allowedMethods())
router.use('/home', home.routes(), home.allowedMethods())
router.use('/api', api.routes(), api.allowedMethods())
router.use('/work', work.routes(), work.allowedMethods())
router.use('/error', error.routes(), error.allowedMethods())

module.exports = router
