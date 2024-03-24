import { getVideoID } from './weapons'
import { IPCInfo, VideoItem, CateItem } from '../utils/index'


const fs = require('fs')
const path = require('path')


export const handleGetAllItems = (event: any, message: any) => {
    fs.readdir(message.data.path, (err: Error, data: any) => {
      if (err) {
          throw err
      } else {
          let videosList = data.map((item: string, index: number) => {
            return {
              // id: getVideoID(item),
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

export const handleGetAllCates = async (event: any, message: any) => {
    const validFiles = fs.readdirSync(message.data.path).filter((item: any) => item.indexOf('.') === -1).map((dir: any) => {
        return {
            name: dir,
            path: path.join(message.data.path, dir)
        }
    })
  event.sender.send('getAllCates_back', validFiles)
}
export const handleGetVideo = (event: any, message: any) => {
  console.log('handleGetVideo>>>', message)
    const path = message.data.path
    // console.log('path>>', path)
    fs.readFile(path, (err: Error, data: any) => {
      // console.log('读取文件内容>>>', data)
      event.sender.send('getVideoContent_back', {
        name: message.data.name,
        file: data
      })
    })
}

export const getVideoContentVersionTwo = (event: any, message: any) => {
  const path = message.data.path
  // console.log('path>>', path)
  fs.readFileSync(path, (err: Error, data: any) => {
    event.sender.send('getVideoContent_back', {
      name: message.data.name,
      file: data
    })
  })
}

// export const getVideoContentVersionTwo = (event: any, message: any) => {
//   //建立流对象，读文件
//   const path = message.data.path
//   const stream = fs.createReadStream(path)
//   //错误处理
//   // stream.on('error', function() {
//   //     event.writeHead(500, { "content-type": contentType });
//   //     response.end("<h1>500 Server Error</h1>");
//   // }); 
//   //读取文件
//   stream.pipe(event.sender);
// }