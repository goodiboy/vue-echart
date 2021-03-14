// 设置响应头的中间件
import * as Koa from 'koa'

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export default async (
  ctx: Koa.ParameterizedContext<Koa.DefaultState, Koa.DefaultContext, any>,
  next: Koa.Next
) => {
  const contentType = 'application/json;charset=utf-8'
  ctx.set('Content-Type', contentType)
  ctx.set('Access-Control-Allow-Origin', '*') //允许来自所有域名请求(不携带cookie请求可以用*，如果有携带cookie请求必须指定域名)
  // ctx.set("Access-Control-Allow-Origin", "http://localhost:8080"); // 只允许指定域名http://localhost:8080的请求

  ctx.set('Access-Control-Allow-Methods', 'OPTIONS, GET, PUT, POST, DELETE')
  await next()
}
