<template>
    <div>
         <div class="addFinedShow-title">
                <div class="addFinedShow-title-left">
                    <leftArrowIcon class="addFinedShow-title-left-icon" v-show="addFinedIndex != 1" @click="goReturn" />
                    <span class="addFinedShow-title-left-text" v-show="addFinedIndex === 1">搜索好友</span>
                    <span class="addFinedShow-title-left-text" v-show="addFinedIndex === 2">好友资料</span>
                    <span class="addFinedShow-title-left-text" v-show="addFinedIndex === 3">添加好友</span>
                </div>
                <div class="addFinedShow-title-right"  @click="closeAddFinedShow" >
                    <closeIcon class="addFinedShow-title-right-icon"/>
                </div>
            </div>
            <div class="addFinedShow-input" v-if="addFinedIndex === 1">
                <el-input class="addFinedShow-input-text" v-model="addUsername" placeholder="请输入好友即聊号"  size="mini" ></el-input>
                <div class="addFinedShow-input-btn">
                    <el-button type="primary" icon="el-icon-search"  size="mini" @click="addFriendSauch">搜索</el-button>
                </div>
            </div>
            <div class="addFinedShow-userInfo" v-if="addFinedIndex === 2">
                <div class="addFinedShow-userInfo-top">
                    <div class="addFinedShow-userInfo-top-left">
                        <div class="addFinedShow-userInfo-top-left-top">
                            <span>昵称:</span>
                            <span>{{addFinedUserInfo.nickname}}</span>
                        </div>
                        <div class="addFinedShow-userInfo-top-left-bottom">
                            <span>既聊:</span>
                            <span>{{addFinedUserInfo.username}}</span>
                        </div>
                    </div>
                    <div class="addFinedShow-userInfo-top-right">
                        
                    </div>
                </div>
                <div class="addFinedShow-userInfo-bottom" @click="sendUser">
                    <addFinedsIcon class="addFinedShow-userInfo-bottom-icon" />
                </div>
            </div>
            <div class="addFinedShow-useradd" v-if="addFinedIndex === 3 ">
                <textarea class="addFinedShow-useradd-input" placeholder="请输入申请好友备注" v-model="messages"></textarea>
                <p class="addFinedShow-useradd-text">你需要发送验证请求,对方通过后,才能添加为相互好友</p>
                <div class="addFinedShow-useradd-submit">

                    <el-button type="success" size="mini" @click="submitFinder" >确定</el-button>
                    <el-button  size="mini" @click="closeAddFinedShow">取消</el-button>
                </div>
            </div>
    </div>
</template>

<script>
import addFinedsIcon from '../../assets/image/icon/addFriendIcon2.svg'
import closeIcon from '../../assets/image/icon/closeIcon.svg'
import leftArrowIcon from '../../assets/image/icon/leftArrowIcon.svg'
import day from '../../assets/js/day'
export default {
    data(){
        return {
           
            addUsername: '',
            addFinedIndex: 1,
            addFinedUserInfo: {},
            messages: ''
        }
    },
     methods:{
       addFriendSauch(){
           let addUsername = this.addUsername.trim()
           console.log(addUsername)
           this.infoUser(this,addUsername)
       },
    //    查询好友资料
       infoUser(This,addUsername){
             This.JIM.getUserInfo({
                'username': addUsername

            }).onSuccess(function(data) {
               
                This.addFinedIndex = 2
                This.addUsername = ''
                This.addFinedUserInfo = data.user_info
            }).onFail(function(data) {
               
                This.addUsername = ''
                This.addFinedIndex = 1
                This.$notify({
                    title: '警告',
                    message: '查询用户不存在',
                    type: 'warning'
                    });
            });
       },
    //    关闭 添加好友弹出层
       closeAddFinedShow(){
            let This = this
            This.addUsername = ''
            This.addFinedIndex = 1
            This.addFinedUserInfo = {}
            this.$emit('closeAddFinedShow')
       },
    //    弹出层 返回
        goReturn(){
            console.log('返回')
            if(this.addFinedIndex == 2){
                this.addFinedIndex = 1
            }else{
                this.addFinedIndex = 2
            }
            console.log(this.addFinedIndex)
        },
    //  添加好友 按钮
        sendUser(){
            this.addFinedIndex = 3
        },
    // 发起请求 添加好友
        submitFinder(){
            let This = this
            this.JIM.addFriend({
                    'target_name' :  this.addFinedUserInfo.username,
                     'why' : this.messages,
               }).onSuccess(function(data) {
                  console.log(data)
                   
                    This.addUsername = ''
                    This.addFinedIndex = 1
                    This.addFinedUserInfo = {}
                    This.$emit('closeAddFinedShow')

                    This.$notify({
                        title: '成功',
                        message: '好友申请发送成功',
                        type: 'success'
                        });
               }).onFail(function(data) {
                   // 同上
               });
        }
    },
    components:{
        leftArrowIcon,
        closeIcon,
        addFinedsIcon
    }
}
</script>

<style scoped>
/* 添加好友 */

.addFinedShow-title{
    width: 100%;
    height: 50px;
    border-bottom: 1px solid #EEEEEE;
    display: flex;
    justify-content: space-between;
    margin-bottom: 20px;
}
.addFinedShow-title-left{
    flex: 1;
    height: 50px;
    display: flex;
    justify-content: flex-start;
    align-items: center;
}
.addFinedShow-title-left-icon{
    width: 20px;
    height: 20px;
    cursor: pointer;
    fill: currentColor;
    color: #9093A5;
    margin-right: 10px;
    cursor: pointer;
}
.addFinedShow-title-left-text{
    display: inline-block;
    height: 50px;
    line-height: 50px;
    font-size: 18px;
    font-weight: bold;
    color: #303133;
}
.addFinedShow-title-right{
    width: 50px;
    height: 50px;
    display: flex;
    justify-content: center;
    align-items: center;
}
.addFinedShow-title-right-icon{
    width: 20px;
    height: 20px;
    fill: currentColor;
    color: #9093A5;
    cursor: pointer;
}
.addFinedShow-input{
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-bottom: 20px;
}
.addFinedShow-input-text{
    margin-right: 10px;
}
.addFinedShow-userInfo{
    width: 100%;
    height: 150px;
    /* background: #f5f5f5; */
    padding: 0 20px;
    box-sizing: border-box;
}
.addFinedShow-userInfo-top{
    display: flex;
    height: 75px;
    border-bottom: 1px solid #eeeeee;
    padding-bottom: 5px;
}
.addFinedShow-userInfo-top-left{
    flex: 1;
    height: 70px;
}
.addFinedShow-userInfo-top-left-top{
    width: 100%;
    height: 40px;
    line-height: 40px;
    font-size: 16px;
    display: flex;
    justify-content: flex-start;
}
.addFinedShow-userInfo-top-left-top span:nth-child(1){
    display: inline-block;
    width: 60px;
    height: 40px;
    color: #666666;
    
}
.addFinedShow-userInfo-top-left-top span:nth-child(2){
    display: inline-block;
    flex: 1;
    height: 40px;
    color: #111111;
}
.addFinedShow-userInfo-top-right{
    width: 70px;
    height: 70px;
    background: #EEEEEE;
}
.addFinedShow-userInfo-top-left-bottom{
    width: 100%;
    height: 30px;
    line-height: 30px;
    font-size: 14px;
    display: flex;
    justify-content: flex-start;
}
.addFinedShow-userInfo-top-left-bottom span:nth-child(1){
    display: inline-block;
    width: 60px;
    height: 30px;
    color: #666666;
    
}
.addFinedShow-userInfo-top-left-bottom span:nth-child(2){
    display: inline-block;
    flex: 1;
    height: 30px;
    color: #111111;
}
.addFinedShow-userInfo-bottom{
    width: 100%;
    height: 60px;
    padding: 25px 20px;
    box-sizing: border-box;
    display: flex;
    justify-content: flex-end;
    align-content: center;
}
.addFinedShow-userInfo-bottom-icon{
    fill: currentColor;
    color: #565656;
    width: 30px;
    height: 30px;
    cursor: pointer;
}
.addFinedShow-useradd{
    width: 100%;
    height: 180px;
}
.addFinedShow-useradd-input{
    width: 100%;
    height: 70px;
    outline: none;
    border: 1px solid #eeeeee;
    padding: 10px;
    box-sizing: border-box;
    background: #F5F5F5;
    border-radius: 5px;
    margin-bottom: 10px;
}
.addFinedShow-useradd-submit{
    width: 100%;
    height: 50px;
    display: flex;
    justify-content: flex-end;
    padding-right: 15px;
    box-sizing: border-box;
    align-items: center;
}
.addFinedShow-useradd-text{
    width: 100%;
    height: 30px;
    font-size: 14px;
    color: #999999;
    margin-bottom: 10px;
}
</style>