import * as fs from 'fs'

export const getFileJsonData = (filePath: string): string => {
  let fileData: string
  try {
    fileData = fs.readFileSync(filePath, 'utf-8')
  } catch (e) {
    console.log(e)
    const errMsg = {
      message: '读取文件失败，文件资源不存在',
      code: 404
    }
    fileData = JSON.stringify(errMsg)
  }
  return fileData
}
