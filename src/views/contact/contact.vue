<template>
    <div class="contact">
        <div class="contact-aside">
            <contactAside @setType='setType' @setUsers='setUsers' />
        </div>
        <div class="contact-main">
            <contactCentent v-if="type === 2" :userId='userId' />
            <contactFriend v-if="type === 1"  />
            <contactGroup v-if="type === 3"  />
            <div class="contact-main-empty" v-if="type === 0">
                <emptyIcon class="contact-main-empty-icon" />
            </div>
        </div>
    </div>
</template>

<script>
// 侧边栏
import contactAside from '../../components/contact/contactAside'
// 联系人信息
import contactCentent from '../../components/contact/contactCentent'
// 空
import  emptyIcon from '../../assets/image/icon/emptyIcon.svg'
// 新的朋友
import contactFriend from '../../components/contact/contactFriend'
// 群
import contactGroup from '../../components/contact/contactGroup'

export default {
    data(){
        return {
            type:0,
            userId: 0
        }
    },
    methods:{
        setType(num){
            this.type = num
        },
        setUsers(num){
            this.type = 2
            this.userId = num
        }
    },
    components:{
        contactAside,
        contactCentent,
        emptyIcon,
        contactFriend,
        contactGroup
    }
}
</script>

<style scoped>
.contact{
    width: 100%;
    height: calc(100% - 25px);
    overflow: hidden;
    display: flex;
    justify-content: space-between;
}
.contact-aside{
    width: 251px;
    min-width: 251px;
    height: 100%;
    border-right: 1px solid #DEE0E3;
    box-sizing: border-box;
}
.contact-main{
    width: calc(100% - 251px);
    height: 100%;
    min-width: 650px;
}
.contact-main-empty{
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
}
.contact-main-empty-icon{
    width: 100px;
    height: 100px;
    fill: currentColor;
    color: #999999;
}
</style>