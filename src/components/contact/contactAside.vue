<template>
    <div class="messageAside">
        <!-- 搜索 -->
        <div class="messageAside-search">
            <div class="messageAside-search-input">
                <div class="messageAside-search-input-left">
                   <magnifierIcon class="messageAside-search-input-left-icon" />
                   <span class="messageAside-search-input-left-tetx">搜索</span>
                </div>
                <!-- <addIcon class="messageAside-search-input-right" /> -->
            </div>
        </div>
        <!-- 列表 -->
        <div class="messageAside-box">
            <vue-scroll :ops="ops" class="char-box">
                <div class="messageAside-box-name">新的朋友</div>
                <div class="messageAside-box-list" @click="setType(1)">
                    <div class="messageAside-box-list-addFriendIcon">
                        <addFriendIcon class="messageAside-box-list-addFriendIcon-icon" />
                    </div>
                    <div class="messageAside-box-list-news">
                        新的朋友
                    </div>
                </div>
                <el-divider></el-divider>
                <div class="messageAside-box-name">好友</div>
                <div class="messageAside-box-list messageAside-box-list-active" @click="setUsers(index)" v-for="(item,index) in friend_listArray" :key="item.username">
                   
                    <div class="messageAside-box-list-img">
                        <img src="../../assets/image/header/header.png" :alt="imageSrcSend(item.avatar,item.mtime)" :ref="item.mtime" />
                    </div>
                    <div class="messageAside-box-list-news">
                       {{item.nickname}}
                    </div>
                </div>
               
            </vue-scroll>
        </div>
    </div>
</template>

<script>
import addIcon from '../../assets/image/icon/addIcon.svg'
import magnifierIcon from '../../assets/image/icon/magnifierIcon.svg'
import addFriendIcon from '../../assets/image/icon/addFriendIcon.svg'
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
                    scrollingX: false
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
            friend_listArray: []  // 好友列表
        }
    },
    created(){
        
    },
    methods:{
        setType(num){
            this.$emit('setType',num)
        },
        setUsers(num){
            this.$emit('setUsers',num)
        },
        imageSrcSend(num,source){
          let This = this
          new Promise((resolve,reject)=>{
                this.JIM.getResource({
                 'media_id' :num,
               }).onSuccess(data=>{
                 
                This.$refs[source].src = data.url
               })
            })
        }
    },
    computed:{
        friend_list(){
            return this.$store.state.user.friend_list
        }
    },
    watch:{
        friend_list:{
            handler(news,olds){
                this.friend_listArray = news
            },
            deep: true,
            immediate: true
        }
    },
    components:{
        addIcon,
        magnifierIcon,
        addFriendIcon
    }
}
</script>
<style>
.el-divider--horizontal{
    margin: 5px 0;
}
</style>
<style scoped>
.messageAside{
    width: 100%;
    height: 100%;
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
    transition: all 0.5s;
}
.messageAside-search-input-left:hover{
    border-color: #2183FD;
    color: #2183FD !important;
}
.messageAside-search-input-left:hover .messageAside-search-input-left-tetx{
    color: #2183FD;
}
.messageAside-search-input-left:hover .messageAside-search-input-left-icon{
    color: #2183FD;
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
.messageAside-search-input-right:hover{
    color: #2183FD;
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
    fill: currentColor;
    color: #70767E;
}
/* 聊天列表 */
.messageAside-box{
    width: 100%;
    height: calc(100% - 70px);
}
.char-box{
    width: 100%;
    height: 100%;
}
.messageAside-box-name{
    width: 100%;
    padding-left: 10px;
    box-sizing: border-box;
    height: 30px;
    line-height: 30px;
    color: #999999;
    font-size: 12px;
    /* background: brown; */
}
.messageAside-box-list{
    width: 100%;
    height: 60px;
   
    /* padding-top: 10px; */
    box-sizing: border-box;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    align-content: center;
    cursor: pointer;
}
.messageAside-box-list-addFriendIcon{
    width: 34px;
    height: 34px;
    background: #FA9D3B;
    border-radius: 3px;
    fill: currentColor;
    color: #ffffff;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-left: 10px;
    margin-right: 10px;
}
.messageAside-box-list-addFriendIcon-icon{
    width: 26px;
    height: 26px;
}
.messageAside-box-list-active{
    background: #EFF0F1;
  
}
.messageAside-box-list-img{
    width: 34px;
    height: 34px;
    margin-left: 10px;
    /* overflow: hidden; */
   
    background: #ffffff;
    margin-right: 10px;
    box-sizing: border-box;
}
.messageAside-box-list-img img{
    width: 34px;
    height: 34px;
    border-radius: 10%;
}
.messageAside-box-list-news{
    flex: 1;
    height: 34px;
    padding-right: 15px;
    box-sizing: border-box;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
    line-height: 34px;
    font-size: 14px;
}

</style>