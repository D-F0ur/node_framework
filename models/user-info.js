/**
 * 用户数据操作
 */

const dbUtils = require('../utils/db-util')

module.exports = {

  /**
   * 数据库创建用户
   * @param  {object} model 用户信息
   * @return {object}       mysql执行结果
   */
  async create(user) {
    let result = await dbUtils.insertData('user_info', user)
    return result
  },

  /**
   * 查找一个存在用户的数据
   * @param  {object}  options 查找条件参数
   * @return {object|null}     查找结果
   */
  async getExistOne(options) {
    let _sql = `SELECT * FROM user_info
    WHERE email="${options.email}" OR name="${options.name}"
    LIMIT 1`
    let result = await dbUtils.query(_sql)
    if (Array.isArray(result) && result.length > 0) {
      result = result[0]
    } else {
      result = null
    }
    return result
  },

  /**
   * 根据用户名和密码查找用户
   * @param  {object}  options 用户名密码对象
   * @return {object|null}     查找结果
   */
  async getOneByUserNameAndPassword(options) {
    let _sql = `SELECT * FROM user_info
    WHERE password="${options.password}" AND name="${options.name}"
    LIMIT 1`
    let result = await dbUtils.query(_sql)
    if (Array.isArray(result) && result.length > 0) {
      result = result[0]
    } else {
      result = null
    }
    return result
  },

  /**
   * 根据用户名查找用户信息
   * @param  {string}  userName 用户账号名称
   * @return {object|null}      查找结果
   */
  async getUserInfoByUserName(userName) {
    let result = await dbUtils.select('user_info', ['id', 'email', 'name', 'detail_info', 'create_time', 'modified_time', 'modified_time'])
    if (Array.isArray(result) && result.length > 0) {
      result = result[0]
    } else {
      result = null
    }
    return result
  }

}
