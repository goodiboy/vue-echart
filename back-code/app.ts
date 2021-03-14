import * as Koa from 'koa'
import responseDuration from './middleware/koa_response_duration'
import responseHeader from './middleware/koa_response_header'
import responseData from './middleware/koa_response_data'
const app = new Koa()
app.use(responseDuration).use(responseHeader).use(responseData)
app.listen(8080)
