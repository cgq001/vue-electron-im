<template>
    <div class="home">
        <!-- 主题侧边栏 -->
        <div class="home-adide">
            <Adides />
        </div>
        <!-- 主题 -->
        <div class="home-main">
            <div class="home-main-title">
                <div class="home-main-title-left"></div>
                <div class="home-main-title-list tagWindow" @click="minWindow">
                    <minIcon class="home-main-title-list-icon"  />
                </div>
                <div class="home-main-title-list tagWindow" @click="tagWindow">
                    <maxIcon class="home-main-title-list-icon"  />
                    <!-- <reductionIcon class="home-main-title-list-icon" @click="tagWindow" /> -->
                </div>
                <div class="home-main-title-list closeWindow" @click="closeWindow" >
                    <closeIcon class="home-main-title-list-icon" />
                </div>
            </div>
            <router-view class="home-main-centent">
                
            </router-view>
        </div>
    </div>
</template>

<script>
import Adides from '../../components/home/Aside'
import minIcon from '../../assets/image/icon/minIcon.svg'
import maxIcon from '../../assets/image/icon/maxIcon.svg'
import reductionIcon from '../../assets/image/icon/reductionIcon.svg'
import closeIcon from '../../assets/image/icon/closeIcon.svg'

export default {
    data(){
        return {
            windowScreen:{
                width: 1250,  // 窗口宽  850
                height: 620, // 高
                moves: true // 是否可缩放
            }
        }
    },
    created(){
        this.reSizeScreen()
        if(this.JIM.isLogin()){
            this.infoConversation()
            this.infoFriend()
            this.infoMessage()
            this.onSyncConversation()
            // this.onUserInfUpdate()
            // this.onMutiUnreadMsgUpdate()
            // this.onEventNotification()
        }
    },
    mounted(){
        //监听最大化或者还原
        this.$electron.ipcRenderer.on('window-types',function(event,data){
            //  This.showMax = data
            // console.log(event,data)
        })
         if(this.JIM.isLogin()){
            this.onUserInfUpdate()
            this.onMutiUnreadMsgUpdate()
            this.onEventNotification()
            this.onDisconnect()
        }
    },
    methods:{
        // 改变窗口到指定大小
        reSizeScreen(){
             // 控制窗口大小
            this.$electron.ipcRenderer.send('reSizeScreen',this.windowScreen) 

            // 渲染进程改变窗口大小
            // this.$electron.remote.getCurrentWindow().setSize(280, 410)
        },
        // 最小化
        minWindow(){
            this.$electron.ipcRenderer.send('window-min') 
        },
        // 关闭
        closeWindow(){
            this.$electron.ipcRenderer.send('window-close') 
        },
        // 切换
        tagWindow(){
            this.$electron.ipcRenderer.send('window-tag') 
        },
         // 获取回话列表
        infoConversation(This=this){
                // let This = this
                  This.JIM.getConversation().onSuccess(function(data) {
                         console.log(data.conversations)
                        if(data.code == 0 && data.conversations && data.conversations.length > 0){
                        This.$store.commit('user/setConversations',data.conversations)
                   }
                    }).onFail(function(data) {
                        //data.code 返回码
                        //data.message 描述
                    });

                
        },
        // 获取好友列表
        infoFriend(){
                let This = this
               this.JIM.getFriendList().onSuccess(function(data) {
                   if(data.code == 0 && data.friend_list && data.friend_list.length > 0){
                       console.log(data.friend_list)
                        This.$store.commit('user/setFriendList',data.friend_list)
                   }
               }).onFail(function(data) {
                  
               });
        },
        // 实时消息监听
        infoMessage(){
                let This = this
               this.JIM.onMsgReceive(function(data) {
     
                            if(data.messages && data.messages.length > 0){
                               let conversations = This.$store.state.user.conversations;
                
                                    conversations.map(item=>{

                                        if(item.username == data.messages[0].from_username){
                                            item.mtime = data.messages[0].ctime_ms
                                            item.unread_msg_count = item.unread_msg_count+1
                                        }
                                        return item;
                                    })
                                    This.$store.commit('user/setConversations',conversations)

                                    let isAside = 0
                                    for(let i=0; i< conversations.length; i++){
                                        if(conversations[i].username === data.messages[0].from_username){
                                            isAside = 1
                                        }
                                    }
                                    console.log(isAside)
                                    if(isAside === 0){
                                        This.infoConversation()
                                    }

                                This.$store.commit('user/setMsgReceiveList',data.messages[0])


                            }
                    })
                    

        },
        // 离线消息未读用户监听
        onSyncConversation(){
                let This = this

               this.JIM.onSyncConversation(function(data) {
                   
                   let srcData = data
                   let srcDataArray = []
                  
                        for(let i=0; i< srcData.length; i++){
                            
                            
                            for(let j=0; j< srcData[i].msgs.length ; j++){
                                srcDataArray.push(srcData[i].msgs[j])
                            }
                        }
                        // console.log(srcDataArray)
                        if(srcDataArray.length > 0){
                            This.$store.commit('user/setMsgReceiveListArray',srcDataArray)
                        }
                        
                });
        },
        // 用户信息变更监听
        onUserInfUpdate(){
            console.log('用户信息变更监听2')
            this.JIM.onUserInfUpdate(function(data) {
                console.log('用户信息变更监听3')
                console.log(JSON.parse(data))
            });
        },
        // 未读回话数变更
        onMutiUnreadMsgUpdate(){
           let This = this
           
            This.JIM.onMutiUnreadMsgUpdate(function(data) {
                console.log('未读回话数变更')
                console.log(data)
            })
       
        },
        // 断线监听
        onDisconnect(){
            let This = this
            this.JIM.onDisconnect(function(){
                This.$router.push('/login')
            });
        },
         
        // 事件监听
        onEventNotification(){
            
            let This = this
             this.JIM.onEventNotification(function(data) {
                  console.log('事件监听')
                    console.log(data)
                    if(data.event_type === 5){
                        data.stateType = 1 // 1 接到申请  2 同意  3 拒绝 4 删除
                        This.$store.commit('user/setAddUserList',data)

                        if(data.extra === 1){
                            This.$notify.info({
                                title: '消息',
                                message: '你有新的好友申请'
                            });
                        }else{
                            if(data.return_code === 0){
                                 This.$notify({
                                    title: '成功',
                                    message: data.from_nickname + '通过了你的好友请求',
                                    type: 'success'
                                    });
                                This.infoFriend()
                            }else{
                                 This.$notify.error({
                                        title: '失败',
                                        message: data.from_nickname + '拒绝了你的好友请求'
                                    });
                            }
                        } 
                    }

                    if(data.event_type === 1 || data.event_type === 2){
                        let msg = data.event_type === 1 ?  '你的账号在其他地方登陆,重新登陆或退出?' : '你的密码已修改,重新登陆或退出?'
                        This.$confirm(msg, '提示', {
                                confirmButtonText: '重新登陆',
                                cancelButtonText: '退出',
                            type: 'warning'
                            }).then(() => {
                                This.$router.push('/login')
                            }).catch(() => {
                                    //  退出应用
                                This.$router.push('/login')
                            });
                    }
                });
        },
        
    },
    components:{
        Adides,
        minIcon,
        maxIcon,
        reductionIcon,
        closeIcon
    }
}
</script>

<style scoped>
.home{
    width: 100%;
    height: 100%;
    display: flex;
}
.home-adide{
    width: 60px;
    height: 100%;
    background-image: linear-gradient(#536081,#2E384E);
}
.home-main{
    width: calc(100% - 60px);
    height: 100%;
    border-top: 1px solid #DEE0E3;
    border-bottom: 1px solid #DEE0E3;
    border-right: 1px solid #DEE0E3;
    box-sizing: border-box;
}
.home-main-title{
    width: 100%;
    height: 25px;
    border-bottom: 1px solid #EEEFF1;
    box-sizing: border-box;
    display: flex;
    justify-content: flex-end;
}
.home-main-title-left{
    flex: 1;
    -webkit-app-region: drag;
}
.home-main-title-list{
    width: 35px;
    height: 24px;
    display: flex;
    justify-content: center;
    align-items: center;
}
.home-main-title-list-icon{
    width: 10px;
    height: 10px;
    fill: currentColor;  
    color: #000000;
}
.home-main-centent{
    width: 100%;
    height: calc(100% - 25px);
    overflow: hidden;
}

.closeWindow:hover{
    color: #ffffff;
    background: #FE2121;
}
.tagWindow:hover{
    background: #DCD9D9;
}
</style>