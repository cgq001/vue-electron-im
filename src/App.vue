<template>
  <div id="app">
    <!-- <transition name="el-zoom-in-center"> -->
      <router-view/>
    <!-- </transition> -->
  </div>
</template>

<script>
const crypto = require('crypto');
// 创建MD5函数 
const md5 = crypto.createHash('md5'); 

export default {
  created(){
    
    let infoUser =  this.JIM.isInit()
    if(!infoUser){
      this.$router.push('/')
       this.infoJIM()
    }else{
      this.$router.push('/login')
    }
  },
  methods:{
    // 极光IM初始化
    infoJIM(){

      let hashInfo = {
                    "appkey": "8f9fa5610fb08a8c22d260601010",
                    "random_str": "022cd9fd995849b58b3ef0e943421ed9",
                    "timestamp":  new Date().getTime()
                }
      let md5Src = 'appkey='+hashInfo.appkey+'&timestamp='+hashInfo.timestamp+'&random_str='+hashInfo.random_str+'&key=a17adafc61010bb5d8834f83a5c2'
                md5.update(md5Src, 'utf-8')
            let md5Info = md5.digest('hex')
                // console.log(md5Src)
                // console.log(md5Info)

      this.JIM.init({
              "appkey" : hashInfo.appkey,
              "random_str" : hashInfo.random_str,
              "signature" : md5Info,
              "timestamp" : hashInfo.timestamp,
              "flag" : 0
        }).onSuccess(function(data) {
            console.log(data , 1)
        }).onFail(function(data) {
            console.log(data,2 )
        })

    }
  },
  beforeDestroy(){

    
    // this.JIM.loginOut()
  }
  
}
</script>

<style lang="less">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  width: 100%;
  height: 100%;
  // box-shadow: 0 0 2px 5px red;
  box-sizing: border-box;
  // border: 1px solid #C9C7C7;
  // border-radius: 10px;
  overflow: hidden;
}

</style>
