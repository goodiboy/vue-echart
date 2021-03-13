import * as Koa from 'koa'
import responseDuration from './middleware/koa_response_duration'
const app = new Koa()

app.use(ctx=>{
  ctx.body ='hello typescript + koa2 '
})
app.listen(8080)
