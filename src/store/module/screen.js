const screen = {
    namespaced: true,
    state: { 
        // 屏幕大小
        screen:{
            width: 290,
            height: 410
        },
        // 禁止主窗口 改变大小
        resizable: true
    },
    mutations: { 
        tagScreen(state,src){
            state.screen = src
        }
    },
    actions: { 
        
    },
    getters: { 
        
     }
  }

  export default screen;