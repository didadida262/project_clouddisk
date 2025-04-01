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
  const path = message.data
  fs.readFile(path, (err: Error, data: any) => {
    console.log('data>>1', data)
    console.log('data>>2', data.length)
    // <Buffer 00 00 00 18 66 74 79....>
    console.log('data>>3', typeof data)
    event.sender.send('getVideoContent_back', {
      name: message.data.name,
      file: data,
    })
  })
}

// export const handleGetVideo = (event: Electron.IpcMainInvokeEvent, message: eventInfo): void => {
//   // 1. 维护一个已发送长度
//   // 3. 当已发送长度等于文件总长度，退出循环

//   const videoPath = message.data.path
//   const stat = fs.statSync(videoPath);
//   const videoSize = stat.size;
//   console.log('videoSize>>>', videoSize)
//   // 1m大小
//   const chunkSize = 30 * 1024 * 1024

// // 成功
// // 指定开始和结束的字节位置
//   let start = 0; // 从文件开头开始
//   let end = chunkSize; // 读取10个字节

//   // 创建可读流
//   const readStream = fs.createReadStream(videoPath, { start, end:videoSize });
//   // 处理流数据
//   let data = Buffer.alloc(0)
//   // Buffer.alloc(0)
//   readStream.on('data', (chunk:any) => {
//     console.log('读取内容>>>', chunk)
//     console.log('当前data>>>', data)
//     data = Buffer.concat([data, chunk])
//   });

//   // 处理流结束
//   readStream.on('end', () => {
//     console.log('发送shuju>>>', data)
//     event.sender.send('getVideoContent_back', {
//       name: message.data.name,
//       file: data
//     })
//     readStream.destroy()

//   });
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
