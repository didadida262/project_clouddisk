const { app, BrowserWindow, ipcMain  } = require('electron')
const isDev = require('electron-is-dev')
const path = require('path')
const fs = require('fs')
const { CATEGORIES, hideRights } = require('./src/utils/const.js')

const createWindow = () => {
    const win = new BrowserWindow({
      width: 800,
      height: 600,
    //   title: "点歌系统",
      show: false,
      webPreferences: {
        preload: path.join(__dirname, 'preload.js'),
        nodeIntegration: true,
        enableRemoteModule: true
      }
    })
    win.loadFile('index.html')
    // win.loadFile('./dist/index.html')
    const url = isDev? 'http://localhost:3001': 'myurl'
    win.loadURL(url)
    // 处理白屏
    win.on('ready-to-show', () => {
      win.show()
    })
  
  }
  app.on('ready', () => {
    // ipcMain.handle('ping', () => 'pong')
    createWindow()

    app.on('activate', () => {
      if (BrowserWindow.getAllWindows().length === 0) createWindow()
    })
  })

  // app.whenReady().then(() => {
  //   ipcMain.handle('ping', () => 'pong')
  //   createWindow()
  //   app.on('activate', () => {
  //     if (BrowserWindow.getAllWindows().length === 0) createWindow()
  //   })
  // })
const targetCatePath = 'E:\\RESP\\cate_2\\【浪客剑心】“对不起 我的夫君”.mp4'

  ipcMain.on('getCategories', (event, msg) => {
    // console.log('main-接受>>', msg)
    event.sender.send('getCategories_back', CATEGORIES)
  })

  ipcMain.on('getVideo', (event, msg) => {
    // console.log('主进程接收到数据>>', msg)
    fs.readFile(msg.path, (err, data) => {
      if (err) {
        throw err
      }
      event.sender.send('msgMain', data)
    })
  })


  app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') app.quit()
  })