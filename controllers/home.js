module.exports = {

  async homePage(ctx) {
    const title = '主页'
    await ctx.render('home', {
      title
    })
  }

}
