/**
 * restful api 子路由
 */

const router = require('koa-router')()
const userController = require('../controllers/user')

// 获取用户信息
router.get('/user/info', userController.getLoginUserInfo)
// 判断用户是否登录
router.get('/user/validate', userController.validateLogin)
// 登录
router.post('/user/signin', userController.signIn)
// 注册
router.post('/user/signup', userController.signUp)


module.exports = router
