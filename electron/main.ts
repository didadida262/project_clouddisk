import { app, BrowserWindow, ipcMain } from 'electron'
import { handleGetAllItems,handleGetAllCates, handleGetVideo } from '../src/EndServices/videoApi'

let mainWindow: BrowserWindow | null
declare const MAIN_WINDOW_WEBPACK_ENTRY: string
declare const MAIN_WINDOW_PRELOAD_WEBPACK_ENTRY: string

// const assetsPath =
//   process.env.NODE_ENV === 'production'
//     ? process.resourcesPath
//     : app.getAppPath()

function createWindow () {
  mainWindow = new BrowserWindow({
    // icon: path.join(assetsPath, 'assets', 'icon.png'),
    width: 1100,
    height: 700,
    backgroundColor: '#191622',
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      preload: MAIN_WINDOW_PRELOAD_WEBPACK_ENTRY
    }
  })

  // mainWindow.loadURL(MAIN_WINDOW_WEBPACK_ENTRY)
  // const url = isDev? 'http://localhost:3001': 'myurl'
  // mainWindow.loadURL('http://192.168.1.103:3001')
  mainWindow.loadURL(MAIN_WINDOW_WEBPACK_ENTRY)

  mainWindow.on('closed', () => {
    mainWindow = null
  })
}

async function registerListeners () {
  ipcMain.on('message', (event: any, message: any) => {
    console.log('main-get>>', message)
    switch(message.type) {
      case 'getAllCates':
        handleGetAllCates(event, message)
        break;
      case 'getAllVideosInCate':
        handleGetAllItems(event, message)
        break;
      case 'getVideoContent':
        handleGetVideo(event, message)
        break;
      default:
        break;
    }
  })
}

app.on('ready', createWindow)
  .whenReady()
  .then(registerListeners)

app.on('window-all-closed', () => {
  // if (process.platform !== 'darwin') {
  //   app.quit()
  // }
})

// app.on('activate', () => {
//   if (BrowserWindow.getAllWindows().length === 0) {
//     createWindow()
//   }
// })
