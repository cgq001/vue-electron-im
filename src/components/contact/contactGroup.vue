<template>
    <div class="contactFriend">
        <div class="contactFriend-title">即时通讯群聊</div>
        <div class="contactFriend-box">
            <vue-scroll :ops="ops" class="char-box">
                <div class="contactFriend-box-person">
                    <div class="contactFriend-box-person-list">
                        <div class="contactFriend-box-person-list-image">

                        </div>
                        <div class="contactFriend-box-person-list-name">
                            小明呀
                        </div>
                    </div>
                    <div class="contactFriend-box-person-list">
                        <div class="contactFriend-box-person-list-image">

                        </div>
                        <div class="contactFriend-box-person-list-name">
                            小明呀
                        </div>
                    </div>
                    <div class="contactFriend-box-person-list">
                        <div class="contactFriend-box-person-list-image">

                        </div>
                        <div class="contactFriend-box-person-list-name">
                            小明呀
                        </div>
                    </div>
                    <div class="contactFriend-box-person-list">
                        <div class="contactFriend-box-person-list-image">

                        </div>
                        <div class="contactFriend-box-person-list-name">
                            小明呀
                        </div>
                    </div>
                </div>
            </vue-scroll>
        </div>
        <div class="contactGroup-foot">
            <div class="contactGroup-foot-send">发消息</div>
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
        }
    }
}
</script>

<style scoped>
.contactFriend{
    width: 100%;
    height: 100%;
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
    height: calc(100% - 150px);
    padding: 0 25px;
    box-sizing: border-box;
}
.contactFriend-box-person{
    width: 100%;
    height: auto;
    padding: 10px 0;
    display: flex;
    justify-content: flex-start;
    flex-wrap: wrap;
}
.contactFriend-box-person-list{
    width: 70px;
    height: 100px;
    padding: 5px 10px;
    box-sizing: border-box;
    cursor: pointer;
    border-radius: 3px;
    margin-bottom: 15px;
}
.contactFriend-box-person-list:hover{
    background: #F0EFEF;
}
.contactFriend-box-person-list-image{
    width: 50px;
    height: 50px;
    background: chartreuse;
    border-radius: 5px;
}
.contactFriend-box-person-list-name{
    width: 50px;
    height: 40px;
    line-height: 40px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    font-size: 10px;
    color: #666666;
    text-align: center;
}
.contactGroup-foot{
    width: 100%;
    height: 100px;
    display: flex;
    align-items: center;
    justify-content: center;
}
.contactGroup-foot-send{
    width: 136px;
    height: 38px;
    background: #1AAD19;
    text-align: center;
    line-height: 38px;
    color: #ffffff;
    font-size: 13px;
    cursor: pointer;
}
.contactGroup-foot-send:hover{
    background: #169015;
}
</style>