<template>
    <div class="contactFriend">
        <div class="contactFriend-title">新的朋友</div>
        <div class="contactFriend-box">
            <vue-scroll :ops="ops" class="char-box">
                <div class="contactFriend-box-list" v-for="(item,index) in addUserList" :key="item._id">
                    <div class="contactFriend-box-list-image">

                    </div>
                    <div class="contactFriend-box-list-info">
                        <div class="contactFriend-box-list-info-name">{{item.from_nickname}}</div>
                        <div class="contactFriend-box-list-info-message">{{item.description}}</div>
                    </div>
                    <div class="contactFriend-box-list-cant">
                        <div class="contactFriend-box-list-cant-box" v-if="item.extra === 1">
                            <div class="contactFriend-box-list-cant-box-success" v-show="item.stateType === 1" @click="sendPass(item.from_username,item._id,index)">同意</div>
                            <div class="contactFriend-box-list-cant-box-danger"  v-show="item.stateType === 1" @click="sendFail(item.from_username,item,_id,index)">忽略</div>
                            <span  v-show="item.stateType === 2" @click="sendPass(item.from_username,item._id,index)">已同意</span>
                            <span  v-show="item.stateType === 3">已拒绝</span>
                        </div>
                        <div class="contactFriend-box-list-cant-box" v-if="item.extra === 2">
                            <span v-if="item.return_code === 0">同意了你的好友请求</span>
                            <span v-else>拒绝了你的好友请求</span>
                        </div>
                    </div>
                </div>
            </vue-scroll>
        </div>
    </div>
</template>

<script>
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
            addUserList:[]
        }
    },
    created(){
        console.log('初始化')
        this.infoAddUser(1,20)
    },
    methods:{
        // 初始化 获取 好友请求列表
        infoAddUser(page,pageSize){
             let num = (page-1)*pageSize
             let This = this
             this.$store.state.user.dbUser.find({}).sort({ ctime_ms: -1 }).skip(num).limit(pageSize).exec(function (err, docs) {
                     This.addUserList = docs
                        
                        console.log(docs)
                        
            });
        },
        // 同意好友请求
        sendPass(num,id,index){
            let This = this
             this.JIM.acceptFriend({
                'target_name' : num ,
               }).onSuccess(function(data) {
                    This.$store.state.user.dbUser.update({ _id: id }, { $set: { stateType: 2 } }, { multi: true }, function (err, numReplaced) {
                            This.addUserList[index].stateType = 2
                    });
               }).onFail(function(data) {
                   
               });
        },
        // 拒绝好友请求
        sendFail(num,id,index){
            let This = this
            this.$prompt('请输入拒绝理由', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    }).then(({ value }) => {
                          this.JIM.declineFriend({
                                'target_name' : num,
                                'why' : value,
                        }).onSuccess(function(data) {
                            This.$store.state.user.dbUser.update({ _id: id }, { $set: { stateType: 3 } }, { multi: true }, function (err, numReplaced) {
                                    This.addUserList[index].stateType = 3
                            });
                        }).onFail(function(data) {
                            
                        });
                    }).catch(() => {
                          
                    });
           
        }
    }
}
</script>

<style scoped>
.contactFriend{
    width: 100%;
    height: 100%;
    min-width: 600px;
}
.contactFriend-title{
    width: 100%;
    height: 50px;
    border-bottom: 1px solid #E7E7E7;
    padding-left: 15px;
    box-sizing: border-box;
    line-height: 50px;
}
.contactFriend-box{
    width: 100%;
    height: calc(100% - 50px);
    padding: 0 25px;
    box-sizing: border-box;
}
.char-box{
    width: 100%;
    height: 100%;
}

.contactFriend-box-list{
    width: 100%;
    height: 74px;
    padding: 12px 0;
    box-sizing: border-box;
    border-bottom: 1px solid #E7E7E7;
    /* background: chocolate; */
    display: flex;
    justify-content: space-between;
}
.contactFriend-box-list-image{
    width: 50px;
    height: 50px;
    background: cornflowerblue;
    border-radius: 5px;
    overflow: hidden;
    margin-right: 5px;
}
.contactFriend-box-list-image img{
    width: 100%;
    height: 100%;

}
.contactFriend-box-list-info{
    flex: 1;
    height: 100%;
    padding: 0 15px;
    box-sizing: border-box;
}
.contactFriend-box-list-info-name{
    width: 100%;
    height: 30px;
    line-height: 30px;
    font-size: 12px;
    font-weight: bold;
    color: #000000;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}
.contactFriend-box-list-info-message{
    width: 100%;
    height: 20px;
    line-height: 20px;
    font-size: 10px;
    color: #666666;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}
.contactFriend-box-list-cant{
    width: 135px;
    /* background: cyan; */
   
}
.contactFriend-box-list-cant-box{
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: flex-end;
    align-items: center;
}
.contactFriend-box-list-cant-box span{
    color: #666666;
    font-size: 12px;
}
.contactFriend-box-list-cant-box-danger{
    width: 60px;
    height: 30px;
    background: #FA5050;
    font-size: 12px;
    text-align: center;
    line-height: 30px;
    color: #ffffff;
    box-shadow: 0 0 3px #FA5050;
    cursor: pointer;
    border-radius: 2px;
}
.contactFriend-box-list-cant-box-success{
    width: 60px;
    height: 30px;
    background: #01AD19;
    font-size: 12px;
    text-align: center;
    line-height: 30px;
    margin-right: 8px;
    color: #ffffff;
    box-shadow: 0 0 3px #01AD19;
    cursor: pointer;
    border-radius: 2px;
}
</style>