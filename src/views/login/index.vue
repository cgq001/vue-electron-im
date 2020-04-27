<template>
<!-- 登录页 -->
    <div class="login"
        v-loading="loading"
        :customClass='loginLoading'
        element-loading-text="登录中..."
        element-loading-spinner="el-icon-loading"
        element-loading-background="rgba(0, 0, 0, 0.8)"
    >

            <div class="login-title">
                <div class="login-title-left">

                </div>
                <div class="login-title-right">
                    <div class="login-title-right-minBox" @click="minWindow">
                        <minIcon class="login-title-right-min"  />
                    </div>
                    <div class="login-title-right-closeBox"  @click="quitWindows">
                        <closeIcon class="login-title-right-close" />
                    </div>
                    
                </div>
            </div>
            <fromLogin @loadingTag='loadingTag' />
    </div>
</template>

<script>
import minIcon from '@/assets/image/icon/minIcon.svg'  //最小化按钮
import closeIcon from '@/assets/image/icon/closeIcon.svg' //关闭按钮

import fromLogin from '@/components/login/fromLogin.vue' // 用户 密码登录



export default {
    data(){
        return {
            loading: false,
            loginLoading:'loginLoading',
            windowScreen:{
                width: 280,  // 窗口宽
                height: 410, // 高
                moves: true // 是否可缩放
            }
        }
    },
    created(){
        this.reSizeScreen()
    },
    mounted(){
        // console.log(md5('15641'))
        
    },
    methods:{
        // 切换登录状态
        loadingTag(data){
            this.loading = data
        },
        // 退出
        quitWindows(){
            this.$electron.ipcRenderer.send('window-quit') 
        },
        // 最小化
        minWindow(){
            this.$electron.ipcRenderer.send('window-min') 
        },
        reSizeScreen(){
             // 控制窗口大小
            this.$electron.ipcRenderer.send('reSizeScreen',this.windowScreen) 

            // 渲染进程改变窗口大小
            // this.$electron.remote.getCurrentWindow().setSize(280, 410)
        }
    },
    components:{
        minIcon,
        closeIcon,
        fromLogin
    }
}
</script>
<style>
.login .el-loading-spinner{
    display: flex;
    justify-content: center;
}
.login .el-loading-spinner i{
    color: transparent!important;
    width: 0 !important;
    height: 0 !important;
}
.login .el-loading-spinner .el-loading-text{
    color: #ffffff!important;
    width: 120px;
    height: 50px;
    background: #44BA84;
    text-align: center;
    line-height: 50px;
    border-radius: 5px;
}
</style>
<style scoped>
.login{
    width: 100%;
    height: 100%;
    padding: 0 10px 10px;
    box-sizing: border-box;
    -webkit-user-select: none;
}
.login-title{
    width: 100%;
    height: 27px;
    /* background: yellow; */
    display: flex;
    justify-content: space-between;
    margin-bottom: 10px;
}
.login-title-left{
    flex: 1;
    -webkit-app-region: drag;
}
.login-title-right{
    width: 100px;
    height: 27px;
    /* background: #08CEFB; */
    display: flex;
    justify-content: flex-end;
    align-items: center;
}
.login-title-right-minBox{
    width: 27px;
    height: 27px;
    display: flex;
    justify-content: center;
    align-items: center;
}
.login-title-right-minBox:hover{
    background: #DDDCDC;
}
.login-title-right-min{
    color: #8B8C91;
    
    width: 12px;
    height: 12px;
    fill: currentColor;  
}
.login-title-right-closeBox{
    width: 27px;
    height: 27px;
    display: flex;
    justify-content: center;
    align-items: center;
}
.login-title-right-closeBox:hover{
    background: #FC1D1D;
    color: #ffffff;
}
.login-title-right-closeBox:hover .login-title-right-close{
    color: #ffffff;
}
.login-title-right-close{
    color: #8B8C91;
    width: 10px;
    height: 10px;
    fill: currentColor;  
}
.loginLoading{
    color: #ffffff;
}
</style>