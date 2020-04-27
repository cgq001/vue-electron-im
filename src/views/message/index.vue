<template>
    <div class="messageIndex">
        <!-- 左侧 导航 -->
        <div class="messageIndex-aside">
            <messageAside />
        </div>
        <!-- 右侧 聊天区域 -->
        <div class="messageIndex-main">
            <router-view></router-view>
        </div>
    </div>
</template>

<script>
import messageAside from '../../components/message/messageAside'
export default {
    components:{
        messageAside
    }
}
</script>

<style scoped>
.messageIndex{
    width: 100%;
    height: calc(100% - 25px);
    overflow: hidden;
    display: flex;
    justify-content: space-between;
}
.messageIndex-aside{
    width: 351px;
    height: 100%;
    border-right: 1px solid #DEE0E3;
    box-sizing: border-box;
}
.messageIndex-main{
    width: calc(100% - 351px);
    height: 100%;
}
</style>