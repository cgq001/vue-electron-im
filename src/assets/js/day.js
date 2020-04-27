import moment from 'moment'
moment.locale('zh-cn'); 

export default function(num,floor){
    
        let date =  new Date()
        let year = date.getFullYear()
        let month  = date.getMonth()+1
        let day = date.getDate()

        // 今天0时 时间戳
        let dateTime= new Date(year+'-'+month+'-'+day).getTime()
        // 昨天0时 时间戳
        let dateTimeLs= new Date(year+'-'+month+'-'+(day-1)).getTime()

       

        if(num > dateTime){
            // 今天
            // console.log("今天")
            if(floor){
                return moment(num).format('LTS')
            }else{
                return moment(num).format('LT');
            }
           

        }else if(num > dateTimeLs && num < dateTime){
            // 昨天
            // console.log("昨天")
            if(floor){
                return moment(num).subtract(1, 'days').calendar()
            }else{
                return '昨天'
            }
        }else{
            // 以前
            // console.log("之前")
            if(floor){
                moment(num).format('YYYY-MM-DD, HH:mm')
            }else{
                return moment(num).format('l')
            }
        }
}
    