import * as Koa from 'koa'
// 计算服务器消耗时长的中间件
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export default async (
  ctx: Koa.ParameterizedContext<Koa.DefaultState, Koa.DefaultContext, never>,
  next: Koa.Next
) => {
  const start = Date.now()
  await next()
  const end = Date.now()
  const duration = end - start
  ctx.set('X-Response-Time', duration + 'ms')
}
