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
// 打点
// export const handleGetVideo = (event: Electron.IpcMainInvokeEvent, message: eventInfo): void => {
//   const path = message.data.path
//   fs.readFile(path, (err: Error, data: any) => {
//     console.log('data>>1', data)
//     console.log('data>>2', data.length)
//     // <Buffer 00 00 00 18 66 74 79....>
//     console.log('data>>3', typeof data)
//     event.sender.send('getVideoContent_back', {
//       name: message.data.name,
//       file: data
//     })
//   })
// }

export const handleGetVideo = (event: Electron.IpcMainInvokeEvent, message: eventInfo): void => {
  // 1. 维护一个已发送长度
  // 3. 当已发送长度等于文件总长度，退出循环
  
  const videoPath = message.data.path
  let sendedDataLength = 0
  const stat = fs.statSync(videoPath);
  const videoSize = stat.size;
  console.log('videoSize>>>', videoSize)
  // 1m大小
  const chunkSize = 25 * 1024 * 1024



// 成功
// 指定开始和结束的字节位置
  let bytesRead = 0
  let start = 0; // 从文件开头开始
  let loadedBuffer = Buffer.alloc(0);
  let end = chunkSize; // 读取10个字节
  // let readInterval = setInterval(() => {
  //   if (end >= videoSize) {
  //     console.log('done!!')
  //     clearInterval(readInterval);
  //     return;
  //   }

  
  // 创建可读流
  const readStream = fs.createReadStream(videoPath, { start, videoSize });
  // 处理流数据
  let data = Buffer.alloc(0);
  readStream.on('data', (chunk) => {
    data = Buffer.concat([data, chunk])
    console.log('data>>>', data)
  });
  
  // 处理流结束
  readStream.on('end', () => {
    start = end
    end =end + chunkSize
    loadedBuffer = Buffer.concat([loadedBuffer, data])
    console.log('发送片段>>>')
    event.sender.send('getVideoContent_back', {
      name: message.data.name,
      file: loadedBuffer
    })
    readStream.destroy()

  });
// }, 2000)

// ===================
// ===================
// ===================
  // let bytesRead = 0;
  // let readInterval = setInterval(() => {
  //   let loadedBuffer = null as any
  //   if (bytesRead >= videoSize) {
  //     clearInterval(readInterval);
  //     return;
  //   }
 
  //   const start = bytesRead;
  //   const end = Math.min(bytesRead + chunkSize, videoSize);
  //   bytesRead += chunkSize;
 
  //   const readStream = fs.createReadStream(videoPath, { start, end });
  //   readStream.on('data', (chunk:any) => {
  //     console.log('发送数据>>', chunk)
  //     if (!loadedBuffer) {
  //       loadedBuffer = chunk
  //     } else {
  //       loadedBuffer = Buffer.concat([loadedBuffer, chunk])
  //     }

  //   });
  //   readStream.on('end', () => {
  //     // Handle end of stream
  //     event.sender.send('getVideoContent_back', {
  //       name: message.data.name,
  //       file: loadedBuffer
  //     })
  //     readStream.destroy()
  //   });
  // }, 10000); // Read every second



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
