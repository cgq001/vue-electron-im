// var Datastore = require('nedb'),
//     db = new Datastore({ filename: './message.db', autoload: true });
import db from '../../assets/sql/message'

console.log(db)

import dbUser from '../../assets/sql/addUser'
// import message from '../../nedb/message'

const user = {
    namespaced: true,
    state: { 
        // 用户个人信息
       userInfo:{

       },
      //  用户个人资料
      userInfoList:{

      },
          //    好友列表
          friend_list:[],
          // 回话列表
          conversations: [],
          // 最新消息的 from_username
          MsgReceiveList: null,
          // 最新消息
          MsgReceiveListSrc: {},
          db: db,
          dbUser: dbUser,
         //  message:message
    },
    mutations: { 
       setUserInfo(state,data){
            state.userInfo = data
       },
       setUserInfoList(state,data){
            state.userInfoList = data
       },
       setConversations(state,data){
          // console.log('vuex2')
            state.conversations = data
       },
       setConversationsPush(state,data){
        // console.log('vuex2')
          state.conversations.unshift(data)
        },
       setFriendList(state,data){
            state.friend_list = data
       },
       setMsgReceiveList(state,data){
            // console.log(message)
          console.log('vuex')
         //  db.insert(data, function (err, newDoc) {  
         //        console.log(newDoc)
         //     });
         db.insert(data, function (err, newDoc) {  
               console.log(newDoc)
            });

          console.log('vuex')
          // db.find({}, function (err, docs) {
                       
          //      console.log(docs)
          //  });
          if(data.from_username){
            state.MsgReceiveList = data.from_username
            state.MsgReceiveListSrc = data
          }
       },
       setMsgReceiveListArray(state,data){
         console.log('setMsgReceiveListArray')
         db.insert(data, function (err, newDoc) {  
               console.log(newDoc)
            });  
      },
      setAddUserList(state,data){
        dbUser.insert(data,function(err, newDoc){
          console.log(newDoc)
        })
      }
    },
    actions: { 
        
    },
    getters: { 
        
     }
  }

  export default user;