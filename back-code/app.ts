import * as Koa from 'koa'

const app = new Koa()

app.use(ctx=>{
  ctx.body ='hello typescript + koa2 '
})
app.listen(8080)
