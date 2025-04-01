import { contextBridge, ipcRenderer } from 'electron'
import { IPCInfo } from '../src/utils'
export const api = {
  sendMessage: (message: IPCInfo) => {
    ipcRenderer.send('message', message)
  },

  on: (channel: string, callback: Function) => {
    ipcRenderer.on(channel, (_, data) => callback(data))
  },
}

contextBridge.exposeInMainWorld('Main', api)
