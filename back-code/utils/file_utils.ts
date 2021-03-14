import * as fs from 'fs'

/**
 * 读取文件数据
 * @param filePath => 文件的路径
 * @return string => 字符串文件数据
 */
export const getFileJsonData = (filePath: string): string => {
  let fileData: string
  try {
    fileData = fs.readFileSync(filePath, 'utf-8')
  } catch (e) {
    const errMsg = {
      message: '读取文件失败，文件资源不存在',
      code: 404
    }
    fileData = JSON.stringify(errMsg)
  }
  return fileData
}
