module.exports = {

  async homePage(ctx) {
    if(ctx.session && ctx.session.isLogin) {
      const title = '主页'
      await ctx.render('home', {
        title
      })
    } else {
      ctx.redirect('/user/login')
    }

  }

}
