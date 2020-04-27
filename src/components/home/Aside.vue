<template>
    <div class="aside">
        <div class="aside-title">

        </div>
        <div class="aside-head">
            <div class="aside-head-image">
                <img class="aside-head-image-src" :src="headerImage" />
            </div>
        </div>
        <div class="aside-hr-one">

        </div>
        <el-tooltip class="item" effect="dark" content="消息" placement="right" popper-class='darkTitle'>
            <div class="aside-list"  @click="$router.push('/index/messageList/chat')" :class="name == 'messageList' ? 'aside-list-active' : '' ">
                <wathIcon class="aside-list-icon" />
            </div>
         </el-tooltip>
         <el-tooltip class="item" effect="dark" content="联系人" placement="right" popper-class='darkTitle'>
            <div class="aside-list"  @click="$router.push('/index/contactlist')" :class="name == 'contactList' ? 'aside-list-active' : '' ">
                <personIcon class="aside-list-icon" />
            </div>
         </el-tooltip>
         <el-tooltip class="item" effect="dark" content="收藏" placement="right" popper-class='darkTitle'>
            <div class="aside-list">
                <collectIcon class="aside-list-icon" />
            </div>
         </el-tooltip>
         <el-tooltip class="item" effect="dark" content="日历" placement="right" popper-class='darkTitle'>
            <div class="aside-list">
                <calendarIcon class="aside-list-icon" />
            </div>
         </el-tooltip>
         <div class="aside-list set-icon">
                <div class="set-icon-box-icons"  @click="set= !set" >
                    <setIcon class="aside-list-icon"/>
                </div>
                <div class="set-icon-box"  v-if="set">
                    <div class="set-icon-box-list" @click.self="infoUser(0)">
                        修改密码
                    </div>
                    <div class="set-icon-box-list" @click.self="infoUser(1)">
                        更新头像
                    </div>
                    <div class="set-icon-box-list" @click.self="infoUser(2)">
                        个人资料
                    </div>
                    <div class="set-icon-box-list">
                        退出
                    </div>
                </div>
         </div>
         <!-- 弹出层 -->
         <el-dialog :title="title[type]" :visible.sync="showInfoUser" :close-on-press-escape='false' :close-on-click-modal='false' width="530px" :append-to-body='true'>
             <setPassword v-if="type === 0" @stateTag='stateTag' />
             <Images v-if="type === 1" @stateTag='stateTag' />
             <Datas v-if="type === 2" @stateTag='stateTag' />
        </el-dialog>
    </div>
</template>

<script>
import calendarIcon from '../../assets/image/icon/calendarIcon.svg'
import collectIcon from '../../assets/image/icon/collectIcon.svg'
import personIcon from '../../assets/image/icon/personIcon.svg'
import wathIcon from '../../assets/image/icon/wathIcon.svg'
import setIcon from '../../assets/image/icon/setIcon.svg'
import Images from './Images'
import Datas from './Datas'
import setPassword from './setPassword'
import headerImages from '../../assets/image/header/header.png'
export default {
    data(){
        return {
            name: '',
            showInfoUser: false,
            type: 0,
            title:['修改密码','更新头像','个人资料'],
            set: false,
            headerImage: headerImages
        }
    },
    methods:{
        infoUser(num){
            this.set = false
            this.type = num,
            this.showInfoUser = true
        },
        stateTag(state){
            this.showInfoUser = state
        }
    },
    mounted(){
        
    },
    watch:{
        $route:{
            handler(news,olds){
                this.name = news.matched[1].name
            },
            immediate: true
        },
        userInfoList:{
            handler(news,olds){
                console.log(news)
               let This = this
                if(news){
                    this.JIM.getResource({
                                'media_id' :news.avatar,
                            }).onSuccess(data=>{
                                console.log(data.url)
                               This.headerImage = data.url
                            
                            })
                            
                }else{
                     This.headerImage = headerImages
                }
               
            },
            deep: true,
            immediate: true
        }
    },
    components:{
        calendarIcon,
        personIcon,
        collectIcon,
        wathIcon,
        setIcon,
        Images,
        Datas,
        setPassword
    },
    computed:{
        userInfoList(){
            return this.$store.state.user.userInfoList
        }
    },
}
</script>

<style scoped>
.aside{
    width: 100%;
    height: 100%;
    -webkit-user-select: none;
    box-sizing: border-box;
    position: relative;
}
.aside-title{
    width: 100%;
    height: 36px;
    -webkit-app-region: drag;
}
.aside-hr-one{
    width: 100%;
    height: 24px;
    -webkit-app-region: drag;
}
.aside-head{
    width: 100%;
    height: 40px;
    display: flex;
    justify-content: center;
    align-items: center;
}
.aside-head-image{
    width: 40px;
    height: 40px;
    border: 2px solid #ffffff;
    overflow: hidden;
    border-radius: 50%;
    
}
.aside-head-image-src{
    width: 40px;
    height: 40px;
}
.aside-head-image img{
    width: 36px;
    height: 36px;
    border-radius: 50%;
}

.aside-list{
    width: 100%;
    height: 45px;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    margin-bottom: 5px;
}
.set-icon-box-icons{
    width: 100%;
    height: 45px;
    display: flex;
    justify-content: center;
    align-items: center;
}
.aside-list-active{
    background: #3874FE!important;
}
.aside-list-active .aside-list-icon{
    color: #ffffff!important;
}
.aside-list-icon{
    width: 20px;
    height: 20px;
    fill: currentColor;  
    color: #A1A6B2;
    transition: all 0.2s;
}
.aside-list:hover{
    background: #7B87A3;
}
.aside-list:hover .aside-list-icon{
    color: #ffffff;
}
/* 提示文字 */
.darkTitle{
    background: rgba(48,49,51, 0.7)!important;
}
.set-icon{
    position: absolute;
    left: 0;
    bottom: 20px;
}
.set-icon-box{
    position: absolute;
    left: 60px;
    bottom: 0;
    width: 138px;
    height: auto;
    background: #525C70;
    z-index: 10;
}
.set-icon-box-list{
    width: 100%;
    height: 50px;
    padding-left: 10px;
    box-sizing: border-box;
    line-height: 50px;
    font-size: 16px;
    color: #ffffff;
}
.set-icon-box-list:hover{
    background: #8C96AB;
}
</style>
<style>
/* .aside .el-tooltip__popper.is-dark {
    background: rgba(48,49,51, 0.3)!important;
} */
</style>