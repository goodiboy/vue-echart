import * as Koa from 'koa'
import responseDuration from './middleware/koa_response_duration'
import responseHeader from './middleware/koa_response_header'
const app = new Koa()
app.use(responseDuration).use(responseHeader)
app.listen(8080)
