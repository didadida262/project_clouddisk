import { VideoItem, eventInfo } from '../utils/index'

const fs = require('fs')
const path = require('path')

export const handleGetAllItems = (
  event: Electron.IpcMainInvokeEvent,
  message: eventInfo
): void => {
  fs.readdir(message.data.path, (err: Error, data: any) => {
    if (err) {
      throw err
    } else {
      let videosList = data
        .map((item: string, index: number) => {
          return {
            id: index,
            name: item,
            path: message.data.path + '\\' + item,
          }
        })
        .sort((a: VideoItem, b: VideoItem) => {
          return a.id - b.id
        })
      event.sender.send('getAllVideosInCate_back', videosList)
    }
  })
}
// 打点
export const handleGetVideo = (
  event: Electron.IpcMainInvokeEvent,
  message: eventInfo
): void => {
  const videoPath = message.data
  const stat = fs.statSync(videoPath)
  const videoSize = stat.size
  console.log('videoSize>>>', videoSize)
  // 每个数据块的大小，这里设置为 1MB
  const chunkSize = 1 * 1024 * 1024
  let start = 0

  const sendChunk = () => {
    const end = Math.min(start + chunkSize, videoSize)
    const readStream = fs.createReadStream(videoPath, { start, end })

    readStream.on('data', (chunk: any) => {
      event.sender.send('getVideoContent_back', {
        name: path.basename(videoPath),
        file: chunk,
        start,
        end,
        isLastChunk: end === videoSize,
      })
    })

    readStream.on('end', () => {
      start = end
      if (start < videoSize) {
        sendChunk()
      }
    })

    readStream.on('error', (err: any) => {
      console.error('读取视频数据出错:', err)
    })
  }

  sendChunk()
}
// 老版本全量读取
// export const handleGetVideo = (
//   event: Electron.IpcMainInvokeEvent,
//   message: eventInfo
// ): void => {
//   const path = message.data
//   fs.readFile(path, (err: Error, data: any) => {
//     console.log('data>>1', data)
//     console.log('data>>2', data.length)
//     // <Buffer 00 00 00 18 66 74 79....>
//     console.log('data>>3', typeof data)
//     event.sender.send('getVideoContent_back', {
//       name: message.data.name,
//       file: data,
//     })
//   })
// }

export const handleGetAllCates = (
  event: Electron.IpcMainInvokeEvent,
  message: eventInfo
): void => {
  const validFiles = fs
    .readdirSync(message.data.path)
    .filter((item: any) => item.indexOf('.') === -1)
    .map((dir: any) => {
      return {
        name: dir,
        path: path.join(message.data.path, dir),
      }
    })
  event.sender.send('getAllCates_back', validFiles)
}
