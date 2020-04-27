## 前言
IM 聊天软件需要截图功能。我们找到了一个方法，微信 dll，包装一下生成 exe 文件，我用 Node.js 去调用完成截图。

1. 第一步先用 Node 执行微信封装的 exe，然后会把截图复制到剪切板
2. 然后调用浏览把剪切板的内容复制出来
```
    var screen_window = execFile(__dirname + '/screen/PrintScr.exe')
    screen_window.on('exit', function (code) {
      // 执行成功返回 1，返回 0 没有截图
      if (code) mainWindow.webContents.paste()
    })
```

截图软件 Git 地址: https://github.com/liangtongzhuo/electron_screenshot

## 创建一个新的electron项目，把下方代码复制带main.js
```javascript
// Modules to control application life and create native browser window
const {app, BrowserWindow} = require('electron')
const path = require('path')
const {globalShortcut} = require('electron');
const {execFile} = require('child_process');
const isDevelopment = process.env.NODE_ENV !== "production";
// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow
 
function createWindow() {
  // Create the browser window.
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js')
    }
  })
 
  // and load the index.html of the app.
  mainWindow.loadFile('index.html')
 
  // Open the DevTools.
  // mainWindow.webContents.openDevTools()
 
  // Emitted when the window is closed.
  mainWindow.on('closed', function () {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    mainWindow = null
  })
  globalShortcut.register('CommandOrControl+Alt+h', function () {
    console.log('111111111111111111111')
    screenWindow();
 
  });
}
 
// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow)
 
// Quit when all windows are closed.
app.on('window-all-closed', function () {
  // On macOS it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') app.quit()
})
 
app.on('activate', function () {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (mainWindow === null) createWindow()
})
// 快捷键模块
 
 
//
// // 加载子进程
//
 
//
// // 截图方法
//
let screenWindow = () => {
  console.log('__dirname', __dirname)
  let url = path.resolve(__dirname, "../extraResources/PrintScr.exe");
  if (isDevelopment && !process.env.IS_TEST) {
    // 生产环境
    let url = path.join(__dirname, '/qq/PrintScr.exe');
  }
 
  let screen_window = execFile(url);
  // console.log(screen_window)
  screen_window.on('exit', (code) => {
    console.log('jinlaile')
    mainWindow.restore();
    if (code) console.log(code)
  })
}
// // 添加快捷键
 
//    globalShortcut.register('CommandOrControl+Alt+L', function () {
//     screenWindow();
//
// });
 
 
// 退出electron的时候一定要删除快捷键
 
//globalShortcut.unregisterAll()
// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.
```
## 打包配置
```javascript

 extraResources: [
          {
            from: "./qq/PrintScr.exe", // 文件源路径
            to: "./extraResources/PrintScr.exe" // 打包后要放的路径
          },
          {
            from: "./qq/PrScrn.dll",
            to: "./extraResources/PrScrn.dll"
          }

```