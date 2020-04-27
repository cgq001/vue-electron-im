<template>
    <div class="fromLogin">
         <div class="login-logo">
            <img src="../../assets/image/logo/logo.png" />
        </div>
        <input class="login-input" placeholder="请输入手机号" v-model="phone">
        <!-- 提醒文字 -->
        <el-collapse-transition>
            <span  v-show="filedMsg.phone">
                <span class="login-remind" v-if="filedMsg.phone" >{{filedMsg.phone[0].message}}</span>
            </span>
        </el-collapse-transition>
        <input class="login-input" placeholder="请输入密码" v-model="password">
        <!-- 提醒文字 -->
        <transition name="el-zoom-in-top">
            <span v-show="filedMsg.password">
                <span class="login-remind" v-if="filedMsg.password">{{filedMsg.password[0].message}}</span>
            </span>
        </transition>
        
        <div class="login-bottom-box">
            <el-button class="login-bottom" type="primary" size="mini" @click="submits">登录</el-button>
        </div>
        
        <div class="login-link">
            <el-link class="login-link-text" type="info"  :underline="false">忘记密码</el-link>
            <!-- <hrIcon  /> -->
            <span class="login-link-hr"></span>
            <el-link class="login-link-text" type="info"  :underline="false">注册账号</el-link>
        </div>
        <codeIcon class="login-code" />
    </div>
</template>

<script>
import codeIcon from '@/assets/image/icon/codeIcon.svg'
import AsyncValidator from 'async-validator'

export default {
    data(){
        return {
            phone:'',
            password: '',
            formRules:{
                phone : [
                    {
                        required: true,
                        type: "string",
                        message: '请填写手机号'
                    },
                    {
                        pattern: /^(?:(?:\+|00)86)?1(?:(?:3[\d])|(?:4[5-7|9])|(?:5[0-3|5-9])|(?:6[5-7])|(?:7[0-8])|(?:8[\d])|(?:9[1|8|9]))\d{8}$/, 
                        message: '请输入正确的手机号'
                    }
                ],
                password : [
                    {
                        required: true,
                        type: "string",
                        message: '请填写密码'
                    },
                    {
                        pattern: /^[a-zA-Z0-9_-]{6,16}$/, 
                        message: '密码为6~16位的字母、数字、下划线或减号'
                    }
                ]
            },
            filedMsg:{
               
            }
        }
    },
    created(){
        let infoIsLogin= this.JIM.isLogin()
        
      
    },
    methods:{
        submits(){
            const validator = new AsyncValidator(this.formRules)
            validator.validate({ phone: this.phone, password: this.password }).then(() => {
                        this.filedMsg = {}
                        
                        this.$emit('loadingTag',true)
                        this.loginInfo()

                    }).catch(({ errors, fields }) => {
                         this.$emit('loadingTag',false)
                        this.filedMsg = fields
                    })
               
        },
        loginInfo(){
            let This = this
             This.JIM.login({
                    'username' : This.phone,
                    'password' : This.password
                }).onSuccess(function(data) {
                    This.$emit('loadingTag',false)
                    if(data.code == 0){
                        // 登陆成功
                         This.$message({
                                message: '登陆成功',
                                type: 'success',
                                center: true
                            });
                            // console.log('登陆成功')
                        This.$store.commit('user/setUserInfo',data)

                        This.JIM.getUserInfo({
                            'username' : data.username
                        }).onSuccess(function(data) {
                            data.user_info.region = data.user_info.region.split('-')
                           
                            This.$store.commit('user/setUserInfoList',data.user_info)

                        }).onFail(function(data) {
                            
                        });

                        This.$router.replace('/index/messageList/chat')

                    }else{
                         This.$message.error('用户或密码错误');
                    }
                }).onFail(function(data){
                        This.$emit('loadingTag',false)
                        This.$message.error('用户或密码错误');
                });
        }
    },
    components:{
        codeIcon
    }
}
</script>

<style scoped>
.fromLogin{
    padding: 0 5px;
    box-sizing: border-box;
    position: relative;
    height: calc(100% - 37px);
}
.login-logo{
    width: 100%;
    height: 62px;
    display: flex;
    justify-content: center;
    /* background: chartreuse; */
    margin-bottom: 16px;
    -webkit-app-region: drag;
}
.login-logo img{
    width: 200px;
    height: 60px;
}
.login-input{
    width: 100%;
    height: 40px;
    border: none;
    border-bottom: 1px solid #E7E7E7;
    padding: 0 50px 0 15px;
    box-sizing: border-box;
    font-size: 16px;
    transition: all 0.5s;
    color: #666666;
}
.login-input::-webkit-input-placeholder{
    color: #AAAAAA;
    font-size: 12px;
}
.login-input:hover{
    border-bottom-color: #2BB2FD;
}
.login-remind{
    width: 100%;
    height: 20px;
    color: crimson;
    font-size: 12px;
    padding-left: 15px;
    box-sizing: border-box;
    transition: all 2.9s;
}
.login-bottom-box{
    width: 100%;
    height: 50px;
    padding-top: 20px;
    box-sizing: border-box;
    margin-bottom: 15px;
}
.login-bottom{
    width: 100%;
    background: #44BA84;
    height: 30px;
    border: none;
    cursor: pointer;
    
}
.login-link{
    width: 100%;
    height: 20px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 12px;
}
.login-link-hr{
    width: 1px;
    height: 16px;
    margin: 0 10px;
    background: #C7C9C8;
}
.login-link-text{
    font-size: 12px;
}
.login-code{
    width: 20px;
    height: 20px;
    position: absolute;
    bottom: 10px;
    right: 10px;
    cursor: pointer;
}
</style>