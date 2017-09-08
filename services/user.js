/**
 * 用户业务操作
 */

const validator = require('validator')
const userModel = require('../models/user')
const code = require('../config/code')
const crypto = require('crypto')

module.exports = {
  /**
   * 创建用户
   * @param  {object}  user 用户信息
   * @return {object}       创建结果
   */
  async create(user) {
    let _password = await this.cryptoSHA256(user.password)

    let result = await userModel.create({
      username: user.username,
      password: _password,
      create_time: new Date().getTime(),
      level: 1
    })
    return result
  },

  /**
   * 查找存在用户信息
   * @param  {object}  formData 查找的表单数据
   * @return {object}           查找结果
   */
  async getExistOne(formData) {
    let result = await userModel.getExistOne({
      'username': formData.username
    })
    return result
  },

  /**
   * 登录业务操作
   * @param  {object}  formData 登录表单信息
   * @return {object}           登录业务操作结果
   */
  async signIn(formData) {
    let _password = await this.cryptoSHA256(formData.password)
    let result = await userModel.getOneByUserNameAndPassword({
      'username': formData.username,
      'password': _password
    })

    return result
  },

  /**
   * 根据用户名查找用户业务
   * @param  {string}  userName 用户名
   * @return {object|null}      查找结果
   */
  async getUserByUserName(userName) {
    let result = await userModel.getUserInfoByUserName(userName)

    if(!result) return result
    let userInfo = {
      username: result.username,
      name: result.name,
      detailInfo: result.detail_info,
      createTime: result.create_time
    }
    return userInfo
  },

  /**
   * 检验用户注册数据
   * @param  {object} formData 用户注册数据
   * @return {object}          检验结果
   */
  async validatorSignUp(formData) {
    let result = {
      message: '',
      data: null,
      code: ''
    }

    if(!validator.isEmail(formData.username)) {
      result.message = code[5007]
      result.code = 5007
      return result
    }

    if(!/[\w+]{6,16}/.test(formData.password)) {
      result.message = code[5006]
      result.code = 5006
      return result
    }

    result.code = 2000
    return result
  },

  /**
   * sha256加密
   * @param  {string}  password 密码
   * @return {string}           加密后的哈希值
   */
  async cryptoSHA256(password) {
    return crypto.createHmac('sha256', 'secret').update(password).digest('hex')
  }
}
