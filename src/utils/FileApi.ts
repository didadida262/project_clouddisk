const fs  = require('fs')
const path  = require('path')

// 扫描指定路径下所有文件
export const scanDirItems = (path: string) => {
    const res = fs.readdirSync(path)
    return res
}
