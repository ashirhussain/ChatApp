const moment =require('moment');

function formatMessage(username,text){
    return{
        username,
        text,
        date:moment().format('hh:mm a')
    }

}
module.exports=formatMessage;