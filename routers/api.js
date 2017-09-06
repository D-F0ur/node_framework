/**
 * restful api 子路由
 */

const router = require('koa-router')()
const userInfoController = require('../controllers/user-info')

router.get('/user/info', userInfoController.getLoginUserInfo)
router.post('/user/signin', userInfoController.signIn)
router.post('/user/signup', userInfoController.signUp)


module.exports = router
