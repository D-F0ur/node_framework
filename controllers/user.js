const userService = require('../services/user')
const code = require('../config/code')

module.exports = {

  /**
   * 登录页面
   * @param  {object}  ctx 上下文对象
   */
  async signInPage(ctx) {
    if(ctx.session && ctx.session.isLogin === true) {
      ctx.redirect('/home')
    } else {
      const title = '登录'
      await ctx.render('signin', {
        title
      })
    }

  },

  /**
   * 注册页面
   * @param  {object}  ctx 上下文对象
   */
  async signUpPage(ctx) {
    if(ctx.session && ctx.session.isLogin === true) {
      ctx.redirect('/home')
    } else {
      const title = '注册'
      await ctx.render('signup', {
        title
      })
    }
  },

  /**
   * 登录操作
   * @param  {object}  ctx 上下文对象
   */
  async signIn(ctx) {
    let formData = ctx.request.body
    let result = {
      message: '',
      data: null,
      code: ''
    }

    if(!formData.hasOwnProperty('username') || !formData.hasOwnProperty('password')) {
      result.message = code[4004]
      result.code = 4004
      return result
    }

    let validateResult = await userService.validatorSignUp(formData)

    if(validateResult.code !== 2000) {
      result = validateResult
      ctx.body = result
      return
    }

    let usernameResult = await userService.getUserByUserName(formData.username)

    if(usernameResult) {
      let userResult = await userService.signIn(formData)

      if(userResult) {
        result.message = code[2000]
        result.code = 2000

        let session = ctx.session
        session.isLogin = true
        session.username = userResult.username
        session.userId = userResult.id

      } else {
        result.message = code[5004]
        result.code = 5004
      }
    } else {
      result.message = code[5001]
      result.code = 5001
    }

    ctx.body = result
  },

  /**
   * 登出操作
   * @param  {object}  ctx 上下文对象
   */
  async logout(ctx) {
    let result = {
      message: '',
      data: null,
      code: ''
    }

    if(ctx.session && ctx.session.isLogin === true) {
      ctx.session.isLogin = false
      result.message = code[2000]
      result.code = 2000
      ctx.redirect('/user/login')
    } else {
      result.message = code[4000]
      result.code = 4000
      ctx.body = result
    }

  },

  /**
   * 注册操作
   * @param  {object}  ctx 上下文对象
   */
  async signUp(ctx) {
    let formData = ctx.request.body
    let result = {
      message: '',
      data: null,
      code: ''
    }

    if(!formData.hasOwnProperty('username') || !formData.hasOwnProperty('password')) {
      result.message = code[4004]
      result.code = 4004
      return result
    }

    let validateResult = await userService.validatorSignUp(formData)

    if(validateResult.code !== 2000) {
      result = validateResult
      ctx.body = result
      return
    }

    let existOneResult = await userService.getExistOne(formData)

    if(existOneResult) {
      if(existOneResult.username === formData.username) {
        result.message = code[5002]
        result.code = 5002
        ctx.body = result
        return
      }
    }

    let userResult = await userService.create(formData)

    if(userResult) {
      result.message = code[2000]
      result.code = 2000
    } else {
      result.message = code[4000]
      result.code = 4000
    }

    ctx.body = result
  },

  /**
   * 获取用户信息
   * @param  {object}  ctx 上下文对象
   * @return {object}      用户信息
   */
  async getLoginUserInfo(ctx) {
    let session = ctx.session
    let isLogin = session.isLogin
    let username = session.username

    let result = {
      message: '',
      data: null,
      code: ''
    }

    if(isLogin === true && username) {
      let userResult = await userService.getUserByUserName(username)

      if(userResult) {
        result.data = userResult
        result.message = code[2000]
        result.code = 2000
      } else {
        result.message = code[5010]
        result.code = 5010
      }
    } else {
      // TODO
    }

    ctx.body = result

  },

  /**
   * 检验用户是否登录
   * @param  {object} ctx 上下文对象
   * @return {object}     登录信息
   */
  validateLogin(ctx) {

    let result = {
      message: '',
      data: null,
      code: ''
    }

    let session = ctx.session
    if(session && session.isLogin === true) {
      result.message = code[2000]
      result.code = 2000
    }
    return result

  }

}
