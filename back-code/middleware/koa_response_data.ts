// 处理业务逻辑的中间件,读取某个json文件的数据
// 设置响应头的中间件
import * as Koa from 'koa'
import * as path from 'path'
import { getFileJsonData } from '../utils/file_utils'

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export default async (
  ctx: Koa.ParameterizedContext<Koa.DefaultState, Koa.DefaultContext, any>,
  next: Koa.Next
) => {
  // 请求的url
  const url = ctx.request.url
  let filePath = url.replace('/api', '')
  filePath = `../data${filePath}.json`
  filePath = path.join(__dirname, filePath)
  ctx.body = getFileJsonData(filePath)
  await next()
}
