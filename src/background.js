'use strict'

import { app, protocol, BrowserWindow, ipcMain ,globalShortcut } from 'electron'
import {
  createProtocol,
  /* installVueDevtools */
} from 'vue-cli-plugin-electron-builder/lib'

const fs = require('fs')
const os = require('os')
const path = require('path')

const isDevelopment = process.env.NODE_ENV !== 'production'

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let win

// Scheme must be registered before the app is ready
protocol.registerSchemesAsPrivileged([{scheme: 'app', privileges: { secure: true, standard: true } }])

function createWindow () {
  // Create the browser window.
  win = new BrowserWindow({ 
    width: 1050, 
    height: 620, 
    title: 'app',
    useContentSize: true,
    fullscreenable: true,  //是否允许全屏
    titleBarStyle: 'hidden',
    frame: false,
    center: true,
    // alwaysOnTop: true, // 永远在别的窗口上面
    backgroundColor:  'rgba(255,255,255,0)' , //'rgba(255,255,255,0.7)',
    transparent: true, 
    opacity: 1 ,
    hasShadow: true,
    webPreferences: {
      nodeIntegration: true,
      plugins : true,
      webSecurity: false  // 是否开启调试
  } })

  if (process.env.WEBPACK_DEV_SERVER_URL) {
    // Load the url of the dev server if in development mode
    win.loadURL(process.env.WEBPACK_DEV_SERVER_URL)
    if (!process.env.IS_TEST) win.webContents.openDevTools()
  } else {
    createProtocol('app')
    // Load the index.html when not in development
    win.loadURL('app://./index.html')
  }
  win.webContents.openDevTools()

  win.on('closed', () => {
    win = null
  })
  //托盘
  require('./tyre')
  // 引入函数
  
var app = require('./mainFn')
  // 控制窗口大小以及是否可以拉伸
  ipcMain.on('reSizeScreen',function(event,data){
      if(data.width > 0){
        // 重定向 窗口 宽高
        win.setSize(data.width, data.height)
        // 是否允许改变窗口大小
        win.setResizable(data.moves)
      }
  })

  // 截屏
  ipcMain.on('cutScreen',function(event,data){
    app.screenWindow(event,win,1)
  })
  // 快捷键截屏
  globalShortcut.register('shift+Alt+A', function (event) {
    app.screenWindow(event,win,2)
   });
   //最小化
  ipcMain.on('window-min',()=>{
    win.minimize()
  })
   // 关闭
   ipcMain.on('window-close',()=>{
    win.hide()
  })
  // 退出
  ipcMain.on('window-quit',()=>{
    // console.log('退出')
    win.close()
  })


    //最大化或者还原
  ipcMain.on('window-tag',()=>{

      if(win.isMaximized()){
        // console.log('还原')
              win.restore()  //还原
          }else{
              win.maximize()  //最大化
              // console.log('最大化')
          }
  })
  // // 窗口最大化时
  // ipcMain.on('maximize',function(){
  //   win.webContents.send('window-types',1)
  //   console.log(12)
  // })
  // // 窗口退出最大化时
  // ipcMain.on('unmaximize',function(){
  //   win.webContents.send('window-types',0)
  // })

}

// Quit when all windows are closed.
app.on('window-all-closed', () => {
  // On macOS it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (win === null) {
    createWindow()
  }
})

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', async () => {
  if (isDevelopment && !process.env.IS_TEST) {
    // Install Vue Devtools
    // Devtools extensions are broken in Electron 6.0.0 and greater
    // See https://github.com/nklayman/vue-cli-plugin-electron-builder/issues/378 for more info
    // Electron will not launch with Devtools extensions installed on Windows 10 with dark mode
    // If you are not using Windows 10 dark mode, you may uncomment these lines
    // In addition, if the linked issue is closed, you can upgrade electron and uncomment these lines
    // try {
    //   await installVueDevtools()
    // } catch (e) {
    //   console.error('Vue Devtools failed to install:', e.toString())
    // }

  }
  createWindow()

  

})

// Exit cleanly on request from parent process in development mode.
if (isDevelopment) {
  if (process.platform === 'win32') {
    process.on('message', data => {
      if (data === 'graceful-exit') {
        app.quit()
      }
    })
  } else {
    process.on('SIGTERM', () => {
      app.quit()
    })
  }
}
