// 设置响应头的中间件
import * as Koa from 'koa'

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export default async (
  ctx: Koa.ParameterizedContext<Koa.DefaultState, Koa.DefaultContext, any>,
  next: Koa.Next
) => {
  const contentType = 'application/json;charset=utf-8'
  ctx.set('Content-Type', contentType)
  await next()
}
