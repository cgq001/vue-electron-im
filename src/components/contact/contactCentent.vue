<template>
    <div class="contactCentent">
        <!-- 头像和签名 -->
        <div class="contactCentent-head">
            <div class="contactCentent-head-box">
                <div class="contactCentent-head-box-left">
                    <div class="contactCentent-head-box-left-name">
                        <div class="contactCentent-head-box-left-name-text">{{friend_listArray[userId].nickname}}</div>

                       
                        <femaleIcon class="contactCentent-head-box-left-name-age-nv" v-if="friend_listArray[userId].gender === 2" />
                         <maleIcon class="contactCentent-head-box-left-name-age" v-else />
                    </div>
                    <div class="contactCentent-head-box-left-signature">
                        {{friend_listArray[userId].signature}}
                    </div>
                </div>
                <div class="contactCentent-head-box-right">
                    <!-- <img src="../../assets/image/header/header.png" /> -->
                    <img src="../../assets/image/header/header.png" :alt="imageSrcSend(friend_listArray[userId].avatar,friend_listArray[userId].item.mtime)" :ref="item.mtime" />
                </div>
            </div>
        </div>
        <!-- 个人信息 -->
        <div class="contactCentent-info">
            <div class="contactCentent-info-box">
                <div class="contactCentent-info-box-list">
                    <div class="contactCentent-info-box-list-left">备 注</div>
                    <div class="contactCentent-info-box-list-right">{{friend_listArray[userId].memo_nam}}</div>
                </div>
                <div class="contactCentent-info-box-list">
                    <div class="contactCentent-info-box-list-left">地  区</div>
                    <div class="contactCentent-info-box-list-right">{{friend_listArray[userId].region}}</div>
                </div>
                <div class="contactCentent-info-box-list">
                    <div class="contactCentent-info-box-list-left">聊 号</div>
                    <div class="contactCentent-info-box-list-right">{{friend_listArray[userId].username}}</div>
                </div>
            </div>
        </div>
        <!-- 发消息 -->
        <div class="contactCentent-submit">
            <div class="contactCentent-submit-text" @click="send(userId)">发消息</div>
        </div>
    </div>
</template>

<script>
// 男
import maleIcon from '../../assets/image/icon/maleIcon.svg'
// 女
import femaleIcon from '../../assets/image/icon/femaleIcon.svg'
export default {
    props:['userId'],
    data(){
        return {
            friend_listArray:[]
        }
    },
    methods:{
        send(userId){
            let This = this
            let username = this.friend_listArray[userId].username

            let conversations = This.$store.state.user.conversations;

            let isAside = 0
                for(let i=0; i< conversations.length; i++){
                    if(conversations[i].username === username){
                        isAside = 1
                    }
                }

            console.log(isAside)

            if(isAside === 1){
                this.$router.push('/index/messageList/chat?username='+username+'&appkey='+This.friend_listArray[userId].appkey)
            }else{
                let src = {
                    appkey: This.friend_listArray[userId].appkey,
                    avatar: This.friend_listArray[userId].avatar,
                    key: This.friend_listArray[userId].mtime,
                    mtime: This.friend_listArray[userId].mtime,
                    name: This.friend_listArray[userId].username,
                    nickName: This.friend_listArray[userId].nickname,
                    type: 3,
                    unread_msg_count: 0,
                    username: This.friend_listArray[userId].username,
                }
                
                This.$store.commit('user/setConversationsPush',conversations)

                this.$router.push('/index/messageList/chat?username='+username+'&appkey='+This.friend_listArray[userId].appkey)

            }
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
                console.log(news)
                this.friend_listArray = news
            },
            deep: true,
            immediate: true
        }
    },
    components:{
        maleIcon,
        femaleIcon
    }
}
</script>

<style scoped>
.contactCentent{
    width: 100%;
    height: 100%;
    background: #F7F7F7;
    padding: 50px 0 0 0;
    min-width: 620px;
}
.contactCentent-head{
    width: 100%;
    height: 130px;
    display: flex;
    justify-content: center;
}
.contactCentent-head-box{
    width: 400px;
    height: 100%;
    border-bottom: 1px solid #E7E7E7;
    display: flex;
    justify-content: space-between;
}
.contactCentent-head-box-left{
    width: 300px;
}
.contactCentent-head-box-right{
    width: 60px;
    height: 100%;
}
.contactCentent-head-box-right img{
    width: 60px;
    height: 60px;
    border-radius: 2px;
    box-sizing: border-box;
}
.contactCentent-head-box-left-name{
    width: 100%;
    font-size: 20px;
    color: #363535;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    margin-bottom: 10px;
}
.contactCentent-head-box-left-name-text{
    max-width: 80%;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
    margin-right: 5px;
}
.contactCentent-head-box-left-name-age{
    width: 16px;
    height: 16px;
    fill: currentColor;
    color: #2581FC;
}
.contactCentent-head-box-left-name-age-nv{
    width: 16px;
    height: 16px;
    fill: currentColor;
    color: #FD19C1;
}
.contactCentent-head-box-left-signature{
    /* background: darkcyan; */
    width: 100%;
    height: 50px;
    line-height: 25px;
    text-overflow: -o-ellipsis-lastline;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    color: #999999;
    font-size: 12px;
}
/* 个人信息 */
.contactCentent-info{
    width: 100%;
    height: auto;
    display: flex;
    justify-content: center;
    /* padding: 15px 0 15px 0; */
    padding-top: 15px;
    padding-bottom: 15px;
    box-sizing: border-box;
}
.contactCentent-info-box{
    width: 400px;
    height: auto;
    border-bottom: 1px solid #E7E7E7;
}
.contactCentent-info-box-list{
    width: 100%;
    height: 30px;
    line-height: 30px;
    display: flex;
    justify-content: flex-start;

}
.contactCentent-info-box-list-left{
    width: 60px;
    height: 100%;
    text-align:justify;
    /* background: darkcyan; */
    color: #999999;
    font-size: 13px;
    margin-right: 10px;

}
.contactCentent-info-box-list-right{
    flex: 1;
    height: 100%;
    /* background: #EE1A1A; */
    color: #333333;
    font-size: 13px;
}
/* 发消息 */
.contactCentent-submit{
    width: 100%;
    padding-top: 35px;
    box-sizing: border-box;
    display: flex;
    justify-content: center;
}
.contactCentent-submit-text{
    width: 136px;
    height: 38px;
    background: #1AAD19;
    text-align: center;
    line-height: 38px;
    color: #ffffff;
    font-size: 13px;
    cursor: pointer;
}
.contactCentent-submit-text:hover{
    background: #169015;
}
</style>