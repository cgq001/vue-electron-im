const path = require('path')
var cp = require("child_process");
module.exports ={
    // 截屏
     screenWindow : (event,win,type) => {
        // console.log('__dirname', __dirname)
        let url = path.resolve(__dirname, "../screen/PrintScr.exe");
       
        let screen_window = cp.execFile(url);
        screen_window.on('exit', (code) => {
         
          // win.restore();
        //   code  == 1 是 对号
        if(type === 1){
          if (code === 1 || code === 2){
            event.sender.send('exitCutScreen',code)
          }
        }else{
          win.webContents.send('exitCutScreen',code)
        }
          
        })
    }
      
}