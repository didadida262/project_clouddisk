import { VideoItem, eventInfo } from '../utils/index'


const fs = require('fs')
const path = require('path')

export const handleGetAllItems = (event: Electron.IpcMainInvokeEvent, message: eventInfo): void => {
  fs.readdir(message.data.path, (err: Error, data: any) => {
    if (err) {
        throw err
    } else {
        let videosList = data.map((item: string, index: number) => {
          return {
            id: index,
            name: item,
            path: message.data.path + '\\' + item
          }
        }).sort((a: VideoItem, b: VideoItem) => {
          return a.id - b.id
        })
        event.sender.send('getAllVideosInCate_back', videosList)
    }
  })
}

export const handleGetVideo = (event: Electron.IpcMainInvokeEvent, message: eventInfo): void => {
  const path = message.data.path
  fs.readFile(path, (err: Error, data: any) => {
    event.sender.send('getVideoContent_back', {
      name: message.data.name,
      file: data
    })
  })
}

export const getVideoContentVersionTwo = (event: Electron.IpcMainInvokeEvent, message: eventInfo): void => {
  const path = message.data.path
  fs.readFileSync(path, (err: Error, data: any) => {
    event.sender.send('getVideoContent_back', {
      name: message.data.name,
      file: data
    })
  })
}

export const handleGetAllCates = (event: Electron.IpcMainInvokeEvent, message: eventInfo): void => {
  const validFiles = fs.readdirSync(message.data.path).filter((item: any) => item.indexOf('.') === -1).map((dir: any) => {
      return {
          name: dir,
          path: path.join(message.data.path, dir)
      }
  })
  event.sender.send('getAllCates_back', validFiles)
}
