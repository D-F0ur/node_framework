/**
 * 用户子路由
 */

const router = require('koa-router')()
const user = require('../controllers/user')

router.get('/login', user.signInPage)
router.get('/reg', user.signUpPage)
router.get('/logout', user.logout)

module.exports = router
