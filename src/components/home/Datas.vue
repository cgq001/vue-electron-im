<template>
    <div class="datas">
        <el-form ref="form" :model="userInfo" label-width="80px">
            <el-form-item label="昵称" size="mini">
                <el-input v-model="userInfo.nickname" :minlength="2" :maxlength="10" size="mini" placeholder="最多10个字符"></el-input>
            </el-form-item>
            <el-form-item label="生日" size="mini">
                <el-date-picker
                    size="mini"
                    v-model="userInfo.birthday"
                    type="date"
                    placeholder="选择生日">
                </el-date-picker>
            </el-form-item>
            <el-form-item label="签名" size="mini">
                <el-input v-model="userInfo.signature" :minlength="2" size="mini" :maxlength="50" placeholder="最多50个字符"></el-input>
            </el-form-item>
            <el-form-item label="性别" size="mini">
                <el-radio-group v-model="userInfo.gender">
                <el-radio :label="1"  size="mini">男</el-radio>
                <el-radio :label="2"  size="mini">女</el-radio>
                </el-radio-group>
            </el-form-item>
            <el-form-item label="地区" size="mini">
                <el-cascader
                    size="mini"
                    v-model="userInfo.region"
                    :options="city"
                    @change="handleChange">
                </el-cascader>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" size="mini" @click="onSubmit">立即修改</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
import city from '../../assets/js/city'
import moment from 'moment'
export default {
    data(){
        return {
            userInfo:{
                nickname: '',
                birthday: '',
                signature: '',
                gender: '',
                region: '',
                
            },
            city: city
        }
    },
    created(){
        // let userInfo = this.$store.state.user.userInfo
        // this.infoUser(userInfo.username)
        // console.log(this.$store.state.user.userInfoList)
    },
    methods:{
        onSubmit(){
            let This = this
            let user_info = {
                 'nickname' : This.userInfo.nickname,
                 'birthday' : moment(This.userInfo.birthday).format('YYYY-MM-DD'),
                'signature' : This.userInfo.signature,
                   'gender' : This.userInfo.gender,
                   'region' : This.userInfo.region.join('-'),
               }
            console.log(user_info)
            This.JIM.updateSelfInfo(user_info).onSuccess(function(data) {
                   This.infoUser(This)
                  This.$notify({
                    title: '成功',
                    message: '个人信息更新成果',
                    type: 'success'
                    });
                    This.$emit('stateTag',false)
               }).onFail(function(data) {
                   //同上
                   console.log(data)
               });
        },
        handleChange(){

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
    },
    computed:{
        userInfoList(){
            return this.$store.state.user.userInfoList
        }
    },
    watch:{
        userInfoList:{
            handler(news,olds){
                this.userInfo = news
            },
            deep: true,
            immediate: true
        }
    }
}
</script>