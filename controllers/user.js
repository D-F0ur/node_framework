module.exports = {

  async signInPage(ctx) {
    const title = '登录'
    await ctx.render('signin', {
      title
    })
  },

  async signUpPage(ctx) {
    const title = '注册'
    await ctx.render('signup', {
      title
    })
  }

}
