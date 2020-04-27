<template>
    <div class="images">
        <div class="images-block">
            <!-- <el-avatar shape="square" :size="100" fit="fill" :src="url"></el-avatar> -->
            <div class="images-block-img">
                <img :src="url" />
            </div>
        </div>
        <div class="images-fill">
            <label for="fill" class="images-fill-label">
                <input class="images-fill-input" type="file" accept="image/jpg,image/jpeg,image/png,image/PNG"  id="fill" @change="clickImage"  /> 
                <div class="images-fill-btn">更换头像</div>
            </label>
            
        </div>
    </div>
</template>

<script>
export default {
    data(){
        return {
            url: 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg'
        }
    },
    created(){
        let userInfo = this.$store.state.user.userInfoList
            console.log(userInfo.avatar)
       this.info(this,userInfo.avatar)
    },
    methods:{
        // 点击 图标 发送图标
        clickImage(){
            let This = this
            let f = document.getElementById('fill').files[0];
             if((f.size / (1024*1024)) < 5){
                 console.log('小于5M')
                let fd = new FormData();
                    fd.append('file',f);
                    This.JIM.updateSelfAvatar({
                            'avatar' : fd
                        }).onSuccess(function(data) {
                            This.infoUser(This)
                            This.$emit('stateTag',false)
                        }).onFail(function(data) {
                            //同上
                        });

             }else{
                 console.log('大于5M')
                 // 生成一个文件读取的对象
                this.$notify.error({
                        title: '错误',
                        message: '发送图片不得大于5MB'
                        });
                
             }
        },
        info(This,username){
            console.log('获取图片')
                This.JIM.getResource({
                            'media_id' :username,
                        }).onSuccess(data=>{
                            
                            This.url = data.url
                            console.log(This.url)
                })
               
        },
        infoUser(This){

                    This.JIM.getUserInfo({
                            'username' : This.$store.state.user.userInfoList.username
                        }).onSuccess(function(data) {
                            data.user_info.region = data.user_info.region.split('-')

                            This.$store.commit('user/setUserInfoList',data.user_info)
                            
                            This.$emit('stateTag',false)

                        }).onFail(function(data) {
                            
                        });
        }
    }
}
</script>

<style scoped>
.images{
    width: 100%;
    height: auto;
    z-index: 10;
}
.images-block{
    width: 100%;
    height: 100px;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-bottom: 15px;
}
.images-block-img{
    width: 100px;
    height: 100px;
    border-radius: 5px;
    border: 2px solid #8C96AB;
    box-sizing: border-box;
}
.images-block-img img{
    width: 100%;
    height: 100%;
}
.images-fill{
    width: 100%;
    height: 30px;
    display: flex;
    justify-content: center;
    align-content: center;
}
.images-fill-label{
    width: 100px;
    height: 30px;
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    overflow: hidden;
}
.images-fill-input{
    position: absolute;
    left: -100px;
    top: -100px;
}
.images-fill-btn{
    width: 100px;
    height: 25px;
    text-align: center;
    line-height: 25px;
    font-size: 12px;
    color: #111111;
    border: 1px solid #999999;
    border-radius: 3px;
}
</style>