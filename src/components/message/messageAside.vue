<template>
    <div class="messageAside">
        <!-- 搜索 -->
        <div class="messageAside-search">
            <div class="messageAside-search-input">
                <div class="messageAside-search-input-left">
                   <magnifierIcon class="messageAside-search-input-left-icon" />
                   <span class="messageAside-search-input-left-tetx">搜索</span>
                </div>
                <addIcon class="messageAside-search-input-right"  @click="addFinedShow=true" />
            </div>
        </div>
        <!-- 列表 -->
        <div class="messageAside-box">
            <div class="messageAside-box-list" :class="$route.query.username === item.username ? 'messageAside-box-list-active' : '' " v-for="item in conversations" :key="item.name" @click="$router.push('/index/messageList/chat?username='+item.username+'&appkey='+item.appkey)">
                <div class="messageAside-box-list-img">
                    <el-badge is-dot class="item" v-if="item.unread_msg_count && item.unread_msg_count > 0">
                         <img src="../../assets/image/header/header.png" :alt="imageSrcSend(item.avatar,item.username)" :ref="item.username"  />
                       

                    </el-badge>
                    <!-- <img v-else src="../../assets/image/header/header.png" /> -->
                    <img v-else src="../../assets/image/header/header.png" :alt="imageSrcSend(item.avatar,item.username)" :ref="item.username"  />
                </div>
                <div class="messageAside-box-list-news">
                    <div class="messageAside-box-list-news-top">
                        <div class="messageAside-box-list-news-top-left">
                            {{item.nickName}}
                        </div>
                        <div class="messageAside-box-list-news-top-right">
                            {{dat(item.mtime)}}
                        </div>
                    </div>
                    <div class="messageAside-box-list-news-bottom">
                       <!-- 这里是签名{{item.nickName}} -->
                    </div>
                </div>
            </div>
        </div>
        <!-- 弹出层 添加好友 -->
        <el-dialog  :visible.sync="addFinedShow" width='600px' :close-on-click-modal='false' :show-close='false' class="addFinedShow">
            <messageAddUser @closeAddFinedShow='closeAddFinedShow' />
        </el-dialog>
    </div>
</template>

<script>
import addIcon from '../../assets/image/icon/addIcon.svg'
import magnifierIcon from '../../assets/image/icon/magnifierIcon.svg'
import dat from '../../assets/js/day'
import messageAddUser from '../../components/message/messageAdduser'
import headerImage from '../../assets/image/header/header.png'
export default {
    data(){
        return {
            friend_list: [],
            addFinedShow: false,
        }
    },
    components:{
        addIcon,
        magnifierIcon,
        messageAddUser
    },
    created(){
        
        
    },
    methods:{
       dat,
    //    关闭 添加好友弹出层
       closeAddFinedShow(){
            let This = this
            This.addFinedShow = false
       },
       imageSrcSend(num,source){
           if(num){
                new Promise((resolve,reject)=>{
                        this.JIM.getResource({
                        'media_id' :num,
                    }).onSuccess(data=>{
                        console.log(data.url)
                        this.$refs[source].src = data.url
                    })
                })
           }else{
            //    this.$refs[source].src = headerImage
           }
         
        }
    },
    computed:{
        conversations:function(){
            let conversations = this.$store.state.user.conversations
                conversations.sort(function(a,b){
                    return b.mtime - a.mtime
                })
            return conversations
        },
    },
    watch:{
        $route:{
            handler(news,olds){
                console.log(news.query.username)
            }
        }
    }
}
</script>

<style>
.addFinedShow .el-dialog__header{
    display: none;
}
.addFinedShow  .el-dialog__body{
    padding-top: 0;
}
</style>
<style scoped>
.messageAside{
    width: 100%;
    height: auto;
}
.messageAside-search{
    width: 100%;
    height: 62px;
    padding: 15px 14px;
    box-sizing: border-box;
    margin-bottom: 7px;
}
.messageAside-search-input{
    width: 100%;
    height: 32px;
    display: flex;
}
.messageAside-search-input-left{
    /* width: calc(100% - 42px); */
    flex: 1;
    height: 32px;
    border: 1px solid #DEE0E3;
    border-right: 16px;
    box-sizing: border-box;
    border-radius: 16px;
    cursor: pointer;
    padding-left: 10px;
    display: flex;
    justify-content: flex-start;
    align-items: center;
}
.messageAside-search-input-right{
    width: 32px;
    height: 32px;
    fill: currentColor;  
    color: #70767E;
    margin-left: 10px;
    cursor: pointer;
    font-size: 12px;
    color: #8F959E;
}
.messageAside-search-input-left-tetx{
    font-size: 12px;
    line-height: 32px;
    color: #8F959E;
}
.messageAside-search-input-left-icon{
    width: 12px;
    height: 12px;
    margin-right: 6px;
}
/* 聊天列表 */
.messageAside-box{
    width: 100%;
    height: auto;
}
.messageAside-box-list{
    width: 100%;
    height: 60px;
    border-left: 2px solid #ffffff;
    padding-top: 10px;
    box-sizing: border-box;
    display: flex;
    justify-content: flex-start;
    align-content: center;
    cursor: pointer;
}
.messageAside-box-list-active{
    background: #EFF0F1;
    border-left-color: #3370FF;
}
.messageAside-box-list-img{
    width: 34px;
    height: 34px;
    margin-left: 10px;
    
    background: #ffffff;
    margin-right: 10px;
    box-sizing: border-box;
}
.messageAside-box-list-img img{
    width: 34px;
    height: 34px;
    border-radius: 5px;
}
.messageAside-box-list-news{
    flex: 1;
    height: auto;
    padding-right: 15px;
    box-sizing: border-box;
}
.messageAside-box-list-news-top{
    display: flex;
    justify-content: space-between;
}
.messageAside-box-list-news-top-left{
    width: 164px;
    font-size: 14px;
    color: #1F2329;
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
    margin-bottom: 5px;
    /* background: rosybrown; */
}
.messageAside-box-list-news-top-right{
    padding-top: 3px;
    box-sizing: border-box;
    width: 110px;
    font-size: 10px;
    color: #8F959E;
    text-align: right;
    /* background: royalblue; */
}
.messageAside-box-list-news-bottom{
    width: 184px;
    font-size: 12px;
    color: #989DA5;
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
}

</style>