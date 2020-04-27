<template>
    <div class="chat">
        <div class="chat-box" v-if="paramsId.username && paramsId.username != undefined">
            <div class="chat-title">
                <div class="chat-title-image">
                    <img src="../../assets/image/header/header.png" ref="avatar" />
                </div>
                <div class="chat-title-head">
                    {{nickName}}
                </div>
            </div>
            <!-- 内容展示区域 -->
            <!-- <div class="chat-list">
                5454542121
            </div> -->
            <vue-scroll :ops="ops" class="char-box"  @handle-resize="handleResize" ref="messageList"  @handle-scroll="handleScroll">
                <div class="chat-list">
                    <div  v-for="item in messageList" :key="item._id">
                        <chatDetailsLeft :item='item' v-if="item.content.from_id === paramsId.username" :id="item._id" :userImage='userImage' />

                        <chatDetailsRight v-else :item='item' :id="item._id" />
                    </div>
                   
                </div>
            </vue-scroll>
            <!-- 聊天输入区域 -->
            <div class="chat-Input">
                <div class="chat-Input-head">
                    <el-tooltip class="item" effect="dark" content="表情" placement="top">
                        <expressionIcon class="chat-Input-head-icon" />
                    </el-tooltip>
                    <el-tooltip class="item" effect="dark" content="文件" placement="top">
                        <fileIcon class="chat-Input-head-icon" />
                    </el-tooltip>
                    <!-- <el-tooltip class="item" effect="dark" content="图片" for='fill' placement="top" @click="clickImage"> -->
                    <label class="chat-Input-head-icon-images" for="fill">
                        <input class="chat-Input-head-icon-images-input" type="file" id="fill" accept="image/jpg,image/jpeg,image/png,image/PNG" @change="clickImage" />
                        <imageIcon class="chat-Input-head-icon" />
                    </label>
                    <!-- </el-tooltip> -->
                    <el-tooltip class="item" effect="dark" content="截图(shift+alt+A)" placement="top">
                        <cutIcon class="chat-Input-head-icon" @click="cutStart" />
                    </el-tooltip>
                    <el-tooltip class="item" effect="dark" content="商品" placement="top">
                        <commodityIcon class="chat-Input-head-icon" />
                    </el-tooltip>
                </div>
                <vue-scroll :ops="ops" class="chat-Input-boxs">
                    <div class="chat-Input-message"  :contenteditable="true" ref="textMessage" @keyup.enter="submitText">
                        
                    </div>
                </vue-scroll>
            
                <div class="chat-Input-submit">
                    <el-button size="mini" @click="submitText" :disabled='disabled'>发送</el-button>
                </div>
            </div>
            <!-- 发送剪切板的图片 -->
            <el-dialog
                title="发送图片"
                :visible.sync="imageShows"
                :lock-scroll="false"
                width="500px"
                >
                <div class="imageShows-box">
                    <img :src="imageSrc" />
                </div>
                <span slot="footer" class="dialog-footer">
                    <el-button @click="imageShows = false"  size="mini">取 消</el-button>
                    <el-button type="primary" @click="submitImage"  size="mini" :disabled='disabled'>发  送</el-button>
                </span>
            </el-dialog>
        </div>
        <div class="chat-empty" v-else>
            <emptyIcon class="chat-empty-emptyIcon" />
        </div>
    </div>
</template>

<script>
import expressionIcon from  '../../assets/image/icon/expressionIcon.svg'
import fileIcon from  '../../assets/image/icon/fileIcon.svg'
import imageIcon from  '../../assets/image/icon/imageIcon.svg'
import commodityIcon from  '../../assets/image/icon/commodityIcon.svg'
import cutIcon from  '../../assets/image/icon/cutIcon.svg'
import emptyIcon from '../../assets/image/icon/emptyIcon.svg'

import chatDetailsLeft from '../../components/chat/detailsLeft'
import chatDetailsRight from '../../components/chat/detailsRight'

const path = require('path');

// var Datastore = require('nedb'),
//     db = new Datastore({ filename: './message.db', autoload: true });
import dbSql from '../../assets/sql/message'


import userImages from '../../assets/image/header/header.png'


export default {
    data(){
        return {
            ops: {
                vuescroll: {
                     mode: 'native',
                     sizeStrategy: "percent",
                     detectResize: true
                },
                scrollPanel: {
                    initialScrollY: '100%',
                    scrollingX: false,
                    speed: 300,
                },
                rail: {
                    opacity:0,
                    keepShow: true
                },
                bar: {
                    background: '#DDDFE1',
                    opacity: 0.7,
                    keepShow:true,
                }
            },
            imageShows: false,
            imageSrc: '',
            paramsId: {},
            messageList:[],
            disabled: false,
            loading: false , // 是否在加载更多数据
            isMessage: true , // 是否还有更多数据
            page: 1, //当前页码
            isScrollBottom: true ,// 是否滚动到底部
            scrollId: 0,
            nickName: null,
            userImage: userImages
        }
    },
    methods:{
        // 当滚动区域内容高度发送改变时
        handleResize(){
            // console.log('高度变了')
            if(this.isScrollBottom){
                this.$refs['messageList'].scrollTo(
                        {
                            y: '100%'
                        },
                        500
                    );
            }
          
            
        },
        // 当页面滚动时
        handleScroll(vertical, horizontal, nativeEvent){
           let This = this
        //    console.log(This.isMessage,This.loading)
            if(This.isMessage && !This.loading && vertical.scrollTop < 50){
                This.loading = true
                console.log('页面滚动了')
                 This.infoMessage(This.page,20)
                 
                // console.log(This.loading)
            }
        },
        // 截屏
        cutStart(){
           this.$electron.ipcRenderer.send('cutScreen') 
        },
        // 当页面参数发生改变时执行
        infoChat(){
           
            // this.JIM.updateConversation({
            //     'appkey' : this.paramsId.appkey,
            //     'username' : this.paramsId.username
            //    })
            let This = this
             This.messageList = []

            if(this.$route.query.username){
                    //  console.log(this.$route.query.username)
                    This.messageList = []
                    This.infoMessage(This.page,20)
                    This.setNewInfoed(This)
                }
        },
        // 查询该用户的消息
        infoMessage(page,pageSize){
           
            let num = (page-1)*pageSize
            let This = this
                // console.log('查询数据库', this.$route.query.username,this.$store.state.user.userInfo.username)
                // dbSql.find({from_username : this.$route.query.username}, function (err, docs) {
                       
                //        console.log(docs)
                //         This.messageList.unshift(...docs)
                //          console.log(This.messageList)
                //     });  {'content.target_id' : this.$route.query.username}
                if(page === 1){
                    this.isScrollBottom = true
                }else{
                    this.isScrollBottom = false
                }
                // console.log( This.$message) // dbSql
                // this.$store.state.user.message
                dbSql.find({$or: [{ 'content.target_id' : this.$route.query.username , 'content.from_id' : this.$store.state.user.userInfo.username }, { 'content.target_id' : this.$store.state.user.userInfo.username , 'content.from_id' : this.$route.query.username  }]}).sort({ ctime_ms: -1  }).skip(num).limit(pageSize).exec(function (err, docs) {
                       
                       
                       
                        This.page = page + 1
                        if(docs && docs.length < pageSize){
                            This.isMessage = false
                        }else{
                            This.isMessage = true
                        }
                        This.loading = false
                        let doceLimt= docs.reverse()
                        This.scrollId = doceLimt[doceLimt.length-1]._id
                        
                        if(page === 1){
                            // This.messageList.unshift(...docs.reverse())
                          
                            This.messageList=doceLimt
                            
                        }else{
                            This.messageList = [...doceLimt,...This.messageList]
                        }
                        
                        
                    });
                this.resetUnreadCount()
            // db.find({ from_username: this.paramsId.username }).sort({ ctime_ms: -1 }).skip(num).limit(pageSize).exec(function (err, docs) {

            //             console.log(docs)
            //              This.messageList.shift([...docs])

            //              console.log(This.messageList)
            //         });
        },
        // 发送文本消息
        submitText(){
          
            let innerText = this.$refs.textMessage.innerText
                innerText = innerText.trim()
                if(!innerText || innerText.length<1){
                    return false;
                }

           this.disabled = true
           this.isScrollBottom = true
            let messageJson = {
                target_username: this.$route.query.username,
                content: this.$refs.textMessage.innerText,
                target_nickname: '', //接受者备注名
                no_offline: true, // 是否保存离线消息
            }
            let This = this
             this.JIM.sendSingleMsg(messageJson)
                .onSuccess(function(data , msg) {
                    msg.ctime_ms = msg.content.create_time
                     console.log(msg)
                    This.$store.commit('user/setMsgReceiveList',msg)
                    This.messageList.push(msg)
                    This.disabled = false
                    This.$refs.textMessage.innerText = ''
               }).onFail(function(data) {
                    This.disabled = false
                    this.$notify.error({
                            title: '消息状态',
                            message: '消息发送失败'
                            });
               });
        },
        // 发送图片
        submitImage(){
            this.disabled = true
            this.isScrollBottom = true

            var bytes = window.atob(this.imageSrc.split(',')[1]);
            var array = [];
                for(var i = 0; i < bytes.length; i++){
                    array.push(bytes.charCodeAt(i));
                }
                var blob = new Blob([new Uint8Array(array)], {type: 'image/jpeg'});
                var fd = new FormData();
                fd.append('file',blob, Date.now() + '.jpg');

                //  console.log(fd)
                  let messageJson = {
                            target_username: this.$route.query.username,
                            image: fd,
                            target_nickname: '', //接受者备注名
                            no_offline: true, // 是否保存离线消息
                        }
                        // console.log(messageJson)
                let This = this
                  this.JIM.sendSinglePic(messageJson)
                        .onSuccess(function(data , msg) {
                                msg.ctime_ms = msg.content.create_time
                                // console.log(msg)
                                This.$store.commit('user/setMsgReceiveList',msg)
                                This.messageList.push(msg)
                                This.disabled = false
                                This.imageShows = false
                            }).onFail(function(data) {
                                This.disabled = false
                                This.imageShows = false
                                this.$notify.error({
                                    title: '消息状态',
                                    message: '图片发送失败'
                                    });
                            });
        },
        // 重置回话未读数
        resetUnreadCount(){
               this.JIM.resetUnreadCount({
                            'username' : this.$route.query.username
                           });
        },
        // 点击 图标 发送图标
        clickImage(){
            console.log('山川')
            let This = this
            let f = document.getElementById('fill').files[0];
             console.log(f.size) //500956  489 
             if((f.size / (1024*1024)) < 5){
                 console.log('小于5M')
                  const reader = new FileReader();
                reader.onload = function (ev) {
                    // base64码
                //     var imgFile =ev.target.result;//或e.target都是一样的
                //    console.log(ev.target.result);
                   This.imageSrc = ev.target.result
                   This.imageShows = true
                }
                //发起异步读取文件请求，读取结果为data:url的字符串形式，
                reader.readAsDataURL(f);

             }else{
                 console.log('大于5M')
                 // 生成一个文件读取的对象
                this.$notify.error({
                        title: '错误',
                        message: '发送图片不得大于5MB'
                        });
                
             }
        },
        // 更新回话列表红点
        setNewInfoed(This){
             let conversations = This.$store.state.user.conversations;
              conversations.map(item=>{

                    if(item.username == This.$route.query.username){
                        item.unread_msg_count = 0
                    }
                    return item;
                })
                This.$store.commit('user/setConversations',conversations)
        },
        userInfos(){
            let conversations = this.$store.state.user.conversations
            let nickName = null
            let avatar = null
            for(let i = 0; i< conversations.length ; i++){
                if(conversations[i].username === this.$route.query.username){
                    nickName = conversations[i].nickName
                    avatar = conversations[i].avatar
                }
            }
            let This = this
            if(avatar){
                this.JIM.getResource({
                    'media_id' :avatar,
                }).onSuccess(data=>{
                    
                    This.$refs.avatar.src = data.url
                    This.userImage = data.url
                })
            }
            

            this.nickName = nickName
        }
    },
    created(){
         console.log(this.$store.state.user.conversations)
         if(this.$route.query.username){
              this.infoMessage(1,20)
              this.setNewInfoed(this)
         }

        this.userInfos()
       
        
    },
    mounted(){
         this.$electron.ipcRenderer.on('exitCutScreen',(event,data)=>{
                if(data === 1){
                    let imageSrc = this.$electron.clipboard.readImage()
                    this.imageSrc  = 'data:image/png;base64,'+(imageSrc.toPNG()).toString('base64');
                    this.imageShows = true
                }
        })
        
    },
    computed:{
        MsgReceiveList(){
            
            return this.$store.state.user.MsgReceiveListSrc
        }
    },
    watch:{
        $route:{
            handler(news,olds){
               
                this.paramsId = this.$route.query
                this.page = 1
                this.infoChat()
                
                this.userInfos()

                // 更新回话消息
                this.isScrollBottom = true
            },
            immediate: true
        },
        MsgReceiveList:{
            handler(news,olds){
               
                if(this.paramsId.username && news.from_username  && news.from_username == this.paramsId.username){
                    console.log('你有新短消息')
                    this.isScrollBottom = true
                    this.messageList.push(this.$store.state.user.MsgReceiveListSrc)
                    this.resetUnreadCount()
                    this.setNewInfoed(this)
                //   console.log(this.$store.state.user.MsgReceiveListSrc)
                }
            },
            immediate: true,
            deep: true
        }
    },
    components:{
        expressionIcon,
        fileIcon,
        imageIcon,
        cutIcon,
        commodityIcon,
        chatDetailsLeft,
        chatDetailsRight,
        emptyIcon
    }
}
</script>
<style scoped>
.chat{
    width: 100%;
    height: 100%;
    min-width: 630px;
}
.chat-box{
    width: 100%;
    height: 100%;
}
.chat-empty{
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
}
.chat-empty-emptyIcon{
    width: 50px;
    height: 50px;
    margin: 100px auto;
}
.chat-title{
    width: 100%;
    height: 62px;
    border-bottom: 1px solid #DEE0E3;
    padding: 0 40px 0 20px;
    box-sizing: border-box;
    display: flex;
    justify-content: space-between;
    align-items: center;
}
.chat-title-image{
    width: 36px;
    height: 36px;
    border-radius: 50%;
    background: #0E94FC;
}
.chat-title-image img{
    width: 100%;
    height: 100%;
}
.chat-title-head{
    flex: 1;
    height: 40px;
    font-size: 22px;
    line-height: 40px;
    color: #1F2329;
    padding-left: 5px;
    box-sizing: border-box;
}
/* 聊天内容展示区域 */
.char-box{
    width: 100%;
    background: #f7f7f7;
    height: calc(100% - 225px) !important;
}
.chat-list{
    width: 100%;
    padding: 10px 20px;
    box-sizing: border-box;
   
}
.chat-list-lis{
    width: 100%;
    height: 100px;
    margin-bottom: 10px;
    background: chocolate;
}
/* 聊天输入区域 */
.chat-Input{
    width: 100%;
    height: 160px;
    padding: 10px 20px;
    box-sizing: border-box;
    border-top: 1px solid #DEE0E3;
}
.chat-Input-head{
    width: 100%;
    height: 30px;
    display: flex;
    justify-content: flex-start;
    /* align-items: center; */
    /* background: brown; */
}
.chat-Input-head-icon-images{
    width: 20px;
    height: 20px;
    overflow: hidden;
    position: relative;
    margin-right: 15px;
}
.chat-Input-head-icon-images-input{
    width: 20px;
    height: 20px;
    position: absolute;
    bottom: 50px;;
}
.chat-Input-head-icon{
    width: 20px;
    height: 20px;
    margin-right: 15px;
    fill: currentColor;
    color: #82868C;
    cursor: pointer;
}
.chat-Input-head-icon:hover{
    color: #6C727B;
}
.chat-Input-boxs{
    width: 100%;
    height: 75px!important;
  
}
.chat-Input-message{
    width: 100%;
    /* height: 75px; */
    height: auto;
    line-height: 25px;
    font-size: 16px;
    color: #1F2329;
    overflow: hidden;
    border: none;
    border-color: transparent;
    padding-right: 15px;
    box-sizing: border-box;
}
.chat-Input-message[contenteditable]:focus{outline: none;}
/* .chat-Input-message:focus{
    border-color: transparent !important;
    border: none !important;
} */
.chat-Input-submit{
    width: 100%;
    height: 35px;
    display: flex;
    justify-content: flex-end;
    align-items: center;
}

/* 截屏发送的区域 */
.imageShows-box{
    border: 1px solid #DEE0E3;
    border-radius: 5px;
    padding: 10px;
    box-sizing: border-box;
    min-height: 200px;
    width: 450px;
    height: 250px;
}
.imageShows-box img{
    width: 100%;
    max-height: 100%;
}
</style>