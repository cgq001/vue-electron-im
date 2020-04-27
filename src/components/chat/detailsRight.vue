<template>
    <div class="Details">
        
        <div class="Details-centent">
            <div class="Details-centent-text" v-if="item.content.msg_type === 'text' ">
                {{item.content.msg_body.text}}
            </div>
            <div class="Details-centent-image" v-if="item.content.msg_type === 'image' ">
                <img :src="imgsrc[item.msg_id]" :alt="imageSrcSend(item.content.msg_body.media_id,item.msg_id)" :ref="item.msg_id" />
            </div>
        </div>
        <div class="Details-head">

        </div>
    </div>
</template>

<script>
export default {
    props:['item'],
    data(){
       return {
            imgsrc:{}
       }
    },
    mounted(){
       
    },
    methods:{
      imageSrcSend(num,source){
          new Promise((resolve,reject)=>{
                this.JIM.getResource({
                 'media_id' :num,
               }).onSuccess(data=>{
                 
                this.$refs[source].src = data.url
               })
            })
        }
    }
}
</script>

<style scoped>
.Details{
    width: 100%;
    height: auto;
    display: flex;
    justify-content: flex-end;
    margin-bottom: 15px;
}
.Details-head{
    width: 35px;
    height: 35px;
    background: turquoise;
    border-radius: 5px;
    margin-left: 10px;
}
.Details-centent{
    /* width: 60%; */
    min-width: 50px;
    max-width: 500px;
    min-height: 35px;
    background: rgba(1,166,238,1);
    box-shadow: 2px 2px 5px rgba(1,166,238,1);
    border-radius: 5px;
    color: #ffffff;
    padding: 10px;
    box-sizing: border-box;
}
.Details-centent-text{
     font-size: 14px;
     line-height: 25px;
     font-weight: 100;
}
.Details-centent-image{
    width: 150px;
    height: auto;
}
.Details-centent-image img{
    max-width: 100%;
}
</style>