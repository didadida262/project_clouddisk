import { eventInfo } from '../utils/index'
import { getFileType } from '../utils/FileApi'
import { dialog } from 'electron'

const path = require('path')
const fs = require('fs')

// 扫描指定路径下所有文件
export const getAllFiles = (
  event: Electron.IpcMainInvokeEvent,
  message: eventInfo
) => {
  const folderPath = message.data
  const files = fs.readdirSync(folderPath).map((file: any) => {
    const fullPath = path.join(folderPath, file)
    return {
      name: file,
      path: fullPath,
      type: getFileType(fullPath),
    }
  })
  event.sender.send('getAllFiles_back', { folderPath, files })
}

export const handleScannerDir = async (
  event: Electron.IpcMainInvokeEvent,
  message: eventInfo
): Promise<void> => {
  const result = await dialog.showOpenDialog({
    properties: ['openDirectory'],
  })

  if (!result.canceled && result.filePaths.length > 0) {
    const folderPath = result.filePaths[0]
    const files = fs.readdirSync(folderPath).map((file: any) => {
      const fullPath = path.join(folderPath, file)
      return {
        name: file,
        path: fullPath,
        type: getFileType(fullPath),
      }
    })
    event.sender.send('selectPath_back', { folderPath, files })
  }
}
