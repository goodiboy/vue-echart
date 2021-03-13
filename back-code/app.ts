import * as Koa from 'koa'
import responseDuration from './middleware/koa_response_duration'
const app = new Koa()

app.use((ctx, next) => {
  ctx.body = 'hello typescript + koa2 '
})

app.use(responseDuration)
app.listen(8080)
